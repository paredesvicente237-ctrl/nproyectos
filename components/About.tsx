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
    <section id="nosotros" className="overflow-hidden bg-white pb-16 pt-12 sm:pb-20 sm:pt-16 lg:py-28">
      <div className="container-custom px-5 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[.88fr_1.12fr] lg:items-center lg:gap-20">
          <div className="relative min-h-[340px] overflow-hidden bg-[#dedfdd] sm:min-h-[480px] lg:min-h-[520px]">
            <Image src={siteAssets.goodBending} alt="Plegado industrial de acero" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 44vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#17191b]/55 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between border-t border-white/35 px-5 py-4 text-white sm:px-7">
              <p className="text-sm font-medium">Precisión en proceso</p><span className="text-xs text-white/75">N Proyectos</span>
            </div>
            <span aria-hidden="true" className="absolute left-0 top-0 h-16 w-1 bg-blue-600" />
          </div>

          <div className="py-2 lg:py-10">
            <p className="eyebrow">Sobre N Proyectos</p>
            <h2 className="mt-6 max-w-2xl text-balance text-4xl font-semibold leading-[.98] tracking-[-.065em] text-[#17191b] sm:text-5xl lg:text-[3.75rem]">
              Criterio técnico en cada decisión de fabricación.
            </h2>
            <p className="mt-7 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Somos una empresa metalmecánica orientada a resolver encargos industriales con ingeniería aplicada, fabricación a medida y comunicación directa con cada cliente.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm">
              <Link href="/maestranza-santiago" className="font-semibold text-blue-700 underline decoration-blue-300 underline-offset-4 hover:text-blue-900">Conoce nuestra maestranza en Santiago</Link>
              <a href="/#contacto" className="inline-flex items-center gap-2 font-semibold text-[#17191b] hover:text-blue-700">Conversemos sobre tu proyecto <ArrowRight className="h-4 w-4" /></a>
            </div>
            <p className="mt-10 border-t border-[#DADDDC] pt-5 text-sm leading-6 text-[#777D81]">Minería · Manufactura · Construcción · Industria</p>
          </div>
        </div>

        <div className="mt-14 grid border-y border-[#DADDDC] sm:grid-cols-3 lg:mt-20">
          {principles.map(({ icon: Icon, title, text }, index) => (
            <article key={title} className="relative border-b border-[#DADDDC] py-6 sm:border-b-0 sm:px-7 sm:py-8 sm:first:pl-0 sm:last:pr-0 sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:border-[#DADDDC]">
              <div className="flex items-center gap-4"><span className="text-3xl font-semibold tracking-[-.06em] text-[#c7cbca]">0{index + 1}</span><Icon className="h-5 w-5 text-blue-700" strokeWidth={1.6} /></div>
              <h3 className="mt-5 text-lg font-semibold text-[#17191b]">{title}</h3>
              <p className="mt-2 max-w-sm text-sm leading-6 text-[#777D81]">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
