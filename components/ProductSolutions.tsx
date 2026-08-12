import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import { siteAssets } from "@/components/siteAssets";

const products = [
  {
    name: "Splitter acústico",
    code: "NSplitter",
    image: siteAssets.splitter,
    imageAlt: "Splitter acústico fabricado en acero galvanizado",
    description: "Atenuación de ruido para ductos y sistemas de ventilación.",
    detail: "Fabricación a medida · Hasta 3.000 mm",
    href: "/productos#splitter",
    datasheet: "/fichas-tecnicas/splitter-acustico-nsplitter.pdf",
  },
  {
    name: "Panel perforado",
    code: "NPerfAB",
    image: siteAssets.panelPerforado,
    imageAlt: "Panel metálico perforado para solución acústica",
    description: "Revestimiento metálico para muros, cielos y recintos técnicos.",
    detail: "Galvanizado o inoxidable · A medida",
    href: "/productos#panel-perforado",
    datasheet: "/fichas-tecnicas/panel-perforado-nperfab.pdf",
  },
  {
    name: "Espuma acústica",
    code: "NFonoAB",
    image: siteAssets.espumaAcustica,
    imageAlt: "Espuma para acondicionamiento acústico",
    description: "Acondicionamiento de espacios con control de reverberación.",
    detail: "60 × 60 cm · Espesores 4 y 6 cm",
    href: "/productos#espuma-acustica",
    datasheet: "/fichas-tecnicas/espuma-acustica-nfonoab.pdf",
  },
  {
    name: "Pantalla móvil",
    code: "NMóvil",
    image: siteAssets.pantallaMovil,
    imageAlt: "Pantalla móvil industrial para trabajos de soldadura",
    description: "Protección plegable para áreas de soldadura y esmerilado.",
    detail: "Tres cuerpos · Fabricación a medida",
    href: "/productos#pantalla-movil",
    datasheet: "/fichas-tecnicas/pantalla-movil-nmovil.pdf",
  },
];

export default function ProductSolutions() {
  return (
    <section id="soluciones" className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid gap-6 lg:grid-cols-[0.75fr_1fr] lg:items-end">
          <div>
            <span className="eyebrow">Productos documentados</span>
            <h2 className="section-title">Soluciones con especificaciones disponibles.</h2>
          </div>
          <div className="lg:justify-self-end">
            <p className="section-copy mt-0">Nuestra línea acústica e industrial cuenta con fichas técnicas descargables para revisar materiales, dimensiones y aplicaciones.</p>
            <Link href="/productos#fichas-tecnicas" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900">
              Ver catálogo y documentación <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-12 grid border-l border-t border-slate-300 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <article key={product.code} className="group flex flex-col border-b border-r border-slate-300 bg-white">
              <Link href={product.href} className="relative block h-64 overflow-hidden bg-slate-100">
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.025]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <span className="absolute left-4 top-4 bg-[#06152c] px-3 py-2 font-mono text-[10px] font-semibold tracking-[0.14em] text-white">NP / {product.code}</span>
              </Link>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-semibold text-slate-950">{product.name}</h3>
                  <span className="font-mono text-[10px] text-slate-400">0{index + 1}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{product.description}</p>
                <p className="mt-4 border-t border-slate-200 pt-4 text-xs font-medium text-slate-500">{product.detail}</p>
                <div className="mt-6 flex items-center justify-between">
                  <Link href={product.href} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-blue-700 hover:text-blue-900">
                    Ver producto <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <a href={product.datasheet} download aria-label={`Descargar ficha técnica de ${product.name}`} className="flex h-9 w-9 items-center justify-center border border-slate-300 text-slate-500 hover:border-blue-700 hover:bg-blue-700 hover:text-white">
                    <Download className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
