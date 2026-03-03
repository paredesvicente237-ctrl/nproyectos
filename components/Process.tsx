const steps = [
  {
    number: "01",
    title: "Levantamiento técnico",
    text: "Se revisa el requerimiento, plano, pieza o necesidad operacional para definir alcance, materiales y factibilidad.",
  },
  {
    number: "02",
    title: "Diseño y preparación",
    text: "Se apoya el desarrollo CAD / INVENTOR, se optimizan medidas y se organiza la producción para reducir merma y tiempos.",
  },
  {
    number: "03",
    title: "Fabricación y control",
    text: "Corte, plegado, armado y soldadura se ejecutan con supervisión de proceso y control dimensional según la exigencia del trabajo.",
  },
  {
    number: "04",
    title: "Entrega y continuidad",
    text: "La solución se entrega con foco en cumplimiento y continuidad operacional, manteniendo comunicación clara con el cliente.",
  },
];

export default function Process() {
  return (
    <section id="proceso" className="section-padding">
      <div className="container-custom">
        <div className="dark-panel p-7 sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <span className="eyebrow-dark">Proceso</span>
              <h2 className="mt-5 font-heading text-4xl font-bold leading-tight text-white sm:text-5xl">
                Un flujo de trabajo pensado para fabricar con menos fricción y
                más control.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-industrial-200">
              La ejecución combina criterio técnico, preparación de materiales y
              control de fabricación para que cada trabajo avance sin improvisar.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
              >
                <p className="font-heading text-5xl font-bold leading-none text-accent">
                  {step.number}
                </p>
                <h3 className="mt-5 font-heading text-2xl font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-industrial-200">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
