import Image from "next/image";
import { ArrowRight, AudioLines, DraftingCompass, PanelsTopLeft, Zap } from "lucide-react";
import { siteAssets } from "@/components/siteAssets";

const capabilities = [
  { icon: PanelsTopLeft, title: "Corte y plegado", text: "Precisión para piezas y conjuntos." },
  { icon: Zap, title: "Soldadura MIG/TIG", text: "Armado en acero e inoxidable." },
  { icon: DraftingCompass, title: "Diseño CAD", text: "Desarrollo técnico fabricable." },
  { icon: AudioLines, title: "Control acústico", text: "Soluciones para ruido industrial." },
];

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-[#f8fafc] pt-[76px]">
      <div className="technical-grid absolute inset-0 opacity-60" />
      <div className="container-custom relative grid min-h-[690px] lg:grid-cols-[0.88fr_1.12fr]">
        <div className="relative z-10 flex items-center px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="max-w-[650px]">
            <p className="eyebrow">Maestranza y fabricación industrial</p>
            <h1 className="mt-6 text-[2.75rem] font-semibold leading-[0.98] tracking-[-0.055em] text-slate-950 sm:text-6xl lg:text-[4.6rem]">
              Acero convertido en <span className="text-blue-700">soluciones precisas.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
              Diseñamos, fabricamos y montamos piezas, estructuras y soluciones metalmecánicas para proyectos que no admiten improvisación.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="/#contacto" className="btn-primary">
              Solicitar cotización <ArrowRight className="h-4 w-4" />
              </a>
              <a href="/#especialidades" className="btn-outline">Conocer capacidades <ArrowRight className="h-4 w-4" /></a>
            </div>
            <p className="mt-8 border-l-2 border-blue-600 pl-4 text-sm font-medium leading-6 text-slate-500">
              Ingeniería, fabricación y terminaciones coordinadas en un solo equipo.
            </p>
          </div>
        </div>

        <div className="relative min-h-[360px] overflow-hidden sm:min-h-[480px] lg:min-h-full">
          <Image src={siteAssets.goodWelding} alt="Proceso de soldadura y fabricación metalmecánica" fill priority fetchPriority="high" className="object-cover object-[58%_center]" sizes="(max-width: 1024px) 100vw, 58vw" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#f8fafc_0%,rgba(248,250,252,.72)_10%,transparent_38%)] max-lg:hidden" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#06152c]/70 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between text-white lg:left-20">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-200">N Proyectos · Santiago</p>
              <p className="mt-2 max-w-sm text-sm font-medium leading-6">Fabricación responsable desde el plano hasta la entrega.</p>
            </div>
            <span className="hidden border border-white/40 px-3 py-2 font-mono text-[10px] tracking-wider sm:block">NP / FAB-01</span>
          </div>
        </div>
      </div>

      <div className="container-custom relative -mt-6 px-5 pb-8 sm:px-8 lg:-mt-px lg:px-10">
        <div className="grid border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex gap-4 border-b border-r border-slate-200 p-5 last:border-r-0 sm:p-6 lg:border-b-0">
              <Icon className="mt-0.5 h-7 w-7 shrink-0 text-blue-700" strokeWidth={1.6} />
              <div><p className="text-sm font-semibold text-slate-950">{title}</p><p className="mt-1 text-xs leading-5 text-slate-500">{text}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
