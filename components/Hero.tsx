import Image from "next/image";
import { ArrowDown, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section id="inicio" className="relative isolate flex min-h-[700px] flex-col justify-end overflow-hidden bg-[#17191b] pt-[76px] text-white lg:min-h-[90vh]">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-soldadura-nproyectos-clara.webp"
          alt="Soldador de N Proyectos fabricando una pieza metálica"
          fill
          priority
          fetchPriority="high"
          className="object-cover object-[59%_center]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,15,17,.78)_0%,rgba(12,15,17,.42)_42%,rgba(12,15,17,.04)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(12,15,17,.68)_0%,rgba(12,15,17,.08)_54%,rgba(12,15,17,.1)_100%)]" />
      </div>

      <div className="container-custom relative flex w-full flex-1 flex-col justify-end px-5 pb-24 pt-20 sm:px-8 sm:pb-14 lg:px-10 lg:pb-16">
        <div className="mb-7 flex items-center gap-3 text-xs font-semibold text-white/85 sm:text-sm">
          <span className="h-px w-9 bg-blue-400" />
          Maestranza y fabricación industrial
        </div>
        <h1 className="text-balance max-w-[1080px] text-[clamp(2.65rem,7.6vw,7.25rem)] font-semibold leading-[.9] tracking-[-.065em] text-white">
          Acero convertido<br className="hidden sm:block" /> en soluciones precisas.
        </h1>
        <div className="mt-8 grid items-end gap-8 border-t border-white/30 pt-6 lg:grid-cols-[1fr_auto] lg:pt-7">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:gap-10">
            <p className="max-w-[500px] text-base leading-7 text-white/85 sm:text-lg sm:leading-8">
              Diseñamos, fabricamos y montamos piezas, estructuras y soluciones metalmecánicas para proyectos que no admiten improvisación.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="/#contacto" className="btn-primary !bg-blue-600 hover:!bg-blue-500">Solicitar cotización <ArrowRight className="h-4 w-4" /></a>
              <a href="/#especialidades" className="inline-flex min-h-12 items-center justify-center gap-2 border border-white/60 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-[#17191b]">Explorar capacidades <ArrowDown className="h-4 w-4" /></a>
            </div>
          </div>
          <div className="hidden items-center gap-3 whitespace-nowrap text-right text-xs text-white/80 lg:flex">
            <span className="h-8 w-px bg-white/50" />
            <span>Santiago, Chile</span>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute bottom-1/2 right-[4vw] hidden h-[210px] w-px bg-white/30 2xl:block"><span className="absolute -left-1.5 top-0 h-3 w-3 rounded-full border border-white/60" /></div>
    </section>
  );
}
