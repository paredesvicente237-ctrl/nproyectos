"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (el) el.classList.add("visible");
  }, []);

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="reveal relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-steel-900">
        {/* Real photo background */}
        <img
          src="https://images.unsplash.com/photo-1504917595217-d4dc5ede4c21?w=1920&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-steel-900/90 via-steel-800/80 to-steel-900/90" />
        {/* Geometric pattern */}
        <div className="absolute inset-0 geometric-lines opacity-30" />
        {/* Diagonal accent */}
        <div className="absolute -right-32 -top-32 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute -left-32 -bottom-32 w-[400px] h-[400px] bg-accent/3 rounded-full blur-3xl" />
      </div>

      <div className="relative container-custom section-padding w-full">
        <div className="max-w-3xl">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-sm text-industrial-200 font-medium">
              Precisión Industrial
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6">
            Corte y Plegado{" "}
            <span className="text-accent">de Acero</span>{" "}
            con Precisión Absoluta
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-industrial-300 max-w-2xl mb-10 leading-relaxed">
            Transformamos láminas de acero en piezas exactas para tu industria.
            Corte láser, plasma y plegado CNC con la más alta tecnología y
            cumplimiento garantizado.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contacto"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white font-heading font-semibold px-8 py-4 rounded-lg transition-all hover:shadow-lg hover:shadow-accent/25 text-lg"
            >
              Solicitar Cotización
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
            <a
              href="#servicios"
              className="inline-flex items-center justify-center gap-2 border border-white/20 text-white hover:bg-white/10 font-heading font-semibold px-8 py-4 rounded-lg transition-all text-lg"
            >
              Nuestros Servicios
            </a>
          </div>

          {/* Stats bar */}
          <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg">
            {[
              { value: "15+", label: "Años de Experiencia" },
              { value: "500+", label: "Proyectos Realizados" },
              { value: "99%", label: "Clientes Satisfechos" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-heading font-bold text-2xl sm:text-3xl text-accent">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-industrial-400 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
