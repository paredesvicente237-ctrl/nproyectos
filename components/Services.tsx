import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, AudioLines, Boxes, Factory, Ruler } from "lucide-react";
import { services } from "@/lib/serviceData";

const specialties = [
  { icon: Factory, title: "Fabricación metalmecánica", brief: "Piezas, conjuntos y estructuras en acero carbono, inoxidable y galvanizado.", slug: "fabricacion-metalmecanica", code: "FAB" },
  { icon: Boxes, title: "Corte y plegado", brief: "Procesamiento de planchas para geometrías precisas y producción repetible.", slug: "corte-plegado-planchas", code: "CYP" },
  { icon: Ruler, title: "Armado y soldadura", brief: "Uniones MIG/TIG y fabricación de equipos, gabinetes, ductos y soportes.", slug: "soldadura-mig-tig", code: "SOL" },
  { icon: AudioLines, title: "Control acústico", brief: "Silenciadores, paneles, cabinas y soluciones para ruido industrial.", slug: "control-acustico-industrial", code: "ACU" },
];

export default function Services() {
  return (
    <section id="especialidades" className="bg-[#F5F5F2] py-20 sm:py-28 lg:py-36">
      <div className="container-custom px-5 sm:px-8 lg:px-10">
        <div className="mb-12 grid gap-7 lg:mb-16 lg:grid-cols-[1fr_.7fr] lg:items-end lg:gap-16">
          <div><p className="eyebrow">Capacidades industriales</p><h2 className="mt-5 max-w-3xl text-balance text-4xl font-semibold leading-[.98] tracking-[-.065em] text-[#17191b] sm:text-5xl lg:text-[4.2rem]">Del plano a una solución fabricada.</h2></div>
          <p className="max-w-xl text-base leading-7 text-[#777D81] sm:text-lg sm:leading-8 lg:justify-self-end">Integramos desarrollo, suministro y fabricación para reducir coordinaciones y mantener control técnico sobre el resultado.</p>
        </div>

        <div className="border-t border-[#cfd2d0]">
          {specialties.map(({ icon: Icon, title, brief, slug, code }, index) => {
            const service = services.find((item) => item.slug === slug)!;
            const reversed = index % 2 === 1;
            return (
              <article key={slug} className="group grid border-b border-[#cfd2d0] lg:min-h-[390px] lg:grid-cols-2">
                <div className={`relative min-h-[250px] overflow-hidden bg-[#d9dcda] sm:min-h-[330px] ${reversed ? "lg:order-2" : "lg:order-1"}`}>
                  <Image src={service.image} alt={service.imageAlt} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.025]" sizes="(max-width: 1024px) 100vw, 50vw" />
                  <span className="absolute left-0 top-0 h-12 w-1 bg-blue-600" />
                  <span className="absolute bottom-4 left-5 bg-[#17191b]/75 px-3 py-2 text-xs font-medium text-white backdrop-blur-sm">{service.shortName}</span>
                </div>
                <div className={`flex flex-col justify-center px-2 py-8 sm:px-8 lg:px-12 lg:py-12 ${reversed ? "lg:order-1" : "lg:order-2"}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-4xl font-semibold tracking-[-.07em] text-[#c7cbca] sm:text-5xl">0{index + 1}</span>
                    <span className="flex h-10 w-10 items-center justify-center border border-[#cfd2d0] text-blue-700"><Icon className="h-5 w-5" strokeWidth={1.6} /></span>
                  </div>
                  <h3 className="mt-6 max-w-xl text-3xl font-semibold leading-[1.02] tracking-[-.05em] text-[#17191b] sm:text-4xl lg:text-[2.8rem]">{title}</h3>
                  <p className="mt-4 max-w-lg text-base leading-7 text-[#777D81]">{brief}</p>
                  <Link href={`/servicios/${slug}`} className="mt-7 inline-flex items-center gap-2 self-start text-sm font-semibold text-blue-700 hover:text-blue-900">Conocer esta capacidad <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
