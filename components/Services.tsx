import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, AudioLines, Boxes, Factory, Ruler } from "lucide-react";
import { siteAssets } from "@/components/siteAssets";

const specialties = [
  { icon: Factory, title: "Fabricación metalmecánica", brief: "Piezas, conjuntos y estructuras en acero carbono, inoxidable y galvanizado.", href: "/servicios/fabricacion-metalmecanica", code: "FAB" },
  { icon: Boxes, title: "Corte y plegado", brief: "Procesamiento de planchas para geometrías precisas y producción repetible.", href: "/servicios/corte-plegado-planchas", code: "CYP" },
  { icon: Ruler, title: "Armado y soldadura", brief: "Uniones MIG/TIG y fabricación de equipos, gabinetes, ductos y soportes.", href: "/servicios/soldadura-mig-tig", code: "SOL" },
  { icon: AudioLines, title: "Control acústico", brief: "Silenciadores, paneles, cabinas y soluciones para ruido industrial.", href: "/servicios/control-acustico-industrial", code: "ACU" },
];

const highlights = [
  { title: "Corte láser", label: "Geometrías y piezas", image: siteAssets.fotobuenax1 },
  { title: "Plegado industrial", label: "Planchas y perfiles", image: siteAssets.goodBending },
  { title: "Soldadura MIG/TIG", label: "Armado de conjuntos", image: siteAssets.goodWelding },
];

export default function Services() {
  return (
    <section id="especialidades" className="section-padding technical-grid bg-slate-50">
      <div className="container-custom">
        <div className="grid gap-6 lg:grid-cols-[0.72fr_1fr] lg:items-end">
          <div><span className="eyebrow">Capacidades</span><h2 className="section-title">Un solo equipo para llevar el acero del plano a la obra.</h2></div>
          <p className="section-copy lg:justify-self-end">Integramos desarrollo, suministro y fabricación para reducir coordinaciones y mantener control técnico sobre el resultado.</p>
        </div>

        <div className="mt-12 grid border-l border-t border-slate-300 bg-white sm:grid-cols-2 lg:grid-cols-4">
          {specialties.map(({ icon: Icon, title, brief, href, code }, index) => (
            <Link key={title} href={href} className="group relative flex min-h-[285px] flex-col border-b border-r border-slate-300 p-7 transition-colors hover:bg-[#06152c]">
              <div className="flex items-start justify-between">
                <Icon className="h-8 w-8 text-blue-700 group-hover:text-blue-300" strokeWidth={1.5} />
                <span className="font-mono text-[10px] tracking-[0.16em] text-slate-400 group-hover:text-slate-500">NP-{code}/0{index + 1}</span>
              </div>
              <div className="mt-auto pt-12">
                <h3 className="text-xl font-semibold text-slate-950 group-hover:text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600 group-hover:text-slate-300">{brief}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-blue-700 group-hover:text-blue-300">Ver capacidad <ArrowUpRight className="h-4 w-4" /></span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-14 flex items-end justify-between gap-6">
          <div><span className="eyebrow">Procesos destacados</span><h3 className="mt-3 text-2xl font-semibold tracking-[-0.025em] text-slate-950">Tecnología aplicada a fabricación real.</h3></div>
          <Link href="/productos" className="hidden items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900 sm:inline-flex">Ver productos <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {highlights.map((item, index) => (
            <article key={item.title} className="group relative min-h-[340px] overflow-hidden bg-slate-950">
              <Image src={item.image} alt={item.title} fill className="object-cover opacity-85 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100" sizes="(max-width: 768px) 100vw, 33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06152c] via-[#06152c]/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="font-mono text-[10px] tracking-[0.18em] text-blue-300">PROCESO / 0{index + 1}</p>
                <h4 className="mt-2 text-xl font-semibold text-white">{item.title}</h4>
                <p className="mt-1 text-sm text-slate-300">{item.label}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
