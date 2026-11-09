import Image from "next/image";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  DraftingCompass,
  FileCheck2,
  MapPin,
  Ruler,
  Scissors,
  Wrench,
} from "lucide-react";
import { siteAssets } from "@/components/siteAssets";
import TrackedQuoteLink from "@/components/TrackedQuoteLink";
import VerifiedProof from "@/components/VerifiedProof";
import { companyInfo } from "@/components/siteData";
import { servicesBySlug } from "@/lib/serviceData";

const serviceStories = [
  {
    slug: "fabricacion-metalmecanica",
    title: "Fabricación metalmecánica",
    summary: "Piezas, equipos, ductos y estructuras desarrollados según planos o requerimientos funcionales.",
    marker: "01",
  },
  {
    slug: "soldadura-mig-tig",
    title: "Armado y soldadura MIG/TIG",
    summary: "Uniones y conjuntos metálicos integrados a la fabricación del proyecto.",
    marker: "02",
  },
  {
    slug: "control-acustico-industrial",
    title: "Control acústico industrial",
    summary: "Paneles, silenciadores, cabinas y componentes para sistemas y recintos industriales.",
    marker: "03",
  },
];

const processGallery = [
  { image: siteAssets.goodBending, title: "Plegado de planchas", position: "object-[54%_center]" },
  { image: siteAssets.goodSparks, title: "Preparación y corte", position: "object-[56%_center]" },
  { image: siteAssets.goodWelding, title: "Armado y soldadura", position: "object-[55%_center]" },
];

const questions = [
  {
    question: "¿Puedo consultar si todavía no tengo un plano?",
    answer:
      "Sí. Puedes comenzar con una idea, una muestra o medidas aproximadas. El equipo revisará contigo qué antecedentes hacen falta para evaluar el requerimiento.",
  },
  {
    question: "¿Qué información ayuda a preparar una cotización?",
    answer:
      "Si la tienes, comparte el uso de la pieza, material, espesor, medidas, cantidad y terminación. Un plano, archivo o fotografías también pueden ayudar a entender el alcance.",
  },
  {
    question: "¿Qué servicios puedo consultar?",
    answer:
      "Fabricación metalmecánica, corte y plegado de planchas, armado y soldadura MIG/TIG, fabricación especial y soluciones de control acústico industrial.",
  },
  {
    question: "¿Entregan precio y plazo en forma automática?",
    answer:
      "No. Cada solicitud se revisa según sus especificaciones y alcance antes de preparar una cotización. No publicamos un precio ni un plazo sin esa evaluación.",
  },
];

