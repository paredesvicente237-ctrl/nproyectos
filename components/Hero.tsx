import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { stock } from "@/components/stockImages";

const capabilities = ["Corte y plegado", "Soldadura MIG/TIG", "Diseño CAD"];

export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-[92svh] overflow-hidden bg-slate-950">
      <Image src={stock.heroWelding} alt="Fabricación metalmecánica en taller" fill priority className="object-cover object-center" sizes="100vw" />
      <div className="absolute inset-0 bg-slate-950/70" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,14,26,.96)_0%,rgba(6,14,26,.76)_48%,rgba(6,14,26,.34)_100%)]" />

      <div className="container-custom relative flex min-h-[92svh] items-center px-5 pb-16 pt-28 sm:px-8 lg:px-10">
        <div className="max-w-3xl">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-300">
            <span className="h-px w-8 bg-blue-400" /> Metalmecánica industrial
          </p>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
            Fabricación en acero para proyectos que exigen precisión.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            Diseñamos y fabricamos piezas, estructuras y soluciones para minería, manufactura, construcción e industria.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="/#contacto" className="btn-primary !bg-blue-600 hover:!bg-blue-500">
              Solicitar cotización <ArrowRight className="h-4 w-4" />
            </a>
            <a href="/#especialidades" className="btn-white">Ver capacidades</a>
          </div>
          <div className="mt-12 grid max-w-2xl gap-3 border-t border-white/15 pt-6 sm:grid-cols-3">
            {capabilities.map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-slate-200">
                <CheckCircle2 className="h-4 w-4 text-blue-400" /> {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
