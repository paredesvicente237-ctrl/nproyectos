import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { siteAssets } from "@/components/siteAssets";
import TrackedQuoteLink from "@/components/TrackedQuoteLink";

const usefulDetails = [
  "Plano, archivo, muestra o fotografías",
  "Material, espesor y medidas disponibles",
  "Cantidad y uso de la pieza o conjunto",
];

const processImages = [
  { name: "Corte de planchas", image: siteAssets.fotobuenax1, position: "object-center" },
  { name: "Plegado industrial", image: siteAssets.goodBending, position: "object-center" },
  { name: "Armado y soldadura", image: siteAssets.goodWelding, position: "object-center" },
];

export default function IndustrialProcesses() {
  return (
    <section className="bg-[#172b3b] py-16 text-white sm:py-20 lg:py-24">
      <div className="container-custom grid gap-10 px-5 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-16 lg:px-10">
        <div>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {processImages.map((process, index) => (
              <figure key={process.name} className={`relative overflow-hidden bg-[#243d50] ${index === 0 ? "col-span-2 aspect-[2.1/1]" : "aspect-[1.15/1]"}`}>
                <Image src={process.image} alt={process.name} fill className={`object-cover ${process.position}`} sizes={index === 0 ? "(max-width: 1024px) 100vw, 52vw" : "(max-width: 1024px) 48vw, 26vw"} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081723]/70 via-transparent to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 px-3 py-3 text-xs font-semibold text-white sm:px-4 sm:text-sm">
                  {process.name}
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-3 text-[11px] leading-5 text-white/55">Imágenes ilustrativas de procesos; no representan casos de clientes específicos.</p>
        </div>

        <div className="py-1 lg:py-6">
          <p className="eyebrow !text-blue-200 before:!bg-blue-400">Preparar una cotización</p>
          <h2 className="mt-5 max-w-xl text-balance text-3xl font-semibold leading-[1.02] tracking-[-.055em] text-white sm:text-4xl lg:text-[3.25rem]">
            Cuanto más entendamos la necesidad, mejor podremos revisarla.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
            Comparte los antecedentes que tengas. Si todavía no cuentas con un plano completo, puedes explicar el uso, las medidas aproximadas y el resultado que necesitas.
          </p>
          <ul className="mt-6 divide-y divide-white/15 border-y border-white/15">
            {usefulDetails.map((detail) => (
              <li key={detail} className="flex items-start gap-3 py-3 text-sm leading-6 text-white/85">
                <Check className="mt-1 h-4 w-4 shrink-0 text-blue-300" aria-hidden="true" />{detail}
              </li>
            ))}
          </ul>
          <TrackedQuoteLink href="/#contacto" location="quote_requirements" className="mt-7 inline-flex min-h-12 items-center gap-3 bg-white px-5 py-3 text-sm font-semibold text-[#172b3b] transition-colors hover:bg-blue-50">
            Enviar antecedentes <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </TrackedQuoteLink>
        </div>
      </div>
    </section>
  );
}
