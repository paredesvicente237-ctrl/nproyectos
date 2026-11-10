import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import { products } from "@/lib/productData";
import { productImages } from "@/lib/productImages";
import TrackedProductDownloadLink from "@/components/TrackedProductDownloadLink";

export default function ProductSolutions() {
  return (
    <section id="soluciones" className="bg-[#F5F5F2] py-16 sm:py-20 lg:py-24">
      <div className="container-custom px-5 sm:px-8 lg:px-10">
        <div className="mb-9 flex flex-col justify-between gap-5 sm:mb-12 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow">Productos acústicos e industriales</p>
            <h2 className="mt-4 max-w-3xl text-balance text-4xl font-semibold leading-[.98] tracking-[-.06em] text-[#17191b] sm:text-5xl">
              Soluciones para controlar el ruido y proteger tus operaciones.
            </h2>
          </div>
          <div className="max-w-lg lg:pb-1">
            <p className="text-base leading-7 text-[#777D81]">
              Paneles acústicos industriales, silenciadores de escape, productos para ductos de ventilación y protección para trabajos de soldadura. Revisa aplicaciones y fichas técnicas.
            </p>
            <Link href="/productos" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900">
              Explorar catálogo completo <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="grid gap-px bg-[#cfd2d0] sm:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => {
            const image = productImages[product.id][0];
            return (
              <article key={product.id} className="group flex min-w-0 flex-col bg-white">
                <Link href={`/productos/${product.slug}`} className="relative block aspect-[1.42/1] overflow-hidden bg-[#d9dcda]" aria-label={`Ver ${product.name}`}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                    sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 25vw"
                  />
                </Link>
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <p className="text-xs font-semibold text-blue-700">{product.category} <span className="ml-1.5 text-slate-500">{product.code}</span></p>
                  <h3 className="mt-2 text-lg font-semibold leading-snug text-[#17191b] sm:text-xl">
                    <Link href={`/productos/${product.slug}`} className="hover:text-blue-800">{product.name}</Link>
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-[#777D81]">{product.catalogSummary}</p>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-3">
                    <Link href={`/productos/${product.slug}`} className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700 hover:text-blue-900">
                      Ver detalles <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                    <TrackedProductDownloadLink href={product.datasheet} download productName={product.name} productCode={product.code} aria-label={`Descargar ficha técnica de ${product.name}`} className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-blue-700">
                      <Download className="h-3.5 w-3.5" aria-hidden="true" /> PDF
                    </TrackedProductDownloadLink>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
