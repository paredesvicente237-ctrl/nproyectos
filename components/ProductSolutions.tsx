import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import { siteAssets } from "@/components/siteAssets";

const products = [
  { name: "Splitter acústico", code: "NSplitter", image: siteAssets.splitter, imageAlt: "Splitter acústico fabricado en acero galvanizado", description: "Atenuación de ruido para ductos y sistemas de ventilación.", detail: "Fabricación a medida · Hasta 3.000 mm", href: "/productos#splitter", datasheet: "/fichas-tecnicas/splitter-acustico-nsplitter.pdf" },
  { name: "Panel perforado", code: "NPerfAB", image: siteAssets.panelPerforado, imageAlt: "Panel metálico perforado para solución acústica", description: "Revestimiento metálico para muros, cielos y recintos técnicos.", detail: "Galvanizado o inoxidable · A medida", href: "/productos#panel-perforado", datasheet: "/fichas-tecnicas/panel-perforado-nperfab.pdf" },
  { name: "Espuma acústica", code: "NFonoAB", image: siteAssets.espumaAcustica, imageAlt: "Espuma para acondicionamiento acústico", description: "Acondicionamiento de espacios con control de reverberación.", detail: "60 × 60 cm · Espesores 4 y 6 cm", href: "/productos#espuma-acustica", datasheet: "/fichas-tecnicas/espuma-acustica-nfonoab.pdf" },
  { name: "Pantalla móvil", code: "NMóvil", image: siteAssets.pantallaMovil, imageAlt: "Pantalla móvil industrial para trabajos de soldadura", description: "Protección plegable para áreas de soldadura y esmerilado.", detail: "Tres cuerpos · Fabricación a medida", href: "/productos#pantalla-movil", datasheet: "/fichas-tecnicas/pantalla-movil-nmovil.pdf" },
];

export default function ProductSolutions() {
  const [featured, ...others] = products;
  return (
    <section id="soluciones" className="bg-[#F5F5F2] py-16 sm:py-20 lg:py-28">
      <div className="container-custom px-5 sm:px-8 lg:px-10">
        <div className="mb-10 flex flex-col justify-between gap-6 lg:mb-14 lg:flex-row lg:items-end">
          <div><p className="eyebrow">Productos</p><h2 className="mt-5 max-w-3xl text-balance text-4xl font-semibold leading-[.98] tracking-[-.065em] text-[#17191b] sm:text-5xl lg:text-[3.5rem]">Soluciones listas para tu proyecto.</h2></div>
          <div className="max-w-lg lg:pb-1"><p className="text-base leading-7 text-[#777D81]">Nuestra línea acústica e industrial cuenta con fichas técnicas descargables para revisar materiales, dimensiones y aplicaciones.</p><Link href="/productos#fichas-tecnicas" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900">Ver catálogo y fichas técnicas <ArrowUpRight className="h-4 w-4" /></Link></div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">
          <article className="group">
            <Link href={featured.href} className="relative block min-h-[340px] overflow-hidden bg-[#d9dcda] sm:min-h-[460px]">
              <Image src={featured.image} alt={featured.imageAlt} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.025]" sizes="(max-width: 1024px) 100vw, 55vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#17191b]/80 via-transparent to-transparent" />
              <span className="absolute bottom-0 left-0 bg-[#17191b] px-5 py-4 text-xs font-semibold text-white">{featured.code}</span>
              <div className="absolute bottom-0 left-20 right-0 p-5 text-white sm:p-7"><h3 className="text-2xl font-semibold text-white sm:text-3xl">{featured.name}</h3><p className="mt-1 text-sm text-white/80">{featured.detail}</p></div>
            </Link>
            <p className="mt-4 max-w-xl text-sm leading-6 text-[#777D81]">{featured.description}</p>
            <div className="mt-4 flex flex-wrap items-center gap-6"><Link href={featured.href} className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900">Ver producto <ArrowUpRight className="h-4 w-4" /></Link><a href={featured.datasheet} download aria-label={`Descargar ficha técnica de ${featured.name}`} className="inline-flex items-center gap-2 text-sm font-medium text-[#777D81] hover:text-blue-700"><Download className="h-4 w-4" /> Ficha técnica</a></div>
          </article>

          <div className="border-t border-[#cfd2d0]">
            {others.map((product) => (
              <article key={product.code} className="group grid grid-cols-[112px_1fr] gap-4 border-b border-[#cfd2d0] py-5 sm:grid-cols-[150px_1fr] sm:gap-6">
                <Link href={product.href} className="relative min-h-[116px] overflow-hidden bg-[#d9dcda] sm:min-h-[140px]"><Image src={product.image} alt={product.imageAlt} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" sizes="(max-width: 640px) 112px, 150px" /></Link>
                <div className="flex flex-col justify-center"><p className="text-xs font-semibold text-blue-700">{product.code}</p><h3 className="mt-1 text-lg font-semibold text-[#17191b] sm:text-xl">{product.name}</h3><p className="mt-2 line-clamp-2 text-sm leading-5 text-[#777D81]">{product.description}</p><div className="mt-3 flex flex-wrap gap-x-5 gap-y-2"><Link href={product.href} className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-900">Ver producto <ArrowUpRight className="h-3.5 w-3.5" /></Link><a href={product.datasheet} download className="inline-flex items-center gap-1 text-xs font-medium text-[#777D81] hover:text-blue-700"><Download className="h-3.5 w-3.5" />PDF</a></div></div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
