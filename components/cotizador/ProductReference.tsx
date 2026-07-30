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

const measurementNotes: Record<string, string> = {
  "conico-exterior": "Largo y ancho se toman en la boca inferior. Alto corresponde al cuerpo completo de la campana.",
  "conica-mediterranea": "Mide el frente y fondo exteriores, más la altura total del revestimiento mediterráneo.",
  "mediterraneo-falso": "Usa las medidas exteriores del revestimiento rectangular: frente, fondo y altura.",
  faldon: "Largo de extremo a extremo y alto de la caída vertical.",
  "faldon-c": "Mide la cara frontal antes de considerar los retornos laterales del pliegue C.",
  chimenea: "Largo y ancho forman la sección del ducto; alto es su recorrido vertical.",
  "porta-ventilador": "Mide el rectángulo exterior de la placa, no el diámetro de la abertura.",
  "puerta-guillotina": "Largo es el ancho exterior del marco y alto es la altura completa.",
  "mueble-guillotina": "Mide el ancho y la altura exterior del mueble terminado.",
  "estructura-quincho-guillotina": "Mide el ancho y la altura exterior de la estructura.",
  "estructura-quincho": "Mide el ancho y la altura exterior de la estructura.",
  "estructura-inox": "Largo es el frente de la parrilla y ancho es su profundidad.",
  "estructura-acero": "Largo es el frente de la parrilla y ancho es su profundidad.",
  "modulo-barra-inox": "Largo sigue el frente del módulo y ancho corresponde a la profundidad de las barras.",
  "modulo-v-inox": "Largo sigue el frente del módulo y ancho corresponde a la profundidad de los perfiles V.",
  "separador-parrilla": "Ingresa el largo total. El ancho está fijado en 200 mm.",
  "frontal-va-inox": "Ingresa el largo total del frontal. El ancho está fijado en 110 mm.",
  "frontal-va-acero": "Ingresa el largo total del frontal. El ancho está fijado en 110 mm.",
  "bandeja-grasa-inox": "Ingresa el largo total de la bandeja. El ancho está fijado en 40 mm.",
};

type ShapeProps = {
  productId: string;
};

