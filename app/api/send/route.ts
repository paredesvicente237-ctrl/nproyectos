import { NextResponse } from "next/server";
import { Resend } from "resend";
import { salesContact } from "@/components/siteData";
import { isPublicApiRateLimited, isSameOriginRequest } from "@/lib/publicApiSecurity";

export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 12_000;

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
  return !phone || (/^[+()\d\s.-]{8,30}$/.test(phone) && digits.length >= 8);
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Origen no autorizado." }, { status: 403 });
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
    return NextResponse.json({ sent: true, simulated: true });
  }

  const submissionId = cleanLine(parsedBody.submissionId, 36);
  const name = cleanLine(parsedBody.name, 100);
  const company = cleanLine(parsedBody.company, 120);
  const email = cleanLine(parsedBody.email, 254).toLowerCase();
  const phone = cleanLine(parsedBody.phone, 30);
  const service = cleanLine(parsedBody.service, 120);
  const message = cleanParagraph(parsedBody.message, 5_000);

  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(submissionId)) {
    return NextResponse.json({ error: "No se pudo validar el formulario. Recarga la página e inténtalo nuevamente." }, { status: 400 });
  }
  if (!name || !email || !message || parsedBody.privacyConsent !== true) {
    return NextResponse.json({ error: "Completa los campos obligatorios y autoriza el envío de tus datos a ventas." }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Revisa el formato del correo electrónico." }, { status: 400 });
  }
  if (!isValidPhone(phone)) {
    return NextResponse.json({ error: "Revisa el formato del teléfono." }, { status: 400 });
  }

  try {
    if (await isPublicApiRateLimited(request, "contact", 4, 60 * 60)) {
      return NextResponse.json({ error: "Se alcanzó el límite temporal de solicitudes. Comunícate directamente con ventas." }, { status: 429 });
    }
  } catch {
    return NextResponse.json({ error: "No fue posible validar la solicitud. Inténtalo nuevamente más tarde." }, { status: 503 });
  }

  // Never let a Preview or local test deliver visitor data to the real sales mailbox.
  if (process.env.VERCEL_ENV !== "production") {
    return NextResponse.json({ sent: true, simulated: true });
  }

  const apiKey = process.env.RESEND_API_KEY ?? process.env.Resend;
  if (!apiKey) {
    return NextResponse.json({ error: "El servicio de correo no está configurado en este momento." }, { status: 503 });
  }

  const details = [
    `Nombre: ${name}`,
    `Empresa: ${company || "No indicada"}`,
    `Correo: ${email}`,
    `Teléfono: ${phone || "No indicado"}`,
    `Servicio: ${service || "No especificado"}`,
    "",
    "Mensaje:",
    message,
  ].join("\n");

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from: "N Proyectos <noreply@nproyectos.cl>",
      to: [salesContact.email],
      subject: `Nuevo requerimiento web · ${service || "General"}`,
      replyTo: email,
      text: details,
    }, {
      idempotencyKey: `nproyectos-contact-${submissionId}`,
    });

    if (error) {
      return NextResponse.json({ error: "No fue posible enviar el formulario. Inténtalo más tarde o contacta directamente a ventas." }, { status: 502 });
    }

    return NextResponse.json({ sent: true });
  } catch {
    return NextResponse.json({ error: "No fue posible enviar el formulario. Inténtalo más tarde o contacta directamente a ventas." }, { status: 502 });
  }
}
