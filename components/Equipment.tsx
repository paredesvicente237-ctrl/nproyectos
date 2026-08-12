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
    <section id="equipamiento" className="overflow-hidden bg-[#06152c]">
      <div className="container-custom grid lg:grid-cols-2">
        <div className="relative min-h-[430px] lg:min-h-[650px]">
          <Image src={siteAssets.fotobuenax1} alt="Equipo de corte láser en taller metalmecánico" fill className="object-cover object-center" sizes="(max-width: 1024px) 100vw, 50vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#06152c]/60 max-lg:bg-gradient-to-t" />
          <div className="absolute bottom-7 left-7 right-7 border border-white/30 bg-[#06152c]/85 p-5 backdrop-blur sm:right-auto sm:max-w-sm">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-blue-300">Equipo de producción</p>
            <p className="mt-2 text-sm font-semibold leading-6 text-white">Corte láser para geometrías precisas y fabricación repetible.</p>
          </div>
        </div>
        <div className="flex flex-col justify-center px-6 py-16 sm:px-12 lg:px-16 lg:py-20">
          <span className="eyebrow !text-blue-300 before:!bg-blue-400">Equipamiento y materiales</span>
          <h2 className="mt-5 max-w-xl text-3xl font-semibold leading-[1.08] tracking-[-0.035em] text-white sm:text-4xl">Capacidad para resolver proyectos diversos.</h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">Combinamos equipamiento industrial, personal calificado y experiencia en distintos materiales para responder a cada geometría.</p>
          <div className="mt-10 border-l border-t border-white/15">
            {equipment.map((item) => (
              <div key={item.process} className="grid grid-cols-[0.8fr_1.2fr] border-b border-r border-white/15 text-sm">
                <span className="border-r border-white/15 px-4 py-4 font-mono text-[10px] uppercase tracking-[0.15em] text-slate-500">{item.process}</span>
                <span className="flex items-center gap-3 px-4 py-4 font-medium text-slate-200"><Check className="h-4 w-4 text-blue-400" /> {item.capability}</span>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">Materiales habituales</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {materials.map((item) => <span key={item} className="border border-white/15 px-3 py-2 text-xs font-medium text-slate-300">{item}</span>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
