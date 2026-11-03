import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ChevronRight, Download, FileText } from "lucide-react";
import { siteAssets } from "@/components/siteAssets";
import { companyInfo } from "@/components/siteData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PublicSalesAssistant from "@/components/PublicSalesAssistant";
import TrackedContactLink from "@/components/TrackedContactLink";
import { products, type Product } from "@/lib/productData";

type ProductImage = { src: StaticImageData; alt: string };
type ProductWithImages = Product & { images: ProductImage[] };

const productImages: Record<string, ProductImage[]> = {
  "espuma-acustica": [
    { src: siteAssets.espumaAcustica, alt: "Espuma acústica NFonoAB primer plano" },
    { src: siteAssets.espumaAplicacion, alt: "Espuma acústica instalada en cielo" },
    { src: siteAssets.espumaEstudio, alt: "Espuma acústica en estudio de grabación" },
  ],
  "panel-acustico-naislanpanel": [
    { src: siteAssets.naislanPanelProducto, alt: "Panel acústico NAislanPANEL galvanizado" },
    { src: siteAssets.naislanPanelAplicacion, alt: "Encierro industrial construido con paneles acústicos NAislanPANEL" },
  ],
  splitter: [{ src: siteAssets.splitter, alt: "Splitter acústico de acero galvanizado" }],
  celosia: [{ src: siteAssets.celosia, alt: "Celosía acústica instalada en fachada" }],
  "silenciador-escape-gases": [{ src: siteAssets.silenciadorEscapeGases, alt: "Silenciador de escape de gases NSilenSE" }],
  "panel-perforado": [
    { src: siteAssets.panelPerforado, alt: "Panel perforado metálico" },
    { src: siteAssets.panelAplicacion, alt: "Panel perforado instalado en cielo" },
  ],
  "pantalla-movil": [{ src: siteAssets.pantallaMovil, alt: "Pantalla móvil plegable para soldadura" }],
};

const productCards: ProductWithImages[] = products.map((product) => ({
  ...product,
  images: productImages[product.id] ?? [],
}));

