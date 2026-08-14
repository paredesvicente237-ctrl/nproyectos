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
    <section id="inicio" className="relative overflow-hidden bg-[#041020] pt-[76px]">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-soldadura-nproyectos.webp"
          alt="Soldador de N Proyectos fabricando una pieza metálica"
          fill
          priority
          fetchPriority="high"
          className="object-cover object-[78%_center] sm:object-[63%_center] lg:object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,12,26,.98)_0%,rgba(3,12,26,.92)_34%,rgba(3,12,26,.48)_62%,rgba(3,12,26,.12)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(3,12,26,.82)_0%,transparent_38%,rgba(3,12,26,.18)_100%)]" />
        <div className="technical-grid absolute inset-y-0 left-0 w-1/2 opacity-[0.08]" />
      </div>

      <div className="container-custom relative flex min-h-[720px] items-center px-5 pb-32 pt-16 sm:min-h-[760px] sm:px-8 lg:px-10 lg:pb-36 lg:pt-20">
        <div className="max-w-[690px]">
          <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
            <span className="h-px w-9 bg-blue-400" /> Maestranza y fabricación industrial
          </p>
          <h1 className="mt-7 text-[2.8rem] font-semibold leading-[0.96] tracking-[-0.055em] text-white sm:text-6xl lg:text-[4.85rem]">
            Acero convertido en <span className="text-blue-300">soluciones precisas.</span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-slate-200 sm:text-lg">
            Diseñamos, fabricamos y montamos piezas, estructuras y soluciones metalmecánicas para proyectos que no admiten improvisación.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="/#contacto" className="btn-primary !bg-blue-600 hover:!bg-blue-500">
              Solicitar cotización <ArrowRight className="h-4 w-4" />
            </a>
            <a href="/#especialidades" className="inline-flex items-center justify-center gap-2 border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white hover:bg-white hover:text-navy-950">
              Conocer capacidades <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-10 flex max-w-xl items-start gap-4 border-l-2 border-blue-400 pl-4">
            <p className="text-sm font-medium leading-6 text-slate-300">
              Ingeniería, fabricación y terminaciones coordinadas en un solo equipo.
            </p>
          </div>
        </div>

        <div className="absolute bottom-36 right-5 hidden items-end gap-4 text-right text-white lg:flex">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-200">N Proyectos · Santiago</p>
            <p className="mt-2 text-xs font-medium text-slate-300">Precisión en cada unión</p>
          </div>
          <span className="border border-white/30 bg-slate-950/30 px-3 py-2 font-mono text-[10px] tracking-wider backdrop-blur-sm">NP / FAB-01</span>
        </div>
      </div>

      <div className="container-custom relative -mt-20 px-5 pb-8 sm:px-8 lg:px-10">
        <div className="grid border border-slate-200/80 bg-white shadow-[0_24px_70px_rgba(2,8,23,0.28)] sm:grid-cols-2 lg:grid-cols-4">
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
