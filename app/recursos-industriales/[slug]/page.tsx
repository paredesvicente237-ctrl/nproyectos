import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PublicSalesAssistant from "@/components/PublicSalesAssistant";
import TrackedQuoteLink from "@/components/TrackedQuoteLink";
import { companyInfo } from "@/components/siteData";
import { industrialResources, industrialResourcesBySlug } from "@/lib/industrialResources";
import { products } from "@/lib/productData";
import { servicesBySlug } from "@/lib/serviceData";

type ResourcePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return industrialResources.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ResourcePageProps): Promise<Metadata> {
  const { slug } = await params;
  const resource = industrialResourcesBySlug[slug];
  if (!resource) return {};

  return {
    title: resource.seoTitle,
    description: resource.description,
    alternates: { canonical: `/recursos-industriales/${resource.slug}` },
    openGraph: {
      type: "article",
      locale: "es_CL",
      url: `/recursos-industriales/${resource.slug}`,
      title: `${resource.seoTitle} | ${companyInfo.shortName}`,
      description: resource.description,
      siteName: companyInfo.shortName,
      publishedTime: resource.updatedAt,
      modifiedTime: resource.updatedAt,
    },
  };
}

export default async function IndustrialResourcePage({ params }: ResourcePageProps) {
  const { slug } = await params;
  const resource = industrialResourcesBySlug[slug];
  if (!resource) notFound();

  const service = servicesBySlug[resource.serviceSlug];
  const relatedProducts = (resource.productSlugs ?? [])
    .map((productSlug) => products.find((product) => product.slug === productSlug))
    .filter((product): product is (typeof products)[number] => Boolean(product));
  const pageUrl = `${companyInfo.website}/recursos-industriales/${resource.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        headline: resource.title,
        description: resource.description,
        dateModified: resource.updatedAt,
        inLanguage: "es-CL",
        mainEntityOfPage: pageUrl,
        author: { "@type": "Organization", name: companyInfo.shortName, url: companyInfo.website },
        publisher: { "@type": "Organization", name: companyInfo.shortName, url: companyInfo.website },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: companyInfo.website },
          { "@type": "ListItem", position: 2, name: "Recursos industriales", item: `${companyInfo.website}/recursos-industriales` },
          { "@type": "ListItem", position: 3, name: resource.title, item: pageUrl },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Navbar />
      <main className="npro-public relative z-10">
        <article>
          <header className="bg-[#17191b] px-5 pb-12 pt-32 text-white sm:px-8 sm:pb-16 lg:px-10">
            <div className="container-custom">
              <nav aria-label="Migas de pan" className="mb-10 flex flex-wrap items-center gap-2 text-sm text-white/65">
                <Link href="/" className="hover:text-white">Inicio</Link>
                <span aria-hidden="true">/</span>
                <Link href="/recursos-industriales" className="hover:text-white">Recursos industriales</Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page" className="text-white">{resource.title}</span>
              </nav>
              <p className="eyebrow !text-orange-300 before:!bg-orange-500">Guía práctica · {service.shortName}</p>
              <h1 className="mt-4 max-w-4xl text-balance text-4xl font-semibold tracking-[-.05em] sm:text-6xl">{resource.title}</h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-white/75 sm:text-lg">{resource.summary}</p>
              <p className="mt-5 text-xs text-white/55">Actualizada el 25 de noviembre de 2026 · Contenido orientativo</p>
            </div>
          </header>

          <div className="bg-white px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
            <div className="container-custom grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16">
              <div className="max-w-3xl">
                {resource.sections.map((section) => (
                  <section key={section.heading} className="mb-9 border-t border-slate-200 pt-5">
                    <h2 className="text-2xl font-semibold tracking-tight text-[#252729]">{section.heading}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="mt-4 text-base leading-7 text-slate-700">{paragraph}</p>
                    ))}
                    {section.bullets && (
                      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700">
                        {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                      </ul>
                    )}
                  </section>
                ))}

                {resource.sources && (
                  <section className="border-t border-slate-200 pt-5" aria-labelledby="guide-sources-title">
                    <h2 id="guide-sources-title" className="text-lg font-semibold text-[#252729]">Fuentes para profundizar</h2>
                    <ul className="mt-3 space-y-2">
                      {resource.sources.map((source) => (
                        <li key={source.href}>
                          <a href={source.href} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center gap-2 text-sm font-medium text-blue-800 underline decoration-blue-300 underline-offset-4 hover:text-blue-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-800">
                            {source.label}<ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>

              <aside className="h-fit border-t-2 border-[#a94f00] bg-[#f5f5f2] p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[.14em] text-[#a94f00]">Siguiente paso</p>
                <h2 className="mt-3 text-xl font-semibold text-[#252729]">Revisemos tu proyecto</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">Comparte lo que ya tienes; no necesitas resolver cada detalle técnico antes de consultar.</p>
                <TrackedQuoteLink href="/#contacto" location="industrial_resource" serviceType={resource.serviceSlug} className="btn-primary mt-5 w-full">Cotizar mi proyecto <ArrowRight aria-hidden="true" className="h-4 w-4" /></TrackedQuoteLink>
                <Link href={`/servicios/${resource.serviceSlug}`} className="mt-4 inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-slate-700 underline decoration-slate-300 underline-offset-4 hover:text-[#a94f00]">
                  Servicio: {resource.serviceLabel}<ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
                {relatedProducts.length > 0 && (
                  <div className="mt-5 border-t border-slate-200 pt-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">Productos relacionados</p>
                    <ul className="mt-2 space-y-1">
                      {relatedProducts.map((product) => (
                        <li key={product.slug}>
                          <Link href={`/productos/${product.slug}`} className="inline-flex min-h-9 items-center text-sm text-slate-700 underline decoration-slate-300 underline-offset-4 hover:text-[#a94f00]">{product.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </aside>
            </div>
          </div>
        </article>

        <div className="border-t border-slate-200 bg-[#f5f5f2] px-5 py-6 sm:px-8 lg:px-10">
          <div className="container-custom">
            <Link href="/recursos-industriales" className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-slate-700 hover:text-[#a94f00]">
              <ArrowLeft aria-hidden="true" className="h-4 w-4" /> Volver a todas las guías
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <PublicSalesAssistant compactOnMobile />
    </>
  );
}
