import Image from "next/image";
import { stock } from "@/components/stockImages";
import { siteAssets } from "@/components/siteAssets";

type WorkCard = {
  title: string;
  items: string;
  image: string | ReturnType<typeof Object>;
  remote: boolean;
};

const specialties = [
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
    title: "Servicios",
    brief: "Suministro de piezas y partes. Opcional material incluido, diseño y desarrollo.",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085" />
      </svg>
    ),
    title: "Fabricación",
    brief: "Productos en acero carbono e inoxidable, galvanizado, y otros.",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
      </svg>
    ),
    title: "Acústica & Ruido",
    brief: "Elaboración de productos acústicos: silenciadores, atenuadores, paneles, etc.",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
      </svg>
    ),
    title: "Proyectos",
    brief: "Apoyo en el diseño CAD/INVENTOR, optimización de materiales.",
  },
];

const workCards = [
  {
    title: "Corte Láser / Guillotina / Plegado",
    items: "Perfiles, ángulos, canales, cubre juntas. Mobiliario inoxidable, cubiertas, bandejas, tapas, repisas. Techumbres, paneles, ductería.",
    image: siteAssets.goodBending,
    remote: false,
  },
  {
    title: "Armado y Soldadura",
    items: "Fabricación de campanas, transiciones, piping para gases, silenciadores de ruido, celosías, equipos industriales, gabinetes, cabinas, puertas y portones acústicos.",
    image: siteAssets.goodWelding,
    remote: false,
  },
];

export default function Services() {
  return (
    <section id="especialidades" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center">
          <span className="eyebrow mx-auto justify-center">Especialidades</span>
          <h2 className="mt-4 text-4xl font-extrabold sm:text-5xl">
            Nuestras capacidades
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
            Desde el suministro de piezas hasta proyectos completos con soporte
            técnico integral.
          </p>
        </div>

        {/* Service cards */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {specialties.map((item) => (
            <div key={item.title} className="card group">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-50 text-navy-600 transition-all duration-300 group-hover:bg-navy-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-navy-600/25">
                {item.icon}
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {item.brief}
              </p>
            </div>
          ))}
        </div>

        {/* Work type images */}
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {workCards.map((item) => (
            <div key={item.title} className="group relative overflow-hidden rounded-3xl shadow-lg">
              <Image
                src={item.image}
                alt={item.title}
                width={640}
                height={400}
                className="aspect-[16/9] h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-2xl font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  {item.items}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
