import Image from "next/image";
import { siteAssets } from "@/components/siteAssets";

const specialties = [
  {
    title: "Área Servicios",
    description:
      "Suministro de piezas y partes con posibilidad de incluir material, diseño y desarrollo según el requerimiento.",
  },
  {
    title: "Área Fabricación",
    description:
      "Fabricación de productos en acero carbono, inoxidable, galvanizado y otros materiales según especificación.",
  },
  {
    title: "Área Acústica y Ruido",
    description:
      "Diseño y elaboración de silenciadores, atenuadores, paneles y soluciones orientadas al control acústico.",
  },
  {
    title: "Área Proyectos",
    description:
      "Apoyo técnico en CAD / INVENTOR, revisión de factibilidad y optimización de materiales para producción.",
  },
];

const workCards = [
  {
    title: "Corte Láser / Corte Guillotina / Plegado",
    description:
      "Perfiles, ángulos, canales, cubre juntas, mobiliario inoxidable, cubiertas, bandejas, tapas, repisas, techumbres, paneles y ductería.",
    image: siteAssets.guillotineDetail,
  },
  {
    title: "Armado y Soldadura",
    description:
      "Fabricación de campanas, transiciones, piping para gases, silenciadores de ruido, celosías, equipos industriales, gabinetes, cabinas, puertas y portones acústicos.",
    image: siteAssets.weldingWork,
  },
];

export default function Services() {
  return (
    <section id="especialidades" className="section-padding">
      <div className="container-custom space-y-8">
        <div className="panel p-7 sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <span className="eyebrow">Especialidades</span>
              <h2 className="mt-5 font-heading text-4xl font-bold leading-tight text-steel-950 sm:text-5xl">
                Capacidades diseñadas para resolver fabricación, montaje y
                requerimientos especiales.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-industrial-500">
              La propuesta combina suministro, fabricación, acústica industrial y
              soporte técnico para que el proyecto avance desde la necesidad
              inicial hasta la pieza terminada.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
            {specialties.map((item, index) => (
              <div
                key={item.title}
                className="rounded-3xl border border-industrial-200 bg-industrial-50 p-6"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="font-heading text-2xl font-semibold text-steel-950">
                    {item.title}
                  </p>
                  <span className="font-heading text-4xl font-bold text-industrial-200">
                    0{index + 1}
                  </span>
                </div>
                <p className="mt-4 text-base leading-7 text-industrial-500">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          {workCards.map((item) => (
            <div key={item.title} className="panel overflow-hidden p-3">
              <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="relative min-h-[16rem] overflow-hidden rounded-[1.6rem]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                    sizes="(max-width: 1280px) 100vw, 30vw"
                  />
                </div>
                <div className="p-3 sm:p-5">
                  <span className="eyebrow">Trabajos</span>
                  <h3 className="mt-4 font-heading text-3xl font-bold text-steel-950">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-lg leading-8 text-industrial-500">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
