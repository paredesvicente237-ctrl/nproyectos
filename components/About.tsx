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
        <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
          <div className="relative z-10 bg-[#06152c] p-8 sm:p-12 lg:p-14">
            <span className="eyebrow !text-blue-300 before:!bg-blue-400">Sobre N Proyectos</span>
            <h2 className="mt-5 max-w-xl text-3xl font-semibold leading-[1.08] tracking-[-0.035em] text-white sm:text-4xl lg:text-[2.8rem]">
              Criterio técnico en cada decisión de fabricación.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-300">
              Somos una empresa metalmecánica orientada a resolver encargos industriales con ingeniería aplicada, fabricación a medida y comunicación directa con cada cliente.
            </p>
            <Link href="/maestranza-santiago" className="mt-5 inline-flex text-sm font-semibold text-blue-300 underline decoration-blue-400/50 underline-offset-4 hover:text-white">
              Conoce nuestra maestranza en Santiago
            </Link>
            <a href="/#contacto" className="mt-8 inline-flex items-center gap-3 text-sm font-semibold text-blue-300 hover:text-white">
              Conversemos sobre tu proyecto <ArrowRight className="h-4 w-4" />
            </a>
            <div className="mt-12 border-t border-white/15 pt-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">Áreas atendidas</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">Minería · Manufactura · Construcción · Industria</p>
            </div>
          </div>

          <div className="grid bg-slate-50 md:grid-cols-[1fr_0.9fr]">
            <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
              {principles.map(({ icon: Icon, title, text }, index) => (
                <article key={title} className="flex gap-5 border-b border-slate-200 py-6 first:pt-0 last:border-b-0 last:pb-0">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-blue-200 bg-white text-blue-700">
                    <Icon className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <div>
                    <p className="font-mono text-[10px] font-semibold tracking-[0.15em] text-blue-700">0{index + 1}</p>
                    <h3 className="mt-1 text-base font-semibold text-slate-950">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="relative min-h-[380px] md:min-h-full">
              <Image src={siteAssets.goodBending} alt="Plegado industrial de acero" fill className="object-cover object-center" sizes="(max-width: 768px) 100vw, 35vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06152c]/65 via-transparent to-transparent" />
              <p className="absolute bottom-6 left-6 border-l-2 border-blue-400 pl-3 text-xs font-medium uppercase tracking-[0.12em] text-white">Precisión en proceso</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