export default function CommercialStory() {
  const cuttingService = servicesBySlug["corte-plegado-planchas"];

  return (
    <>
      <section id="inicio" className="commercial-hero relative overflow-hidden bg-[#f1f3f2] pt-[76px] text-[#17232c]">
        <div className="container-custom grid lg:min-h-[690px] lg:grid-cols-[.9fr_1.1fr]">
          <div className="relative z-10 flex flex-col justify-center px-5 pb-8 pt-12 sm:px-8 sm:pt-16 lg:px-10 lg:py-16 lg:pr-12 xl:pr-16">
            <p className="inline-flex items-center gap-3 text-[11px] font-bold tracking-[.18em] text-[#155fc3] sm:text-xs">
              <span className="h-px w-8 bg-[#155fc3]" />
              MAESTRANZA INDUSTRIAL · SANTIAGO
            </p>
            <h1 className="mt-6 max-w-[680px] text-[clamp(2.5rem,10.5vw,3.1rem)] font-extrabold uppercase leading-[.88] tracking-[-.045em] text-[#142330] sm:mt-8 sm:text-[clamp(3.4rem,8.5vw,6.5rem)] lg:text-[clamp(4rem,6.2vw,6.25rem)]">
              <span className="block">Fabricamos</span>
              <span className="block">lo que tu</span>
              <span className="block">industria</span>
              <span className="block">necesita.</span>
            </h1>
            <p className="mt-6 max-w-[570px] text-[15px] leading-7 text-[#53616b] sm:mt-7 sm:text-lg sm:leading-8">
              Convertimos planos, ideas y desafíos técnicos en soluciones metalmecánicas a medida. Ingeniería, fabricación y precisión para proyectos industriales exigentes.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center">
              <TrackedQuoteLink
                href="/#contacto"
                location="hero"
                className="inline-flex min-h-[54px] items-center justify-center gap-3 bg-[#155fc3] px-6 text-sm font-bold text-white shadow-[0_8px_22px_rgba(21,95,195,.2)] transition-all hover:-translate-y-0.5 hover:bg-[#0e4fa8] hover:shadow-[0_12px_28px_rgba(21,95,195,.27)]"
              >
                Solicitar cotización <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </TrackedQuoteLink>
              <Link
                href="/#especialidades"
                className="inline-flex min-h-[50px] items-center justify-center gap-2 px-3 text-sm font-semibold text-[#263a49] transition-colors hover:text-[#155fc3]"
              >
                Conocer nuestras capacidades <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-[#cbd3d6] pt-4 text-xs font-semibold text-[#53616b] sm:mt-10 sm:gap-x-7 sm:pt-5 sm:text-sm">
              <span className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#155fc3]" /> Corte y plegado</span>
              <span className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#155fc3]" /> Soldadura MIG/TIG</span>
              <span className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#155fc3]" /> Fabricación a medida</span>
            </div>
          </div>

          <div className="commercial-hero-media relative isolate min-h-[330px] overflow-hidden bg-[#192d3d] sm:min-h-[470px] lg:my-8 lg:min-h-[640px]">
            <Image
              src="/images/hero-soldadura-nproyectos-clara.webp"
              alt="Proceso de soldadura industrial, imagen referencial; no representa instalaciones de N Proyectos"
              fill
              priority
              fetchPriority="high"
              className="commercial-hero-image -z-10 object-cover object-[58%_center]"
              sizes="(max-width: 1023px) 100vw, 55vw"
            />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0d2030]/55 via-[#0d2030]/6 to-[#0d2030]/0" />
            <div aria-hidden="true" className="absolute inset-y-0 left-0 hidden w-[16%] bg-gradient-to-r from-[#f1f3f2] to-transparent lg:block" />
            <div className="absolute left-4 top-4 border border-white/35 bg-[#0b2132]/45 px-3 py-2 text-[10px] font-semibold tracking-[.12em] text-white backdrop-blur sm:left-6 sm:top-6 sm:text-xs">
              IMAGEN REFERENCIAL
            </div>
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-5 text-white sm:flex-row sm:items-end sm:justify-between sm:p-7 lg:p-9">
              <div>
                <p className="text-xs font-semibold text-white/70">De la definición a la fabricación</p>
                <p className="mt-1 text-xl font-semibold tracking-[-.035em] sm:text-2xl">Una solución pensada para su uso.</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/75 sm:pb-1">
                <MapPin className="h-4 w-4" aria-hidden="true" /> {companyInfo.locality}, Santiago
              </div>
            </div>
            <div aria-hidden="true" className="absolute bottom-5 right-5 hidden h-16 w-16 border-b border-r border-white/50 sm:block lg:bottom-8 lg:right-8 lg:h-24 lg:w-24" />
          </div>
        </div>
      </section>

      <VerifiedProof />

      <section id="especialidades" className="bg-[#f7f8f7] py-16 sm:py-20 lg:py-28">
        <div className="container-custom px-5 sm:px-8 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_.72fr] lg:items-end lg:gap-14">
            <div>
              <p className="inline-flex items-center gap-3 text-xs font-bold tracking-[.16em] text-[#155fc3]"><span className="h-px w-8 bg-[#155fc3]" /> CAPACIDADES PARA TU PROYECTO</p>
              <h2 className="mt-5 max-w-3xl text-balance text-4xl font-semibold leading-[.97] tracking-[-.065em] text-[#17232c] sm:text-5xl lg:text-[4.1rem]">
                Del desafío técnico a una solución fabricable.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-[#5e6a72] sm:text-lg sm:leading-8 lg:justify-self-end">
              Integramos procesos según el material y la geometría. Cuéntanos qué necesitas resolver y revisaremos contigo cómo abordarlo.
            </p>
          </div>

          <article className="mt-9 grid overflow-hidden bg-white shadow-[0_18px_55px_rgba(17,42,62,.08)] lg:mt-12 lg:grid-cols-[1.08fr_.92fr]">
            <div className="group relative min-h-[260px] overflow-hidden bg-[#ccd3d4] sm:min-h-[390px] lg:min-h-[520px]">
              <Image src={siteAssets.fotobuenax1} alt="Corte de una plancha metálica con láser, imagen referencial" fill className="object-cover transition-transform duration-700 group-hover:scale-[1.025]" sizes="(max-width: 1023px) 100vw, 56vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1d2b]/75 via-transparent to-transparent" />
              <span className="absolute left-4 top-4 border border-white/40 bg-[#102b40]/55 px-3 py-2 text-[10px] font-semibold tracking-[.12em] text-white backdrop-blur sm:left-6 sm:top-6 sm:text-xs">IMAGEN REFERENCIAL</span>
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white sm:p-7 lg:p-9">
                <p className="text-xs font-semibold text-white/70">{cuttingService.eyebrow}</p>
                <p className="mt-1 text-2xl font-semibold tracking-[-.04em] sm:text-3xl">Precisión desde el plano.</p>
              </div>
            </div>
            <div className="flex flex-col justify-center px-5 py-7 sm:px-8 sm:py-10 lg:px-12 xl:px-16">
              <div className="flex items-center gap-2 text-xs font-bold text-[#155fc3]"><Scissors className="h-4 w-4" aria-hidden="true" /> CORTE Y CONFORMADO</div>
              <h3 className="mt-4 max-w-xl text-3xl font-semibold leading-[1.02] tracking-[-.055em] text-[#17232c] sm:text-4xl">
                Corte láser y plegado de planchas.
              </h3>
              <p className="mt-4 max-w-xl text-base leading-7 text-[#59666e]">
                Para piezas que deben responder a una geometría definida: revisamos plano, material, espesor y cantidad para evaluar el corte y el plegado necesarios.
              </p>
              <ul className="mt-5 grid gap-2 border-t border-[#dfe4e4] pt-5 text-sm text-[#354550] sm:grid-cols-2">
                {["Corte láser y guillotina", "Plegado de planchas", "Desarrollo según plano", "Piezas para armado"].map((item) => (
                  <li key={item} className="flex items-center gap-2"><Check className="h-4 w-4 text-[#155fc3]" aria-hidden="true" />{item}</li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link href="/servicios/corte-plegado-planchas" className="inline-flex items-center gap-2 text-sm font-bold text-[#155fc3] hover:text-[#0d4b9e]">Detalles del servicio <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
                <TrackedQuoteLink href="/#contacto" location="capability_cutting" serviceType="corte_plegado" className="text-sm font-semibold text-[#2d3b44] underline decoration-[#aab7bf] underline-offset-4 hover:text-[#155fc3]">Cotizar una pieza</TrackedQuoteLink>
              </div>
            </div>
          </article>

          <div className="mt-7 border-y border-[#ccd4d6]">
            {serviceStories.map((story) => {
              const service = servicesBySlug[story.slug];
              return (
                <article key={story.slug} className="grid gap-3 border-b border-[#ccd4d6] py-5 last:border-b-0 sm:grid-cols-[54px_1fr_auto] sm:items-center sm:gap-5 sm:py-6">
                  <span className="font-heading text-sm font-bold text-[#155fc3]">{story.marker}</span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-[-.03em] text-[#17232c] sm:text-xl">{story.title}</h3>
                    <p className="mt-1 max-w-3xl text-sm leading-6 text-[#617079]">{story.summary}</p>
                  </div>
                  <Link href={`/servicios/${service.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-[#155fc3] hover:text-[#0d4b9e]">Explorar <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
                </article>
              );
            })}
          </div>
          <p className="mt-5 text-sm leading-6 text-[#5e6a72]">
            ¿Necesitas una pieza o conjunto especial? Revisamos la geometría, el uso y los materiales para evaluar una fabricación a medida.
          </p>
          <TrackedQuoteLink href="/#contacto" location="custom_fabrication" serviceType="fabricacion_especial" className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-[#155fc3] underline decoration-[#91b8e7] underline-offset-4 hover:text-[#0d4b9e]">
            Cuéntanos el requerimiento <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </TrackedQuoteLink>
        </div>
      </section>

      <section id="nosotros" className="relative overflow-hidden bg-[#102b40] py-14 text-white sm:py-20 lg:py-24">
        <div aria-hidden="true" className="absolute right-0 top-0 h-full w-[40%] bg-[linear-gradient(135deg,transparent_49.8%,rgba(133,184,220,.12)_50%,transparent_50.2%)] bg-[length:42px_42px] opacity-50" />
        <div className="container-custom relative grid gap-8 px-5 sm:px-8 lg:grid-cols-[1fr_.72fr] lg:items-end lg:gap-20 lg:px-10">
          <div>
            <p className="inline-flex items-center gap-3 text-xs font-bold tracking-[.16em] text-[#a8d0f5]"><span className="h-px w-8 bg-[#54a6ff]" /> INGENIERÍA APLICADA</p>
            <h2 className="mt-5 max-w-4xl text-balance text-3xl font-semibold leading-[.98] tracking-[-.06em] text-white sm:text-5xl lg:text-[4.25rem]">
              Primero entendemos qué debe resolver la pieza.
            </h2>
          </div>
          <div className="border-l-2 border-[#3184df] pl-5 sm:pl-6">
            <p className="max-w-xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
              Revisamos uso, geometría, material, espesor y cantidad para evaluar cómo fabricar cada requerimiento. Así definimos el alcance antes de cotizar.
            </p>
            <Link href="/maestranza-santiago" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white underline decoration-[#76b7fa] underline-offset-4 transition-colors hover:text-[#b8dcff]">
              Conoce nuestra maestranza <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="container-custom relative mt-10 grid gap-px px-5 sm:grid-cols-3 sm:px-8 lg:mt-14 lg:px-10">
          {[
            { icon: DraftingCompass, title: "Uso y geometría", text: "Qué función debe cumplir y cómo se integra." },
            { icon: Ruler, title: "Material y medidas", text: "Espesor, dimensiones, tolerancias y terminación." },
            { icon: Wrench, title: "Proceso y alcance", text: "Qué procesos y antecedentes requiere la fabricación." },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="border-t border-white/20 py-5 sm:px-5 sm:first:pl-0 sm:last:pr-0 sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:pl-5 lg:py-6">
              <Icon className="h-5 w-5 text-[#78b8f5]" strokeWidth={1.6} aria-hidden="true" />
              <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-6 text-white/65">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="trabajos" className="bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="process-gallery-title">
        <div className="container-custom px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="inline-flex items-center gap-3 text-xs font-bold tracking-[.16em] text-[#155fc3]"><span className="h-px w-8 bg-[#155fc3]" /> PROCESOS METALMECÁNICOS</p>
              <h2 id="process-gallery-title" className="mt-5 max-w-3xl text-balance text-4xl font-semibold leading-[.97] tracking-[-.065em] text-[#17232c] sm:text-5xl lg:text-[3.8rem]">
                Cada proceso responde a una necesidad distinta.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-[#627079] sm:text-base sm:leading-7">
              Una referencia visual de operaciones habituales. La solución y el proceso se definen para cada requerimiento.
            </p>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:mt-11 lg:grid-cols-[.82fr_1.18fr] lg:gap-4">
            {processGallery.map((item, index) => (
              <figure key={item.title} className={`group relative overflow-hidden bg-[#263947] ${index === 0 ? "aspect-[1.2/1] lg:row-span-2 lg:aspect-auto" : index === 2 ? "aspect-[1.7/1] sm:col-span-2 lg:col-span-1" : "aspect-[1.7/1]"}`}>
                <Image src={item.image} alt={`${item.title}, imagen referencial`} fill className={`object-cover transition-transform duration-700 group-hover:scale-[1.035] ${item.position}`} sizes="(max-width: 640px) 100vw, (max-width: 1023px) 50vw, 56vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081723]/80 via-transparent to-[#081723]/5" />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-white sm:p-5 lg:p-6">
                  <div><span className="text-[10px] font-semibold tracking-[.12em] text-white/70">REFERENCIA VISUAL</span><p className="mt-1 text-lg font-semibold tracking-[-.03em] sm:text-xl">{item.title}</p></div>
                  <ArrowUpRight className="mb-1 h-5 w-5 shrink-0 text-white/80" aria-hidden="true" />
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-4 text-xs leading-5 text-[#77838a]">Las fotografías son referenciales; no representan instalaciones ni trabajos específicos de clientes de N Proyectos.</p>
        </div>
      </section>

      <section id="proceso" className="bg-[#f1f3f2] py-16 sm:py-20 lg:py-24">
        <div className="container-custom px-5 sm:px-8 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr] lg:items-end lg:gap-16">
            <div>
              <p className="inline-flex items-center gap-3 text-xs font-bold tracking-[.16em] text-[#155fc3]"><span className="h-px w-8 bg-[#155fc3]" /> CÓMO AVANZAMOS</p>
              <h2 className="mt-5 max-w-2xl text-balance text-4xl font-semibold leading-[.97] tracking-[-.065em] text-[#17232c] sm:text-5xl lg:text-[3.8rem]">Una revisión clara antes de cotizar.</h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-[#5e6a72] sm:text-lg sm:leading-8 lg:justify-self-end">
              No necesitas tener cada especificación resuelta para iniciar. Comparte los antecedentes disponibles y revisaremos contigo los datos que falten.
            </p>
          </div>
          <div className="mt-9 grid border-y border-[#cbd3d5] sm:grid-cols-3 lg:mt-12">
            {[
              { icon: FileCheck2, title: "Cuéntanos el proyecto", text: "Uso, medidas disponibles, material y cantidad. Si tienes un plano o muestra, menciónalo." },
              { icon: DraftingCompass, title: "Revisamos el alcance", text: "Evaluamos geometría, procesos necesarios y antecedentes para preparar una propuesta." },
              { icon: Wrench, title: "Definimos los siguientes pasos", text: "Aclaramos especificaciones y condiciones antes de coordinar la fabricación." },
            ].map(({ icon: Icon, title, text }, index) => (
              <article key={title} className="grid grid-cols-[52px_1fr] gap-4 border-b border-[#cbd3d5] py-5 last:border-b-0 sm:border-b-0 sm:px-5 sm:py-7 sm:first:pl-0 sm:last:pr-0 sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:border-[#cbd3d5] lg:px-7 lg:py-8">
                <div className="flex h-11 w-11 items-center justify-center border border-[#b7c9d8] bg-white text-[#155fc3]"><Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" /></div>
                <div><p className="text-xs font-bold tracking-[.1em] text-[#155fc3]">ETAPA 0{index + 1}</p><h3 className="mt-2 text-lg font-semibold leading-snug text-[#17232c]">{title}</h3><p className="mt-2 text-sm leading-6 text-[#65727a]">{text}</p></div>
              </article>
            ))}
          </div>
          <TrackedQuoteLink href="/#contacto" location="quote_process" className="mt-7 inline-flex min-h-12 items-center gap-3 bg-[#155fc3] px-5 text-sm font-bold text-white transition-colors hover:bg-[#0e4fa8]">
            Iniciar una consulta <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </TrackedQuoteLink>
        </div>
      </section>

      <section id="preguntas" className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="container-custom grid gap-8 px-5 sm:px-8 lg:grid-cols-[.75fr_1.25fr] lg:gap-20 lg:px-10">
          <div>
            <p className="inline-flex items-center gap-3 text-xs font-bold tracking-[.16em] text-[#155fc3]"><span className="h-px w-8 bg-[#155fc3]" /> ANTES DE COTIZAR</p>
            <h2 className="mt-5 max-w-xl text-balance text-4xl font-semibold leading-[.97] tracking-[-.065em] text-[#17232c] sm:text-5xl">Respuestas para dar el primer paso.</h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-[#5e6a72]">Cuéntanos lo que ya sabes. El equipo comercial puede ayudarte a ordenar los antecedentes para evaluar tu solicitud.</p>
          </div>
          <div className="border-t border-[#d8dfe1]">
            {questions.map((item) => (
              <details key={item.question} className="group border-b border-[#d8dfe1] py-4 sm:py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-base font-semibold text-[#1b2f3d] marker:hidden sm:text-lg [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-[#c8d4dc] text-[#155fc3] transition-transform group-open:rotate-45"><span aria-hidden="true" className="text-xl leading-none">+</span></span>
                </summary>
                <p className="max-w-2xl pr-10 pt-3 text-sm leading-6 text-[#627079] sm:text-base sm:leading-7">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
