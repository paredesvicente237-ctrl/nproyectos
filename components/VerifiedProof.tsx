import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Download, FileCheck2, MessageCircle, Star } from "lucide-react";
import { siteAssets } from "@/components/siteAssets";
import { salesContact } from "@/components/siteData";
import TrackedContactLink from "@/components/TrackedContactLink";
import TrackedQuoteLink from "@/components/TrackedQuoteLink";
import { services } from "@/lib/serviceData";
import { verifiedProjects, verifiedTestimonials } from "@/lib/verifiedProof";

const technicalSheets = [
  "/fichas-tecnicas/splitter-acustico-nsplitter.pdf",
  "/fichas-tecnicas/panel-perforado-nperfab.pdf",
  "/fichas-tecnicas/espuma-acustica-nfonoab.pdf",
  "/fichas-tecnicas/pantalla-movil-nmovil.pdf",
  "/fichas-tecnicas/panel-acustico-naislanpanel.pdf",
  "/fichas-tecnicas/celosia-acustica-ncelosia.pdf",
  "/fichas-tecnicas/silenciador-escape-gases-nsilense.pdf",
];

const catalogProducts = [
  {
    name: "Splitter acústico",
    code: "NSplitter",
    image: siteAssets.splitter,
    imageAlt: "Producto del catálogo: splitter acústico metálico",
    href: "/productos#splitter",
    datasheet: "/fichas-tecnicas/splitter-acustico-nsplitter.pdf",
  },
  {
    name: "Panel perforado",
    code: "NPerfAB",
    image: siteAssets.panelPerforado,
    imageAlt: "Producto del catálogo: panel metálico perforado",
    href: "/productos#panel-perforado",
    datasheet: "/fichas-tecnicas/panel-perforado-nperfab.pdf",
  },
  {
    name: "Espuma acústica",
    code: "NFonoAB",
    image: siteAssets.espumaAcustica,
    imageAlt: "Producto del catálogo: espuma acústica",
    href: "/productos#espuma-acustica",
    datasheet: "/fichas-tecnicas/espuma-acustica-nfonoab.pdf",
  },
  {
    name: "Pantalla móvil",
    code: "NMóvil",
    image: siteAssets.pantallaMovil,
    imageAlt: "Producto del catálogo: pantalla móvil industrial",
    href: "/productos#pantalla-movil",
    datasheet: "/fichas-tecnicas/pantalla-movil-nmovil.pdf",
  },
];

