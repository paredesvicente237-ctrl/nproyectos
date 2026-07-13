const productSpecs = [
  { label: "Formato", value: "60 x 60 cm" },
  { label: "Espesores", value: "4 cm / 6 cm" },
  { label: "Densidad", value: "20 kg/m³" },
  { label: "Color", value: "Gris" },
  { label: "Tratamiento", value: "Ignífugo" },
  { label: "Instalación", value: "Adhesivo" },
];

const productUses = [
  "Estudios de grabación y home studio",
  "Teatros, cines y salas de conferencias",
  "Oficinas y aulas",
  "Sistemas de ventilación",
];

export default function FeaturedProduct() {
  return (
    <section className="section-padding bg-navy-950 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-navy-500/10 blur-[100px]" />
      <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-navy-400/10 blur-[100px]" />

      <div className="container-custom relative">
        <div className="grid gap-14 lg:grid-cols-2">
          {/* Product info */}
          <div>
            <span className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.15em] text-navy-400">
              <span className="inline-block h-[3px] w-8 rounded-full bg-navy-400" />
              Producto Destacado
            </span>
            <h2 className="mt-5 text-4xl font-extrabold text-white sm:text-5xl">
              Espuma Acústica NFonoAB
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-400">
              Acondicionamiento acústico para espacios donde el control de
              ruido y reverberación es crítico.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-x-6 gap-y-6">
              {productSpecs.map((item) => (
                <div key={item.label}>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                    {item.label}
                  </p>
                  <p className="mt-1 text-base font-semibold text-white">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Applications */}
          <div className="flex flex-col justify-center">
            <p className="text-lg font-bold text-white">
              Aplicaciones recomendadas
            </p>
            <div className="mt-6 space-y-3">
              {productUses.map((item, i) => (
                <div
                  key={item}
                  className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.04] p-4 transition-colors hover:bg-white/[0.07]"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy-500/15 text-sm font-bold text-navy-400">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <p className="text-slate-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
