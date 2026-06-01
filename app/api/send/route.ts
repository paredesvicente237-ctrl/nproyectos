import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.Resend);

export async function POST(request: Request) {
  try {
    const { name, company, email, phone, service, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios (nombre, email, mensaje)" },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "N Proyectos <onboarding@resend.dev>", // Cambiar a dominio verificado si existe
      to: ["sebaceronu@gmail.com"],
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
