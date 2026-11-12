import Image, { type StaticImageData } from "next/image";
import { ArrowRight } from "lucide-react";
import { siteAssets } from "@/components/siteAssets";
import TrackedQuoteLink from "@/components/TrackedQuoteLink";

const processGallery: {
  image: StaticImageData;
  title: string;
  alt: string;
  position: string;
}[] = [
  {
    image: siteAssets.goodGuillotine,
    title: "Corte de planchas",
    alt: "Imagen referencial de un proceso industrial de corte de planchas; no representa un trabajo específico de N Proyectos",
    position: "object-[52%_center]",
  },
  {
    image: siteAssets.goodSparks,
    title: "Corte y preparación",
    alt: "Imagen referencial de corte y preparación de metal; no representa un trabajo específico de N Proyectos",
    position: "object-[56%_center]",
  },
  {
    image: siteAssets.goodBending,
    title: "Plegado de planchas",
    alt: "Imagen referencial de plegado de planchas; no representa un trabajo específico de N Proyectos",
    position: "object-[54%_center]",
  },
  {
    image: siteAssets.goodWelding,
    title: "Armado y soldadura",
    alt: "Imagen referencial de armado y soldadura industrial; no representa un trabajo específico de N Proyectos",
    position: "object-[55%_center]",
  },
];

export default function VerifiedProof() {
  return (
    <section id="equipamiento" className="scroll-mt-24 bg-white text-[#252729]" aria-labelledby="verified-proof-title">
      <div className="container-custom grid px-5 sm:px-8 lg:grid-cols-[.82fr_1.18fr] lg:px-10">
        <div className="relative flex flex-col justify-start overflow-hidden py-10 sm:py-12 lg:pb-10 lg:pr-10 lg:pt-16">
          <div aria-hidden="true" className="absolute -left-28 top-1/2 h-[25rem] w-[25rem] -translate-y-1/2 rounded-full border border-[#f47b00]/10" />
          <div aria-hidden="true" className="absolute -left-16 top-1/2 h-[18rem] w-[18rem] -translate-y-1/2 rounded-full border border-[#f47b00]/10" />
          <p className="relative inline-flex items-center gap-3 text-[10px] font-bold tracking-[.19em] text-[#a94f00] sm:text-xs">
            <span className="h-px w-8 bg-[#f47b00]" /> EXPERIENCIA INDUSTRIAL ACUMULADA
          </p>
          <h2 id="verified-proof-title" className="relative mt-5 font-heading text-[clamp(4rem,17vw,7.75rem)] font-semibold leading-[.82] tracking-[-.075em] text-[#f47b00] sm:mt-6 sm:text-[clamp(5.25rem,10vw,8.5rem)]">
            +5.000
          </h2>
          <p className="relative mt-4 max-w-md text-[11px] font-bold leading-5 tracking-[.16em] text-[#55585a] sm:mt-5 sm:text-sm sm:tracking-[.2em]">
            ÓRDENES DE TRABAJO REALIZADAS
          </p>
          <div aria-hidden="true" className="relative mt-6 h-px w-16 bg-[#f47b00] sm:mt-7" />
          <p className="relative mt-5 max-w-lg text-sm leading-6 text-[#55585a] sm:mt-6 sm:text-base sm:leading-7">
            Nuestra trayectoria se construye con miles de trabajos de fabricación, desarrollo y soluciones metalmecánicas para distintas necesidades industriales.
          </p>
          <p className="relative mt-3 max-w-md text-[11px] leading-5 text-[#777a7c] sm:text-xs">
            Cifra acumulada de órdenes de trabajo; no equivale a 5.000 proyectos distintos.
          </p>
          <p className="relative mt-5 text-sm font-semibold text-[#252729] sm:mt-6 sm:text-base">
            MÁS DE 5.000 ÓRDENES DE TRABAJO REALIZADAS. TU PROYECTO PUEDE SER EL PRÓXIMO.
          </p>
          <TrackedQuoteLink
            href="/#contacto"
            location="verified_proof"
            className="relative mt-6 inline-flex min-h-12 w-full items-center justify-between gap-5 bg-[#f47b00] px-5 text-sm font-bold text-[#191a1c] transition-colors hover:bg-[#ff9220] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#a94f00] sm:mt-7 sm:w-fit sm:justify-center sm:px-6"
          >
            COTIZAR MI PROYECTO <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </TrackedQuoteLink>
        </div>

        <div id="trabajos" className="border-t border-[#dedbd7] py-8 sm:py-10 lg:border-l lg:border-t-0 lg:py-14 lg:pl-10 xl:pl-14">
          <div>
            <div>
              <p className="text-[10px] font-bold tracking-[.18em] text-[#a94f00] sm:text-xs">PROCESOS METALMECÁNICOS</p>
              <h3 className="mt-2 max-w-3xl text-2xl font-semibold leading-[1.03] tracking-[-.045em] text-[#252729] sm:text-3xl lg:text-[2.35rem]">
                Fabricación, conformado y unión.
              </h3>
            </div>
            <p className="mt-2 max-w-xl text-xs leading-5 text-[#66696b] sm:text-sm sm:leading-6">
              Referencias visuales de procesos industriales relacionados con nuestras capacidades.
            </p>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2.5 sm:mt-7 sm:gap-3 lg:mt-8">
            {processGallery.map((item, index) => (
              <figure key={item.title} className={`group relative isolate overflow-hidden bg-[#1c3a50] ${index === 0 ? "aspect-[1.06/1]" : "aspect-[1.28/1]"}`}>
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className={`-z-10 object-cover transition-transform duration-700 group-hover:scale-[1.045] ${item.position}`}
                  sizes="(max-width: 639px) 44vw, (max-width: 1023px) 40vw, 28vw"
                />
                <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-[#071521]/90 via-[#071521]/10 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-2.5 text-sm font-semibold leading-5 text-white sm:p-4 sm:text-base sm:leading-6">
                  {item.title}
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-3 text-[10px] leading-4 text-[#777a7c] sm:mt-4 sm:text-xs sm:leading-5">
            Fotografías referenciales; no representan instalaciones ni trabajos específicos de clientes de N Proyectos.
          </p>
        </div>
      </div>
    </section>
  );
}
