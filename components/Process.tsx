const steps = [
  {
    number: "01",
    title: "Levantamiento",
    text: "Revisión del requerimiento para definir alcance, materiales y factibilidad.",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Diseño",
    text: "Desarrollo CAD/INVENTOR, optimización y preparación de producción.",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Fabricación",
    text: "Corte, plegado, armado y soldadura con supervisión de proceso.",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Entrega",
    text: "Solución terminada con foco en cumplimiento y continuidad operacional.",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
];

export default function Process() {
  return (
    <section id="proceso" className="section-padding bg-slate-50">
      <div className="container-custom">
        <div className="text-center">
          <span className="eyebrow mx-auto justify-center">Proceso</span>
          <h2 className="mt-4 text-4xl font-extrabold sm:text-5xl">
            Cómo trabajamos
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-500">
            Un flujo diseñado para fabricar con control y sin improvisaciones.
          </p>
        </div>

        <div className="relative mt-20">
          {/* Horizontal connector */}
          <div className="absolute left-[calc(12.5%+28px)] right-[calc(12.5%+28px)] top-7 hidden h-0.5 bg-gradient-to-r from-navy-200 via-navy-300 to-navy-200 lg:block" />

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div key={step.number} className="relative text-center">
                {/* Icon circle */}
                <div className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-navy-200 bg-white text-navy-600 shadow-md shadow-navy-100/50">
                  {step.icon}
                </div>
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-navy-500">
                  Paso {step.number}
                </p>
                <h3 className="mt-2 text-xl font-bold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-slate-500">
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
