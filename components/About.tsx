import Image from "next/image";
import { Clock3, DraftingCompass, ShieldCheck, TrendingDown } from "lucide-react";
import { siteAssets } from "@/components/siteAssets";

const values = [
  { icon: ShieldCheck, title: "Personal certificado", text: "Equipo calificado en armado y soldadura industrial." },
  { icon: DraftingCompass, title: "Ingeniería aplicada", text: "Trabajamos desde diseños, planos, prototipos o requerimientos funcionales." },
  { icon: Clock3, title: "Plazos competitivos", text: "Producción planificada y seguimiento durante cada etapa." },
  { icon: TrendingDown, title: "Menor desperdicio", text: "Optimizamos materiales con foco en factibilidad y reducción de merma." },
];

export default function About() {
  return (
    <section id="nosotros" className="section-padding bg-slate-50">
      <div className="container-custom grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <span className="eyebrow">Quiénes somos</span>
          <h2 className="section-title">Experiencia técnica convertida en soluciones fabricables.</h2>
          <p className="section-copy">N Proyectos reúne profesionales con experiencia en servicios metalmecánicos para minería, manufactura, construcción e industria. Abordamos cada encargo desde su requerimiento técnico hasta la entrega.</p>
          <a href="/#contacto" className="btn-outline mt-8">Conversemos sobre tu proyecto</a>
        </div>

        <div>
          <div className="relative overflow-hidden rounded-md">
            <Image src={siteAssets.goodWelding} alt="Equipo trabajando en fabricación metalmecánica" className="aspect-[16/10] w-full object-cover" sizes="(max-width: 1024px) 100vw, 58vw" />
            <div className="absolute inset-x-0 bottom-0 bg-slate-950/90 p-5 sm:p-6">
              <p className="text-sm leading-6 text-slate-200">Nuestra misión es desarrollar piezas, partes y soluciones industriales con calidad verificable y plazos claros.</p>
            </div>
          </div>
          <div className="mt-8 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {values.map(({ icon: Icon, title, text }) => (
              <div key={title} className="border-t border-slate-300 pt-5">
                <Icon className="h-5 w-5 text-navy-600" />
                <h3 className="mt-3 text-base font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
