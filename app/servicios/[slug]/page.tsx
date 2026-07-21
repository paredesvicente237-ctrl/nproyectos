import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import { companyInfo } from "@/components/siteData";
import { services, servicesBySlug } from "@/lib/serviceData";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesBySlug[slug];

  if (!service) return {};

  return {
    title: service.name,
    description: service.description,
    alternates: { canonical: `/servicios/${service.slug}` },
    openGraph: {
      type: "website",
      locale: "es_CL",
      url: `/servicios/${service.slug}`,
      title: `${service.name} | ${companyInfo.shortName}`,
      description: service.description,
      siteName: companyInfo.shortName,
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = servicesBySlug[slug];

  if (!service) notFound();

  const pageUrl = `${companyInfo.website}/servicios/${service.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: service.shortName,
        description: service.description,
        url: pageUrl,
        provider: { "@id": `${companyInfo.website}/#business` },
        areaServed: {
          "@type": "AdministrativeArea",
          name: companyInfo.serviceArea,
        },
        serviceType: service.shortName,
      },
      {
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
            name: "Servicios",
            item: `${companyInfo.website}/#especialidades`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: service.shortName,
            item: pageUrl,
          },
        ],
      },
    ],
  };

  const relatedServices = services.filter((item) => item.slug !== service.slug).slice(0, 3);

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
        <section className="relative overflow-hidden bg-slate-950 px-5 pb-20 pt-32 sm:px-8 md:pb-24 md:pt-40 lg:px-10">
          <Image
            src={service.image}
            alt={service.imageAlt}
            fill
            priority
            className="object-cover opacity-25"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,14,26,.98)_0%,rgba(6,14,26,.88)_55%,rgba(6,14,26,.58)_100%)]" />
          <div className="container-custom relative">
            <nav aria-label="Migas de pan" className="flex flex-wrap items-center gap-1.5 text-sm text-slate-400">
              <Link href="/" className="hover:text-white">Inicio</Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/#especialidades" className="hover:text-white">Servicios</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-slate-200">{service.shortName}</span>
            </nav>
            <p className="mt-10 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-blue-300">
              <span className="h-px w-8 bg-blue-400" /> {service.eyebrow}
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
              {service.title}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
              {service.summary}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="/#contacto" className="btn-primary !bg-blue-600 hover:!bg-blue-500">
                Solicitar cotización <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={companyInfo.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-white"
              >
                Consultar por WhatsApp
              </a>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-custom grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-start">
            <div>
              <span className="eyebrow">Qué hacemos</span>
              <h2 className="section-title">Una solución técnica ajustada a cada requerimiento.</h2>
              <p className="section-copy">
                Atendemos proyectos de empresas, contratistas y áreas de mantenimiento que necesitan fabricar, reponer o desarrollar componentes metálicos. Para cotizar con mayor precisión puedes enviar planos, fotografías, medidas, cantidades, material y plazo esperado.
              </p>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 rounded-md border border-slate-200 p-4 text-sm leading-6 text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-navy-600" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            <aside className="rounded-md bg-slate-50 p-6 sm:p-8">
              <h2 className="text-xl font-semibold">Aplicaciones frecuentes</h2>
              <ul className="mt-5 divide-y divide-slate-200 border-y border-slate-200">
                {service.applications.map((application) => (
                  <li key={application} className="py-3 text-sm font-medium text-slate-700">
                    {application}
                  </li>
                ))}
              </ul>
              <h3 className="mt-8 text-sm font-semibold uppercase tracking-wider text-slate-900">Materiales y soluciones</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {service.materials.map((material) => (
                  <span key={material} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600">
                    {material}
                  </span>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="section-padding bg-slate-950">
          <div className="container-custom">
            <span className="eyebrow !text-blue-300 before:!bg-blue-400">Cómo trabajamos</span>
            <h2 className="section-title text-white">Del requerimiento a una solución fabricable.</h2>
            <div className="mt-12 grid gap-px overflow-hidden rounded-md bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
              {service.process.map((step, index) => (
                <article key={step.title} className="bg-slate-950 p-6 sm:p-7">
                  <span className="text-sm font-semibold text-blue-400">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-8 text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="eyebrow">Más capacidades</span>
                <h2 className="section-title">Servicios relacionados</h2>
              </div>
              <Link href="/#especialidades" className="text-sm font-semibold text-navy-700 hover:text-navy-900">
                Ver todas las capacidades →
              </Link>
            </div>
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {relatedServices.map((item) => (
                <Link key={item.slug} href={`/servicios/${item.slug}`} className="group rounded-md border border-slate-200 p-6 hover:border-navy-300 hover:bg-slate-50">
                  <p className="text-xs font-semibold uppercase tracking-wider text-navy-600">{item.eyebrow}</p>
                  <h3 className="mt-3 text-xl font-semibold group-hover:text-navy-700">{item.shortName}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy-700">
                    Conocer el servicio <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-navy-50">
          <div className="container-custom flex flex-col gap-7 rounded-md bg-white p-7 shadow-sm sm:p-10 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-3xl font-semibold">¿Tienes planos, medidas o una idea?</h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                Cuéntanos qué necesitas fabricar y revisaremos los antecedentes para preparar una propuesta técnica.
              </p>
            </div>
            <a href="/#contacto" className="btn-primary shrink-0">Cotizar proyecto</a>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
