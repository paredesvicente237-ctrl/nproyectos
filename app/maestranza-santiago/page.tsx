import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight, FileCheck2, MapPin, Ruler } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import TrackedContactLink from "@/components/TrackedContactLink";
import { siteAssets } from "@/components/siteAssets";
import { companyInfo } from "@/components/siteData";
import { services } from "@/lib/serviceData";

export const metadata: Metadata = {
  title: "Maestranza en Santiago para fabricación industrial",
  description:
    "Maestranza en Santiago ubicada en La Granja. Fabricación metalmecánica, corte y plegado, soldadura MIG/TIG, acero inoxidable y soluciones a medida.",
  keywords: [
    "maestranza en Santiago",
    "maestranza La Granja",
    "empresa metalmecánica Santiago",
    "fabricación acero inoxidable Santiago",
    "fabricación estructuras metálicas Santiago",
    "servicios metalmecánicos Chile",
  ],
  alternates: { canonical: "/maestranza-santiago" },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "/maestranza-santiago",
    title: "Maestranza en Santiago para fabricación industrial | N Proyectos",
    description:
      "Fabricación metalmecánica, corte, plegado y soldadura para proyectos industriales desde La Granja, Santiago.",
    siteName: companyInfo.shortName,
  },
};

const frequentWork = [
  "Piezas y componentes según plano, muestra o medidas",
  "Estructuras, soportes, gabinetes y conjuntos soldados",
  "Campanas, ductería, piping y equipos industriales",
  "Cubiertas, mobiliario y soluciones en acero inoxidable",
  "Paneles, cabinas y elementos para control acústico",
  "Prototipos, reposiciones y desarrollos especiales",
];

const materials = [
  "Acero carbono",
  "Acero inoxidable",
  "Acero galvanizado",
  "Aluminio",
  "Plancha perforada",
  "Plancha diamantada",
  "Cobre",
  "Bronce",
];

const faqs = [
  {
    question: "¿Qué trabajos realiza la maestranza?",
    answer:
      "Realizamos fabricación metalmecánica a medida, corte y plegado de planchas, armado, soldadura MIG/TIG y soluciones de control acústico para proyectos industriales.",
  },
  {
    question: "¿Dónde está ubicada N Proyectos?",
    answer:
      "Estamos en Av. Yungay 743, La Granja, Santiago, y atendemos requerimientos de empresas de la Región Metropolitana y proyectos en Chile.",
  },
  {
    question: "¿Pueden fabricar desde un plano o una muestra?",
    answer:
      "Sí. Podemos revisar planos, modelos, fotografías, muestras o un requerimiento funcional para definir una solución fabricable y preparar la cotización.",
  },
  {
    question: "¿Qué materiales trabajan?",
    answer:
      "Trabajamos principalmente acero carbono, acero inoxidable, acero galvanizado y aluminio, además de otros metales según las necesidades del proyecto.",
  },
  {
    question: "¿Qué información necesito para cotizar?",
    answer:
      "Idealmente debes indicar medidas, cantidades, material, espesor, terminación y plazo. Si tienes planos o fotografías, puedes enviarlos por WhatsApp o correo.",
  },
];

