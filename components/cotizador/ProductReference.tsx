"use client";

import { useEffect, useState } from "react";

type MeasureField = "largo" | "ancho" | "alto";

type ProductReferenceProps = {
  productId: string;
  productName: string;
  fields: MeasureField[];
  fixedMeasures?: Partial<Record<MeasureField, number>>;
};

const fieldNames: Record<MeasureField, string> = {
  largo: "Largo",
  ancho: "Ancho",
  alto: "Alto",
};

const referenceNotes: Record<string, string> = {
  "conico-exterior": "Largo y ancho corresponden a la boca inferior. Alto corresponde al cuerpo inclinado.",
  "conica-mediterranea": "Mide el frente, el fondo y la altura total del conjunto cónico mediterráneo.",
  "mediterraneo-falso": "Largo es el frente, ancho es el fondo y alto es la caída vertical del revestimiento.",
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

type DrawingProps = {
  productId: string;
  productName: string;
  instance: "thumbnail" | "modal";
};

function ProductDrawing({ productId, productName, instance }: DrawingProps) {
  const markerId = `arrow-${productId}-${instance}`;
  const gridId = `grid-${productId}-${instance}`;
  const isStructure = productId === "estructura-inox" || productId === "estructura-acero";
  const isLeg = productId === "pata-falsa-inox" || productId === "pata-falsa-fierro";
  const isFrontal = productId === "frontal-va-inox" || productId === "frontal-va-acero";

  const dimension = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    label: string,
    labelX: number,
    labelY: number,
  ) => (
    <g className="text-amber-600">
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="currentColor"
        strokeWidth="2"
        markerStart={`url(#${markerId})`}
        markerEnd={`url(#${markerId})`}
      />
      <text
        x={labelX}
        y={labelY}
        fill="currentColor"
        fontSize="12"
        fontWeight="800"
        stroke="none"
        textAnchor="middle"
      >
        {label}
      </text>
    </g>
  );

  let drawing;

  switch (productId) {
    case "conico-exterior":
      drawing = (
        <>
          <path d="M92 160 L128 64 H232 L268 160 Z" />
          <path d="M92 160 H268 V181 H92 Z" />
          <path d="M128 64 L147 45 H213 L232 64" />
          {dimension(88, 199, 272, 199, "LARGO", 180, 216)}
          {dimension(286, 63, 286, 181, "ALTO", 310, 126)}
          {dimension(107, 48, 147, 32, "ANCHO", 126, 23)}
        </>
      );
      break;
    case "conica-mediterranea":
      drawing = (
        <>
          <path d="M78 177 V44 H282 V177" />
          <path d="M100 151 L132 76 H228 L260 151 Z" />
          <path d="M100 151 H260 V174 H100 Z" />
          <path d="M132 76 L148 59 H212 L228 76" />
          <path d="M78 44 L100 62 M282 44 L260 62" strokeDasharray="5 4" />
          {dimension(76, 199, 284, 199, "LARGO", 180, 216)}
          {dimension(302, 44, 302, 177, "ALTO", 326, 115)}
          {dimension(91, 39, 131, 24, "ANCHO", 110, 16)}
        </>
      );
      break;
    case "mediterraneo-falso":
      drawing = (
        <>
          <path d="M83 68 L217 39 L281 72 L147 101 Z" />
          <path d="M83 68 V174 L147 204 V101" />
          <path d="M147 101 L281 72 V178 L147 204" />
          <path d="M91 75 V166 L147 192 L273 165" strokeDasharray="5 4" />
          {dimension(145, 218, 282, 188, "LARGO", 226, 215)}
          {dimension(73, 57, 217, 26, "ANCHO", 144, 20)}
          {dimension(302, 72, 302, 178, "ALTO", 326, 129)}
        </>
      );
      break;
    case "faldon":
      drawing = (
        <>
          <path d="M67 63 H293 V169 H67 Z" />
          <path d="M67 76 H293" strokeDasharray="5 4" />
          {dimension(67, 193, 293, 193, "LARGO", 180, 211)}
          {dimension(316, 63, 316, 169, "ALTO", 337, 121)}
        </>
      );
      break;
    case "faldon-c":
      drawing = (
        <>
          <path d="M74 67 H286 V165 H74" />
          <path d="M74 67 L52 83 V149 L74 165" />
          <path d="M286 67 L308 83 V149 L286 165" />
          <path d="M74 80 H286 M74 152 H286" strokeDasharray="5 4" />
          {dimension(74, 191, 286, 191, "LARGO", 180, 209)}
          {dimension(327, 67, 327, 165, "ALTO", 346, 121)}
        </>
      );
      break;
    case "chimenea":
      drawing = (
        <>
          <path d="M110 54 L205 34 L254 59 L158 80 Z" />
          <path d="M110 54 V176 L158 199 V80" />
          <path d="M158 80 L254 59 V181 L158 199" />
          {dimension(106, 213, 158, 213, "LARGO", 132, 228)}
          {dimension(160, 47, 218, 34, "ANCHO", 188, 24)}
          {dimension(278, 59, 278, 181, "ALTO", 302, 125)}
        </>
      );
      break;
    case "porta-ventilador":
      drawing = (
        <>
          <path d="M67 55 H293 V174 H67 Z" />
          <path d="M92 78 H268 V151 H92 Z" />
          <circle cx="180" cy="114" r="35" />
          <path d="M180 79 V149 M145 114 H215" strokeDasharray="5 4" />
          {dimension(67, 198, 293, 198, "LARGO", 180, 216)}
          {dimension(316, 55, 316, 174, "ANCHO", 338, 119)}
        </>
      );
      break;
    case "puerta-guillotina":
    case "estructura-quincho-guillotina":
      drawing = (
        <>
          <path d="M82 43 H278 V184 H82 Z" />
          <path d="M102 63 H258 V166 H102 Z" />
          <path d="M102 114 H258" />
          <path d="M114 104 L180 73 L246 104" strokeDasharray="5 4" />
          <path d="M180 73 V146" strokeDasharray="5 4" />
          {dimension(82, 207, 278, 207, "LARGO", 180, 225)}
          {dimension(302, 43, 302, 184, "ALTO", 325, 118)}
        </>
      );
      break;
    case "mueble-guillotina":
      drawing = (
        <>
          <path d="M78 37 H282 V190 H78 Z" />
          <path d="M98 57 H262 V128 H98 Z" />
          <path d="M98 143 H262 M180 143 V190" />
          <circle cx="169" cy="166" r="3" fill="currentColor" />
          <circle cx="191" cy="166" r="3" fill="currentColor" />
          {dimension(78, 211, 282, 211, "LARGO", 180, 228)}
          {dimension(305, 37, 305, 190, "ALTO", 328, 119)}
        </>
      );
      break;
    case "puerta-quincho":
      drawing = (
        <>
          <path d="M87 42 H273 V188 H87 Z" />
          <path d="M108 64 H252 V166 H108 Z" />
          <path d="M180 64 V166" />
          <circle cx="168" cy="118" r="4" fill="currentColor" />
          <circle cx="192" cy="118" r="4" fill="currentColor" />
          <text x="180" y="217" textAnchor="middle" fontSize="12" fontWeight="800" fill="#d97706" stroke="none">VALOR FIJO</text>
        </>
      );
      break;
    case "estructura-quincho":
      drawing = (
        <>
          <path d="M76 45 H284 V187 H76 Z" />
          <path d="M99 67 H261 V165 H99 Z" />
          <path d="M76 45 L99 67 M284 45 L261 67 M76 187 L99 165 M284 187 L261 165" />
          {dimension(76, 210, 284, 210, "LARGO", 180, 228)}
          {dimension(308, 45, 308, 187, "ALTO", 330, 121)}
        </>
      );
      break;
    case "estructura-inox":
    case "estructura-acero":
      drawing = (
        <>
          <path d="M64 84 L222 49 L296 87 L137 124 Z" />
          <path d="M64 84 V158 L137 195 V124" />
          <path d="M137 124 L296 87 V160 L137 195" />
          <path d="M84 91 L220 62 L276 91 L138 122" strokeDasharray="5 4" />
          {dimension(135, 211, 298, 173, "LARGO", 224, 209)}
          {dimension(62, 69, 222, 34, "ANCHO", 139, 27)}
          {isStructure && <text x="180" y="148" textAnchor="middle" fontSize="11" fontWeight="800" fill="#d97706" stroke="none">ESTRUCTURA</text>}
        </>
      );
      break;
    case "modulo-barra-inox":
    case "modulo-v-inox": {
      const isV = productId === "modulo-v-inox";
      drawing = (
        <>
          <path d="M61 71 L236 39 L299 74 L124 108 Z" />
          <path d="M61 71 V151 L124 184 V108" />
          <path d="M124 108 L299 74 V154 L124 184" />
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <path
              key={index}
              d={isV
                ? `M${83 + index * 27} ${69 - index * 5} L${99 + index * 27} ${87 - index * 5} L${115 + index * 27} ${66 - index * 5}`
                : `M${79 + index * 31} ${69 - index * 6} L${142 + index * 26} ${104 - index * 5}`}
              strokeWidth={isV ? 3 : 4}
            />
          ))}
          {dimension(122, 203, 301, 166, "LARGO", 220, 203)}
          {dimension(57, 57, 236, 24, "ANCHO", 142, 18)}
        </>
      );
      break;
    }
    case "separador-parrilla":
      drawing = (
        <>
          <path d="M60 91 L279 52 L305 67 L86 108 Z" />
          <path d="M86 108 V145 L305 104 V67" />
          <path d="M60 91 V127 L86 145" />
          {dimension(85, 168, 306, 127, "LARGO", 207, 164)}
          {dimension(58, 76, 88, 61, "ANCHO 200", 71, 51)}
        </>
      );
      break;
    case "frontal-va-inox":
    case "frontal-va-acero":
      drawing = (
        <>
          <path d="M51 91 L292 48 L310 66 L69 110 Z" />
          <path d="M69 110 V148 L310 104 V66" />
          <path d="M51 91 V129 L69 148" />
          <path d="M82 107 L297 69" strokeDasharray="5 4" />
          {dimension(68, 173, 311, 128, "LARGO", 201, 170)}
          {dimension(48, 76, 72, 63, "ANCHO 110", 59, 51)}
          {isFrontal && <text x="181" y="205" textAnchor="middle" fontSize="11" fontWeight="800" fill="#d97706" stroke="none">FRONTAL VA</text>}
        </>
      );
      break;
    case "bandeja-grasa-inox":
      drawing = (
        <>
          <path d="M62 91 L230 51 L300 81 L132 123 Z" />
          <path d="M62 91 V137 L132 174 V123" />
          <path d="M132 123 L300 81 V127 L132 174" />
          <path d="M82 96 L229 62 L280 84 L132 120" />
          {dimension(130, 193, 302, 151, "LARGO", 225, 191)}
          {dimension(60, 75, 132, 47, "ANCHO 40", 92, 39)}
        </>
      );
      break;
    case "pata-falsa-inox":
    case "pata-falsa-fierro":
      drawing = (
        <>
          <path d="M128 39 H232 V74 H205 V178 H155 V74 H128 Z" />
          <path d="M143 54 H217 M170 74 V178 M155 161 H205" strokeDasharray="5 4" />
          <path d="M142 178 H218 V194 H142 Z" />
          {isLeg && <text x="180" y="220" textAnchor="middle" fontSize="12" fontWeight="800" fill="#d97706" stroke="none">VALOR FIJO</text>}
        </>
      );
      break;
    case "manilla-parrilla":
      drawing = (
        <>
          <path d="M82 153 V105 Q82 65 122 65 H238 Q278 65 278 105 V153" strokeWidth="14" strokeLinecap="round" />
          <path d="M58 153 H106 M254 153 H302" strokeWidth="12" strokeLinecap="round" />
          <text x="180" y="204" textAnchor="middle" fontSize="12" fontWeight="800" fill="#d97706" stroke="none">VALOR FIJO</text>
        </>
      );
      break;
    default:
      drawing = (
        <>
          <path d="M74 56 H286 V176 H74 Z" />
          <path d="M98 78 H262 V154 H98 Z" strokeDasharray="5 4" />
        </>
      );
  }

  return (
    <svg
      viewBox="0 0 360 235"
      className="h-full w-full"
      role="img"
      aria-label={`Referencia de medidas para ${productName}`}
    >
      <title>{`Referencia de medidas para ${productName}`}</title>
      <defs>
        <pattern id={gridId} width="18" height="18" patternUnits="userSpaceOnUse">
          <path d="M18 0 H0 V18" fill="none" stroke="#cbd5e1" strokeWidth="0.6" />
        </pattern>
        <marker
          id={markerId}
          markerWidth="7"
          markerHeight="7"
          refX="3.5"
          refY="3.5"
          orient="auto-start-reverse"
        >
          <path d="M7 0 L0 3.5 L7 7 Z" fill="#d97706" />
        </marker>
      </defs>
      <rect width="360" height="235" rx="10" fill="#f8fafc" />
      <rect width="360" height="235" rx="10" fill={`url(#${gridId})`} opacity="0.72" />
      <g fill="none" stroke="#0f2744" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
        {drawing}
      </g>
    </svg>
  );
}

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

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative h-24 w-28 shrink-0 overflow-hidden rounded-xl border-2 border-slate-300 bg-slate-50 shadow-sm outline-none transition hover:-translate-y-0.5 hover:border-amber-500 hover:shadow-md focus-visible:border-amber-500 focus-visible:ring-4 focus-visible:ring-amber-200 sm:h-28 sm:w-32"
        aria-label={`Ampliar referencia de ${productName}`}
      >
        <ProductDrawing productId={productId} productName={productName} instance="thumbnail" />
        <span className="absolute inset-x-1 bottom-1 flex items-center justify-center gap-1 rounded-md bg-navy-950/90 px-2 py-1 text-[10px] font-extrabold uppercase tracking-wide text-white">
          <ExpandIcon />
          Ver medidas
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
            className="max-h-[94vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-white/20 bg-white shadow-2xl"
          >
            <header className="flex items-start justify-between gap-4 border-b-2 border-slate-200 bg-navy-950 px-4 py-4 text-white sm:px-6">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-amber-300">Referencia de medidas</p>
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
              <div className="min-h-64 overflow-hidden rounded-xl border-2 border-slate-300 bg-slate-50 sm:min-h-96">
                <ProductDrawing productId={productId} productName={productName} instance="modal" />
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
                  Las líneas ámbar indican las cotas que debes ingresar en el cotizador.
                </p>
              </aside>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
