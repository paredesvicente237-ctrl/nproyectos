import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PublicSalesAssistant from "@/components/PublicSalesAssistant";
import { companyInfo } from "@/components/siteData";
import { industrialResources } from "@/lib/industrialResources";

export const metadata: Metadata = {
  title: "Guías de fabricación y servicios industriales",
  description:
    "Guías prácticas de N Proyectos sobre corte láser, plegado, fabricación metalmecánica, soldadura MIG/TIG y control acústico industrial.",
  alternates: { canonical: "/recursos-industriales" },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "/recursos-industriales",
    title: "Guías de fabricación y servicios industriales | N Proyectos",
    description:
      "Información práctica para preparar proyectos metalmecánicos y revisar soluciones de control acústico industrial.",
    siteName: companyInfo.shortName,
  },
};

export default function IndustrialResourcesPage() {
  const pageUrl = `${companyInfo.website}/recursos-industriales`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Guías industriales de N Proyectos",
    description: "Recursos prácticos para proyectos de fabricación metalmecánica y control acústico.",
    url: pageUrl,
    inLanguage: "es-CL",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: industrialResources.map((resource, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: resource.title,
        url: `${pageUrl}/${resource.slug}`,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Navbar />
      <main className="npro-public relative z-10">
        <section className="bg-[#17191b] px-5 pb-14 pt-32 text-white sm:px-8 sm:pb-20 lg:px-10">
          <div className="container-custom">
            <nav aria-label="Migas de pan" className="mb-10 text-sm text-white/65">
              <Link href="/" className="hover:text-white">Inicio</Link>
              <span aria-hidden="true" className="mx-2">/</span>
              <span aria-current="page" className="text-white">Recursos industriales</span>
            </nav>
            <p className="eyebrow !text-orange-300 before:!bg-orange-500">Información para tu proyecto</p>
            <h1 className="mt-4 max-w-4xl text-balance text-4xl font-semibold tracking-[-.05em] sm:text-6xl">
              Guías para tomar mejores decisiones de fabricación
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
              Orientación práctica para preparar una cotización, entender procesos metalmecánicos y compartir los antecedentes que ayudan a revisar cada requerimiento.
            </p>
          </div>
        </section>

        <section className="bg-[#f5f5f2] px-5 py-12 sm:px-8 sm:py-16 lg:px-10" aria-labelledby="guide-list-title">
          <div className="container-custom">
            <div className="mb-8 flex items-end justify-between gap-5">
              <div>
                <p className="eyebrow">Biblioteca técnica</p>
                <h2 id="guide-list-title" className="section-title mt-3">Elige el tema que necesitas resolver</h2>
              </div>
              <BookOpen aria-hidden="true" className="mb-2 hidden h-8 w-8 text-[#a94f00] sm:block" />
            </div>
            <div className="grid gap-x-8 gap-y-2 md:grid-cols-2 xl:grid-cols-3">
              {industrialResources.map((resource, index) => (
                <article key={resource.slug} className="border-t border-[#c8c9c5] py-6">
                  <p className="text-xs font-semibold uppercase tracking-[.14em] text-[#a94f00]">Guía {String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-3 text-xl font-semibold leading-snug text-[#252729]">
                    <Link href={`/recursos-industriales/${resource.slug}`} className="hover:text-[#a94f00] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a94f00]">
                      {resource.title}
                    </Link>
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{resource.summary}</p>
                  <Link href={`/recursos-industriales/${resource.slug}`} className="mt-4 inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-[#252729] underline decoration-[#c4c3bf] underline-offset-4 hover:text-[#a94f00]">
                    Leer guía <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                </article>
              ))}
            </div>
            <p className="mt-8 border-l-2 border-[#a94f00] pl-4 text-sm leading-6 text-slate-600">
              Estas guías son orientativas. Factibilidad, materiales, dimensiones, plazos, costos y resultados se confirman para cada proyecto.
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <PublicSalesAssistant compactOnMobile />
    </>
  );
}
