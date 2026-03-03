const productSpecs = [
  "Formato 60 x 60 cm",
  "Espesores de 4 cm y 6 cm",
  "Densidad 20 kg/m³",
  "Color gris",
  "Tratamiento ignífugo",
  "Instalación con adhesivo",
];

const productUses = [
  "Estudios de grabación y home studio",
  "Teatros, cines y salas de conferencias",
  "Oficinas, aulas y recintos cerrados",
  "Sistemas de ventilación y aplicaciones acústicas",
];

export default function FeaturedProduct() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="dark-panel overflow-hidden p-7 sm:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,184,244,0.18),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(20,184,166,0.14),transparent_26%)]" />
          <div className="relative grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
            <div>
              <span className="eyebrow-dark">Producto destacado</span>
              <h2 className="mt-5 font-heading text-4xl font-bold leading-tight text-white sm:text-5xl">
                Espuma acústica NFonoAB
              </h2>
              <p className="mt-6 text-lg leading-8 text-industrial-200">
                Solución enfocada en acondicionamiento acústico para espacios
                donde el control de ruido y reverberación es parte crítica de la
                experiencia o del desempeño técnico.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {productSpecs.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-4 text-sm font-semibold text-white"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
              <p className="font-heading text-3xl font-semibold text-white">
                Aplicaciones recomendadas
              </p>
              <div className="mt-6 space-y-4">
                {productUses.map((item) => (
                  <div key={item} className="flex gap-3">
                    <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-accent" />
                    <p className="text-base leading-7 text-industrial-200">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 rounded-3xl border border-white/10 bg-steel-950/50 p-5">
                <p className="text-sm leading-7 text-industrial-200">
                  Si necesitas cotizar este producto o integrarlo en un proyecto
                  acústico, la sección de contacto permite enviar la solicitud
                  con los datos completos por correo o derivarla directamente a
                  WhatsApp.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