export default function MaestranzaSantiagoPage() {
  const pageUrl = `${companyInfo.website}/maestranza-santiago`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "Servicios de maestranza en Santiago",
        serviceType: "Maestranza y fabricación metalmecánica",
        description:
          "Fabricación metalmecánica, corte y plegado de planchas, soldadura MIG/TIG y soluciones industriales a medida.",
        url: pageUrl,
        provider: { "@id": `${companyInfo.website}/#business` },
        areaServed: [
          { "@type": "City", name: "Santiago" },
          { "@type": "AdministrativeArea", name: "Región Metropolitana" },
          { "@type": "Country", name: "Chile" },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Servicios de maestranza",
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
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: companyInfo.website },
          { "@type": "ListItem", position: 2, name: "Maestranza en Santiago", item: pageUrl },
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
      <main className="relative z-10">
        <section className="relative isolate flex min-h-[720px] flex-col justify-end overflow-hidden bg-[#17191b] px-5 pb-12 pt-32 text-white sm:px-8 sm:pb-16 lg:min-h-[78vh] lg:px-10">
          <Image src={siteAssets.goodWelding} alt="Trabajo de soldadura y fabricación en maestranza de Santiago" fill priority className="-z-10 object-cover object-center" sizes="100vw" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(15,17,18,.88)_0%,rgba(15,17,18,.55)_54%,rgba(15,17,18,.12)_100%)]" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#17191b]/90 via-transparent to-[#17191b]/15" />
          <div className="container-custom w-full">
            <nav aria-label="Migas de pan" className="flex items-center gap-1.5 text-sm text-white/65"><Link href="/" className="hover:text-white">Inicio</Link><ChevronRight className="h-4 w-4" /><span className="text-white">Maestranza en Santiago</span></nav>
            <p className="mt-10 flex items-center gap-3 text-sm font-semibold text-blue-200"><span className="h-px w-8 bg-blue-400" />N Proyectos · La Granja</p>
            <h1 className="mt-5 max-w-5xl text-balance text-4xl font-semibold leading-[.92] tracking-[-.065em] text-white sm:text-6xl lg:text-[5.5rem]">Maestranza en Santiago para fabricación industrial a medida</h1>
            <p className="mt-6 max-w-3xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">Desarrollamos y fabricamos piezas, estructuras y soluciones en acero para minería, manufactura, construcción e industria. Integramos corte, plegado, armado y soldadura en un mismo proyecto.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href="/#contacto" className="btn-primary !bg-blue-600 hover:!bg-blue-500">Solicitar cotización <ArrowRight className="h-4 w-4" /></a><TrackedContactLink channel="whatsapp" href={companyInfo.whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 border border-white/60 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white hover:text-[#17191b]">Cotizar por WhatsApp</TrackedContactLink></div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
              <div>
                <span className="eyebrow">Servicios metalmecánicos</span>
                <h2 className="section-title">Capacidades para llevar una idea a fabricación.</h2>
              </div>
              <p className="section-copy lg:justify-self-end">
                Atendemos trabajos unitarios y proyectos a medida desde nuestra ubicación en La Granja. Revisamos la necesidad técnica, los materiales, las dimensiones y la terminación antes de fabricar.
              </p>
            </div>
            <div className="mt-12 grid border-t border-slate-300 sm:grid-cols-2">
              {services.map((service, index) => (
                <Link key={service.slug} href={`/servicios/${service.slug}`} className="group grid min-h-48 grid-cols-[52px_1fr_auto] items-start gap-4 border-b border-slate-300 px-2 py-6 hover:bg-white sm:px-5">
                  <span className="text-2xl font-semibold tracking-[-.06em] text-slate-300">0{index + 1}</span>
                  <span><span className="block text-xl font-semibold text-slate-950 group-hover:text-blue-800">{service.shortName}</span><span className="mt-2 block text-sm leading-6 text-slate-600">{service.description}</span></span>
                  <span className="mt-1 text-blue-700 transition-transform group-hover:translate-x-1">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-slate-50">
          <div className="container-custom grid gap-10 lg:grid-cols-2">
            <div className="border-t border-slate-300 py-7 sm:pr-10 sm:py-9">
              <div className="flex h-12 w-12 items-center justify-center bg-blue-50 text-blue-700"><Ruler className="h-6 w-6" /></div>
              <h2 className="mt-6 text-3xl font-semibold text-slate-950">Trabajos frecuentes</h2>
              <ul className="mt-7 grid gap-4">
                {frequentWork.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-6 text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-slate-300 py-7 sm:pl-10 sm:py-9">
              <div className="flex h-12 w-12 items-center justify-center bg-blue-50 text-blue-700"><FileCheck2 className="h-6 w-6" /></div>
              <h2 className="mt-6 text-3xl font-semibold text-slate-950">Materiales que trabajamos</h2>
              <p className="mt-4 text-sm leading-6 text-slate-600">Seleccionamos material, espesor y proceso de acuerdo con el uso y la terminación que necesita cada pieza.</p>
              <div className="mt-7 flex flex-wrap gap-2">
                {materials.map((material) => <span key={material} className="border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">{material}</span>)}
              </div>
              <div className="mt-9 flex items-start gap-3 border-t border-slate-200 pt-7">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
                <p className="text-sm leading-6 text-slate-600"><strong className="text-slate-900">Ubicación:</strong> {companyInfo.address}, Santiago de Chile.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-custom grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <span className="eyebrow">Preguntas frecuentes</span>
              <h2 className="section-title">Antes de cotizar tu proyecto.</h2>
              <p className="section-copy">Estas respuestas te ayudarán a preparar los antecedentes que necesitamos para revisar el trabajo.</p>
            </div>
            <div className="divide-y divide-slate-200 border-y border-slate-200">
              {faqs.map((faq) => (
                <article key={faq.question} className="py-6">
                  <h3 className="text-lg font-semibold text-slate-950">{faq.question}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-[#17191b]">
          <div className="container-custom flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-300">Cotización de maestranza</p>
              <h2 className="mt-4 max-w-3xl text-3xl font-semibold text-white sm:text-4xl">Envíanos tus planos, medidas o fotografías.</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">Revisaremos el material, las cantidades, los procesos necesarios y el plazo para preparar una propuesta técnica.</p>
            </div>
            <a href="/#contacto" className="btn-white shrink-0">Cotizar proyecto <ArrowRight className="h-4 w-4" /></a>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
