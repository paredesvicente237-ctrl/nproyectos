import Image from "next/image";
import { ArrowRight, AudioLines, DraftingCompass, PanelsTopLeft, Zap } from "lucide-react";

const capabilities = [
  { icon: PanelsTopLeft, title: "Corte y plegado", text: "Precisión para piezas y conjuntos." },
  { icon: Zap, title: "Soldadura MIG/TIG", text: "Armado en acero e inoxidable." },
  { icon: DraftingCompass, title: "Diseño CAD", text: "Desarrollo técnico fabricable." },
  { icon: AudioLines, title: "Control acústico", text: "Soluciones para ruido industrial." },
];

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-[#f3f6f8] pt-[76px]">
      <div className="container-custom grid min-h-[650px] items-stretch lg:min-h-[690px] lg:grid-cols-[.88fr_1.12fr]">
        <div className="relative z-10 order-2 flex flex-col justify-center px-5 py-12 sm:px-8 sm:py-16 lg:order-1 lg:px-10 lg:py-20">
          <p className="eyebrow">Maestranza y fabricación industrial</p>
          <h1 className="text-balance mt-7 max-w-[680px] text-[2.75rem] font-semibold leading-[.99] tracking-[-.06em] text-[#172634] sm:text-6xl lg:text-[4.55rem]">
            Acero convertido en soluciones precisas.
          </h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Diseñamos, fabricamos y montamos piezas, estructuras y soluciones metalmecánicas para proyectos que no admiten improvisación.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="/#contacto" className="btn-primary">Solicitar cotización <ArrowRight className="h-4 w-4" /></a>
            <a href="/#especialidades" className="inline-flex min-h-12 items-center justify-center gap-2 border border-slate-300 bg-transparent px-6 py-3 text-sm font-semibold text-slate-800 hover:border-blue-700 hover:text-blue-700">Conocer capacidades <ArrowRight className="h-4 w-4" /></a>
          </div>
          <div className="mt-12 max-w-lg border-t border-slate-300 pt-5">
            <p className="text-sm font-medium leading-6 text-slate-600">Ingeniería, fabricación y terminaciones coordinadas en un solo equipo.</p>
          </div>
        </div>

        <div className="relative order-1 min-h-[245px] overflow-hidden bg-[#152634] sm:min-h-[340px] lg:order-2 lg:min-h-[690px]">
          <Image src="/images/hero-soldadura-nproyectos-clara.webp" alt="Soldador de N Proyectos fabricando una pieza metálica" fill priority fetchPriority="high" className="object-cover object-[57%_center]" sizes="(max-width: 1024px) 100vw, 56vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#172634]/35 via-transparent to-[#0b1c2a]/10" />
          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between border-t border-white/50 pt-3 text-white sm:bottom-8 sm:left-8 sm:right-8">
            <p className="text-xs font-semibold tracking-wide">Fabricación metalmecánica · Santiago</p>
            <span className="hidden font-mono text-[10px] tracking-wider text-white/75 sm:block">NP / FAB-01</span>
          </div>
        </div>
      </div>

      <div className="border-y border-slate-200 bg-white">
        <div className="container-custom grid sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map(({ icon: Icon, title, text }, index) => (
            <div key={title} className="flex items-start gap-4 border-b border-slate-200 px-5 py-5 last:border-0 sm:px-8 lg:border-b-0 lg:border-r lg:px-6 lg:py-7 lg:last:border-r-0">
              <span className="mt-0.5 text-blue-700"><Icon className="h-6 w-6" strokeWidth={1.65} /></span>
              <div><p className="text-sm font-semibold text-slate-950">{title}</p><p className="mt-1 text-xs leading-5 text-slate-500">{text}</p></div>
              <span className="ml-auto hidden font-mono text-[10px] text-slate-300 lg:block">0{index + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