export const metadata: Metadata = {
  title: "Productos acústicos e industriales a medida",
  description:
    "Productos acústicos e industriales fabricados a medida en Chile: silenciadores de escape, paneles acústicos, espuma acústica, splitters, celosías y pantallas móviles.",
  alternates: { canonical: "/productos" },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "/productos",
    title: "Productos acústicos e industriales a medida | N Proyectos",
    description:
      "Silenciadores de escape, paneles acústicos, espuma acústica, splitters, celosías y pantallas móviles fabricados según cada proyecto.",
    siteName: companyInfo.shortName,
    images: [
      {
        url: "/images/hero-soldadura-nproyectos-premium.webp",
        width: 1672,
        height: 941,
        alt: "Fabricación industrial de N Proyectos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Productos acústicos e industriales a medida | N Proyectos",
    description:
      "Silenciadores, paneles acústicos, espuma, splitters, celosías y pantallas industriales fabricados a medida.",
    images: ["/images/hero-soldadura-nproyectos-premium.webp"],
  },
};

function ProductCard({ product, index }: { product: ProductWithImages; index: number }) {
  return (
    <div id={product.id} className="scroll-mt-24">
      <header className="mb-8 grid gap-5 border-b border-[#DADDDC] pb-7 sm:grid-cols-[120px_1fr] sm:items-end lg:mb-10 lg:grid-cols-[170px_1fr_auto] lg:pb-9">
        <span className="text-5xl font-semibold leading-none tracking-[-.08em] text-[#c7cbca] sm:text-6xl">0{index + 1}</span>
        <div>
          <p className="text-sm font-semibold text-blue-700">{product.category} <span className="ml-2 text-[#777D81]">{product.code}</span></p>
          <h2 className="mt-3 text-3xl font-semibold leading-[1.02] tracking-[-.06em] text-[#17191b] sm:text-4xl lg:text-5xl">{product.name}</h2>
        </div>
        <p className="max-w-xl text-base leading-7 text-[#777D81] lg:justify-self-end">{product.description}</p>
      </header>

      <div className={`grid gap-2 ${product.images.length === 1 ? "grid-cols-1" : "grid-cols-12"}`}>
        {product.images.map((image, imageIndex) => (
          <div key={image.alt} className={`relative min-h-[240px] overflow-hidden bg-[#dedfdd] sm:min-h-[320px] ${product.images.length === 1 ? "aspect-[16/8] lg:min-h-[440px]" : imageIndex === 0 ? "col-span-12 lg:col-span-7 lg:row-span-2 lg:min-h-[500px]" : "col-span-6 lg:col-span-5 lg:min-h-[246px]"}`}>
            <Image src={image.src} alt={image.alt} fill className="object-cover" sizes={imageIndex === 0 ? "(max-width: 1024px) 100vw, 58vw" : "(max-width: 1024px) 50vw, 40vw"} />
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:gap-14">
        <div>
          <p className="text-sm font-semibold text-[#17191b]">Especificaciones</p>
          <dl className="mt-4 grid grid-cols-2 border-t border-[#DADDDC] sm:grid-cols-3">
            {product.specs.map((spec) => (
              <div key={spec.label} className="border-b border-[#DADDDC] py-4 pr-4">
                <dt className="text-xs font-medium text-[#777D81]">{spec.label}</dt>
                <dd className="mt-1 text-sm font-semibold text-[#17191b]">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <p className="text-sm font-semibold text-[#17191b]">Aplicaciones</p>
          <ul className="mt-4 border-t border-[#DADDDC]">
            {product.uses.map((use) => <li key={use} className="border-b border-[#DADDDC] py-2.5 text-sm text-[#5f6669]">{use}</li>)}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <TrackedContactLink channel="whatsapp" href={`${companyInfo.whatsappHref.replace("cotizar%20un%20proyecto", `cotizar%20${encodeURIComponent(product.name)}`)}`} className="btn-primary" target="_blank" rel="noopener noreferrer">Cotizar este producto</TrackedContactLink>
            <a href={product.datasheet} download className="btn-outline"><Download className="h-4 w-4" aria-hidden="true" />Descargar ficha técnica</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductosPage() {
  const pageUrl = `${companyInfo.website}/productos`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: companyInfo.website,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Productos",
        item: pageUrl,
      },
    ],
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
      <main className="relative z-10">
        {/* Hero */}
        <section className="relative isolate flex min-h-[760px] flex-col justify-end overflow-hidden bg-[#17191b] px-5 pb-12 pt-32 text-white sm:px-8 sm:pb-16 lg:min-h-[78vh] lg:px-10">
          <Image src={productCards[1].images[0].src} alt={productCards[1].images[0].alt} fill priority className="-z-10 object-cover" sizes="100vw" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(15,17,18,.83)_0%,rgba(15,17,18,.48)_58%,rgba(15,17,18,.08)_100%)]" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#17191b]/90 via-transparent to-[#17191b]/10" />
          <div className="container-custom w-full">
            <nav aria-label="Migas de pan" className="mb-8 flex items-center gap-1.5 text-sm text-white/65">
              <Link href="/" className="hover:text-white">Inicio</Link>
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
              <span aria-current="page" className="text-white">Productos</span>
            </nav>
            <span className="flex items-center gap-3 text-sm font-semibold text-blue-200"><span className="h-px w-8 bg-blue-400" />Catálogo industrial</span>
            <h1 className="mt-5 max-w-4xl text-balance text-4xl font-semibold leading-[.92] tracking-[-.065em] text-white sm:text-6xl lg:text-[5.5rem]">
              Productos acústicos e industriales a medida
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
              Soluciones acústicas e industriales fabricadas a medida. Cada
              producto es diseñado y producido según los requerimientos
              específicos de tu proyecto.
            </p>

            {/* Quick nav */}
            <div className="mt-10 flex flex-wrap justify-start gap-x-3 gap-y-2">
              <a href="#fichas-tecnicas" className="btn-primary !bg-blue-600 hover:!bg-blue-500">
                Descargar fichas técnicas
              </a>
              {products.map((p) => (
                <a
                  key={p.id}
                  href={`#${p.id}`}
                  className="border-b border-white/50 px-3 py-2 text-xs font-semibold text-white/85 transition-colors hover:border-white hover:text-white"
                >
                  {p.name}
                </a>
              ))}
            </div>
            </div>
        </section>

        {/* Technical sheets */}
        <section
          id="fichas-tecnicas"
          className="scroll-mt-20 border-b border-slate-200 bg-slate-100 px-5 py-16 sm:px-8 md:py-20 lg:px-10"
        >
          <div className="container-custom grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <span className="eyebrow">Documentación técnica</span>
              <h2 className="section-title">
                Una ficha clara para cada producto.
              </h2>
              <p className="section-copy">
                Descarga especificaciones, aplicaciones y datos de contacto en
                PDF. Cada documento está preparado para compartir, imprimir o
                adjuntar a una solicitud de cotización.
              </p>
              <div className="mt-7 flex items-center gap-3 text-sm font-semibold text-slate-700">
                <span className="flex h-10 w-10 items-center justify-center bg-[#17191b] text-white">
                  <FileText className="h-5 w-5" aria-hidden="true" />
                </span>
                {products.length} fichas disponibles
              </div>
            </div>

            <div className="border-t border-slate-300">
              {products.map((product) => (
                <a
                  key={product.id}
                  href={product.datasheet}
                  download
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-slate-300 bg-white px-4 py-5 transition-colors hover:bg-navy-50 sm:gap-6 sm:px-6"
                >
                  <span className="flex h-11 w-11 items-center justify-center border border-slate-300 bg-white text-[10px] font-bold uppercase tracking-wider text-blue-800">
                    PDF
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                      {product.category} · {product.code}
                    </span>
                    <span className="mt-1 block truncate text-base font-semibold text-slate-950 sm:text-lg">
                      {product.name}
                    </span>
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center border border-slate-300 text-slate-600 transition-colors group-hover:border-blue-700 group-hover:bg-blue-700 group-hover:text-white">
                    <Download className="h-4 w-4" aria-hidden="true" />
                    <span className="sr-only">
                      Descargar ficha técnica de {product.name}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Products */}
        <div className="divide-y divide-slate-100">
          {productCards.map((product, i) => (
            <section
              key={product.id}
          className={`section-padding ${i % 2 === 0 ? "bg-white" : "bg-[#F5F5F2]"}`}
            >
              <div className="container-custom">
                <ProductCard product={product} index={i} />
              </div>
            </section>
          ))}
        </div>

        {/* CTA final */}
        <section className="section-padding relative overflow-hidden bg-[#17191b] text-white">
          <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-1/3 border-l border-white/10 lg:block" />
          <div className="container-custom relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
            <p className="text-sm font-semibold text-blue-200">Productos acústicos e industriales</p>
            <h2 className="mt-4 max-w-3xl text-balance text-3xl font-semibold tracking-[-.05em] text-white sm:text-4xl">
              ¿Necesitas un producto a medida?
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
              Fabricamos según tus especificaciones técnicas. Cuéntanos tu
              proyecto y te entregamos una cotización sin compromiso.
            </p>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <TrackedContactLink
                channel="whatsapp"
                href={companyInfo.whatsappHref}
                className="btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Cotizar por WhatsApp
              </TrackedContactLink>
              <Link href="/#contacto" className="inline-flex min-h-11 items-center justify-center gap-2 border border-white/50 px-5 py-3 text-sm font-semibold text-white hover:bg-white hover:text-[#17191b]">
                Formulario de contacto
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <PublicSalesAssistant initialService="Productos acústicos e industriales" />
    </>
  );
}
