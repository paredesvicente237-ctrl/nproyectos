import type { Metadata } from "next";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CommercialStory from "@/components/CommercialStory";
import Navbar from "@/components/Navbar";
import PublicSalesAssistant from "@/components/PublicSalesAssistant";
import ProductSolutions from "@/components/ProductSolutions";
import { companyInfo } from "@/components/siteData";
import { products } from "@/lib/productData";
import { services } from "@/lib/serviceData";

export const metadata: Metadata = {
  title: { absolute: "Maestranza industrial y corte láser en Santiago | N Proyectos" },
  description:
    "Fabricación metalmecánica, corte láser y plegado de planchas, soldadura MIG/TIG y soluciones acústicas para proyectos industriales en Santiago.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_CL",
    title: "Maestranza industrial y corte láser en Santiago | N Proyectos",
    description:
      "Fabricación metalmecánica, corte láser y plegado de planchas, soldadura MIG/TIG y soluciones acústicas para proyectos industriales en Santiago.",
    url: "/",
    siteName: companyInfo.shortName,
    images: [
      {
        url: "/images/hero-soldadura-nproyectos-premium.webp",
        width: 1672,
        height: 941,
        alt: "Proceso de soldadura industrial; imagen referencial",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maestranza industrial y corte láser en Santiago | N Proyectos",
    description:
      "Fabricación metalmecánica, corte láser y plegado de planchas, soldadura MIG/TIG y soluciones acústicas para proyectos industriales en Santiago.",
    images: ["/images/hero-soldadura-nproyectos-premium.webp"],
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${companyInfo.website}/#business`,
        name: companyInfo.legalName,
        alternateName: companyInfo.shortName,
        description:
          "Empresa metalmecánica dedicada a la fabricación en acero, corte y plegado, soldadura y soluciones de control acústico industrial.",
        url: companyInfo.website,
        telephone: companyInfo.phoneInternational,
        email: companyInfo.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: companyInfo.streetAddress,
          addressLocality: companyInfo.locality,
          addressRegion: companyInfo.region,
          addressCountry: companyInfo.country,
        },
        areaServed: [
          { "@type": "City", name: "Santiago" },
          { "@type": "AdministrativeArea", name: "Región Metropolitana" },
          { "@type": "Country", name: "Chile" },
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: companyInfo.phoneInternational,
          contactType: "sales",
          areaServed: "CL",
          availableLanguage: "Spanish",
        },
        knowsAbout: [
          ...services.map((service) => service.shortName),
          ...products.map((product) => `${product.name} ${product.code}`),
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Servicios metalmecánicos",
          itemListElement: services.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.shortName,
              url: `${companyInfo.website}/servicios/${service.slug}`,
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${companyInfo.website}/#website`,
        url: companyInfo.website,
        name: companyInfo.shortName,
        inLanguage: "es-CL",
        publisher: { "@id": `${companyInfo.website}/#business` },
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
        <CommercialStory />
        <ProductSolutions />
        <Contact />
      </main>
      <Footer />
      <PublicSalesAssistant />
    </>
  );
}
