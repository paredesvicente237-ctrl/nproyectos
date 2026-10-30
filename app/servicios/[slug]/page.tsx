import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import TrackedContactLink from "@/components/TrackedContactLink";
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
        <section className="relative isolate flex min-h-[720px] flex-col justify-end overflow-hidden bg-[#17191b] px-5 pb-12 pt-32 text-white sm:px-8 sm:pb-16 lg:min-h-[78vh] lg:px-10">
          <Image src={service.image} alt={service.imageAlt} fill priority className="-z-10 object-cover" sizes="100vw" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(15,17,18,.88)_0%,rgba(15,17,18,.55)_54%,rgba(15,17,18,.12)_100%)]" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#17191b]/90 via-transparent to-[#17191b]/15" />
          <div className="container-custom w-full">
            <nav aria-label="Migas de pan" className="flex flex-wrap items-center gap-1.5 text-sm text-white/65">
              <Link href="/" className="hover:text-white">Inicio</Link><ChevronRight className="h-4 w-4" /><Link href="/#especialidades" className="hover:text-white">Servicios</Link><ChevronRight className="h-4 w-4" /><span className="text-white">{service.shortName}</span>
            </nav>
            <p className="mt-10 flex items-center gap-3 text-sm font-semibold text-blue-200"><span className="h-px w-8 bg-blue-400" />{service.eyebrow}</p>
            <h1 className="mt-5 max-w-5xl text-balance text-4xl font-semibold leading-[.92] tracking-[-.065em] text-white sm:text-6xl lg:text-[5.5rem]">{service.title}</h1>
            <p className="mt-6 max-w-3xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">{service.summary}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="/#contacto" className="btn-primary !bg-blue-600 hover:!bg-blue-500">Solicitar cotización <ArrowRight className="h-4 w-4" /></a>
              <TrackedContactLink channel="whatsapp" href={companyInfo.whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 border border-white/60 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white hover:text-[#17191b]">Consultar por WhatsApp</TrackedContactLink>
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
              <ul className="mt-8 grid gap-x-7 sm:grid-cols-2">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 border-t border-slate-200 py-4 text-sm leading-6 text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-navy-600" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            <aside className="border-t-2 border-blue-700 bg-slate-50 p-6 sm:p-8">
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
                <span key={material} className="border-b border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-600">
                    {material}
                  </span>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="section-padding bg-[#17191b]">
          <div className="container-custom">
            <span className="eyebrow !text-blue-300 before:!bg-blue-400">Cómo trabajamos</span>
            <h2 className="section-title text-white">Del requerimiento a una solución fabricable.</h2>
            <div className="relative mt-12 grid gap-y-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
              <div aria-hidden="true" className="absolute left-0 right-0 top-2 hidden h-px bg-white/20 lg:block" />
              {service.process.map((step, index) => (
                <article key={step.title} className="relative border-l border-white/20 px-5 lg:mt-0 lg:px-6 first:lg:pl-0">
                  <span className="relative z-10 inline-flex h-5 w-5 items-center justify-center rounded-full border border-blue-300 bg-[#17191b] text-[10px] font-semibold text-blue-200">{index + 1}</span>
                  <h3 className="mt-5 text-lg font-semibold text-white">{step.title}</h3>
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
                <Link key={item.slug} href={`/servicios/${item.slug}`} className="group border-t border-slate-300 py-6 hover:border-blue-700 sm:px-5 sm:first:pl-0 sm:last:pr-0 sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:pl-5">
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

        <section className="section-padding bg-[#17191b]">
          <div className="container-custom flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-3xl font-semibold text-white">¿Tienes planos, medidas o una idea?</h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300">
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
