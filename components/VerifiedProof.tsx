import Image from "next/image";
import { ArrowUpRight, Star } from "lucide-react";
import { verifiedProjects, verifiedTestimonials } from "@/lib/verifiedProof";
import TrackedQuoteLink from "@/components/TrackedQuoteLink";

export default function VerifiedProof() {
  if (!verifiedProjects.length && !verifiedTestimonials.length) return null;

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="verified-proof-title">
      <div className="container-custom px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Experiencia comprobable</p>
            <h2 id="verified-proof-title" className="mt-5 max-w-3xl text-balance text-4xl font-semibold leading-[.98] tracking-[-.06em] text-[#17191b] sm:text-5xl">Proyectos y opiniones con autorización.</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-[#687176]">Compartimos únicamente información revisada y aprobada para publicación.</p>
        </div>

        {verifiedProjects.length > 0 && (
          <div className="mt-9 grid gap-5 md:grid-cols-2">
            {verifiedProjects.map((project) => (
              <article key={project.title} className="overflow-hidden border border-[#d9dfdd] bg-[#f7f8f7]">
                <div className="relative aspect-[16/9] bg-[#d9dfdd]">
                  <Image src={project.image} alt={project.imageAlt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
                <div className="p-5 sm:p-6">
                  <p className="text-xs font-semibold text-blue-700">{project.service}{project.customerName ? ` · ${project.customerName}` : ""}</p>
                  <h3 className="mt-2 text-xl font-semibold text-[#17191b]">{project.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#58646a]">{project.challenge}</p>
                  <p className="mt-2 text-sm leading-6 text-[#58646a]">{project.solution}</p>
                  <TrackedQuoteLink href="/#contacto" location="verified_project" serviceType={project.service} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900">Consultar por un proyecto similar <ArrowUpRight className="h-4 w-4" /></TrackedQuoteLink>
                </div>
              </article>
            ))}
          </div>
        )}

        {verifiedTestimonials.length > 0 && (
          <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {verifiedTestimonials.map((testimonial, index) => (
              <figure key={`${testimonial.author}-${index}`} className="flex flex-col border-t-2 border-blue-700 bg-[#f2f4f3] p-5 sm:p-6">
                {testimonial.rating && (
                  <div className="flex gap-1" aria-label={`Valoración verificada: ${testimonial.rating} de 5 estrellas`}>
                    {Array.from({ length: testimonial.rating }, (_, star) => <Star key={star} className="h-4 w-4 fill-[#145fce] text-[#145fce]" aria-hidden="true" />)}
                  </div>
                )}
                <blockquote className="mt-4 flex-1 text-base leading-7 text-[#26343b]">“{testimonial.quote}”</blockquote>
                <figcaption className="mt-5 border-t border-[#d5dad8] pt-4">
                  <p className="font-semibold text-[#17191b]">{testimonial.author}</p>
                  <p className="mt-1 text-xs text-[#687176]">{[testimonial.company, testimonial.service, testimonial.source].filter(Boolean).join(" · ")}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
