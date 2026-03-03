import Image from "next/image";
import { siteAssets } from "@/components/siteAssets";

const sectors = ["Minería", "Manufactura", "Industria", "Construcción"];

const foundations = [
  {
    title: "Misión",
    text: "Desarrollar y suministrar elementos, piezas y partes para la elaboración de equipos y soluciones para la industria.",
  },
  {
    title: "Visión",
    text: "Establecer relaciones estratégicas y comerciales sólidas con nuestros clientes, aportando calidad y plazos competitivos.",
  },
];

const differentiators = [
  "Equipo profesional con experiencia real en maestranza y fabricación.",
  "Capacidad para trabajar desde el plano, el modelo o el requerimiento funcional.",
  "Enfoque en factibilidad técnica, optimización de materiales y entrega responsable.",
];

export default function About() {
  return (
    <section id="nosotros" className="section-padding">
      <div className="container-custom">
        <div className="grid gap-10 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="panel p-7 sm:p-10">
            <span className="eyebrow">Quiénes somos</span>
            <h2 className="mt-5 max-w-3xl font-heading text-4xl font-bold leading-tight text-steel-950 sm:text-5xl">
              Una maestranza enfocada en fabricar soluciones que funcionan en
              terreno.
            </h2>
            <p className="mt-6 text-lg leading-8 text-industrial-500">
              N Proyectos está compuesto por un grupo de profesionales con amplia
              experiencia en servicios de maestranza. El alcance de sus
              proyectos cubre clientes de distintos sectores productivos,
              entregando productos y servicios con una relación equilibrada entre
              precio, calidad y plazo.
            </p>
            <p className="mt-5 text-lg leading-8 text-industrial-500">
              El foco no es solo fabricar, sino acompañar cada requerimiento con
              criterio técnico, orden de producción y una ejecución capaz de
              sostener exigencias industriales reales.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {sectors.map((sector) => (
                <span key={sector} className="soft-chip">
                  {sector}
                </span>
              ))}
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {foundations.map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl border border-industrial-200 bg-industrial-50 p-6"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                    {item.title}
                  </p>
                  <p className="mt-4 text-base leading-7 text-industrial-500">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div className="panel overflow-hidden p-3">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[1.6rem]">
                <Image
                  src={siteAssets.pressMachine}
                  alt="Detalle de maquinaria para plegado y fabricación"
                  className="h-full w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>

            <div className="panel p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Qué espera el cliente
              </p>
              <div className="mt-5 space-y-4">
                {differentiators.map((item) => (
                  <div key={item} className="flex gap-3">
                    <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-accent" />
                    <p className="text-base leading-7 text-industrial-500">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="panel p-6">
                <p className="font-heading text-4xl font-bold text-steel-950">CAD</p>
                <p className="mt-3 text-sm leading-6 text-industrial-500">
                  Desarrollo técnico y soporte para preparar piezas con criterio
                  de fabricación.
                </p>
              </div>
              <div className="panel p-6">
                <p className="font-heading text-4xl font-bold text-steel-950">
                  Inventor
                </p>
                <p className="mt-3 text-sm leading-6 text-industrial-500">
                  Diseño, revisión y optimización para reducir desperdicio y
                  mejorar montaje.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
