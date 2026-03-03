import Image from "next/image";
import { siteAssets } from "@/components/siteAssets";

const galleryItems = [
  {
    title: "Piezas cortadas para ensamble",
    category: "Corte y preparación",
    image: siteAssets.laserCutPieces,
  },
  {
    title: "Estructura metálica fabricada",
    category: "Armado",
    image: siteAssets.frameStructure,
  },
  {
    title: "Proceso de soldadura estructural",
    category: "Soldadura",
    image: siteAssets.weldingWork,
  },
  {
    title: "Plegado industrial en acero",
    category: "Plegado",
    image: siteAssets.foldedProfile,
  },
  {
    title: "Desarrollo y soporte CAD",
    category: "Ingeniería",
    image: siteAssets.cadProject,
  },
  {
    title: "Pieza terminada para montaje",
    category: "Producto fabricado",
    image: siteAssets.bracketProduct,
  },
];

export default function Gallery() {
  return (
    <section id="trabajos" className="section-padding">
      <div className="container-custom">
        <div className="panel p-7 sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <span className="eyebrow">Trabajos y referencias</span>
              <h2 className="mt-5 font-heading text-4xl font-bold leading-tight text-steel-950 sm:text-5xl">
                Evidencia visual del tipo de trabajos que N Proyectos ejecuta.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-industrial-500">
              Desde piezas y componentes hasta estructuras, apoyo de ingeniería y
              procesos de fabricación con foco técnico.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {galleryItems.map((item) => (
              <article
                key={item.title}
                className="overflow-hidden rounded-[1.8rem] border border-industrial-200 bg-industrial-50"
              >
                <div className="relative aspect-[5/4] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 1280px) 100vw, 30vw"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                    {item.category}
                  </p>
                  <h3 className="mt-3 font-heading text-2xl font-semibold text-steel-950">
                    {item.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
