"use client";

import { useEffect, useRef } from "react";

const projects = [
  {
    title: "Estructura Metálica Industrial",
    category: "Corte Láser",
    image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=600&q=80",
  },
  {
    title: "Piezas de Precisión CNC",
    category: "Plegado CNC",
    image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&q=80",
  },
  {
    title: "Paneles Arquitectónicos",
    category: "Corte Plasma",
    image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=600&q=80",
  },
  {
    title: "Componentes Maquinaria",
    category: "Corte Láser",
    image: "https://images.unsplash.com/photo-1617791160536-598cf32026fb?w=600&q=80",
  },
  {
    title: "Ductos de Ventilación",
    category: "Plegado CNC",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80",
  },
  {
    title: "Soportes Estructurales",
    category: "Corte Plasma",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
  },
];

export default function Gallery() {
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
      id="proyectos"
      ref={sectionRef}
      className="section-padding bg-metal-texture relative"
    >
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span className="text-accent font-heading font-semibold text-sm tracking-widest uppercase">
            Portafolio
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-steel-900 mt-3 mb-4">
            Proyectos Realizados
          </h2>
          <p className="text-industrial-500 max-w-2xl mx-auto text-lg">
            Una muestra de los trabajos que hemos entregado con la calidad y
            precisión que nos caracterizan.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className="reveal group relative rounded-2xl overflow-hidden cursor-pointer"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Project image */}
              <div className="aspect-[4/3] bg-steel-900 relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-steel-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg
                        className="w-5 h-5 text-steel-900"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                        />
                      </svg>
                    </div>
                    <h4 className="font-heading font-semibold text-white text-sm">
                      {project.title}
                    </h4>
                  </div>
                </div>
              </div>

              {/* Caption */}
              <div className="p-4 bg-white">
                <span className="text-xs text-accent font-semibold uppercase tracking-wider">
                  {project.category}
                </span>
                <h4 className="font-heading font-semibold text-steel-900 mt-1">
                  {project.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
