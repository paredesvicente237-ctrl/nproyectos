"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { companyInfo } from "@/components/siteData";

const services = [
  "Área Servicios",
  "Área Fabricación",
  "Área Acústica y Ruido",
  "Área Proyectos",
  "Múltiples requerimientos",
];

const contactCards = [
  {
    label: "Teléfono",
    value: companyInfo.phoneDisplay,
    href: companyInfo.phoneHref,
  },
  {
    label: "Correo",
    value: companyInfo.email,
    href: companyInfo.emailHref,
  },
  {
    label: "Dirección",
    value: companyInfo.address,
    href: "#contacto",
  },
  {
    label: "Canal directo",
    value: "Atención rápida por WhatsApp",
    href: companyInfo.whatsappHref,
  },
];

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState<FormState>(initialState);
  const [feedback, setFeedback] = useState("");

  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setFeedback("Completa nombre, correo y el detalle del requerimiento.");
      return;
    }

    const subject = `Solicitud de cotización - ${
      form.service || "Proyecto en acero"
    }`;
    const body = [
      `Nombre: ${form.name}`,
      `Empresa: ${form.company || "No indicada"}`,
      `Correo: ${form.email}`,
      `Teléfono: ${form.phone || "No indicado"}`,
      `Servicio: ${form.service || "No especificado"}`,
      "",
      "Detalle del requerimiento:",
      form.message,
    ].join("\n");

    const mailtoUrl = `${companyInfo.emailHref}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setFeedback(
      "Se abrirá tu cliente de correo con la información prellenada para enviar la solicitud."
    );
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contacto" className="section-padding">
      <div className="container-custom grid gap-8 xl:grid-cols-[1.02fr_0.98fr]">
        <div className="dark-panel p-7 sm:p-10">
          <span className="eyebrow-dark">Contacto y cotizaciones</span>
          <h2 className="mt-5 font-heading text-4xl font-bold leading-tight text-white sm:text-5xl">
            Envía tu solicitud con los datos del proyecto y cotiza con contexto
            técnico.
          </h2>
          <p className="mt-6 text-lg leading-8 text-industrial-200">
            El formulario prepara un correo con la información completa del
            requerimiento para que puedas enviarlo de inmediato. Si prefieres una
            respuesta más rápida, también queda disponible el acceso directo a
            WhatsApp.
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="form-label-dark">
                  Nombre y cargo
                </label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  className="form-input-dark"
                  placeholder="Nombre completo"
                />
              </div>
              <div>
                <label htmlFor="company" className="form-label-dark">
                  Empresa
                </label>
                <input
                  id="company"
                  name="company"
                  value={form.company}
                  onChange={onChange}
                  className="form-input-dark"
                  placeholder="Razón social o empresa"
                />
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="email" className="form-label-dark">
                  Correo
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  className="form-input-dark"
                  placeholder="correo@empresa.cl"
                />
              </div>
              <div>
                <label htmlFor="phone" className="form-label-dark">
                  Teléfono
                </label>
                <input
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={onChange}
                  className="form-input-dark"
                  placeholder="+56 9 ..."
                />
              </div>
            </div>

            <div>
              <label htmlFor="service" className="form-label-dark">
                Tipo de requerimiento
              </label>
              <select
                id="service"
                name="service"
                value={form.service}
                onChange={onChange}
                className="form-input-dark"
              >
                <option value="">Selecciona un área</option>
                {services.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="message" className="form-label-dark">
                Detalle del proyecto
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={form.message}
                onChange={onChange}
                className="form-input-dark resize-none"
                placeholder="Describe piezas, cantidades, material, espesores, plazos o cualquier dato técnico relevante."
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button type="submit" className="btn-primary">
                Preparar correo de cotización
              </button>
              <a
                href={companyInfo.whatsappHref}
                className="btn-secondary border-white/15 text-white hover:border-accent hover:text-accent"
              >
                Escribir por WhatsApp
              </a>
            </div>

            {feedback ? (
              <p className="text-sm leading-6 text-industrial-300">{feedback}</p>
            ) : null}
          </form>
        </div>

        <div className="space-y-6">
          <div className="panel p-7 sm:p-8">
            <span className="eyebrow">Información directa</span>
            <div className="mt-6 space-y-4">
              {contactCards.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block rounded-3xl border border-industrial-200 bg-industrial-50 p-5 transition-colors hover:border-accent/50 hover:bg-white"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                    {item.label}
                  </p>
                  <p className="mt-3 text-base font-semibold text-steel-950">
                    {item.value}
                  </p>
                </a>
              ))}
            </div>
          </div>

          <div className="panel overflow-hidden p-3">
            <div className="overflow-hidden rounded-[1.6rem]">
              <iframe
                src={companyInfo.mapsEmbed}
                title={`Mapa de ${companyInfo.shortName}`}
                width="100%"
                height="360"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
