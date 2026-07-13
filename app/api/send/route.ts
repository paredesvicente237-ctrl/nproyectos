import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY ?? process.env.Resend;

    if (!apiKey) {
      return NextResponse.json(
        { error: "El servicio de correo no está configurado" },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const { name, company, email, phone, service, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios (nombre, email, mensaje)" },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "N Proyectos <noreply@nproyectos.cl>",
      to: ["nproyectosltda@gmail.com"],
      subject: `Nuevo requerimiento: ${service || "General"}`,
      replyTo: email,
      text: `
        Nombre: ${name}
        Empresa: ${company || "No indicada"}
        Email: ${email}
        Teléfono: ${phone || "No indicado"}
        Servicio: ${service || "No especificado"}

        Mensaje:
        ${message}
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ message: "Email enviado con éxito", data });
  } catch (err) {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
