import Image from "next/image";
import Link from "next/link";
import { ArrowRight, DraftingCompass, Gauge, Ruler } from "lucide-react";
import { siteAssets } from "@/components/siteAssets";
import TrackedQuoteLink from "@/components/TrackedQuoteLink";

const principles = [
  { icon: DraftingCompass, title: "Partimos del requerimiento", text: "Revisamos planos, muestras o la necesidad funcional antes de definir una solución." },
  { icon: Gauge, title: "Elegimos el proceso", text: "Integramos corte, plegado, armado y soldadura según las características de la pieza." },
  { icon: Ruler, title: "Acordamos el alcance", text: "Material, medidas, cantidades y terminaciones forman parte de la revisión para cotizar." },
];

export default function About() {
  return (
    <section id="nosotros" className="overflow-hidden bg-white py-16 sm:py-20 lg:py-28">
      <div className="container-custom px-5 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-16">
          <div className="relative min-h-[310px] overflow-hidden bg-[#dedfdd] sm:min-h-[430px] lg:min-h-[500px]">
            <Image src={siteAssets.goodBending} alt="Operario trabajando con una plancha en una plegadora industrial" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#17191b]/55 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between border-t border-white/35 px-5 py-4 text-white sm:px-7">
              <p className="text-sm font-medium">Plegado industrial</p>
            </div>
            <span aria-hidden="true" className="absolute left-0 top-0 h-16 w-1 bg-blue-600" />
          </div>

          <div className="py-1 lg:py-8">
            <p className="eyebrow">Una maestranza para necesidades reales</p>
            <h2 className="mt-5 max-w-2xl text-balance text-4xl font-semibold leading-[.98] tracking-[-.065em] text-[#17191b] sm:text-5xl lg:text-[3.5rem]">
              Del plano, la muestra o la idea a una solución fabricable.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              N Proyectos es una empresa de fabricación metalmecánica ubicada en La Granja, Santiago. Revisamos cada encargo para entender su uso, geometría, materiales y procesos antes de preparar una cotización.
            </p>
            <div className="mt-7 flex flex-wrap gap-x-7 gap-y-4 text-sm">
              <Link href="/maestranza-santiago" className="font-semibold text-blue-700 underline decoration-blue-300 underline-offset-4 hover:text-blue-900">Conoce nuestra maestranza en Santiago</Link>
              <TrackedQuoteLink href="/#contacto" location="about" serviceType="fabricacion_metalmecanica" className="inline-flex items-center gap-2 font-semibold text-[#17191b] hover:text-blue-700">Cuéntanos tu proyecto <ArrowRight className="h-4 w-4" /></TrackedQuoteLink>
            </div>
            <p className="mt-8 border-t border-[#DADDDC] pt-4 text-sm leading-6 text-[#777D81]">Atención a requerimientos de minería, manufactura, construcción, mantenimiento e industria.</p>
          </div>
        </div>

        <div className="mt-12 grid border-y border-[#DADDDC] sm:grid-cols-3 lg:mt-16">
          {principles.map(({ icon: Icon, title, text }) => (
            <article key={title} className="border-b border-[#DADDDC] py-6 sm:border-b-0 sm:px-7 sm:py-8 sm:first:pl-0 sm:last:pr-0 sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:border-[#DADDDC]">
              <div className="flex h-10 w-10 items-center justify-center border border-[#d5e2ef] bg-[#f2f7fc] text-blue-700"><Icon className="h-5 w-5" strokeWidth={1.6} /></div>
              <h3 className="mt-4 text-lg font-semibold text-[#17191b]">{title}</h3>
              <p className="mt-2 max-w-sm text-sm leading-6 text-[#777D81]">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
