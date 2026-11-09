"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import { companyInfo, salesContact } from "@/components/siteData";
import TrackedContactLink from "@/components/TrackedContactLink";
import { trackGaEvent } from "@/lib/analytics";

const services = [
  "Fabricación metalmecánica",
  "Corte y plegado de planchas",
  "Soldadura MIG/TIG",
  "Estructuras y soportes metálicos",
  "Control acústico industrial",
  "Otro requerimiento industrial",
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
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [submissionId, setSubmissionId] = useState("");
  const [website, setWebsite] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setSubmissionId("");
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setFeedback("Completa nombre, correo y el detalle del requerimiento.");
      return;
    }
    if (!privacyConsent) {
      setFeedback("Autoriza el envío de tus datos para que ventas pueda responderte.");
      return;
    }

    setIsSubmitting(true);
    setFeedback("Enviando cotización...");
    const currentSubmissionId = submissionId || globalThis.crypto.randomUUID();
    setSubmissionId(currentSubmissionId);

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, privacyConsent, submissionId: currentSubmissionId, website }),
      });
      const result = await response.json().catch(() => null) as { sent?: unknown; simulated?: unknown; error?: unknown } | null;

      if (response.ok && result?.sent === true) {
        if (result.simulated !== true) {
          trackGaEvent("generate_lead", {
            form_id: "contacto",
            lead_method: "web_form",
            service_type: form.service || "no_especificado",
          });
        }
        setFeedback(result.simulated === true ? "simulated" : "success");
        setForm(initialState);
        setPrivacyConsent(false);
        setSubmissionId("");
        setWebsite("");
      } else {
        setFeedback(typeof result?.error === "string" ? result.error : "Hubo un error al enviar el formulario. Inténtalo más tarde.");
      }
    } catch {
      setFeedback("Error de conexión. Por favor, revisa tu internet o intenta más tarde.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="section-padding bg-[#142737] text-white">
      <div className="container-custom">
        <div className="max-w-3xl">
          <span className="eyebrow !text-blue-200 before:!bg-blue-400">Contacto comercial</span>
          <h2 className="section-title !text-white">
            Cuéntanos qué necesitas fabricar.
          </h2>
          <p className="section-copy !text-white/70">
            Comparte la información que tengas. Revisaremos el requerimiento y te contactaremos para avanzar con la cotización.
          </p>
        </div>

        <div className="mt-12">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            {/* Form Container */}
            <div className="relative overflow-hidden bg-white p-5 shadow-[0_18px_60px_rgba(4,19,30,.18)] sm:p-8 lg:p-10">
              
              {/* Success Message Overlay */}
              {(feedback === "success" || feedback === "simulated") && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/95 p-8 text-center animate-in fade-in zoom-in duration-500">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-md bg-green-50 text-green-700">
                    <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-900">{feedback === "simulated" ? "Prueba completada" : "Mensaje enviado"}</h3>
                  <p className="mt-2 text-lg text-slate-600">
                    {feedback === "simulated"
                      ? "Esta vista no envió ningún correo. En producción, tu requerimiento se enviará al equipo comercial."
                      : "Gracias por contactarnos. Hemos recibido tu requerimiento y te contactaremos a la brevedad."}
                  </p>
                  <button 
                    onClick={() => setFeedback("")}
                    className="mt-8 text-sm font-semibold text-navy-600 hover:text-navy-700 underline underline-offset-4"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              )}

              <form onSubmit={onSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="form-label">Nombre *</label>
                    <input
                      id="name" name="name" value={form.name}
                      onChange={onChange} className="form-input" maxLength={100}
                      placeholder="Nombre completo"
                      autoComplete="name"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="form-label">Empresa</label>
                    <input
                      id="company" name="company" value={form.company}
                      onChange={onChange} className="form-input" maxLength={120}
                      placeholder="Razón social"
                      autoComplete="organization"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="email" className="form-label">Correo *</label>
                    <input
                      id="email" name="email" type="email" value={form.email}
                      onChange={onChange} className="form-input" maxLength={254}
                      placeholder="correo@empresa.cl"
                      autoComplete="email"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="form-label">Teléfono</label>
                    <input
                      id="phone" name="phone" type="tel" value={form.phone}
                      onChange={onChange} className="form-input" maxLength={30}
                      placeholder="+56 9 ..."
                      autoComplete="tel"
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
                    onChange={onChange} className="form-input resize-none" maxLength={5000}
                    placeholder="Describe piezas, cantidades, material, espesores, plazos..."
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
                  <label htmlFor="contact-website">Dejar vacío</label>
                  <input id="contact-website" tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} />
                </div>

                <label className="flex items-start gap-2.5 text-sm leading-6 text-slate-600">
                  <input type="checkbox" required checked={privacyConsent} onChange={(event) => setPrivacyConsent(event.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-blue-700" />
                  <span>Autorizo enviar estos datos al equipo comercial de N Proyectos para que responda mi consulta. <Link href="/privacidad" className="font-semibold text-blue-800 underline underline-offset-2">Lee la política de privacidad</Link>.</span>
                </label>

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
                  {isSubmitting ? "Enviando..." : "Solicitar cotización"}
                </button>

                {feedback && (
                  <p role="status" aria-live="polite" className={`text-center text-sm ${feedback.includes("error") || feedback.includes("Completa") || feedback.includes("Autoriza") ? "font-medium text-red-700" : "text-slate-600"}`}>{feedback}</p>
                )}
              </form>
            </div>

            {/* Contact info sidebar */}
            <div className="flex flex-col gap-3">
              <div className="bg-[#252a2d] p-6 text-white sm:p-7">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-300">Contacto comercial</p>
                <div className="mt-4 flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center border border-white/20 bg-white/10 text-lg font-semibold">A</span>
                  <div>
                    <p className="text-lg font-semibold text-white">{salesContact.name}</p>
                    <p className="text-xs text-slate-400">Ejecutivo de ventas</p>
                  </div>
                </div>
                <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <TrackedContactLink channel="whatsapp" href={salesContact.whatsappHref} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center justify-center border border-blue-400/40 bg-blue-600 px-3 text-xs font-semibold text-white hover:bg-blue-500">
                    WhatsApp
                  </TrackedContactLink>
                  <TrackedContactLink channel="email" href={salesContact.emailHref} className="flex min-h-11 items-center justify-center border border-white/20 px-3 text-xs font-semibold text-white hover:bg-white/10">
                    Enviar correo
                  </TrackedContactLink>
                </div>
                <div className="mt-4 space-y-1 text-sm text-slate-300">
                  <TrackedContactLink channel="phone" href={salesContact.phoneHref} className="block hover:text-white">{salesContact.phoneDisplay}</TrackedContactLink>
                  <TrackedContactLink channel="email" href={salesContact.emailHref} className="block break-all hover:text-white">{salesContact.email}</TrackedContactLink>
                </div>
              </div>

              <div className="flex items-start gap-4 border border-white/15 bg-[#252a2d] p-5 text-white">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-blue-50 text-blue-700">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-medium text-white/60">Dirección</p>
                  <p className="mt-1 text-base font-semibold text-white">{companyInfo.address}</p>
                </div>
              </div>

              {/* Map */}
              <div className="min-h-[220px] flex-1 overflow-hidden border border-white/15 bg-white">
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
