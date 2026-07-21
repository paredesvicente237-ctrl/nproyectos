import Image from "next/image";
import Link from "next/link";
import { ArrowRight, AudioLines, Boxes, Factory, Ruler } from "lucide-react";
import { siteAssets } from "@/components/siteAssets";

const specialties = [
  { icon: Boxes, title: "Suministro", brief: "Piezas y partes con material, diseño y desarrollo opcional.", href: "/servicios/fabricacion-metalmecanica" },
  { icon: Factory, title: "Fabricación metalmecánica", brief: "Acero carbono, inoxidable, galvanizado y otros materiales.", href: "/servicios/fabricacion-metalmecanica" },
  { icon: AudioLines, title: "Control acústico", brief: "Silenciadores, atenuadores, paneles y soluciones a medida.", href: "/servicios/control-acustico-industrial" },
  { icon: Ruler, title: "Proyectos", brief: "Diseño CAD/Inventor, revisión técnica y optimización de materiales.", href: "/servicios/fabricacion-metalmecanica" },
];

const work = [
  { title: "Corte, guillotina y plegado", text: "Perfiles, canales, mobiliario inoxidable, cubiertas, bandejas, ductería y paneles.", image: siteAssets.goodBending, href: "/servicios/corte-plegado-planchas" },
  { title: "Armado y soldadura MIG/TIG", text: "Campanas, piping, equipos industriales, gabinetes, cabinas, puertas y portones acústicos.", image: siteAssets.goodWelding, href: "/servicios/soldadura-mig-tig" },
];

export default function Services() {
  return (
    <section id="especialidades" className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid gap-6 lg:grid-cols-[0.65fr_1fr] lg:items-end">
          <div><span className="eyebrow">Especialidades</span><h2 className="section-title">Capacidad técnica para fabricar de principio a fin.</h2></div>
          <p className="section-copy lg:justify-self-end">Integramos suministro, ingeniería y fabricación para reducir coordinación, anticipar interferencias y entregar una solución lista para operar.</p>
        </div>

        <div className="mt-12 grid border-l border-t border-slate-200 sm:grid-cols-2 lg:grid-cols-4">
          {specialties.map(({ icon: Icon, title, brief, href }) => (
            <article key={title} className="flex flex-col border-b border-r border-slate-200 p-6 sm:p-7">
              <Icon className="h-6 w-6 text-navy-600" />
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{brief}</p>
              <Link href={href} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy-700 hover:text-navy-900">
                Ver servicio <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {work.map((item) => (
            <article key={item.title} className="group overflow-hidden rounded-md border border-slate-200 bg-slate-950">
              <Image src={item.image} alt={item.title} className="aspect-[16/9] w-full object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100" sizes="(max-width: 1024px) 100vw, 50vw" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{item.text}</p>
                <Link href={item.href} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-300 hover:text-white">
                  Conocer el servicio <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
