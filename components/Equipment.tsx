import Image from "next/image";
import { siteAssets } from "@/components/siteAssets";

const equipment = [
  "Corte láser 12 mm",
  "Corte guillotina 6 mm",
  "Plegadoras 6 mm",
  "Curvado de tubos",
  "Soldadura Mig / Tig",
  "Soldadura láser",
];

const materials = [
  "Acero carbono",
  "Acero inoxidable",
  "Galvanizado",
  "Diamantado",
  "Perforado",
  "Bronce",
  "Aluminio",
  "Cobre",
];

export default function Equipment() {
  return (
    <section id="equipamiento" className="section-padding">
      <div className="container-custom grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="panel p-7 sm:p-10">
          <span className="eyebrow">Nuestro equipamiento</span>
          <h2 className="mt-5 font-heading text-4xl font-bold leading-tight text-steel-950 sm:text-5xl">
            Capacidad instalada para proyectos de fabricación, corte y
            soldadura.
          </h2>
          <p className="mt-6 text-lg leading-8 text-industrial-500">
            La operación se respalda con equipamiento apto para trabajos en
            aceros, más personal calificado y certificado con experiencia en
            armado y soldadura.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {equipment.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-industrial-200 bg-industrial-50 px-4 py-4 text-sm font-semibold text-steel-950"
              >
                {item}
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-3xl border border-industrial-200 bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Materiales de trabajo
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {materials.map((item) => (
                <span key={item} className="soft-chip">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-5">
          <div className="panel overflow-hidden p-3">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[1.6rem]">
              <Image
                src={siteAssets.pressBrakeWide}
                alt="Maquinaria de plegado industrial"
                className="h-full w-full object-cover"
                sizes="(max-width: 1280px) 100vw, 40vw"
              />
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="panel overflow-hidden p-3">
              <div className="relative aspect-square overflow-hidden rounded-[1.6rem]">
                <Image
                  src={siteAssets.bracketProduct}
                  alt="Pieza fabricada en acero"
                  className="h-full w-full object-cover"
                  sizes="(max-width: 1280px) 100vw, 20vw"
                />
              </div>
            </div>
            <div className="panel overflow-hidden p-3">
              <div className="relative aspect-square overflow-hidden rounded-[1.6rem]">
                <Image
                  src={siteAssets.cadProject}
                  alt="Diseño de proyecto industrial"
                  className="h-full w-full object-cover"
                  sizes="(max-width: 1280px) 100vw, 20vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
