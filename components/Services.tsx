import Image from "next/image";
import { AudioLines, Boxes, Factory, Ruler } from "lucide-react";
import { siteAssets } from "@/components/siteAssets";

const specialties = [
  { icon: Boxes, title: "Suministro", brief: "Piezas y partes con material, diseño y desarrollo opcional." },
  { icon: Factory, title: "Fabricación", brief: "Acero carbono, inoxidable, galvanizado y otros materiales." },
  { icon: AudioLines, title: "Control acústico", brief: "Silenciadores, atenuadores, paneles y soluciones a medida." },
  { icon: Ruler, title: "Proyectos", brief: "Diseño CAD/Inventor, revisión técnica y optimización de materiales." },
];

const work = [
  { title: "Corte, guillotina y plegado", text: "Perfiles, canales, mobiliario inoxidable, cubiertas, bandejas, ductería y paneles.", image: siteAssets.goodBending },
  { title: "Armado y soldadura", text: "Campanas, piping, equipos industriales, gabinetes, cabinas, puertas y portones acústicos.", image: siteAssets.goodWelding },
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
          {specialties.map(({ icon: Icon, title, brief }) => (
            <article key={title} className="border-b border-r border-slate-200 p-6 sm:p-7">
              <Icon className="h-6 w-6 text-navy-600" />
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{brief}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {work.map((item) => (
            <article key={item.title} className="group overflow-hidden rounded-md border border-slate-200 bg-slate-950">
              <Image src={item.image} alt={item.title} className="aspect-[16/9] w-full object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100" sizes="(max-width: 1024px) 100vw, 50vw" />
              <div className="p-6"><h3 className="text-xl font-semibold text-white">{item.title}</h3><p className="mt-2 text-sm leading-6 text-slate-300">{item.text}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
