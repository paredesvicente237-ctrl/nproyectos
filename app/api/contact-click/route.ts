import { NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

const ALERT_EMAIL = "nproyectosltda@gmail.com";
const CLICK_LIMIT = 20;
const CLICK_WINDOW_MS = 10 * 60 * 1000;
const clickBuckets = new Map<string, { count: number; resetAt: number }>();

function isAllowedOrigin(origin: string | null) {
  if (!origin) return false;
  try {
    const url = new URL(origin);
    if (url.protocol !== "https:" && !(process.env.NODE_ENV !== "production" && url.protocol === "http:")) return false;
    const allowedHosts = ["nproyectos.cl", "www.nproyectos.cl"];
    if (process.env.NODE_ENV !== "production") allowedHosts.push("localhost", "127.0.0.1");
    return allowedHosts.includes(url.hostname);
  } catch {
    return false;
  }
}

function isRateLimited(request: Request) {
  const address = request.headers.get("x-vercel-forwarded-for")
    || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || "unknown";
  const now = Date.now();
  const bucket = clickBuckets.get(address);
  if (!bucket || bucket.resetAt <= now) {
    clickBuckets.set(address, { count: 1, resetAt: now + CLICK_WINDOW_MS });
    return false;
  }
  bucket.count += 1;
  return bucket.count > CLICK_LIMIT;
}

export async function POST(request: Request) {
  if (!isAllowedOrigin(request.headers.get("origin"))) {
    return NextResponse.json({ error: "Origen no autorizado." }, { status: 403 });
  }
  if (isRateLimited(request)) {
    return NextResponse.json({ error: "Demasiados avisos en poco tiempo." }, { status: 429 });
  }

  const body = await request.json().catch(() => null) as { channel?: unknown; path?: unknown } | null;
  const channel = body?.channel === "whatsapp" ? "WhatsApp" : body?.channel === "email" ? "correo" : null;
  if (!channel) return NextResponse.json({ error: "Canal de contacto inválido." }, { status: 400 });

  const rawPath = typeof body?.path === "string" ? body.path.trim() : "/";
  const path = rawPath.startsWith("/") && !rawPath.startsWith("//")
    ? rawPath.replace(/[\r\n]/g, "").slice(0, 160)
    : "/";
  const apiKey = process.env.RESEND_API_KEY ?? process.env.Resend;
  if (!apiKey) return NextResponse.json({ error: "El servicio de avisos no está configurado." }, { status: 503 });

  const date = new Intl.DateTimeFormat("es-CL", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "America/Santiago",
  }).format(new Date());

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from: "N Proyectos <noreply@nproyectos.cl>",
      to: [ALERT_EMAIL],
      subject: `Nuevo contacto desde la web por ${channel}`,
      text: [
        `Una persona inició contacto desde el sitio de N Proyectos mediante ${channel}.`,
        "",
        `Página: ${path}`,
        `Fecha y hora (Chile): ${date}`,
        "",
        "Este aviso confirma el clic en el enlace; no confirma que el visitante haya enviado el mensaje.",
      ].join("\n"),
    });

    if (error) return NextResponse.json({ error: "No fue posible enviar el aviso." }, { status: 502 });
    return new NextResponse(null, { status: 204, headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "No fue posible enviar el aviso." }, { status: 502 });
  }
}