function ProductShape({ productId }: ShapeProps) {
  switch (productId) {
    case "conico-exterior":
      return (
        <>
          <path d="M112 181 146 87h112l46 94Z" fill="#dbe4ee" />
          <path d="m258 87 27 13 43 81h-24Z" fill="#aebdcb" />
          <path d="M146 87h112l27 13H168Z" fill="#f5f7fa" />
          <path d="M168 87V48h76v39M158 48h96v13h-96" fill="#c8d3df" />
          <path d="M100 181h216v18H100Z" fill="#f59e0b" />
        </>
      );
    case "conica-mediterranea":
      return (
        <>
          <path d="M102 50h220v149H102Z" fill="#dbe4ee" />
          <path d="m322 50 20 15v134h-20Z" fill="#aebdcb" />
          <path d="M129 181 161 94h102l38 87Z" fill="#f8fafc" />
          <path d="M161 94h102l22 12H181Z" fill="#c8d3df" />
          <path d="M181 94V58h64v36" fill="#f8fafc" />
          <path d="M117 181h199v18H117Z" fill="#f59e0b" />
          <path d="M102 50h220M102 50v149M322 50v149" strokeDasharray="7 6" />
        </>
      );
    case "mediterraneo-falso":
      return (
        <>
          <path d="M102 52h220v146H102Z" fill="#dbe4ee" />
          <path d="m322 52 22 15v131h-22Z" fill="#aebdcb" />
          <path d="m102 52 22 15h220l-22-15Z" fill="#f5f7fa" />
          <path d="M119 72h186v108H119Z" fill="#f8fafc" strokeDasharray="7 6" />
          <path d="M102 185h220v13H102Z" fill="#f59e0b" />
        </>
      );
    case "faldon":
      return (
        <>
          <path d="M91 72h238v119H91Z" fill="#dbe4ee" />
          <path d="M91 72h238v18H91Z" fill="#f5f7fa" />
          <path d="M91 90h238" strokeDasharray="7 6" />
          <path d="M91 181h238v10H91Z" fill="#f59e0b" />
        </>
      );
    case "faldon-c":
      return (
        <>
          <path d="M106 68h208v124H106Z" fill="#dbe4ee" />
          <path d="m106 68-24 18v88l24 18M314 68l24 18v88l-24 18" fill="#aebdcb" />
          <path d="M106 88h208M106 173h208" strokeDasharray="7 6" />
          <path d="M106 181h208v11H106Z" fill="#f59e0b" />
        </>
      );
    case "chimenea":
      return (
        <>
          <path d="m135 61 132-28 63 30-132 30Z" fill="#f5f7fa" />
          <path d="M135 61v120l63 34V93Z" fill="#dbe4ee" />
          <path d="M198 93 330 63v121l-132 31Z" fill="#aebdcb" />
          <path d="m135 61 63 32 132-30M198 93v122" />
          <path d="M198 201 330 171v13l-132 31Z" fill="#f59e0b" />
        </>
      );
    case "porta-ventilador":
      return (
        <>
          <path d="m86 87 208-42 52 28-209 45Z" fill="#dbe4ee" />
          <path d="M86 87v77l51 29v-75Z" fill="#aebdcb" />
          <path d="m137 118 209-45v75l-209 45Z" fill="#f5f7fa" />
          <ellipse cx="227" cy="110" rx="51" ry="29" fill="#fff" />
          <ellipse cx="227" cy="110" rx="34" ry="19" fill="#c8d3df" />
          <path d="m137 180 209-45v13l-209 45Z" fill="#f59e0b" />
        </>
      );
    case "puerta-guillotina":
      return (
        <>
          <path d="M104 43h212v166H104Z" fill="#dbe4ee" />
          <path d="M126 67h168v119H126Z" fill="#f8fafc" />
          <path d="M126 67h168v62H126Z" fill="#c8d3df" />
          <path d="M126 129h168M210 77v98" strokeDasharray="7 6" />
          <path d="M117 196h186v13H117Z" fill="#f59e0b" />
        </>
      );
    case "mueble-guillotina":
      return (
        <>
          <path d="M98 42h224v170H98Z" fill="#dbe4ee" />
          <path d="M120 65h180v88H120Z" fill="#f8fafc" />
          <path d="M120 167h180M210 167v45" />
          <circle cx="198" cy="187" r="4" fill="#f59e0b" />
          <circle cx="222" cy="187" r="4" fill="#f59e0b" />
          <path d="M98 42h224v14H98Z" fill="#aebdcb" />
        </>
      );
    case "puerta-quincho":
      return (
        <>
          <path d="M103 43h214v168H103Z" fill="#dbe4ee" />
          <path d="M124 65h172v125H124Z" fill="#f8fafc" />
          <path d="M210 65v125" />
          <circle cx="198" cy="126" r="5" fill="#f59e0b" />
          <circle cx="222" cy="126" r="5" fill="#f59e0b" />
        </>
      );
    case "estructura-quincho-guillotina":
      return (
        <>
          <path d="M91 39h238v177H91ZM116 64h188v128H116Z" fill="#dbe4ee" fillRule="evenodd" />
          <path d="M116 121h188M139 64v128M281 64v128" />
          <path d="M101 39h218v15H101Z" fill="#f59e0b" />
          <circle cx="139" cy="52" r="7" fill="#f8fafc" />
          <circle cx="281" cy="52" r="7" fill="#f8fafc" />
        </>
      );
    case "estructura-quincho":
      return (
        <>
          <path d="M88 42h244v173H88ZM115 69h190v119H115Z" fill="#dbe4ee" fillRule="evenodd" />
          <path d="m88 42 27 27M332 42l-27 27M88 215l27-27M332 215l-27-27" />
          <path d="M88 42h244v14H88Z" fill="#f59e0b" />
        </>
      );
    case "estructura-inox":
    case "estructura-acero":
      return (
        <>
          <path d="m73 82 205-43 76 41-207 47Z" fill="#f5f7fa" />
          <path d="M73 82v82l74 40v-77Z" fill="#dbe4ee" />
          <path d="m147 127 207-47v82l-207 42Z" fill="#aebdcb" />
          <path d="m94 87 183-37 55 30-184 40Z" fill="#fff" />
          <path d="M94 87v19l54 29 184-41V80" />
          <path d="M99 178v41M132 196v31M316 171v42M344 165v39" />
          <path d="m147 191 207-41v12l-207 42Z" fill="#f59e0b" />
        </>
      );
    case "modulo-barra-inox":
      return (
        <>
          <path d="m72 91 220-47 65 34-221 51Z" fill="#dbe4ee" />
          <path d="M72 91v61l64 35v-58M136 129l221-51v60l-221 49" />
          {[0, 1, 2, 3, 4, 5, 6].map((index) => (
            <path key={index} d={`M${91 + index * 30} ${91 - index * 6}  ${152 + index * 29} ${124 - index * 6}`} strokeWidth="5" />
          ))}
          <path d="m136 175 221-49v12l-221 49Z" fill="#f59e0b" />
        </>
      );
    case "modulo-v-inox":
      return (
        <>
          <path d="m72 91 220-47 65 34-221 51Z" fill="#dbe4ee" />
          <path d="M72 91v61l64 35v-58M136 129l221-51v60l-221 49" />
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <path key={index} d={`M${91 + index * 34} ${91 - index * 7}l15 9 15-17`} strokeWidth="5" />
          ))}
          <path d="m136 175 221-49v12l-221 49Z" fill="#f59e0b" />
        </>
      );
    case "separador-parrilla":
      return (
        <>
          <path d="m67 100 248-51 39 22-249 55Z" fill="#dbe4ee" />
          <path d="M67 100v54l38 23v-51M105 126l249-55v54l-249 52" fill="#aebdcb" />
          <path d="m105 165 249-52v12l-249 52Z" fill="#f59e0b" />
        </>
      );
    case "frontal-va-inox":
    case "frontal-va-acero":
      return (
        <>
          <path d="m54 105 267-58 45 24-267 61Z" fill="#dbe4ee" />
          <path d="M54 105v59l45 26v-58M99 132l267-61v58L99 190" fill="#aebdcb" />
          <path d="m99 177 267-60v12L99 190Z" fill="#f59e0b" />
          <circle cx="317" cy="99" r="12" fill="#fff" />
        </>
      );
    case "bandeja-grasa-inox":
      return (
        <>
          <path d="m71 100 213-50 73 35-214 54Z" fill="#dbe4ee" />
          <path d="M71 100v48l72 39v-48M143 139l214-54v49l-214 53" />
          <path d="m91 104 193-43 52 25-193 47Z" fill="#fff" />
          <path d="m143 175 214-53v12l-214 53Z" fill="#f59e0b" />
        </>
      );
    case "pata-falsa-inox":
    case "pata-falsa-fierro":
      return (
        <>
          <path d="M152 43h116v30h-39v118h-38V73h-39Z" fill="#dbe4ee" />
          <path d="M178 191h64v22h-64Z" fill="#aebdcb" />
          <path d="M191 73h38v13h-38Z" fill="#f59e0b" />
        </>
      );
    case "manilla-parrilla":
      return (
        <>
          <path d="M91 148h116v-42h69" strokeWidth="14" />
          <path d="M276 106v-32h61" strokeWidth="14" />
          <path d="M337 74h24" strokeWidth="22" />
          <circle cx="91" cy="148" r="17" fill="#f59e0b" />
          <circle cx="91" cy="148" r="6" fill="#fff" />
        </>
      );
    default:
      return <path d="M93 54h234v152H93Z" fill="#dbe4ee" />;
  }
}

