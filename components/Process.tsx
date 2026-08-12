import { ArrowRight, Boxes, DraftingCompass, MessageSquareText, ShieldCheck } from "lucide-react";

const steps = [
  { icon: MessageSquareText, title: "Entendemos el proyecto", text: "Revisamos objetivos, cantidades, material y condiciones de uso." },
  { icon: DraftingCompass, title: "Ingeniería y diseño", text: "Definimos geometrías, procesos y una solución fabricable." },
  { icon: Boxes, title: "Fabricación y control", text: "Ejecutamos corte, plegado, armado y soldadura según alcance." },
  { icon: ShieldCheck, title: "Entrega y soporte", text: "Verificamos el resultado y coordinamos una entrega clara." },
];

export default function Process() {
  return (
    <section id="proceso" className="border-y border-slate-200 bg-white px-5 py-16 sm:px-8 lg:px-10">
      <div className="container-custom grid gap-10 lg:grid-cols-[0.58fr_1.42fr] lg:items-center">
        <div>
          <span className="eyebrow">Cómo trabajamos</span>
          <h2 className="mt-4 text-3xl font-semibold leading-[1.08] tracking-[-0.035em] text-slate-950">Un proceso claro.<br />Resultados precisos.</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, title, text }, index) => (
            <article key={title} className="relative border-l border-slate-200 px-6 py-4 first:border-l-0 sm:first:border-l lg:first:border-l">
              <div className="flex items-center justify-between text-blue-700">
                <span className="font-mono text-sm font-semibold">0{index + 1}</span>
                <Icon className="h-7 w-7" strokeWidth={1.5} />
              </div>
              <h3 className="mt-6 text-base font-semibold text-slate-950">{title}</h3>
              <p className="mt-2 text-xs leading-5 text-slate-500">{text}</p>
              {index < steps.length - 1 && <ArrowRight className="absolute -right-2.5 top-1/2 z-10 hidden h-5 w-5 -translate-y-1/2 bg-white text-slate-300 lg:block" />}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
