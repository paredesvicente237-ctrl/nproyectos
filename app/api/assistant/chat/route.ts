import {
  createUIMessageStreamResponse,
  streamText,
  type ModelMessage,
} from "ai";
import { NextResponse } from "next/server";
import { getAssistantInstructions } from "@/lib/assistantKnowledge";
import { isPublicApiRateLimited, isSameOriginRequest } from "@/lib/publicApiSecurity";

const MAX_BODY_BYTES = 80_000;
const MAX_MESSAGE_COUNT = 22;
const MAX_TOTAL_CHARS = 16_000;

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

  if (
    !process.env.AI_GATEWAY_API_KEY &&
    !process.env.VERCEL_OIDC_TOKEN &&
    process.env.VERCEL !== "1"
  ) {
    return NextResponse.json(
      { error: "El asesor IA aún no está habilitado. Puedes preparar una solicitud comercial mientras tanto." },
      { status: 503 },
    );
  }

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

  try {
    if (await isPublicApiRateLimited(request, "chat", 24, 10 * 60)) {
      return NextResponse.json({ error: "Alcanzaste el límite temporal del asesor. Inténtalo más tarde o envía tu solicitud." }, { status: 429 });
    }
  } catch {
    return NextResponse.json({ error: "El asesor no está disponible en este momento." }, { status: 503 });
  }

  try {
    const result = streamText({
      model: "openai/gpt-5-mini",
      instructions: getAssistantInstructions(body.pagePath),
      messages,
      maxOutputTokens: 450,
      maxRetries: 0,
      abortSignal: request.signal,
      timeout: { totalMs: 26_000 },
    });

    return createUIMessageStreamResponse({
      stream: result.toUIMessageStream(),
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch {
    return NextResponse.json({ error: "No pude responder ahora. Puedes intentar nuevamente o preparar una solicitud." }, { status: 502 });
  }
}
