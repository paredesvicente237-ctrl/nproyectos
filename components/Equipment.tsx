"use client";
import Image from "next/image";
import { siteAssets } from "@/components/siteAssets";
import { useState, useEffect } from "react";

const equipment = [
  { name: "Corte Láser", spec: "" },
  { name: "Corte Guillotina", spec: "" },
  { name: "Plegadoras", spec: "" },
  { name: "Curvado de Tubos", spec: "" },
  { name: "Soldadura MIG/TIG", spec: "" },
  { name: "Soldadura Láser", spec: "" },
];

const materials = [
  "Acero carbono", "Acero inoxidable", "Galvanizado", "Diamantado",
  "Perforado", "Bronce", "Aluminio", "Cobre",
];

const carouselImages = [
  { src: siteAssets.goodGuillotine, alt: "Corte industrial" },
  { src: siteAssets.fotobuenax1, alt: "Maquinaria de precisión" },
  { src: siteAssets.fotobuenax2, alt: "Instalaciones N Proyectos" },
];

export default function Equipment() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="equipamiento" className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          {/* Info side */}
          <div>
            <span className="eyebrow">Equipamiento</span>
            <h2 className="mt-4 text-4xl font-extrabold sm:text-5xl">
              Capacidad instalada
            </h2>
            <p className="mt-4 text-lg text-slate-500">
              Personal calificado y certificado con amplia experiencia en
              trabajos de armado y soldadura.
            </p>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {equipment.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-5 py-4"
                >
                  <span className="text-sm font-medium text-slate-700">
                    {item.name}
                  </span>
                  {item.spec && (
                    <span className="rounded-lg bg-navy-50 px-3 py-1 text-sm font-bold text-navy-600">
                      {item.spec}
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl bg-slate-50 p-6">
              <p className="text-sm font-bold text-slate-900">
                Materiales de trabajo
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {materials.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-medium text-slate-600"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Carousel */}
          <div className="group relative">
            <div className="overflow-hidden rounded-3xl shadow-2xl">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {carouselImages.map((image, idx) => (
                  <div key={idx} className="min-w-full">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      className="aspect-[4/3] w-full object-cover lg:aspect-square"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
              {carouselImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === idx ? "w-8 bg-white" : "w-2 bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
