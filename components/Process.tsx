"use client";

import { useEffect, useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Consulta",
    description:
      "Nos cuentas tu proyecto y necesidades. Analizamos planos, especificaciones y volúmenes requeridos.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Diseño",
    description:
      "Preparamos los archivos técnicos y optimizamos el diseño para maximizar eficiencia y reducir desperdicio.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Producción",
    description:
      "Ejecutamos el corte y/o plegado con maquinaria CNC de alta precisión, supervisando cada etapa del proceso.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Entrega",
    description:
      "Control de calidad final y entrega puntual. Garantizamos que cada pieza cumple con las especificaciones acordadas.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
];

export default function Process() {
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
      observer.observe(el);
      el.querySelectorAll(".reveal").forEach((child) => observer.observe(child));
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="proceso"
      ref={sectionRef}
      className="section-padding bg-industrial-50 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 geometric-lines opacity-30" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="relative container-custom">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span className="text-accent font-heading font-semibold text-sm tracking-widest uppercase">
            Cómo Trabajamos
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-steel-900 mt-3 mb-4">
            Proceso Simple y Eficiente
          </h2>
          <p className="text-industrial-500 max-w-2xl mx-auto text-lg">
            De la idea a la pieza terminada en cuatro pasos claros.
          </p>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="reveal relative"
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* Connector line (not on last) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-full h-px border-t border-dashed border-industrial-300 z-0" />
              )}

              <div className="relative bg-white border border-industrial-200 rounded-2xl p-8 hover:shadow-lg hover:border-accent/30 transition-all group">
                {/* Number */}
                <div className="font-heading font-bold text-5xl text-industrial-100 absolute top-4 right-6 group-hover:text-accent/15 transition-colors">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center mb-5 group-hover:bg-accent group-hover:text-white transition-colors">
                  {step.icon}
                </div>

                <h3 className="font-heading font-bold text-xl text-steel-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-industrial-500 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
