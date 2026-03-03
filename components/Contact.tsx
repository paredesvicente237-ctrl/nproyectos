"use client";

import { useEffect, useRef } from "react";

const contactInfo = [
  {
    label: "Teléfono",
    value: "+56 2 2345 6789",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    label: "Email",
    value: "contacto@nproyectos.cl",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "Ubicación",
    value: "Las Condes, Santiago, Chile",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: "Horario",
    value: "Lun - Vie: 8:00 - 17:00",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );

    const el = sectionRef.current;
    if (el) {
      el.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((child) =>
        observer.observe(child)
      );
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contacto" ref={sectionRef} className="section-padding bg-white relative">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span className="text-accent font-heading font-semibold text-sm tracking-widest uppercase">
            Contacto
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-steel-900 mt-3 mb-4">
            Solicita tu Cotización
          </h2>
          <p className="text-industrial-500 max-w-2xl mx-auto text-lg">
            Cuéntanos sobre tu proyecto y te responderemos en menos de 24 horas
            con una propuesta detallada.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Form */}
          <div className="lg:col-span-3 reveal-left">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="bg-industrial-50 rounded-2xl p-8"
            >
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-steel-900 mb-2"
                  >
                    Nombre Completo
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Tu nombre"
                    className="w-full px-4 py-3 rounded-lg border border-industrial-200 bg-white text-steel-900 placeholder:text-industrial-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-shadow"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-steel-900 mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    className="w-full px-4 py-3 rounded-lg border border-industrial-200 bg-white text-steel-900 placeholder:text-industrial-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-shadow"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-steel-900 mb-2"
                  >
                    Teléfono
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+56 2 ..."
                    className="w-full px-4 py-3 rounded-lg border border-industrial-200 bg-white text-steel-900 placeholder:text-industrial-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-shadow"
                  />
                </div>
                <div>
                  <label
                    htmlFor="service"
                    className="block text-sm font-medium text-steel-900 mb-2"
                  >
                    Servicio
                  </label>
                  <select
                    id="service"
                    className="w-full px-4 py-3 rounded-lg border border-industrial-200 bg-white text-steel-900 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-shadow"
                  >
                    <option value="">Seleccionar servicio</option>
                    <option value="laser">Corte Láser</option>
                    <option value="plasma">Corte Plasma</option>
                    <option value="plegado">Plegado CNC</option>
                    <option value="multiple">Múltiples Servicios</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-steel-900 mb-2"
                >
                  Mensaje / Detalles del Proyecto
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Describe tu proyecto, materiales, cantidades, plazos..."
                  className="w-full px-4 py-3 rounded-lg border border-industrial-200 bg-white text-steel-900 placeholder:text-industrial-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-shadow resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-accent hover:bg-accent-hover text-white font-heading font-semibold py-4 rounded-lg transition-all hover:shadow-lg hover:shadow-accent/25 text-lg"
              >
                Enviar Solicitud
              </button>
            </form>
          </div>

          {/* Contact info */}
          <div className="lg:col-span-2 reveal-right">
            <div className="space-y-6">
              {contactInfo.map((info) => (
                <div
                  key={info.label}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-industrial-50 transition-colors"
                >
                  <div className="w-10 h-10 bg-accent/10 text-accent rounded-lg flex items-center justify-center shrink-0">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-sm text-industrial-400">{info.label}</p>
                    <p className="font-medium text-steel-900">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Google Maps */}
            <div className="mt-8 rounded-2xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26632.98!2d-70.5766!3d-33.4117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf6fccd1e045%3A0x636f7b53de9eba35!2sLas%20Condes%2C%20Regi%C3%B3n%20Metropolitana%2C%20Chile!5e0!3m2!1ses!2scl!4v1700000000000!5m2!1ses!2scl"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
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
