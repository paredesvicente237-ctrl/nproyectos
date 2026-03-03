import Image from "next/image";
import { siteAssets } from "@/components/siteAssets";
import { companyInfo } from "@/components/siteData";

const impactStats = [
  { value: "Clientes", detail: "Minería, manufactura, industria y construcción" },
  { value: "12 mm", detail: "Capacidad de corte láser en acero" },
  { value: "6 mm", detail: "Corte guillotina y plegado de alta precisión" },
  { value: "Mig / Tig / Láser", detail: "Procesos de soldadura para soluciones robustas" },
];

const quickProof = [
  "Desarrollo y suministro de piezas, partes y soluciones metálicas.",
  "Apoyo en diseño CAD / INVENTOR y optimización de materiales.",
  "Personal calificado y certificado para armado y soldadura.",
];

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-steel-950 pt-32 sm:pt-36">
      <div className="absolute inset-0">
        <Image
          src={siteAssets.pressBrakeWide}
          alt=""
          fill
          priority
          className="object-cover opacity-20"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(8,17,26,0.95),rgba(8,17,26,0.88)_40%,rgba(8,17,26,0.96))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,184,244,0.2),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(20,184,166,0.12),transparent_30%)]" />
        <div className="absolute inset-0 grid-surface opacity-30" />
      </div>

      <div className="relative container-custom section-padding">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <span className="eyebrow-dark">Maestranza, fabricación y proyectos en acero</span>
            <h1 className="mt-6 max-w-4xl font-heading text-5xl font-bold leading-[0.96] text-white sm:text-6xl lg:text-7xl">
              Soluciones metálicas con ingeniería, fabricación y plazos que sí
              responden.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-industrial-200 sm:text-xl">
              {companyInfo.shortName} desarrolla y fabrica piezas, partes y
              proyectos en aceros para clientes que necesitan ejecución seria,
              soporte técnico y una relación consistente entre precio, calidad y
              entrega.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={companyInfo.whatsappHref} className="btn-primary">
                Cotizar por WhatsApp
              </a>
              <a
                href="#contacto"
                className="btn-secondary border-white/15 text-white hover:border-accent hover:text-accent"
              >
                Solicitar propuesta por correo
              </a>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <a href={companyInfo.phoneHref} className="dark-chip">
                <span className="text-xs uppercase tracking-[0.2em] text-industrial-400">
                  Teléfono
                </span>
                <span className="mt-1 block text-sm font-semibold text-white">
                  {companyInfo.phoneDisplay}
                </span>
              </a>
              <a href={companyInfo.emailHref} className="dark-chip">
                <span className="text-xs uppercase tracking-[0.2em] text-industrial-400">
                  Correo
                </span>
                <span className="mt-1 block text-sm font-semibold text-white">
                  ventasnproyectosltda
                </span>
              </a>
              <a href="#contacto" className="dark-chip">
                <span className="text-xs uppercase tracking-[0.2em] text-industrial-400">
                  Ubicación
                </span>
                <span className="mt-1 block text-sm font-semibold text-white">
                  Av. Yungay 743
                </span>
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {impactStats.map((item) => (
                <div
                  key={item.value}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm"
                >
                  <p className="font-heading text-3xl font-bold text-accent">
                    {item.value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-industrial-200">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div className="dark-panel overflow-hidden">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[1.6rem]">
                <Image
                  src={siteAssets.foldedProfile}
                  alt="Plegado industrial de piezas metálicas"
                  className="h-full w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-industrial-400">
                    Cobertura
                  </p>
                  <p className="mt-2 text-sm leading-6 text-industrial-200">
                    Suministro de piezas, desarrollo y fabricación para
                    requerimientos industriales y especiales.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-industrial-400">
                    Entrega
                  </p>
                  <p className="mt-2 text-sm leading-6 text-industrial-200">
                    Producción planificada para cumplir especificaciones y plazos
                    competitivos.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-[1.05fr_0.95fr]">
              <div className="dark-panel p-5">
                <p className="text-xs uppercase tracking-[0.22em] text-industrial-400">
                  Lo que espera tu operación
                </p>
                <div className="mt-4 space-y-4">
                  {quickProof.map((item) => (
                    <div key={item} className="flex gap-3">
                      <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-accent" />
                      <p className="text-sm leading-6 text-industrial-200">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-2">
                <div className="relative h-full min-h-[18rem] overflow-hidden rounded-[1.45rem]">
                  <Image
                    src={siteAssets.weldingWork}
                    alt="Proceso de soldadura sobre estructura metálica"
                    className="h-full w-full object-cover"
                    sizes="(max-width: 1024px) 100vw, 30vw"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-steel-950 via-steel-950/50 to-transparent p-5">
                    <p className="font-heading text-2xl font-semibold text-white">
                      Fabricación integral
                    </p>
                    <p className="mt-2 text-sm leading-6 text-industrial-200">
                      Armado, soldadura y terminación para soluciones listas para
                      instalación.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
