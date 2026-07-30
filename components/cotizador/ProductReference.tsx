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
      className="h-4 w-4"
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
      className="flex h-12 w-20 shrink-0 flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 px-1.5 text-center text-slate-500"
      aria-label={`Referencia visual de ${productName}: próximamente`}
    >
      <PendingReferenceIcon />
      <span className="mt-0.5 text-[9px] font-extrabold uppercase leading-tight tracking-[0.06em] text-navy-800">
        Próximamente
      </span>
    </div>
  );
}
