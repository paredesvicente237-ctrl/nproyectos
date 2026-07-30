"use client";

import { useEffect, useState } from "react";

type MeasureField = "largo" | "ancho" | "alto";

type ProductReferenceProps = {
  productId: string;
  productName: string;
  fields: MeasureField[];
  fixedMeasures?: Partial<Record<MeasureField, number>>;
};

type ReferenceImage = {
  src: string;
  alt: string;
  sourceUrl: string;
};

const fieldNames: Record<MeasureField, string> = {
  largo: "Largo",
  ancho: "Ancho",
  alto: "Alto",
};

const productUrls = {
  conica: "https://varvacoa.cl/products/campana-conica-para-poyecto-2",
  mediterranea: "https://varvacoa.cl/products/campana-mediterranea-para-poyecto-2",
  quincho: "https://varvacoa.cl/products/quincho-modular-2-silver",
  parrillaInox: "https://varvacoa.cl/products/parrilla-inmortal",
  parrillaAcero: "https://varvacoa.cl/products/parrilla-clasica",
  moduloBarra: "https://varvacoa.cl/products/modulo-en-barra-parrilla-carbon",
  moduloV: "https://varvacoa.cl/products/modulo-en-vvv-parrilla-carbon-30x60",
  manivela: "https://varvacoa.cl/products/manivela-parrilla",
} as const;

const images = {
  campanaConica: "https://cdn.shopify.com/s/files/1/0480/0915/0621/files/CC2_175052c9-b695-4008-9435-5af29735a525.jpg?v=1780927596",
  campanaMediterranea: "https://cdn.shopify.com/s/files/1/0480/0915/0621/files/CM2.jpg?v=1780927476",
  quinchoConico: "https://cdn.shopify.com/s/files/1/0480/0915/0621/files/QM2-C-V-SIL.jpg?v=1773341326",
  quinchoMediterraneo: "https://cdn.shopify.com/s/files/1/0480/0915/0621/files/QM2-M-V-SIL.jpg?v=1773341308",
  quinchoGuillotina: "https://cdn.shopify.com/s/files/1/0480/0915/0621/files/QM2-G-V-SIL.jpg?v=1773341339",
  parrillaInox: "https://cdn.shopify.com/s/files/1/0480/0915/0621/files/PI_L_338f2412-e3ee-4a98-8be9-73d43f7c9fba.jpg?v=1772549293",
  parrillaInoxTecnica: "https://cdn.shopify.com/s/files/1/0480/0915/0621/files/PI_FT_L.jpg?v=1772549293",
  parrillaAcero: "https://cdn.shopify.com/s/files/1/0480/0915/0621/files/PC_L.jpg?v=1772545815",
  parrillaAceroTecnica: "https://cdn.shopify.com/s/files/1/0480/0915/0621/files/PC_FT_L.jpg?v=1772545815",
  moduloBarra: "https://cdn.shopify.com/s/files/1/0480/0915/0621/files/MBARRA_1.jpg?v=1772637352",
  moduloV: "https://cdn.shopify.com/s/files/1/0480/0915/0621/files/MVVV_1.jpg?v=1772637396",
  manivela: "https://cdn.shopify.com/s/files/1/0480/0915/0621/files/MN_1.jpg?v=1772639833",
} as const;

