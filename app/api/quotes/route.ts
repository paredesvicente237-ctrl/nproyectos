import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { AUTH_COOKIE, getSession } from "@/lib/auth";
import { isActiveSession } from "@/lib/activeSession";
import { canViewQuoteHistory } from "@/lib/permissions";
import {
  createQuoteHistory,
  getQuoteHistory,
  markQuoteEmailSent,
  type StoredQuoteLine,
} from "@/lib/quoteHistory";

export const dynamic = "force-dynamic";

const QUOTE_EMAIL = "nproyectosltda@gmail.com";

async function getAuthorizedSession() {
  const cookieStore = await cookies();
  const session = await getSession(
    cookieStore.get(AUTH_COOKIE)?.value,
    process.env.COTIZADOR_SESSION_SECRET
  );
  if (!session || !(await isActiveSession(session))) return null;
  return session;
}

function cleanText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function sanitizeLines(value: unknown): StoredQuoteLine[] | null {
  if (!Array.isArray(value) || value.length === 0 || value.length > 200) return null;

  const lines = value.map((line) => {
    if (!line || typeof line !== "object") return null;
    const source = line as Record<string, unknown>;
    const quantity = Number(source.quantity);
    const total = Number(source.total);
    const category = cleanText(source.category, 80);
    const name = cleanText(source.name, 160);
    if (!category || !name || !Number.isFinite(quantity) || quantity <= 0 || !Number.isFinite(total) || total < 0) return null;
    return {
      category,
      name,
      detail: cleanText(source.detail, 500),
      modeText: cleanText(source.modeText, 160),
      quantity: Math.round(quantity * 100) / 100,
      total: Math.round(total),
    } satisfies StoredQuoteLine;
  });

  return lines.every((line): line is StoredQuoteLine => line !== null) ? lines : null;
}

function money(value: number) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(value);
}

function quoteEmailText(
  number: number,
  username: string,
  createdAt: string,
  lines: StoredQuoteLine[],
  subtotal: number,
  iva: number,
  total: number
) {
  const date = new Intl.DateTimeFormat("es-CL", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "America/Santiago",
  }).format(new Date(createdAt));
  const detail = lines.map((line, index) => [
    `${index + 1}. ${line.name} (${line.category})`,
    [line.detail, line.modeText, `Cantidad: ${line.quantity}`].filter(Boolean).join(" · "),
    `Total: ${money(line.total)}`,
  ].join("\n")).join("\n\n");

  return [
    `COTIZACIÓN N.º ${String(number).padStart(6, "0")}`,
    `Generada por: ${username}`,
    `Fecha: ${date}`,
    "",
    detail,
    "",
    `Subtotal neto: ${money(subtotal)}`,
    `IVA 19%: ${money(iva)}`,
    `TOTAL: ${money(total)}`,
    "",
    "Esta copia fue generada automáticamente por el Cotizador VA de N Proyectos.",
  ].join("\n");
}

export async function GET() {
  const session = await getAuthorizedSession();
  if (!session) return NextResponse.json({ error: "Sesión no autorizada." }, { status: 401 });
  if (!canViewQuoteHistory(session.user)) {
    return NextResponse.json({ error: "No tienes permiso para ver este historial." }, { status: 403 });
  }

  try {
    return NextResponse.json({ quotes: await getQuoteHistory() }, {
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch {
    return NextResponse.json({ error: "No fue posible consultar el historial de cotizaciones." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getAuthorizedSession();
  if (!session) return NextResponse.json({ error: "Sesión no autorizada." }, { status: 401 });

  const body = (await request.json().catch(() => null)) as { lines?: unknown } | null;
  const lines = sanitizeLines(body?.lines);
  if (!lines) return NextResponse.json({ error: "La cotización no contiene productos válidos." }, { status: 400 });

  const apiKey = process.env.RESEND_API_KEY ?? process.env.Resend;
  if (!apiKey) {
    return NextResponse.json({ error: "El correo de cotizaciones aún no está configurado." }, { status: 503 });
  }

  let quote: Awaited<ReturnType<typeof createQuoteHistory>>;
  try {
    quote = await createQuoteHistory(session.user, lines, QUOTE_EMAIL);
  } catch {
    return NextResponse.json({ error: "No fue posible guardar la cotización." }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  let emailError = false;
  try {
    const { error } = await resend.emails.send({
      from: "N Proyectos <noreply@nproyectos.cl>",
      to: [QUOTE_EMAIL],
      subject: `Copia cotización VA N.º ${String(quote.number).padStart(6, "0")} · ${session.user}`,
      text: quoteEmailText(
        quote.number,
        session.user,
        quote.createdAt,
        lines,
        quote.subtotal,
        quote.iva,
        quote.total
      ),
    }, {
      idempotencyKey: `cotizador-va-${quote.number}`,
    });
    emailError = Boolean(error);
  } catch {
    emailError = true;
  }

  if (emailError) {
    return NextResponse.json({
      error: "La cotización quedó guardada, pero no fue posible enviar la copia por correo.",
      number: quote.number,
      saved: true,
      emailSent: false,
    }, { status: 502 });
  }

  try {
    await markQuoteEmailSent(quote.id);
  } catch {
    return NextResponse.json({
      error: "La copia fue enviada, pero no fue posible actualizar su estado en el historial.",
      number: quote.number,
      saved: true,
      emailSent: true,
    }, { status: 500 });
  }
  return NextResponse.json({
    number: quote.number,
    saved: true,
    emailSent: true,
    emailedTo: QUOTE_EMAIL,
  });
}
