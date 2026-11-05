import {
  createUIMessageStreamResponse,
  streamText,
  type ModelMessage,
} from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { NextResponse } from "next/server";
import { getAssistantInstructions } from "@/lib/assistantKnowledge";
import { recordAssistantConversationStart } from "@/lib/assistantMetrics";
import {
  acquireAssistantRequestSlot,
  isPublicApiRateLimited,
  isSameOriginRequest,
} from "@/lib/publicApiSecurity";

export const maxDuration = 35;

const MAX_BODY_BYTES = 80_000;
const MAX_MESSAGE_COUNT = 22;
const MAX_TOTAL_CHARS = 16_000;
const MAX_SESSION_MESSAGES = 30;
const SESSION_WINDOW_SECONDS = 24 * 60 * 60;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

async function readJsonBody(request: Request): Promise<Record<string, unknown> | null> {
  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) return null;

  const raw = await request.text();
  if (Buffer.byteLength(raw, "utf8") > MAX_BODY_BYTES) return null;

  try {
    const body: unknown = JSON.parse(raw);
    return isRecord(body) ? body : null;
  } catch {
    return null;
  }
}

function toModelMessages(value: unknown): ModelMessage[] | null {
  if (!Array.isArray(value) || value.length === 0) return null;

  const source = value.slice(-MAX_MESSAGE_COUNT);
  const result: ModelMessage[] = [];
  let totalChars = 0;

  for (const message of source) {
    if (!isRecord(message) || !Array.isArray(message.parts)) continue;
    if (message.role !== "user" && message.role !== "assistant") continue;

    const text = message.parts
      .filter((part): part is Record<string, unknown> => isRecord(part) && part.type === "text")
      .map((part) => typeof part.text === "string" ? part.text : "")
      .join("\n")
      .replaceAll("\u0000", "")
      .trim();

    if (!text) continue;
    const limit = message.role === "user" ? 1_800 : 3_000;
    if (text.length > limit) return null;

    totalChars += text.length;
    if (totalChars > MAX_TOTAL_CHARS) return null;
    result.push({ role: message.role, content: text });
  }

  if (result.length === 0 || result[result.length - 1].role !== "user") return null;
  return result;
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Solicitud no autorizada." }, { status: 403 });
  }

  const apiKey = process.env.OPENAI_API_KEY?.trim();
  const modelId = process.env.OPENAI_MODEL?.trim();
  if (!apiKey || !modelId) {
    return NextResponse.json(
      { error: "El asesor IA aún no está configurado. Puedes preparar una solicitud comercial mientras tanto." },
      { status: 503 },
    );
  }
  const directOpenAI = createOpenAI({ apiKey });

  const body = await readJsonBody(request);
  if (!body) {
    return NextResponse.json({ error: "No se pudo leer el mensaje." }, { status: 400 });
  }

  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ error: "Solicitud no válida." }, { status: 400 });
  }

  const messages = toModelMessages(body.messages);
  if (!messages) {
    return NextResponse.json({ error: "El mensaje está vacío o excede el límite permitido." }, { status: 400 });
  }

  const shouldCountConversationStart = body.conversationStart === true
    && messages.filter((message) => message.role === "user").length === 1;

  const sessionId = typeof body.sessionId === "string" ? body.sessionId : "";
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(sessionId)) {
    return NextResponse.json({ error: "No se pudo validar esta sesión. Recarga la página e inténtalo nuevamente." }, { status: 400 });
  }

  let releaseConcurrencySlot: (() => Promise<void>) | null = null;
  try {
    if (await isPublicApiRateLimited(request, "chat", 24, 10 * 60)) {
      return NextResponse.json({ error: "Alcanzaste el límite temporal del asesor. Inténtalo más tarde o envía tu solicitud." }, { status: 429 });
    }
    if (await isPublicApiRateLimited(request, "chat-session", MAX_SESSION_MESSAGES, SESSION_WINDOW_SECONDS, sessionId)) {
      return NextResponse.json({ error: "Esta sesión alcanzó su límite de mensajes por hoy. Puedes preparar una solicitud para ventas." }, { status: 429 });
    }
    releaseConcurrencySlot = await acquireAssistantRequestSlot(sessionId);
    if (!releaseConcurrencySlot) {
      return NextResponse.json({ error: "El asesor está atendiendo varias consultas. Inténtalo nuevamente en un momento." }, { status: 429 });
    }
  } catch {
    return NextResponse.json({ error: "El asesor no está disponible en este momento." }, { status: 503 });
  }

  let lockReleased = false;
  const releaseLock = async () => {
    if (lockReleased || !releaseConcurrencySlot) return;
    lockReleased = true;
    try {
      await releaseConcurrencySlot();
    } catch {
      // Leases expire automatically if a request cannot release its slot.
      console.warn("[assistant] request-slot release failed");
    }
  };

  const startedAt = Date.now();
  try {
    const result = streamText({
      model: directOpenAI.responses(modelId),
      instructions: getAssistantInstructions(body.pagePath),
      messages,
      maxOutputTokens: 450,
      maxRetries: 0,
      providerOptions: {
        openai: {
          store: false,
          reasoningEffort: "none",
          textVerbosity: "low",
        },
      },
      abortSignal: request.signal,
      timeout: { totalMs: 26_000 },
      onError: async ({ error }) => {
        console.error("[assistant] model request failed", {
          errorType: error instanceof Error ? error.name : typeof error,
        });
        await releaseLock();
      },
      onEnd: async ({ usage, finishReason }) => {
        console.info("[assistant] model request completed", {
          inputTokens: usage.inputTokens ?? null,
          outputTokens: usage.outputTokens ?? null,
          finishReason,
          elapsedMs: Date.now() - startedAt,
        });
        if (shouldCountConversationStart) {
          try {
            await recordAssistantConversationStart();
          } catch {
            // Metrics must never prevent a completed response from reaching the visitor.
            console.warn("[assistant] conversation metric write failed");
          }
        }
        await releaseLock();
      },
      onAbort: async () => {
        await releaseLock();
      },
    });

    return createUIMessageStreamResponse({
      stream: result.toUIMessageStream(),
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch {
    await releaseLock();
    return NextResponse.json({ error: "No pude responder ahora. Puedes intentar nuevamente o preparar una solicitud." }, { status: 502 });
  }
}