type DiagramProps = ProductReferenceProps & {
  instance: "thumbnail" | "modal";
};

function ProductDiagram({ productId, productName, fields, fixedMeasures, instance }: DiagramProps) {
  const arrowId = `arrow-${productId}-${instance}`;
  const gridId = `grid-${productId}-${instance}`;
  const measureLabel = (field: MeasureField) => (
    fixedMeasures?.[field] !== undefined
      ? `${fieldNames[field].toUpperCase()} ${fixedMeasures[field]} mm`
      : fieldNames[field].toUpperCase()
  );

  return (
    <svg
      viewBox="0 0 420 260"
      className="h-full w-full"
      role="img"
      aria-label={`Ilustración técnica de ${productName}`}
    >
      <title>{`Ilustración técnica de ${productName}`}</title>
      <defs>
        <pattern id={gridId} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke="#dbe4ee" strokeWidth="0.7" />
        </pattern>
        <marker id={arrowId} markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto-start-reverse">
          <path d="M7 0 0 3.5 7 7Z" fill="#d97706" />
        </marker>
      </defs>
      <rect width="420" height="260" rx="14" fill="#f8fafc" />
      <rect width="420" height="260" rx="14" fill={`url(#${gridId})`} />
      <g fill="none" stroke="#102a48" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3">
        <ProductShape productId={productId} />
      </g>

      {fields.includes("largo") && (
        <g fill="#b45309" stroke="#d97706" strokeWidth="2">
          <line x1="82" y1="230" x2="326" y2="230" markerStart={`url(#${arrowId})`} markerEnd={`url(#${arrowId})`} />
          <text x="204" y="249" stroke="none" textAnchor="middle" fontSize="12" fontWeight="900">{measureLabel("largo")}</text>
        </g>
      )}
      {fields.includes("ancho") && (
        <g fill="#b45309" stroke="#d97706" strokeWidth="2">
          <line x1="72" y1="70" x2="132" y2="40" markerStart={`url(#${arrowId})`} markerEnd={`url(#${arrowId})`} />
          <text x="93" y="35" stroke="none" textAnchor="middle" fontSize="11" fontWeight="900">{measureLabel("ancho")}</text>
        </g>
      )}
      {fields.includes("alto") && (
        <g fill="#b45309" stroke="#d97706" strokeWidth="2">
          <line x1="378" y1="48" x2="378" y2="207" markerStart={`url(#${arrowId})`} markerEnd={`url(#${arrowId})`} />
          <text x="400" y="132" stroke="none" textAnchor="middle" fontSize="11" fontWeight="900" transform="rotate(-90 400 132)">{measureLabel("alto")}</text>
        </g>
      )}
      {fields.length === 0 && (
        <text x="210" y="239" fill="#b45309" textAnchor="middle" fontSize="12" fontWeight="900">SIN MEDIDAS · VALOR FIJO</text>
      )}
      <text x="20" y="24" fill="#102a48" fontSize="9" fontWeight="900" letterSpacing="1.4">N PROYECTOS · REFERENCIA</text>
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5M3 8l6-6M21 8l-6-6M3 16l6 6M21 16l-6 6" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4">
      <path d="M5 5l14 14M19 5 5 19" />
    </svg>
  );
}

