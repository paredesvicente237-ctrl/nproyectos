import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, AudioLines, Boxes, Factory, Ruler } from "lucide-react";
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
    <section id="especialidades" className="section-padding bg-[#f3f6f8]">
      <div className="container-custom">
        <div className="grid gap-6 lg:grid-cols-[0.72fr_1fr] lg:items-end">
          <div><span className="eyebrow">Capacidades</span><h2 className="section-title">Un solo equipo para llevar el acero del plano a la obra.</h2></div>
          <p className="section-copy lg:justify-self-end">Integramos desarrollo, suministro y fabricación para reducir coordinaciones y mantener control técnico sobre el resultado.</p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_.82fr] lg:gap-16">
          <div className="border-t border-slate-300">
            {specialties.map(({ icon: Icon, title, brief, href, code }, index) => (
              <Link key={title} href={href} className="group grid gap-3 border-b border-slate-300 py-6 sm:grid-cols-[48px_1fr_auto] sm:items-start sm:gap-5">
                <span className="flex h-10 w-10 items-center justify-center bg-white text-blue-700"><Icon className="h-5 w-5" strokeWidth={1.7} /></span>
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-3"><span className="text-[10px] font-bold tracking-[0.1em] text-blue-700">{code}</span><h3 className="text-xl font-semibold text-[#172634] group-hover:text-blue-800">{title}</h3></div>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">{brief}</p>
                </div>
                <span className="inline-flex items-center gap-2 pt-1 text-xs font-semibold text-blue-700 sm:justify-self-end">Ver servicio <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
              </Link>
            ))}
          </div>
          <div className="grid min-h-[450px] grid-rows-[1fr_auto] bg-[#10283e] text-white">
            <div className="relative min-h-[300px] overflow-hidden">
              <Image src={highlights[0].image} alt={highlights[0].title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 42vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#10283e]/85 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-6"><p className="text-xs font-semibold text-blue-200">Procesos destacados</p><p className="mt-1 text-2xl font-semibold text-white">{highlights[0].title}</p></div>
            </div>
            <div className="grid grid-cols-2 divide-x divide-white/20">
              {highlights.slice(1).map((item) => (
                <div key={item.title} className="relative min-h-[140px] overflow-hidden p-5">
                  <Image src={item.image} alt={item.title} fill className="object-cover opacity-35" sizes="(max-width: 1024px) 50vw, 20vw" />
                  <div className="absolute inset-0 bg-[#10283e]/35" />
                  <div className="relative"><p className="text-sm font-semibold text-white">{item.title}</p><p className="mt-1 text-xs text-slate-200">{item.label}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Link href="/productos" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900">Explorar productos industriales <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  );
}