export default function VerifiedProof() {
  return (
    <section id="equipamiento" className="scroll-mt-24 border-y border-[#dce2e3] bg-[#f5f7f7] pt-14 pb-28 sm:py-16 lg:py-20" aria-labelledby="verified-proof-title">
      <div className="container-custom px-5 sm:px-8 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[.86fr_1.14fr] lg:items-end lg:gap-16">
          <div>
            <p className="inline-flex items-center gap-3 text-[11px] font-bold tracking-[.17em] text-[#155fc3] sm:text-xs">
              <span className="h-px w-8 bg-[#155fc3]" /> CAPACIDADES Y EVIDENCIA PUBLICADA
            </p>
            <h2 id="verified-proof-title" className="mt-4 max-w-2xl text-balance text-[2.15rem] font-semibold leading-[.98] tracking-[-.055em] text-[#142330] sm:text-5xl">
              Confianza basada en lo que podemos mostrar.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-[#586872] sm:text-base sm:leading-7">
            Conoce nuestras áreas de trabajo y revisa fichas técnicas del catálogo. No publicamos cifras de proyectos, reseñas ni resultados de clientes sin respaldo y autorización.
          </p>
        </div>

        <div className="mt-9 grid overflow-hidden border border-[#d9e0e1] bg-white lg:grid-cols-[.78fr_1.22fr]">
          <div className="relative overflow-hidden bg-[#102b40] p-6 text-white sm:p-8 lg:p-9">
            <div aria-hidden="true" className="absolute -right-14 -top-16 h-56 w-56 rounded-full border border-white/10" />
            <div aria-hidden="true" className="absolute -right-4 -top-6 h-36 w-36 rounded-full border border-white/10" />
            <p className="relative text-xs font-semibold tracking-[.13em] text-[#b8d7f4]">SERVICIOS PUBLICADOS</p>
            <div className="relative mt-3 flex items-end gap-3">
              <span className="text-6xl font-semibold leading-none tracking-[-.07em] sm:text-7xl">{String(services.length).padStart(2, "0")}</span>
              <span className="max-w-28 pb-1 text-sm leading-5 text-white/75">áreas de servicio para proyectos industriales</span>
            </div>
            <div className="relative mt-6 flex items-center gap-2 border-t border-white/20 pt-4 text-sm text-white/80">
              <FileCheck2 className="h-4 w-4 shrink-0 text-[#8cc5ff]" aria-hidden="true" />
              <span><strong className="font-semibold text-white">{technicalSheets.length} fichas técnicas</strong> disponibles en el catálogo</span>
            </div>
          </div>

          <div className="grid grid-cols-2">
            {services.map((service, index) => (
              <Link
                key={service.slug}
                href={`/servicios/${service.slug}`}
                className={`group flex min-h-[84px] items-center gap-2 border-[#e4e8e8] px-3 py-3 transition-colors hover:bg-[#f7f9fb] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#155fc3] sm:gap-4 sm:px-6 sm:py-4 ${index > 1 ? "border-t" : ""} ${index % 2 === 1 ? "border-l" : ""}`}
              >
                <span className="text-[10px] font-semibold tabular-nums text-[#8a989e] sm:text-xs">0{index + 1}</span>
                <span className="flex-1 text-xs font-semibold leading-4 text-[#233744] sm:text-sm sm:leading-5">{service.shortName}</span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-[#155fc3] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-7 lg:grid-cols-[.7fr_1.3fr] lg:items-start lg:gap-12">
          <div className="flex flex-col justify-between gap-4 lg:min-h-full">
            <div>
              <p className="text-xs font-bold tracking-[.14em] text-[#155fc3]">CATÁLOGO DOCUMENTADO</p>
              <h3 className="mt-3 max-w-sm text-2xl font-semibold leading-tight tracking-[-.04em] text-[#172b3b] sm:text-3xl">Productos con ficha técnica disponible.</h3>
              <p className="mt-3 max-w-md text-sm leading-6 text-[#66747b]">Estas imágenes corresponden a productos del catálogo; no se presentan como trabajos de clientes.</p>
            </div>
            <Link href="/productos#fichas-tecnicas" className="inline-flex min-h-11 w-fit items-center gap-2 text-sm font-semibold text-[#155fc3] underline decoration-[#9dbfe6] underline-offset-4 hover:text-[#0d4b9e]">
              Explorar productos y fichas <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {catalogProducts.map((product) => (
              <article key={product.code} className="group overflow-hidden border border-[#dce2e3] bg-white transition-shadow hover:shadow-[0_12px_30px_rgba(16,43,64,.09)]">
                <Link href={product.href} className="relative block aspect-[1.45] overflow-hidden bg-[#edf1f2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#155fc3]">
                  <Image src={product.image} alt={product.imageAlt} fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 33vw, 24vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.035]" />
                </Link>
                <div className="p-4">
                  <p className="text-[10px] font-bold tracking-[.13em] text-[#73828a]">{product.code}</p>
                  <h4 className="mt-1 text-base font-semibold text-[#203442]">{product.name}</h4>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-[#e8ebec] pt-3">
                    <Link href={product.href} className="text-xs font-semibold text-[#155fc3] hover:underline">Ver producto</Link>
                    <a href={product.datasheet} download aria-label={`Descargar ficha técnica de ${product.name}`} className="inline-flex items-center gap-1 text-xs font-medium text-[#66747b] hover:text-[#155fc3]">
                      <Download className="h-3.5 w-3.5" aria-hidden="true" /> PDF
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <section aria-labelledby="verified-projects-title">
            <p className="text-xs font-bold tracking-[.14em] text-[#155fc3]">TRABAJOS DOCUMENTADOS</p>
            <h3 id="verified-projects-title" className="mt-2 text-xl font-semibold tracking-[-.035em] text-[#172b3b]">Proyectos realizados</h3>
            {verifiedProjects.length ? (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {verifiedProjects.map((project) => (
                  <article key={project.title} className="overflow-hidden border border-[#dce2e3] bg-white">
                    <div className="relative aspect-[16/9] bg-[#e7ecee]">
                      <Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover" />
                    </div>
                    <div className="p-4">
                      <p className="text-xs font-semibold text-[#155fc3]">{project.service}{project.customerName ? ` · ${project.customerName}` : ""}</p>
                      <h4 className="mt-1 font-semibold text-[#203442]">{project.title}</h4>
                      <p className="mt-2 text-sm leading-5 text-[#66747b]">{project.challenge}</p>
                      <p className="mt-2 text-sm leading-5 text-[#66747b]">{project.solution}</p>
                      <TrackedQuoteLink href="/#contacto" location="verified_project" serviceType={project.service} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#155fc3] hover:underline">
                        Cotizar un proyecto similar <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </TrackedQuoteLink>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-4 flex min-h-32 gap-3 border border-dashed border-[#bac8ce] bg-white/70 px-4 py-4 sm:px-5">
                <FileCheck2 className="mt-0.5 h-5 w-5 shrink-0 text-[#155fc3]" strokeWidth={1.7} aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-[#263a49]">Aún no hay casos de clientes autorizados para publicar.</p>
                  <p className="mt-1 text-sm leading-6 text-[#687780]">Para incorporar uno necesitamos fotos reales, descripción del proceso y resultado documentado, además del permiso del cliente.</p>
                </div>
              </div>
            )}
          </section>

          <section aria-labelledby="verified-reviews-title">
            <p className="text-xs font-bold tracking-[.14em] text-[#155fc3]">OPINIONES AUTÉNTICAS</p>
            <h3 id="verified-reviews-title" className="mt-2 text-xl font-semibold tracking-[-.035em] text-[#172b3b]">Reseñas verificadas</h3>
            {verifiedTestimonials.length ? (
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {verifiedTestimonials.map((testimonial, index) => (
                  <figure key={`${testimonial.author}-${index}`} className="border border-[#dce2e3] bg-white p-4">
                    {testimonial.rating && <div className="flex gap-0.5" aria-label={`Valoración verificada: ${testimonial.rating} de 5 estrellas`}>{Array.from({ length: testimonial.rating }, (_, star) => <Star key={star} className="h-4 w-4 fill-[#c6903b] text-[#c6903b]" aria-hidden="true" />)}</div>}
                    <blockquote className="mt-3 text-sm leading-6 text-[#354852]">“{testimonial.quote}”</blockquote>
                    <figcaption className="mt-4 border-t border-[#e8ebec] pt-3">
                      <p className="text-sm font-semibold text-[#203442]">{testimonial.author}{testimonial.company ? ` · ${testimonial.company}` : ""}</p>
                      <p className="mt-1 text-xs leading-5 text-[#687780]">{[testimonial.service, testimonial.source].filter(Boolean).join(" · ")}</p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            ) : (
              <div className="mt-4 flex min-h-32 gap-3 border border-dashed border-[#bac8ce] bg-white/70 px-4 py-4 sm:px-5">
                <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#155fc3]" strokeWidth={1.7} aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-[#263a49]">Aún no hay reseñas verificadas y autorizadas.</p>
                  <p className="mt-1 text-sm leading-6 text-[#687780]">Publicaremos comentarios solo con una fuente comprobable y el consentimiento de quien los entregó.</p>
                </div>
              </div>
            )}
          </section>
        </div>

        <div className="mt-8 flex flex-col gap-5 bg-[#102b40] px-5 py-6 text-white sm:flex-row sm:items-center sm:justify-between sm:px-7 lg:px-8">
          <div>
            <h3 className="text-xl font-semibold tracking-[-.035em] text-white sm:text-2xl">Tu proyecto puede ser el próximo.</h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-white/75">Cuéntanos qué necesitas fabricar. Nuestro equipo revisará tus requerimientos para evaluar una solución.</p>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <TrackedQuoteLink href="/#contacto" location="verified_proof" className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#155fc3] px-5 text-sm font-bold text-white transition-colors hover:bg-[#0e4fa8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              Cotizar mi proyecto <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </TrackedQuoteLink>
            <TrackedContactLink channel="whatsapp" href={salesContact.whatsappHref} target="_blank" rel="noopener noreferrer" aria-label={`Hablar por WhatsApp con ${salesContact.name}`} className="inline-flex min-h-12 items-center justify-center gap-2 border border-white/40 px-5 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              Hablar con un especialista <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </TrackedContactLink>
          </div>
        </div>
      </div>
    </section>
  );
}
