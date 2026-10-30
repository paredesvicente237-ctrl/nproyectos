import Image from "next/image";
import Link from "next/link";
import { ArrowRight, DraftingCompass, Gauge, ShieldCheck } from "lucide-react";
import { siteAssets } from "@/components/siteAssets";

const principles = [
  { icon: DraftingCompass, title: "Desarrollo desde planos", text: "Traducimos requerimientos y diseños en una solución lista para fabricar." },
  { icon: Gauge, title: "Control de fabricación", text: "Coordinamos materiales, procesos y terminaciones durante cada etapa." },
  { icon: ShieldCheck, title: "Compromiso de entrega", text: "Trabajamos con alcance y comunicación claros desde el inicio." },
];

export default function About() {
  return (
    <section id="nosotros" className="section-padding overflow-hidden bg-white">
      <div className="container-custom">
        <div className="grid items-stretch lg:grid-cols-[.95fr_1.05fr]">
          <div className="flex flex-col justify-center py-4 sm:py-8 lg:pr-16">
            <span className="eyebrow">Sobre N Proyectos</span>
            <h2 className="mt-5 max-w-xl text-3xl font-semibold leading-[1.04] tracking-[-0.045em] text-[#172634] sm:text-4xl lg:text-[3.25rem]">
              Criterio técnico en cada decisión de fabricación.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Somos una empresa metalmecánica orientada a resolver encargos industriales con ingeniería aplicada, fabricación a medida y comunicación directa con cada cliente.
            </p>
            <Link href="/maestranza-santiago" className="mt-5 inline-flex text-sm font-semibold text-blue-700 underline decoration-blue-400/50 underline-offset-4 hover:text-blue-900">
              Conoce nuestra maestranza en Santiago
            </Link>
            <a href="/#contacto" className="mt-8 inline-flex items-center gap-3 text-sm font-semibold text-blue-700 hover:text-blue-900">
              Conversemos sobre tu proyecto <ArrowRight className="h-4 w-4" />
            </a>
            <div className="mt-10 border-t border-slate-200 pt-5">
              <p className="text-[11px] font-bold tracking-[0.1em] text-slate-500">Áreas atendidas</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">Minería · Manufactura · Construcción · Industria</p>
            </div>
          </div>

          <div className="grid bg-[#f3f6f8] md:grid-cols-[.9fr_1.1fr]">
            <div className="flex flex-col justify-center px-6 py-8 sm:px-10 lg:px-12">
              {principles.map(({ icon: Icon, title, text }, index) => (
                <article key={title} className="flex gap-5 border-b border-slate-300 py-6 first:pt-0 last:border-b-0 last:pb-0">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center border-l-2 border-blue-600 bg-white text-blue-700">
                    <Icon className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.1em] text-blue-700">0{index + 1}</p>
                    <h3 className="mt-1 text-base font-semibold text-slate-950">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="relative min-h-[380px] md:min-h-full">
              <Image src={siteAssets.goodBending} alt="Plegado industrial de acero" fill className="object-cover object-center" sizes="(max-width: 768px) 100vw, 35vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#10283e]/55 via-transparent to-transparent" />
              <p className="absolute bottom-6 left-6 border-l-2 border-white pl-3 text-xs font-semibold text-white">Precisión en proceso</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
