import Image from "next/image";
import { stock } from "@/components/stockImages";

export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen overflow-hidden">
      {/* Background image */}
      <Image
        src={stock.heroWelding}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/80 to-slate-900/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-slate-950/30" />

      {/* Content */}
      <div className="relative flex min-h-screen items-center">
        <div className="container-custom px-5 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/10 px-5 py-2.5 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-navy-400 animate-pulse" />
              <span className="text-sm font-medium text-white/90">
                Metalmecánica & Fabricación Industrial
              </span>
            </div>

            <h1 className="mt-8 text-5xl font-extrabold leading-[1.08] text-white sm:text-6xl lg:text-7xl">
              Servicios y{" "}
              <span className="text-navy-400">soluciones a tus proyectos</span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-slate-300">
              Fabricamos piezas, estructuras y proyectos para minería,
              manufactura e industria. Ejecución profesional y plazos que se
              cumplen.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a href="/#contacto" className="btn-primary !bg-navy-500 !py-4 !px-8 !text-base !shadow-xl !shadow-navy-500/30">
                Solicitar Cotización
              </a>
              <a href="/#especialidades" className="btn-white !py-4 !px-8 !text-base">
                Ver Servicios
              </a>
            </div>

            {/* Trust indicators */}
            <div className="mt-14 flex flex-wrap items-center gap-8 border-t border-white/10 pt-8">
              <div>
                <p className="text-2xl font-bold text-white">Corte Láser</p>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div>
                <p className="text-2xl font-bold text-white">MIG/TIG</p>
                <p className="mt-0.5 text-sm text-slate-400">Soldadura</p>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div>
                <p className="text-2xl font-bold text-white">CAD</p>
                <p className="mt-0.5 text-sm text-slate-400">Ingeniería</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
