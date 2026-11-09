import { ArrowRight, ClipboardList, DraftingCompass, Send, Wrench } from "lucide-react";
import TrackedQuoteLink from "@/components/TrackedQuoteLink";

const steps = [
  { icon: Send, title: "Cuéntanos qué necesitas", text: "Describe el uso, las medidas disponibles, el material y la cantidad. También puedes compartir un plano o una muestra." },
  { icon: DraftingCompass, title: "Revisamos el requerimiento", text: "Evaluamos los antecedentes y los procesos que podrían ser necesarios para fabricar la solución." },
  { icon: ClipboardList, title: "Acordamos el alcance", text: "Aclaramos especificaciones y condiciones para preparar una cotización acorde al proyecto." },
  { icon: Wrench, title: "Coordinamos el trabajo", text: "Si la propuesta es aprobada, se coordinan los siguientes pasos de fabricación y entrega." },
];

export default function Process() {
  return (
    <section id="proceso" className="overflow-hidden bg-[#f1f3f2] py-16 sm:py-20 lg:py-24">
      <div className="container-custom px-5 sm:px-8 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[.85fr_1.15fr] lg:items-end lg:gap-16">
          <div>
            <p className="eyebrow">Cómo cotizar</p>
            <h2 className="mt-5 max-w-xl text-balance text-4xl font-semibold leading-[.98] tracking-[-.06em] text-[#17191b] sm:text-5xl lg:text-[3.4rem]">Un camino claro para evaluar tu proyecto.</h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-[#687176] sm:text-lg sm:leading-8 lg:justify-self-end">
            No necesitas tener resuelta cada especificación para empezar. Comparte lo que sabes y revisaremos contigo los antecedentes que falten.
          </p>
        </div>

        <div className="relative mt-10 grid gap-0 border-y border-[#cbd2d0] sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          <div aria-hidden="true" className="absolute left-0 right-0 top-[27px] hidden h-px bg-[#cbd2d0] lg:block" />
          {steps.map(({ icon: Icon, title, text }, index) => (
            <article key={title} className="relative border-b border-[#cbd2d0] py-6 sm:px-6 sm:py-7 sm:[&:nth-child(2)]:border-l sm:[&:nth-child(2)]:border-[#cbd2d0] lg:border-b-0 lg:px-6 lg:py-0 lg:first:pl-0 lg:last:pr-0 lg:[&:nth-child(2)]:border-l-0 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:border-[#cbd2d0]">
              <div className="relative z-10 flex h-14 w-14 items-center justify-center border border-[#cbd2d0] bg-[#f1f3f2] text-blue-700">
                <Icon className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
              </div>
              <p className="mt-5 text-xs font-semibold text-blue-700">Etapa 0{index + 1}</p>
              <h3 className="mt-2 max-w-[230px] text-lg font-semibold leading-snug text-[#17191b]">{title}</h3>
              <p className="mt-2 max-w-[270px] text-sm leading-6 text-[#687176]">{text}</p>
            </article>
          ))}
        </div>
        <TrackedQuoteLink href="/#contacto" location="quote_process" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 underline decoration-blue-300 underline-offset-4 hover:text-blue-900">
          Iniciar una consulta <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </TrackedQuoteLink>
      </div>
    </section>
  );
}
