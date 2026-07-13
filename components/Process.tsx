const steps = [
  ["01", "Levantamiento", "Definimos alcance, materiales, tolerancias y factibilidad."],
  ["02", "Diseño", "Desarrollamos CAD/Inventor y preparamos la producción."],
  ["03", "Fabricación", "Ejecutamos corte, plegado, armado y soldadura con control."],
  ["04", "Entrega", "Verificamos la solución y coordinamos una entrega clara."],
];

export default function Process() {
  return (
    <section id="proceso" className="section-padding bg-slate-950">
      <div className="container-custom">
        <span className="eyebrow !text-blue-400 before:!bg-blue-400">Proceso</span>
        <h2 className="section-title text-white">Un flujo simple, con decisiones técnicas visibles.</h2>
        <div className="mt-12 grid border-l border-t border-white/15 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([number, title, text]) => (
            <article key={number} className="border-b border-r border-white/15 p-6 sm:p-7">
              <p className="font-heading text-3xl font-semibold text-blue-400">{number}</p>
              <h3 className="mt-8 text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
