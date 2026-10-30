import Image from "next/image";
import { Check } from "lucide-react";
import { siteAssets } from "@/components/siteAssets";

const equipment = [
  { process: "Corte", capability: "Láser y guillotina" },
  { process: "Conformado", capability: "Plegado y curvado" },
  { process: "Uniones", capability: "MIG, TIG y láser" },
  { process: "Desarrollo", capability: "CAD / Inventor" },
];
const materials = ["Acero carbono", "Acero inoxidable", "Galvanizado", "Aluminio", "Cobre", "Bronce", "Plancha perforada", "Plancha diamantada"];

export default function Equipment() {
  return (
    <section id="equipamiento" className="bg-white py-20 sm:py-28 lg:py-36">
      <div className="container-custom px-5 sm:px-8 lg:px-10">
        <div className="relative min-h-[350px] overflow-hidden bg-[#202426] sm:min-h-[500px] lg:min-h-[610px]">
          <Image src={siteAssets.fotobuenax1} alt="Equipo de corte láser en taller metalmecánico" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#17191b]/65 via-[#17191b]/10 to-transparent" />
          <div className="absolute bottom-0 left-0 max-w-3xl p-6 text-white sm:p-10 lg:p-14">
            <p className="text-sm font-semibold text-blue-200">Equipamiento y materiales</p>
            <h2 className="mt-4 text-balance text-4xl font-semibold leading-[.98] tracking-[-.06em] text-white sm:text-5xl lg:text-[4.25rem]">Capacidad para resolver proyectos diversos.</h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/85 sm:text-lg sm:leading-8">Combinamos equipamiento industrial, personal calificado y experiencia en distintos materiales para responder a cada geometría.</p>
            <p className="mt-6 border-l-2 border-blue-400 pl-4 text-sm font-medium text-white">Corte láser para geometrías precisas y fabricación repetible.</p>
          </div>
          <span aria-hidden="true" className="absolute right-6 top-6 hidden border border-white/50 bg-[#17191b]/20 px-3 py-2 text-xs text-white backdrop-blur-sm sm:block">Producción industrial</span>
        </div>

        <div className="grid gap-10 border-b border-[#DADDDC] bg-[#F5F5F2] p-6 sm:p-9 lg:grid-cols-[.55fr_1.45fr] lg:gap-16 lg:p-12">
          <div>
            <p className="text-sm font-semibold text-[#17191b]">Procesos disponibles</p>
            <p className="mt-2 text-sm leading-6 text-[#777D81]">Capacidades de fabricación</p>
          </div>
          <div className="grid sm:grid-cols-2">
            {equipment.map((item, index) => (
              <div key={item.process} className="flex items-start gap-4 border-t border-[#DADDDC] py-4 sm:px-5 sm:first:pl-0 sm:[&:nth-child(2)]:border-t sm:[&:nth-child(2)]:pl-5 lg:py-5">
                <span className="text-2xl font-semibold tracking-[-.05em] text-[#b3b8b6]">0{index + 1}</span>
                <div><p className="text-xs font-semibold text-[#777D81]">{item.process}</p><p className="mt-1 flex items-center gap-2 text-base font-semibold text-[#17191b]"><Check className="h-4 w-4 shrink-0 text-blue-700" />{item.capability}</p></div>
              </div>
            ))}
          </div>
          <div className="border-t border-[#DADDDC] pt-6 sm:col-span-2 lg:grid lg:grid-cols-[.55fr_1.45fr] lg:gap-16 lg:pt-8">
            <p className="text-sm font-semibold text-[#17191b]">Materiales habituales</p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 lg:mt-0">
              {materials.map((item) => <span key={item} className="border-b border-[#c7cbca] pb-1 text-sm text-[#5f6669]">{item}</span>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
