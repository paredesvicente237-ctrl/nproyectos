import type { Metadata } from "next";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Equipment from "@/components/Equipment";

import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Process from "@/components/Process";
import Services from "@/components/Services";
import WhatsAppButton from "@/components/WhatsAppButton";
import { companyInfo } from "@/components/siteData";
import { services } from "@/lib/serviceData";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
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
        knowsAbout: services.map((service) => service.shortName),
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
        <Hero />
        <About />
        <Services />
        <Process />
        <Equipment />

        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
