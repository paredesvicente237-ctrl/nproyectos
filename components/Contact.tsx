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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setFeedback("Completa nombre, correo y el detalle del requerimiento.");
      return;
    }

    setIsSubmitting(true);
    setFeedback("Enviando cotización...");

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setFeedback("¡Gracias! Hemos recibido tu requerimiento y te contactaremos pronto.");
        setForm(initialState);
      } else {
        const errorData = await response.json();
        setFeedback(errorData.error?.message || "Hubo un error al enviar el formulario. Inténtalo más tarde.");
      }
    } catch (error) {
      setFeedback("Error de conexión. Por favor, revisa tu internet o intenta más tarde.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center">
          <span className="eyebrow mx-auto justify-center">Contacto</span>
          <h2 className="mt-4 text-4xl font-extrabold sm:text-5xl">
            Cotiza tu proyecto
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-500">
            Envía los datos de tu requerimiento y te contactamos con una
            propuesta técnica.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            {/* Form */}
            <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/50 sm:p-10">
              <form onSubmit={onSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="form-label">Nombre *</label>
                    <input
                      id="name" name="name" value={form.name}
                      onChange={onChange} className="form-input"
                      placeholder="Nombre completo"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="form-label">Empresa</label>
                    <input
                      id="company" name="company" value={form.company}
                      onChange={onChange} className="form-input"
                      placeholder="Razón social"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="email" className="form-label">Correo *</label>
                    <input
                      id="email" name="email" type="email" value={form.email}
                      onChange={onChange} className="form-input"
                      placeholder="correo@empresa.cl"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="form-label">Teléfono</label>
                    <input
                      id="phone" name="phone" value={form.phone}
                      onChange={onChange} className="form-input"
                      placeholder="+56 9 ..."
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="form-label">Tipo de requerimiento</label>
                  <select
                    id="service" name="service" value={form.service}
                    onChange={onChange} className="form-input"
                    disabled={isSubmitting}
                  >
                    <option value="">Selecciona un área</option>
                    {services.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="form-label">Detalle del proyecto *</label>
                  <textarea
                    id="message" name="message" rows={4} value={form.message}
                    onChange={onChange} className="form-input resize-none"
                    placeholder="Describe piezas, cantidades, material, espesores, plazos..."
                    disabled={isSubmitting}
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn-primary w-full !py-4 !text-base disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  <svg className={`h-5 w-5 ${isSubmitting ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    {isSubmitting ? (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    )}
                  </svg>
                  {isSubmitting ? "Enviando..." : "Enviar Cotización"}
                </button>

                {feedback && (
                  <p className="text-center text-sm text-slate-500">{feedback}</p>
                )}
              </form>
            </div>

            {/* Contact info sidebar */}
            <div className="flex flex-col gap-5">
              <a
                href={companyInfo.phoneHref}
                className="group card flex items-start gap-4"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy-600 transition-colors group-hover:bg-navy-600 group-hover:text-white">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Teléfono</p>
                  <p className="mt-1 text-base font-semibold text-slate-900">{companyInfo.phoneDisplay}</p>
                </div>
              </a>

              <a
                href={companyInfo.emailHref}
                className="group card flex items-start gap-4"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy-600 transition-colors group-hover:bg-navy-600 group-hover:text-white">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Correo</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900 break-all">{companyInfo.email}</p>
                </div>
              </a>

              <div className="card flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy-600">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Dirección</p>
                  <p className="mt-1 text-base font-semibold text-slate-900">{companyInfo.address}</p>
                </div>
              </div>

              {/* Map */}
              <div className="flex-1 overflow-hidden rounded-2xl border border-slate-100 shadow-sm">
                <iframe
                  src={companyInfo.mapsEmbed}
                  title={`Mapa de ${companyInfo.shortName}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "220px" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
