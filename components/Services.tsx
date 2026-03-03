"use client";

import { useEffect, useRef } from "react";

const services = [
  {
    title: "Corte Láser",
    description:
      "Cortes de alta precisión en acero con tolerancias mínimas. Ideal para piezas complejas, grabados y acabados finos que requieren exactitud milimétrica.",
    image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&q=80",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    features: ["Tolerancia ±0.1mm", "Acero hasta 20mm", "Acabado fino"],
  },
  {
    title: "Corte Plasma",
    description:
      "Corte de alto rendimiento para espesores mayores. Proceso rápido y eficiente para producciones de gran volumen con excelente relación costo-beneficio.",
    image: "https://images.unsplash.com/photo-1617791160536-598cf32026fb?w=600&q=80",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
      </svg>
    ),
    features: ["Espesores hasta 50mm", "Alta velocidad", "Gran volumen"],
  },
  {
    title: "Plegado CNC",
    description:
      "Doblado de láminas con control numérico computarizado para ángulos exactos y repetibilidad perfecta en series de producción.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    features: ["Precisión angular ±0.5°", "Hasta 3m de largo", "Series repetibles"],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
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
      id="servicios"
      ref={sectionRef}
      className="section-padding bg-metal-texture relative"
    >
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span className="text-accent font-heading font-semibold text-sm tracking-widest uppercase">
            Nuestros Servicios
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-steel-900 mt-3 mb-4">
            Soluciones de Corte y Plegado
          </h2>
          <p className="text-industrial-500 max-w-2xl mx-auto text-lg">
            Contamos con tecnología de punta para ofrecer resultados exactos en
            cada proyecto, sin importar su complejidad.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="reveal group bg-white rounded-2xl p-8 shadow-sm border border-industrial-100 hover:shadow-xl hover:border-accent/30 hover:-translate-y-1 transition-all duration-300"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-48 -mx-8 -mt-8 mb-6 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                {/* Icon badge */}
                <div className="absolute bottom-3 left-3 w-12 h-12 bg-accent text-white rounded-xl flex items-center justify-center group-hover:bg-steel-900 group-hover:text-accent transition-colors shadow-lg">
                  {service.icon}
                </div>
              </div>

              <h3 className="font-heading font-bold text-xl text-steel-900 mb-3">
                {service.title}
              </h3>

              <p className="text-industrial-500 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-industrial-400"
                  >
                    <svg
                      className="w-4 h-4 text-accent shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