const referenceImages: Record<string, ReferenceImage> = {
  "conico-exterior": {
    src: images.campanaConica,
    alt: "Ficha oficial de campana cónica Varvacoa",
    sourceUrl: productUrls.conica,
  },
  "conica-mediterranea": {
    src: images.campanaMediterranea,
    alt: "Ficha oficial de campana mediterránea Varvacoa",
    sourceUrl: productUrls.mediterranea,
  },
  "mediterraneo-falso": {
    src: images.campanaMediterranea,
    alt: "Campana mediterránea con revestimiento exterior rectangular",
    sourceUrl: productUrls.mediterranea,
  },
  faldon: {
    src: images.quinchoMediterraneo,
    alt: "Quincho mediterráneo Varvacoa con faldón exterior",
    sourceUrl: productUrls.quincho,
  },
  "faldon-c": {
    src: images.campanaConica,
    alt: "Campana cónica Varvacoa donde se instala el faldón C",
    sourceUrl: productUrls.conica,
  },
  chimenea: {
    src: images.campanaConica,
    alt: "Ficha oficial de campana cónica con chimenea",
    sourceUrl: productUrls.conica,
  },
  "porta-ventilador": {
    src: images.campanaConica,
    alt: "Campana cónica Varvacoa con salida superior para ventilación",
    sourceUrl: productUrls.conica,
  },
  "puerta-guillotina": {
    src: images.quinchoGuillotina,
    alt: "Quincho Varvacoa con puerta guillotina",
    sourceUrl: productUrls.quincho,
  },
  "mueble-guillotina": {
    src: images.quinchoGuillotina,
    alt: "Mueble quincho guillotina Varvacoa",
    sourceUrl: productUrls.quincho,
  },
  "puerta-quincho": {
    src: images.quinchoGuillotina,
    alt: "Puertas inferiores de quincho Varvacoa",
    sourceUrl: productUrls.quincho,
  },
  "estructura-quincho-guillotina": {
    src: images.quinchoGuillotina,
    alt: "Estructura completa de quincho guillotina Varvacoa",
    sourceUrl: productUrls.quincho,
  },
  "estructura-quincho": {
    src: images.quinchoConico,
    alt: "Estructura completa de quincho cónico Varvacoa",
    sourceUrl: productUrls.quincho,
  },
  "estructura-inox": {
    src: images.parrillaInox,
    alt: "Estructura de parrilla inoxidable Varvacoa",
    sourceUrl: productUrls.parrillaInox,
  },
  "estructura-acero": {
    src: images.parrillaAcero,
    alt: "Estructura de parrilla de acero Varvacoa",
    sourceUrl: productUrls.parrillaAcero,
  },
  "modulo-barra-inox": {
    src: images.moduloBarra,
    alt: "Módulo de barras inoxidable Varvacoa",
    sourceUrl: productUrls.moduloBarra,
  },
  "modulo-v-inox": {
    src: images.moduloV,
    alt: "Módulo de perfiles V inoxidable Varvacoa",
    sourceUrl: productUrls.moduloV,
  },
  "separador-parrilla": {
    src: images.parrillaInoxTecnica,
    alt: "Ficha oficial de parrilla inoxidable Varvacoa",
    sourceUrl: productUrls.parrillaInox,
  },
  "frontal-va-inox": {
    src: images.parrillaInoxTecnica,
    alt: "Vista frontal de parrilla inoxidable Varvacoa",
    sourceUrl: productUrls.parrillaInox,
  },
  "frontal-va-acero": {
    src: images.parrillaAceroTecnica,
    alt: "Vista frontal de parrilla de acero Varvacoa",
    sourceUrl: productUrls.parrillaAcero,
  },
  "bandeja-grasa-inox": {
    src: images.parrillaInoxTecnica,
    alt: "Ficha oficial de parrilla inoxidable con bandeja inferior",
    sourceUrl: productUrls.parrillaInox,
  },
  "pata-falsa-inox": {
    src: images.parrillaInox,
    alt: "Parrilla inoxidable Varvacoa con sus apoyos",
    sourceUrl: productUrls.parrillaInox,
  },
  "pata-falsa-fierro": {
    src: images.parrillaAcero,
    alt: "Parrilla de acero Varvacoa con sus apoyos",
    sourceUrl: productUrls.parrillaAcero,
  },
  "manilla-parrilla": {
    src: images.manivela,
    alt: "Manivela de parrilla Varvacoa",
    sourceUrl: productUrls.manivela,
  },
};

const referenceNotes: Record<string, string> = {
  "conico-exterior": "Largo y ancho corresponden a la boca inferior. Alto corresponde al cuerpo inclinado.",
  "conica-mediterranea": "Mide el frente, el fondo y la altura total del conjunto cónico mediterráneo.",
  "mediterraneo-falso": "Largo es el frente, ancho es el fondo y alto es la caída vertical del revestimiento exterior.",
  faldon: "Largo se mide de extremo a extremo y alto corresponde a la caída vertical.",
  "faldon-c": "Usa el largo total de la pieza y el alto antes de realizar los pliegues laterales.",
  chimenea: "Largo y ancho forman la sección del ducto. Alto es el recorrido vertical completo.",
  "porta-ventilador": "Ingresa las medidas exteriores del marco: largo frontal y ancho de fondo.",
  "puerta-guillotina": "Largo es el ancho total de la puerta y alto es su altura total.",
  "mueble-guillotina": "Mide el frente completo del mueble y su altura total.",
  "puerta-quincho": "Este producto tiene un valor fijo y no requiere ingresar medidas.",
  "estructura-quincho-guillotina": "Mide el ancho exterior de la estructura y su altura completa.",
  "estructura-quincho": "Mide el ancho exterior de la estructura y su altura completa.",
  "estructura-inox": "Largo es la medida frontal de la estructura y ancho es la profundidad.",
  "estructura-acero": "Largo es la medida frontal de la estructura y ancho es la profundidad.",
  "modulo-barra-inox": "Largo sigue el sentido de las barras y ancho cruza el módulo de lado a lado.",
  "modulo-v-inox": "Largo sigue el sentido de los perfiles V y ancho cruza el módulo completo.",
  "separador-parrilla": "Ingresa el largo del separador. El ancho está fijado en 200 mm.",
  "frontal-va-inox": "Ingresa el largo total del frontal. El ancho está fijado en 110 mm.",
  "frontal-va-acero": "Ingresa el largo total del frontal. El ancho está fijado en 110 mm.",
  "bandeja-grasa-inox": "Ingresa el largo total de la bandeja. El ancho está fijado en 40 mm.",
  "pata-falsa-inox": "Este producto tiene un valor fijo y no requiere ingresar medidas.",
  "pata-falsa-fierro": "Este producto tiene un valor fijo y no requiere ingresar medidas.",
  "manilla-parrilla": "Este producto tiene un valor fijo y no requiere ingresar medidas.",
};

function ExpandIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5M3 8l6-6M21 8l-6-6M3 16l6 6M21 16l-6 6" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4">
      <path d="M5 5l14 14M19 5L5 19" />
    </svg>
  );
}

export function ProductReference({
  productId,
  productName,
  fields,
  fixedMeasures,
}: ProductReferenceProps) {
  const [open, setOpen] = useState(false);
  const reference = referenceImages[productId];

  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  if (!reference) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative h-24 w-28 shrink-0 overflow-hidden rounded-xl border-2 border-slate-300 bg-white shadow-sm outline-none transition hover:-translate-y-0.5 hover:border-amber-500 hover:shadow-md focus-visible:border-amber-500 focus-visible:ring-4 focus-visible:ring-amber-200 sm:h-28 sm:w-32"
        aria-label={`Ampliar referencia de ${productName}`}
      >
        <img
          src={reference.src}
          alt={reference.alt}
          className="h-full w-full object-contain p-1 pb-7"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
        />
        <span className="absolute inset-x-1 bottom-1 flex items-center justify-center gap-1 rounded-md bg-navy-950/90 px-2 py-1 text-[10px] font-extrabold uppercase tracking-wide text-white">
          <ExpandIcon />
          Ampliar
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 p-3 backdrop-blur-sm sm:p-6"
          role="presentation"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setOpen(false);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby={`reference-title-${productId}`}
            className="max-h-[94vh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-white/20 bg-white shadow-2xl"
          >
            <header className="flex items-start justify-between gap-4 border-b-2 border-slate-200 bg-navy-950 px-4 py-4 text-white sm:px-6">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-amber-300">Referencia oficial Varvacoa</p>
                <h2 id={`reference-title-${productId}`} className="mt-1 text-xl font-black text-white sm:text-2xl">{productName}</h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-white/30 p-2 text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300"
                aria-label="Cerrar referencia"
              >
                <CloseIcon />
              </button>
            </header>

            <div className="grid gap-5 p-4 sm:p-6 lg:grid-cols-[minmax(0,1fr)_280px]">
              <div className="flex min-h-72 items-center justify-center overflow-hidden rounded-xl border-2 border-slate-300 bg-white p-2 sm:min-h-[32rem]">
                <img
                  src={reference.src}
                  alt={reference.alt}
                  className="max-h-[70vh] w-full object-contain"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
              </div>

              <aside className="rounded-xl border-2 border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-navy-700">Cómo medir</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">
                  {referenceNotes[productId] ?? "Usa las medidas exteriores de la pieza terminada."}
                </p>

                <div className="mt-5 space-y-2">
                  {fields.length > 0 ? fields.map((field) => (
                    <div key={field} className="flex items-center justify-between gap-3 rounded-lg border border-slate-300 bg-white px-3 py-2">
                      <span className="text-sm font-extrabold text-slate-900">{fieldNames[field]}</span>
                      <span className="text-xs font-bold text-amber-700">
                        {fixedMeasures?.[field] !== undefined ? `${fixedMeasures[field]} mm · fija` : "Ingresar en mm"}
                      </span>
                    </div>
                  )) : (
                    <div className="rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-3 text-sm font-bold text-emerald-800">
                      No requiere medidas.
                    </div>
                  )}
                </div>

                <p className="mt-5 border-t border-slate-300 pt-4 text-xs font-semibold leading-5 text-slate-600">
                  Algunas piezas internas se muestran dentro del producto completo porque Varvacoa no publica una fotografía individual.
                </p>
                <a
                  href={reference.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex text-xs font-extrabold text-navy-800 underline decoration-amber-500 decoration-2 underline-offset-4 hover:text-amber-700"
                >
                  Ver producto original en Varvacoa
                </a>
              </aside>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
