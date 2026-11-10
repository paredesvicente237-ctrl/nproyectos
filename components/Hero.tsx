import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, FileCheck2, MapPin, Scissors } from "lucide-react";
import TrackedQuoteLink from "@/components/TrackedQuoteLink";
import { siteAssets } from "@/components/siteAssets";

const capabilities = ["Corte láser y plegado", "Soldadura MIG/TIG", "Fabricación a medida"];

export default function Hero() {
  return (
    <section id="inicio" className="overflow-hidden bg-[#f1f3f2] pt-[76px] text-[#17191b]">
      <div className="container-custom grid lg:min-h-[650px] lg:grid-cols-[.92fr_1.08fr]">
        <div className="flex flex-col justify-center px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20 xl:pr-16">
          <p className="eyebrow">Maestranza industrial · Santiago</p>
          <h1 className="mt-6 max-w-[760px] text-balance text-[clamp(2.2rem,8.2vw,3.25rem)] font-semibold leading-[.96] tracking-[-.065em] text-[#17191b] sm:text-[clamp(2.65rem,5.2vw,4.5rem)]">
            Ingeniería y fabricación para proyectos que exigen más.
          </h1>
          <p className="mt-6 max-w-[590px] text-base leading-7 text-[#5e666b] sm:text-lg sm:leading-8">
            Convertimos planos, muestras y requerimientos industriales en piezas y soluciones metalmecánicas fabricables. Revisamos cada necesidad para definir el proceso adecuado.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <TrackedQuoteLink href="/#contacto" location="hero" className="btn-primary !min-h-[52px] !px-6">
              Solicitar cotización <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </TrackedQuoteLink>
            <Link href="/#especialidades" className="inline-flex min-h-[52px] items-center justify-center gap-2 border border-[#b9c0c2] bg-transparent px-5 py-3 text-sm font-semibold text-[#26343b] transition-colors hover:border-[#145fce] hover:bg-white">
              Explorar capacidades <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <ul aria-label="Servicios industriales" className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-[#d3d8d6] pt-5 text-xs font-semibold text-[#4d5a60] sm:text-sm">
            {capabilities.map((capability) => (
              <li key={capability} className="inline-flex items-center gap-2">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#145fce]" />
                {capability}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative isolate min-h-[300px] overflow-hidden bg-[#26343b] sm:min-h-[430px] lg:min-h-[650px]">
          <Image
            src={siteAssets.fotobuenax1}
            alt="Corte láser de una plancha metálica"
            fill
            priority
            fetchPriority="high"
            className="-z-10 object-cover object-[56%_center]"
            sizes="(max-width: 1024px) 100vw, 54vw"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#101a20]/75 via-transparent to-[#101a20]/10" />
          <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7 lg:p-9">
            <p className="text-xs font-semibold text-white/70">Corte láser</p>
            <p className="mt-1 text-lg font-semibold tracking-[-.025em] sm:text-xl">Geometría definida desde el plano</p>
          </div>
        </div>
      </div>

      <div className="border-y border-[#d5dad8] bg-white">
        <div className="container-custom grid sm:grid-cols-3">
          <div className="flex items-start gap-3 border-b border-[#e0e4e2] px-5 py-4 sm:border-b-0 sm:px-8 sm:py-5 lg:px-10">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#145fce]" aria-hidden="true" />
            <div><p className="text-sm font-semibold text-[#20282c]">Desde La Granja</p><p className="mt-0.5 text-xs text-[#6e777b]">Santiago, Chile</p></div>
          </div>
          <div className="flex items-start gap-3 border-b border-[#e0e4e2] px-5 py-4 sm:border-b-0 sm:border-l sm:border-[#e0e4e2] sm:px-8 sm:py-5 lg:px-10">
            <FileCheck2 className="mt-0.5 h-4 w-4 shrink-0 text-[#145fce]" aria-hidden="true" />
            <div><p className="text-sm font-semibold text-[#20282c]">Desde plano o muestra</p><p className="mt-0.5 text-xs text-[#6e777b]">Revisión técnica del requerimiento</p></div>
          </div>
          <div className="flex items-start gap-3 px-5 py-4 sm:border-l sm:border-[#e0e4e2] sm:px-8 sm:py-5 lg:px-10">
            <Scissors className="mt-0.5 h-4 w-4 shrink-0 text-[#145fce]" aria-hidden="true" />
            <div><p className="text-sm font-semibold text-[#20282c]">Procesos coordinados</p><p className="mt-0.5 text-xs text-[#6e777b]">Corte, plegado, armado y soldadura</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}
