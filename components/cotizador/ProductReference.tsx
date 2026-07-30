type MeasureField = "largo" | "ancho" | "alto";

type ProductReferenceProps = {
  productId: string;
  productName: string;
  fields: MeasureField[];
  fixedMeasures?: Partial<Record<MeasureField, number>>;
};

function PendingReferenceIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="h-8 w-8"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="M9 12h30v24H9z" />
      <path d="M14 31l8-8 5 5 4-4 5 5" />
      <circle cx="31" cy="19" r="3" />
      <path d="M6 42 42 6" strokeWidth="3" />
    </svg>
  );
}

export function ProductReference({ productName }: ProductReferenceProps) {
  return (
    <div
      className="flex h-24 w-28 shrink-0 flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-2 text-center text-slate-500 sm:h-28 sm:w-32"
      aria-label={`Referencia visual de ${productName}: próximamente`}
    >
      <PendingReferenceIcon />
      <span className="mt-1 text-[10px] font-extrabold uppercase leading-tight tracking-[0.12em] text-navy-800">
        Próximamente
      </span>
      <span className="mt-0.5 text-[9px] font-semibold leading-tight text-slate-500">
        Referencia visual
      </span>
    </div>
  );
}
