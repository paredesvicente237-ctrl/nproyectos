import Image from "next/image";
import { siteAssets } from "@/components/siteAssets";

const equipment = [
  { name: "Corte Láser", spec: "12 mm" },
  { name: "Corte Guillotina", spec: "6 mm" },
  { name: "Plegadoras", spec: "6 mm" },
  { name: "Curvado de Tubos", spec: "" },
  { name: "Soldadura MIG/TIG", spec: "" },
  { name: "Soldadura Láser", spec: "" },
];

const materials = [
  "Acero carbono", "Acero inoxidable", "Galvanizado", "Diamantado",
  "Perforado", "Bronce", "Aluminio", "Cobre",
];

export default function Equipment() {
  return (
    <section id="equipamiento" className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          {/* Info side */}
          <div>
            <span className="eyebrow">Equipamiento</span>
            <h2 className="mt-4 text-4xl font-extrabold sm:text-5xl">
              Capacidad instalada
            </h2>
            <p className="mt-4 text-lg text-slate-500">
              Personal calificado y certificado con amplia experiencia en
              trabajos de armado y soldadura.
            </p>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {equipment.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-5 py-4"
                >
                  <span className="text-sm font-medium text-slate-700">
                    {item.name}
                  </span>
                  {item.spec && (
                    <span className="rounded-lg bg-navy-50 px-3 py-1 text-sm font-bold text-navy-600">
                      {item.spec}
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl bg-slate-50 p-6">
              <p className="text-sm font-bold text-slate-900">
                Materiales de trabajo
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {materials.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-medium text-slate-600"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Single image */}
          <div className="overflow-hidden rounded-3xl shadow-lg">
            <Image
              src={siteAssets.goodGuillotine}
              alt="Guillotina de corte industrial"
              className="aspect-[16/10] w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