export function ProductReference(props: ProductReferenceProps) {
  const { productId, productName, fields, fixedMeasures } = props;
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
        className="group relative h-12 w-20 shrink-0 overflow-hidden rounded-lg border border-slate-300 bg-white shadow-sm outline-none transition hover:border-amber-500 hover:shadow-md focus-visible:border-amber-500 focus-visible:ring-4 focus-visible:ring-amber-200"
        aria-label={`Ampliar referencia de ${productName}`}
      >
        <ProductDiagram {...props} instance="thumbnail" />
        <span className="absolute bottom-1 right-1 flex h-5 w-5 items-center justify-center rounded bg-navy-950/90 text-white">
          <ExpandIcon />
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
            <header className="flex items-start justify-between gap-4 bg-navy-950 px-4 py-4 text-white sm:px-6">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-amber-300">Referencia técnica N Proyectos</p>
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
              <div className="flex min-h-72 items-center justify-center overflow-hidden rounded-xl border-2 border-slate-300 bg-slate-50 sm:min-h-[32rem]">
                <ProductDiagram {...props} instance="modal" />
              </div>

              <aside className="rounded-xl border-2 border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-navy-700">Cómo medir</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">
                  {measurementNotes[productId] ?? (fields.length === 0
                    ? "Este producto tiene valor fijo y no requiere ingresar medidas."
                    : "Usa las medidas exteriores de la pieza terminada.")}
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
                  Ilustración referencial original. Las flechas muestran exactamente las medidas solicitadas por el cotizador.
                </p>
              </aside>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
