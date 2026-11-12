import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Download } from "lucide-react";
import { notFound, permanentRedirect } from "next/navigation";
import { companyInfo } from "@/components/siteData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PublicSalesAssistant from "@/components/PublicSalesAssistant";
import TrackedContactLink from "@/components/TrackedContactLink";
import TrackedProductDownloadLink from "@/components/TrackedProductDownloadLink";
import TrackedQuoteLink from "@/components/TrackedQuoteLink";
import { products } from "@/lib/productData";
import { productImages } from "@/lib/productImages";

type ProductPageProps = { params: Promise<{ slug: string }> };

function findProduct(slug: string) {
  return products.find((product) => product.slug === slug)
    ?? products.find((product) => product.id === slug);
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = findProduct(slug);
  if (!product) return {};

  const image = productImages[product.id][0];
  return {
    title: { absolute: product.seoTitle },
    description: product.seoDescription,
    alternates: { canonical: `/productos/${product.slug}` },
    openGraph: {
      type: "website",
      locale: "es_CL",
      url: `/productos/${product.slug}`,
      title: product.seoTitle,
      description: product.seoDescription,
      siteName: companyInfo.shortName,
      images: [{ url: image.src.src, alt: image.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: product.seoTitle,
      description: product.seoDescription,
      images: [image.src.src],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = findProduct(slug);
  if (!product) notFound();
  if (slug !== product.slug) permanentRedirect(`/productos/${product.slug}`);

  const images = productImages[product.id];
  const pageUrl = `${companyInfo.website}/productos/${product.slug}`;
  const whatsappUrl = `${companyInfo.whatsappHref.split("?")[0]}?text=${encodeURIComponent(
    `Hola Américo, quiero cotizar ${product.name} (${product.code}) con N Proyectos.`,
  )}`;
  const sameCategoryProducts = products
    .filter((item) => item.id !== product.id && item.category === product.category)
    .slice(0, 3);
  const relatedProducts = sameCategoryProducts.length > 0
    ? sameCategoryProducts
    : products.filter((item) => item.id !== product.id).slice(0, 3);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        // Quote-only catalog: no verified price or reviews to support a Google
        // product snippet. Describe the page without fabricating an Offer.
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        name: product.searchHeading,
        description: product.description,
        inLanguage: "es-CL",
        about: {
          "@type": "Thing",
          name: product.name,
          identifier: product.code,
          description: product.description,
        },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
        image: images.map((image) => `${companyInfo.website}${image.src.src}`),
        url: pageUrl,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: companyInfo.website },
          { "@type": "ListItem", position: 2, name: "Productos", item: `${companyInfo.website}/productos` },
          { "@type": "ListItem", position: 3, name: product.name, item: pageUrl },
        ],
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
      <main className="npro-public relative z-10">
        <section className="bg-[#F5F5F2] px-5 pb-14 pt-28 sm:px-8 sm:pb-20 lg:px-10 lg:pb-24">
          <div className="container-custom">
            <nav aria-label="Migas de pan" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-500">
              <Link href="/" className="hover:text-blue-800">Inicio</Link><span aria-hidden="true">/</span>
              <Link href="/productos" className="hover:text-blue-800">Productos</Link><span aria-hidden="true">/</span>
              <span aria-current="page" className="text-slate-900">{product.name}</span>
            </nav>

            <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-14">
              <div className="relative order-2 aspect-[4/3] overflow-hidden bg-[#d9dcda] lg:order-1 lg:aspect-[1.15/1]">
                <Image src={images[0].src} alt={images[0].alt} fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 52vw" />
              </div>
              <div className="order-1 lg:order-2">
                <Link href="/productos" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900">
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Volver al catálogo
                </Link>
                <p className="mt-8 text-sm font-semibold text-blue-700">{product.category} <span className="ml-2 text-slate-500">{product.code}</span></p>
                <h1 className="mt-3 text-balance text-4xl font-semibold leading-[1.02] tracking-[-.055em] text-slate-950 sm:text-5xl lg:text-6xl">{product.searchHeading}</h1>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{product.description}</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <TrackedContactLink channel="whatsapp" href={whatsappUrl} className="btn-primary" target="_blank" rel="noopener noreferrer">Cotizar este producto</TrackedContactLink>
                  <TrackedProductDownloadLink href={product.datasheet} download productName={product.name} productCode={product.code} className="btn-outline"><Download className="h-4 w-4" aria-hidden="true" /> Ficha técnica PDF</TrackedProductDownloadLink>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-500">Atendemos consultas en Santiago y la Región Metropolitana. Para proyectos en otras zonas de Chile, consulta cobertura con ventas.</p>
              </div>
            </div>
          </div>
        </section>

        {images.length > 1 && (
          <section aria-label={`Imágenes de ${product.name}`} className="bg-white px-5 py-8 sm:px-8 lg:px-10">
            <div className="container-custom grid gap-3 sm:grid-cols-2">
              {images.slice(1).map((image) => (
                <div key={image.alt} className="relative aspect-[16/8] overflow-hidden bg-slate-100">
                  <Image src={image.src} alt={image.alt} fill className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" />
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="section-padding bg-white">
          <div className="container-custom grid gap-12 lg:grid-cols-[1fr_.8fr] lg:gap-20">
            <div>
              <p className="eyebrow">Datos del producto</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">Especificaciones de {product.name.toLowerCase()}</h2>
              <dl className="mt-6 grid grid-cols-1 border-t border-slate-200 sm:grid-cols-2">
                {product.specs.map((spec) => (
                  <div key={spec.label} className="border-b border-slate-200 py-4 pr-5">
                    <dt className="text-sm text-slate-500">{spec.label}</dt>
                    <dd className="mt-1 text-base font-semibold text-slate-900">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <p className="eyebrow">Usos y aplicaciones</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">¿Dónde se utiliza?</h2>
              <ul className="mt-6 border-t border-slate-200">
                {product.uses.map((use) => (
                  <li key={use} className="border-b border-slate-200 py-3 text-base leading-6 text-slate-700">{use}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section-padding bg-slate-50" aria-labelledby="product-faq-title">
          <div className="container-custom max-w-5xl">
            <p className="eyebrow">Información para cotizar</p>
            <h2 id="product-faq-title" className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">Preguntas frecuentes sobre {product.name.toLowerCase()}</h2>
            <div className="mt-7 grid gap-x-10 md:grid-cols-2">
              {product.faqs.map((faq) => (
                <article key={faq.question} className="border-t border-slate-300 py-5">
                  <h3 className="text-lg font-semibold leading-snug text-slate-900">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {relatedProducts.length > 0 && (
          <section className="bg-[#F5F5F2] px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
            <div className="container-custom">
              <p className="eyebrow">Más soluciones</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
                {sameCategoryProducts.length > 0 ? `Otros productos de ${product.category.toLowerCase()}` : "Más productos del catálogo"}
              </h2>
              <div className="mt-7 grid gap-px bg-slate-300 sm:grid-cols-2 lg:grid-cols-3">
                {relatedProducts.map((related) => (
                  <Link key={related.id} href={`/productos/${related.slug}`} className="group flex min-h-28 items-center justify-between gap-4 bg-white p-5 hover:bg-blue-50">
                    <span><span className="block text-xs font-semibold text-blue-700">{related.code}</span><span className="mt-1 block text-lg font-semibold text-slate-900">{related.name}</span></span>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-slate-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-700" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="section-padding relative overflow-hidden border-t border-[#e4e0dc] bg-[#f7f5f2] text-[#252729]">
          <div className="container-custom grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold text-[#a94f00]">{product.name} · {product.code}</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#252729] sm:text-4xl">Conversemos sobre tu proyecto</h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">Comparte las medidas, condiciones de operación y aplicación que ya conozcas. El equipo podrá revisar los antecedentes para cotizar.</p>
              {product.id !== "pantalla-movil" && (
                <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600">
                  ¿Necesitas orientar la selección? Revisa el servicio de <Link href="/servicios/control-acustico-industrial" className="font-semibold text-[#a94f00] underline underline-offset-4 hover:text-[#7c3900]">control de ruido industrial</Link> y los antecedentes para evaluar tu instalación.
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-3">
              <TrackedContactLink channel="whatsapp" href={whatsappUrl} className="btn-primary" target="_blank" rel="noopener noreferrer">Consultar por WhatsApp</TrackedContactLink>
              <TrackedQuoteLink href="/#contacto" location="product_detail" serviceType={product.name} className="inline-flex min-h-11 items-center justify-center border border-[#c7c4c0] px-5 py-3 text-sm font-semibold text-[#343638] hover:border-[#f47b00] hover:bg-white">Formulario de contacto</TrackedQuoteLink>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <PublicSalesAssistant initialService={product.name} />
    </>
  );
}
