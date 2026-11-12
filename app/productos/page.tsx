import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { companyInfo } from "@/components/siteData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PublicSalesAssistant from "@/components/PublicSalesAssistant";
import TrackedContactLink from "@/components/TrackedContactLink";
import TrackedQuoteLink from "@/components/TrackedQuoteLink";
import TrackedProductDownloadLink from "@/components/TrackedProductDownloadLink";
import { products } from "@/lib/productData";
import { productImages } from "@/lib/productImages";

export const metadata: Metadata = {
  title: { absolute: "Productos acústicos industriales y control de ruido | N Proyectos" },
  description:
    "Explora espuma acústica, paneles acústicos industriales, splitters para ductos, celosías, silenciadores de escape, paneles perforados y pantallas móviles. Revisa fichas y cotiza.",
  alternates: { canonical: "/productos" },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "/productos",
    title: "Productos acústicos industriales y control de ruido | N Proyectos",
    description:
      "Soluciones para acondicionamiento y control acústico industrial, con fichas técnicas y orientación para cotizar.",
    siteName: companyInfo.shortName,
    images: [
      {
        url: "/images/hero-soldadura-nproyectos-premium.webp",
        width: 1672,
        height: 941,
        alt: "Fabricación metalmecánica de N Proyectos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Productos acústicos industriales | N Proyectos",
    description:
      "Paneles acústicos, silenciadores, splitters, celosías y más soluciones industriales.",
    images: ["/images/hero-soldadura-nproyectos-premium.webp"],
  },
};

export default function ProductosPage() {
  const pageUrl = `${companyInfo.website}/productos`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Productos acústicos e industriales de N Proyectos",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: product.name,
      url: `${pageUrl}/${product.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Navbar />
      <main className="npro-public relative z-10">
        <section className="relative isolate flex min-h-[500px] flex-col justify-end overflow-hidden bg-[#17191b] px-5 pb-12 pt-28 text-white sm:px-8 sm:pb-16 lg:min-h-[620px] lg:px-10">
          <Image
            src={productImages["panel-acustico-naislanpanel"][0].src}
            alt={productImages["panel-acustico-naislanpanel"][0].alt}
            fill
            priority
            className="-z-10 object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(15,17,18,.86)_0%,rgba(15,17,18,.55)_58%,rgba(15,17,18,.12)_100%)]" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#17191b]/90 via-transparent to-[#17191b]/10" />
          <div className="container-custom w-full">
            <nav aria-label="Migas de pan" className="mb-8 flex items-center gap-1.5 text-sm text-white/65">
              <Link href="/" className="hover:text-white">Inicio</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="text-white">Productos</span>
            </nav>
            <p className="text-sm font-semibold text-blue-200">Línea acústica e industrial</p>
            <h1 className="mt-4 max-w-4xl text-balance text-4xl font-semibold leading-[.96] tracking-[-.065em] text-white sm:text-6xl lg:text-[5rem]">
              Productos para el control acústico industrial
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
              Encuentra espuma y paneles acústicos, silenciadores de escape, splitters para ductos, celosías metálicas, paneles perforados y pantallas móviles. Revisa las aplicaciones y fichas técnicas de cada solución.
            </p>
            <a href="#catalogo" className="mt-7 inline-flex min-h-12 items-center gap-2 bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500">
              Explorar productos <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </section>

        <section id="catalogo" className="scroll-mt-20 bg-[#F5F5F2] px-5 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <div className="container-custom">
            <div className="mb-9 max-w-3xl sm:mb-12">
              <p className="eyebrow">Catálogo de productos</p>
              <h2 id="fichas-tecnicas" className="section-title mt-4">Soluciones acústicas para espacios y equipos industriales</h2>
              <p className="section-copy mt-4">
                Compara aplicaciones y especificaciones. Si buscas reducir ruido en salas de máquinas, acondicionar un recinto o tratar ductos de ventilación, abre el producto para ver sus detalles y descargar el PDF.
              </p>
            </div>

            <div className="grid gap-px bg-[#d7dad9] sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => {
                const image = productImages[product.id][0];
                return (
                  <article id={product.id} key={product.id} className="group flex min-w-0 flex-col bg-white scroll-mt-24">
                    <Link href={`/productos/${product.slug}`} className="relative block aspect-[1.55/1] overflow-hidden bg-[#d9dcda]" aria-label={`Ver ${product.name}`}>
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                        sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 33vw"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <p className="text-xs font-semibold text-blue-700">{product.category} <span className="ml-2 text-slate-500">{product.code}</span></p>
                      <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">
                        <Link href={`/productos/${product.slug}`} className="hover:text-blue-800">{product.name}</Link>
                      </h3>
                      <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{product.catalogSummary}</p>
                      <p className="mt-4 border-t border-slate-200 pt-3 text-xs leading-5 text-slate-500">
                        Aplicaciones: {product.uses.slice(0, 3).join(" · ")}
                      </p>
                      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
                        <Link href={`/productos/${product.slug}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-900">
                          Ver producto <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                        <TrackedProductDownloadLink href={product.datasheet} download productName={product.name} productCode={product.code} className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-blue-700">
                          <Download className="h-4 w-4" aria-hidden="true" /> Ficha técnica
                        </TrackedProductDownloadLink>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-custom grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold text-blue-700">Orientación para tu proyecto</p>
              <h2 className="mt-3 max-w-3xl text-balance text-3xl font-semibold tracking-[-.05em] text-[#17191b] sm:text-4xl">
                ¿No sabes qué solución acústica necesitas?
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#5f6669]">
                Cuéntanos qué equipo, espacio o fuente de ruido necesitas resolver. Revisaremos los antecedentes para orientar la solicitud y preparar una cotización.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <TrackedContactLink channel="whatsapp" href={companyInfo.whatsappHref} className="btn-primary" target="_blank" rel="noopener noreferrer">
                Cotizar por WhatsApp
              </TrackedContactLink>
              <TrackedQuoteLink href="/#contacto" location="products_footer" serviceType="productos" className="btn-outline">
                Formulario de contacto
              </TrackedQuoteLink>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <PublicSalesAssistant initialService="Productos acústicos e industriales" compactOnMobile />
    </>
  );
}
