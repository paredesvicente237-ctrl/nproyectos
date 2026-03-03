"use client";

import { useEffect, useRef, useState } from "react";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animated.current) {
          animated.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(interval);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );

    const el = ref.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="font-heading font-bold text-4xl sm:text-5xl text-accent">
      {count}
      {suffix}
    </div>
  );
}

const stats = [
  { value: 15, suffix: "+", label: "Años de Experiencia" },
  { value: 500, suffix: "+", label: "Proyectos Realizados" },
  { value: 50, suffix: "+", label: "Clientes Activos" },
  { value: 99, suffix: "%", label: "Tasa de Satisfacción" },
];

const values = [
  {
    title: "Precisión",
    description: "Cada corte y pliegue cumple con las tolerancias más exigentes del mercado.",
  },
  {
    title: "Cumplimiento",
    description: "Entregamos en tiempo y forma, respetando cada compromiso adquirido.",
  },
  {
    title: "Innovación",
    description: "Maquinaria de última generación y procesos en mejora continua.",
  },
];

export default function About() {
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
    <section id="nosotros" ref={sectionRef} className="section-padding bg-white relative">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Text */}
          <div className="reveal-left">
            <span className="text-accent font-heading font-semibold text-sm tracking-widest uppercase">
              Sobre Nosotros
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-steel-900 mt-3 mb-6">
              Más de 15 Años Transformando Acero
            </h2>
            <p className="text-industrial-500 text-lg leading-relaxed mb-6">
              En <strong className="text-steel-900">NProyectos</strong> nos especializamos
              en el corte y plegado de láminas de acero con tecnología de punta. Desde
              nuestros inicios, hemos trabajado con industrias de construcción, manufactura y
              diseño, entregando piezas que cumplen los estándares más altos de calidad.
            </p>
            <p className="text-industrial-500 text-lg leading-relaxed mb-8">
              Nuestro equipo combina experiencia técnica con un compromiso inquebrantable de
              servicio, garantizando resultados que superan expectativas.
            </p>

            {/* Values */}
            <div className="space-y-4">
              {values.map((value) => (
                <div key={value.title} className="flex gap-4">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2.5 shrink-0" />
                  <div>
                    <h4 className="font-heading font-semibold text-steel-900">
                      {value.title}
                    </h4>
                    <p className="text-industrial-400 text-sm">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Stats + Image placeholder */}
          <div className="reveal-right">
            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden mb-8">
              <img
                src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80"
                alt="Taller de corte y plegado de acero"
                className="aspect-[4/3] w-full object-cover"
              />
              {/* Accent corner */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10" />
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-accent/10" />
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-industrial-50 rounded-xl p-6 text-center"
                >
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  <p className="text-industrial-400 text-sm mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
