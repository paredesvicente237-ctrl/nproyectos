import Image from "next/image";
import { siteAssets } from "@/components/siteAssets";

const values = [
  {
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Personal certificado",
    text: "Equipo calificado en armado y soldadura industrial.",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085" />
      </svg>
    ),
    title: "Trabajo desde plano o modelo",
    text: "Desde diseño técnico hasta el requerimiento funcional.",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Plazos competitivos",
    text: "Producción planificada con foco en cumplimiento.",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "Optimización de materiales",
    text: "Enfoque en factibilidad técnica y reducción de merma.",
  },
];

export default function About() {
  return (
    <section id="nosotros" className="section-padding bg-slate-50">
      <div className="container-custom">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          {/* Text side */}
          <div>
            <span className="eyebrow">Quiénes Somos</span>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">
              Maestranza enfocada en{" "}
              <span className="text-navy-600">soluciones que funcionan</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-500">
              Nproyectos está compuesto por un grupo de profesionales de amplia
              experiencia en el rubro de los servicios de maestranza. El alcance
              de nuestros proyectos abarca clientes de sectores como minería,
              manufactura, industria y construcción, ofreciendo productos y
              servicios de la mejor relación precio/calidad/plazo.
            </p>

            {/* Values grid */}
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {values.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy-600">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-base text-slate-500">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <a href="#contacto" className="btn-outline mt-10">
              Contáctanos
            </a>
          </div>

          {/* Image side - mission card with real photos */}
          <div className="grid gap-5">
            <div className="relative overflow-hidden rounded-3xl">
              <Image
                src={siteAssets.goodWelding}
                alt="Soldador trabajando en taller"
                className="h-80 w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-navy-400">
                  Nuestra Misión
                </p>
                <p className="mt-2 text-lg font-semibold leading-snug text-white">
                  Desarrollar y suministrar elementos, piezas y partes para la
                  elaboración de equipos y soluciones para la industria.
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl">
              <Image
                src={siteAssets.goodSparks}
                alt="Trabajo de esmerilado con chispas"
                className="h-80 w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-navy-400">
                  Nuestra Visión
                </p>
                <p className="mt-2 text-lg font-semibold leading-snug text-white">
                  Establecer sólidas relaciones estratégicas y comerciales con
                  nuestros clientes, aportando calidad y plazos competitivos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
