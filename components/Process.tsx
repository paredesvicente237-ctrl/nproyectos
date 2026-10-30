import { Boxes, DraftingCompass, MessageSquareText, ShieldCheck } from "lucide-react";

const steps = [
  { icon: MessageSquareText, title: "Entendemos el proyecto", text: "Revisamos objetivos, cantidades, material y condiciones de uso." },
  { icon: DraftingCompass, title: "Ingeniería y diseño", text: "Definimos geometrías, procesos y una solución fabricable." },
  { icon: Boxes, title: "Fabricación y control", text: "Ejecutamos corte, plegado, armado y soldadura según alcance." },
  { icon: ShieldCheck, title: "Entrega y soporte", text: "Verificamos el resultado y coordinamos una entrega clara." },
];

export default function Process() {
  return (
    <section id="proceso" className="overflow-hidden bg-[#F5F5F2] py-16 sm:py-20 lg:py-28">
      <div className="container-custom px-5 sm:px-8 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[.65fr_1.35fr] lg:items-end lg:gap-16">
          <div><p className="eyebrow">Cómo trabajamos</p><h2 className="mt-5 max-w-lg text-balance text-4xl font-semibold leading-[.98] tracking-[-.065em] text-[#17191b] sm:text-5xl lg:text-[3.35rem]">Un proceso claro. Resultados precisos.</h2></div>
          <p className="max-w-xl text-base leading-7 text-[#777D81] sm:text-lg sm:leading-8">Cada etapa conecta el requerimiento con una solución fabricable y una entrega coordinada.</p>
        </div>
        <div className="relative mt-12 grid gap-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-0">
          <div aria-hidden="true" className="absolute left-0 right-0 top-[21px] hidden h-px bg-[#c7cbca] lg:block" />
          {steps.map(({ icon: Icon, title, text }, index) => (
            <article key={title} className="relative lg:border-l lg:border-[#c7cbca] lg:px-7 lg:pt-0 first:lg:pl-0 last:lg:pr-0">
              <div className="relative z-10 flex h-11 w-11 items-center justify-center border border-blue-700 bg-[#F5F5F2] text-blue-700"><Icon className="h-5 w-5" strokeWidth={1.6} /></div>
              <p className="mt-6 text-sm font-semibold text-blue-700">Etapa 0{index + 1}</p>
              <h3 className="mt-2 max-w-[240px] text-xl font-semibold leading-tight text-[#17191b]">{title}</h3>
              <p className="mt-3 max-w-[270px] text-sm leading-6 text-[#777D81]">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
