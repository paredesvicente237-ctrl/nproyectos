import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteAssets } from "@/components/siteAssets";

const processes = [
  { name: "Corte láser", description: "Geometrías y piezas", image: siteAssets.fotobuenax1, href: "/servicios/corte-plegado-planchas", position: "object-center" },
  { name: "Plegado industrial", description: "Planchas y perfiles", image: siteAssets.goodBending, href: "/servicios/corte-plegado-planchas", position: "object-center" },
  { name: "Soldadura MIG/TIG", description: "Armado de conjuntos", image: siteAssets.goodWelding, href: "/servicios/soldadura-mig-tig", position: "object-center" },
];

export default function IndustrialProcesses() {
  return (
    <section className="bg-white py-20 sm:py-28 lg:py-36">
      <div className="container-custom px-5 sm:px-8 lg:px-10">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end lg:mb-14">
          <div><p className="eyebrow">Procesos destacados</p><h2 className="mt-5 text-balance text-4xl font-semibold leading-[.98] tracking-[-.065em] text-[#17191b] sm:text-5xl lg:text-[4rem]">Ingeniería que toma forma.</h2></div>
          <p className="max-w-md text-base leading-7 text-[#777D81] sm:text-lg sm:leading-8">Tecnología aplicada a fabricación real.</p>
        </div>
        <div className="grid gap-3 lg:h-[640px] lg:grid-cols-12 lg:grid-rows-2">
          {processes.map((process, index) => (
            <Link key={process.name} href={process.href} className={`group relative block min-h-[280px] overflow-hidden bg-[#202426] lg:min-h-0 ${index === 0 ? "lg:col-span-7 lg:row-span-2" : "lg:col-span-5"}`}>
              <Image src={process.image} alt={process.name} fill className={`object-cover ${process.position} transition-transform duration-700 group-hover:scale-[1.025]`} sizes={index === 0 ? "(max-width: 1024px) 100vw, 58vw" : "(max-width: 1024px) 100vw, 40vw"} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#17191b]/80 via-[#17191b]/5 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white sm:p-7">
                <div><p className="text-sm text-white/75">{process.description}</p><h3 className="mt-1 text-2xl font-semibold text-white sm:text-3xl">{process.name}</h3></div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/60 transition-colors group-hover:bg-white group-hover:text-[#17191b]"><ArrowUpRight className="h-5 w-5" /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
