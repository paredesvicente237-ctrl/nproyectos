import { Resend } from "resend";
import { NextResponse } from "next/server";
import { salesContact } from "@/components/siteData";
import { getPublicPageContext } from "@/lib/assistantKnowledge";
import { isPublicApiRateLimited, isSameOriginRequest } from "@/lib/publicApiSecurity";

const MAX_BODY_BYTES = 20_000;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function cleanLine(value: unknown, maxLength: number) {
  return typeof value === "string"
    ? value.replace(/[\r\n\t]+/g, " ").replace(/\u0000/g, "").trim().slice(0, maxLength)
    : "";
}

function cleanParagraph(value: unknown, maxLength: number) {
  return typeof value === "string"
    ? value.replace(/\r\n?/g, "\n").replace(/\u0000/g, "").trim().slice(0, maxLength)
    : "";
}

function isValidEmail(email: string) {
  return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return /^[+()\d\s.-]{8,24}$/.test(phone) && digits.length >= 8;
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Solicitud no autorizada." }, { status: 403 });
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "La solicitud es demasiado extensa." }, { status: 413 });
  }

  const rawBody = await request.text();
  if (Buffer.byteLength(rawBody, "utf8") > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "La solicitud es demasiado extensa." }, { status: 413 });
  }

  let parsedBody: unknown;
  try {
    parsedBody = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "No se pudo leer la solicitud." }, { status: 400 });
  }
  if (!isRecord(parsedBody)) {
    return NextResponse.json({ error: "No se pudo leer la solicitud." }, { status: 400 });
  }

  if (typeof parsedBody.website === "string" && parsedBody.website.trim()) {
    return NextResponse.json({ sent: true });
  }

  const submissionId = cleanLine(parsedBody.submissionId, 36);
  const name = cleanLine(parsedBody.name, 100);
  const company = cleanLine(parsedBody.company, 120);
  const email = cleanLine(parsedBody.email, 254).toLowerCase();
  const phone = cleanLine(parsedBody.phone, 30);
  const service = cleanLine(parsedBody.service, 120);
  const projectSummary = cleanParagraph(parsedBody.projectSummary, 5_000);
  const material = cleanLine(parsedBody.material, 160);
  const dimensions = cleanLine(parsedBody.dimensions, 160);
  const quantity = cleanLine(parsedBody.quantity, 100);
  const deadline = cleanLine(parsedBody.deadline, 120);
  const location = cleanLine(parsedBody.location, 120);
  const page = getPublicPageContext(parsedBody.pagePath);

  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(submissionId)) {
    return NextResponse.json({ error: "No se pudo validar la solicitud. Recarga el formulario e inténtalo nuevamente." }, { status: 400 });
  }
  if (!name || projectSummary.length < 5 || parsedBody.privacyConsent !== true) {
    return NextResponse.json({ error: "Completa tu nombre, el resumen del proyecto y la autorización para compartir la solicitud con ventas." }, { status: 400 });
  }
  if (email && !isValidEmail(email)) {
    return NextResponse.json({ error: "Revisa el formato del correo electrónico." }, { status: 400 });
  }
  if (phone && !isValidPhone(phone)) {
    return NextResponse.json({ error: "Revisa el formato del teléfono." }, { status: 400 });
  }
  if (!email && !phone) {
    return NextResponse.json({ error: "Indica un correo o teléfono para que el equipo pueda responderte." }, { status: 400 });
  }

  try {
    if (await isPublicApiRateLimited(request, "lead", 4, 60 * 60)) {
      return NextResponse.json({ error: "Se alcanzó el límite temporal de solicitudes. Comunícate directamente con ventas." }, { status: 429 });
    }
  } catch {
    return NextResponse.json({ error: "No fue posible validar la solicitud. Inténtalo nuevamente más tarde." }, { status: 503 });
  }

  // Preview and local environments exercise form validation without ever
  // delivering visitor data to the real sales mailbox.
  if (process.env.VERCEL_ENV !== "production") {
    return NextResponse.json({ sent: true, simulated: true });
  }

  const apiKey = process.env.RESEND_API_KEY ?? process.env.Resend;
  if (!apiKey) {
    return NextResponse.json({ error: "El envío de solicitudes no está configurado en este momento. Puedes comunicarte directamente con ventas." }, { status: 503 });
  }

  const details = [
    "Nueva oportunidad comercial recibida desde el asesor IA de nproyectos.cl",
    "",
    `Nombre: ${name}`,
    `Empresa: ${company || "No indicada"}`,
    `Correo: ${email || "No indicado"}`,
    `Teléfono: ${phone || "No indicado"}`,
    `Servicio o producto: ${service || "Por definir"}`,
    `Material: ${material || "Por definir"}`,
    `Dimensiones: ${dimensions || "Por definir"}`,
    `Cantidad: ${quantity || "Por definir"}`,
    `Plazo deseado: ${deadline || "No indicado"}`,
    `Comuna o ubicación: ${location || "No indicada"}`,
    `Página de origen: ${page.path}`,
    "",
    "Resumen revisado por el visitante:",
    projectSummary,
  ].join("\n");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "N Proyectos <noreply@nproyectos.cl>",
      to: [salesContact.email],
      subject: "Nueva solicitud web · Asesor comercial N Proyectos",
      text: details,
      ...(email ? { replyTo: email } : {}),
    }, {
      idempotencyKey: `nproyectos-assistant-${submissionId}`,
    });

    if (error) {
      return NextResponse.json({ error: "No fue posible enviar la solicitud. Puedes intentarlo nuevamente o contactar directamente a ventas." }, { status: 502 });
    }

    return NextResponse.json({ sent: true });
  } catch {
    return NextResponse.json({ error: "No fue posible enviar la solicitud. Puedes intentarlo nuevamente o contactar directamente a ventas." }, { status: 502 });
  }
}
