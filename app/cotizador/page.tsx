"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Mode = "con" | "sin";
type Section = "campanas" | "guillotinas" | "piezas";

type MeasureProduct = {
  id: string;
  name: string;
  note?: string;
  fields: ("largo" | "ancho" | "alto")[];
  calculate: (values: Measures, mode: Mode) => number;
};

type Measures = { largo: number; ancho: number; alto: number };
type MeasureRow = Measures & { quantity: number; mode: Mode; selected: boolean };
type UnitRow = { quantity: number; mode: Mode; selected: boolean };

const emptyMeasures: Measures = { largo: 0, ancho: 0, alto: 0 };

const campanas: MeasureProduct[] = [
  {
    id: "conico-exterior",
    name: "Cónico exterior",
    note: "No incluye chimenea",
    fields: ["largo", "ancho", "alto"],
    calculate: ({ largo, ancho, alto }, mode) => {
      const material =
        (((largo * alto * 1.2 * 8) / 1_000_000) * 1.2 * 2) +
        (((ancho * alto * 1.2 * 8) / 1_000_000) * 1.2 * 2);
      return mode === "con" ? material * 8000 : (material / 9.6) * 2 * 10500 * 0.67;
    },
  },
  {
    id: "conico",
    name: "Cónico",
    note: "No incluye chimenea",
    fields: ["largo", "ancho", "alto"],
    calculate: ({ largo, ancho, alto }, mode) => {
      const material =
        (((largo * alto * 1.2 * 8) / 1_000_000) * 1.2 * 2) +
        (((ancho * alto * 1.2 * 8) / 1_000_000) * 1.2 * 2);
      return mode === "con" ? material * 5000 : (material / 9.6) * 2 * 10500 * 0.91;
    },
  },
  {
    id: "mediterraneo",
    name: "Mediterráneo",
    fields: ["largo", "ancho", "alto"],
    calculate: ({ largo, ancho, alto }, mode) => {
      const material =
        ((((largo * alto * 1.2 * 8) / 1_000_000) * 2) +
          (((ancho * alto * 1.2 * 8) / 1_000_000) * 2 * 1.3)) *
        1.2;
      return mode === "con" ? material * 5000 : (material / 9.6) * 2 * 10500 * 0.67;
    },
  },
  {
    id: "faldon",
    name: "Faldón",
    fields: ["largo", "alto"],
    calculate: ({ largo, alto }, mode) => {
      const material = ((largo * alto * 1.2 * 8) / 1_000_000) * 1.2;
      return mode === "con" ? material * 3000 : (material / 9.6) * 2 * 10500 * 0.67;
    },
  },
  {
    id: "chimenea",
    name: "Chimenea",
    fields: ["largo", "ancho", "alto"],
    calculate: ({ largo, ancho, alto }, mode) => {
      const material = ((((largo + ancho) * alto * 1.2 * 8) / 1_000_000) * 2) * 1.67;
      return mode === "con" ? material * 2000 : (material / 9.6) * 2 * 10500 * 0.67;
    },
  },
];

const guillotinas: MeasureProduct[] = [
  {
    id: "puerta-guillotina",
    name: "Puerta guillotina",
    fields: ["largo", "alto"],
    calculate: ({ largo, alto }, mode) => 300000 + (mode === "con" ? (largo * alto) / 100000 * 8000 : 0),
  },
  {
    id: "mueble-guillotina",
    name: "Mueble guillotina",
    fields: ["largo", "alto"],
    calculate: ({ largo, alto }, mode) => 150000 + (mode === "con" ? (largo * alto) / 100000 * 7000 : 0),
  },
  {
    id: "puerta-quincho",
    name: "Puerta quincho",
    fields: [],
    calculate: () => 15000,
  },
  {
    id: "estructura-quincho-guillotina",
    name: "Estructura puerta quincho guillotina",
    fields: ["largo", "alto"],
    calculate: ({ largo, alto }, mode) => 60000 + (mode === "con" ? (largo * alto) / 100000 * 3500 : 0),
  },
  {
    id: "estructura-quincho",
    name: "Estructura puerta quincho",
    fields: ["largo", "alto"],
    calculate: ({ largo, alto }, mode) => 65000 + (mode === "con" ? (largo * alto) / 100000 * 4000 : 0),
  },
];

const piezas = [
  ["alzador-inox", "Alzador 350 mm, 9 piezas — acero inox.", 27000, 21400],
  ["alzador-carbono", "Alzador 350 mm, 9 piezas — acero carbono", 12800, 11200],
  ["bandeja-aza-soldada", "Bandeja parrillera, asa soldada", 58200, 44700],
  ["bandeja-aza-unida", "Bandeja parrillera, asa unida", 57000, 40385],
  ["bandeja-pq-abierta", "Bandeja PQ abierta", 60000, 43385],
  ["bandeja-pq-cerrada", "Bandeja PQ cerrada", 67200, 50585],
  ["bandeja-dos-quemadores", "Bandeja dos quemadores", 57200, 33200],
  ["bandeja-un-tercio", "Bandeja 1/3", 60600, 43600],
  ["bandeja-dos-tercios", "Bandeja 2/3", 74160, 45360],
  ["bandeja-tres-tercios", "Bandeja 3/3", 98400, 53400],
  ["frontal-acero", "Frontal VA 110×20/1480 — acero carbono 3 mm", 19500, 15386],
  ["frontal-inox-1480", "Frontal VA 110×20/1480 — inox. 2 mm", 42000, 31714],
  ["frontal-inox-980", "Frontal VA 110×20/980 — inox. 2 mm", 25565, 19304],
  ["angulo-inox", "Ángulo 15×15/1000 — inox. 1,5 mm", 2350, 1270],
  ["lamina-extractor", "Lámina extractor tubular", 17500, 15580],
  ["nicho", "Nicho acero carbono 3 mm + soldadura y pulido", 140000, 80000],
  ["separador", "Separador estándar 200×550 — acero carbono 3 mm", 16000, 10000],
] as const;

const initialMeasureRows = (products: MeasureProduct[]) =>
  Object.fromEntries(products.map((product) => [product.id, { ...emptyMeasures, quantity: 1, mode: "con", selected: false }])) as Record<string, MeasureRow>;

const initialUnitRows = () =>
  Object.fromEntries(piezas.map(([id]) => [id, { quantity: 1, mode: "con", selected: false }])) as Record<string, UnitRow>;

const money = (value: number) =>
  new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(Math.round(value));

const fieldNames = { largo: "Largo", ancho: "Ancho", alto: "Alto" };

export default function CotizadorPage() {
  const [section, setSection] = useState<Section>("campanas");
  const [client, setClient] = useState({ nombre: "", proyecto: "", telefono: "", email: "" });
  const [campanaRows, setCampanaRows] = useState(() => initialMeasureRows(campanas));
  const [guillotinaRows, setGuillotinaRows] = useState(() => initialMeasureRows(guillotinas));
  const [unitRows, setUnitRows] = useState(initialUnitRows);

  const quoteLines = useMemo(() => {
    const measured = [
      ...campanas.map((product) => ({ product, row: campanaRows[product.id], category: "Campanas" })),
      ...guillotinas.map((product) => ({ product, row: guillotinaRows[product.id], category: "Guillotinas y quincho" })),
    ]
      .filter(({ row }) => row.selected)
      .map(({ product, row, category }) => ({
        id: product.id,
        category,
        name: product.name,
        detail: product.fields.map((field) => `${fieldNames[field]} ${row[field]} mm`).join(" · "),
        mode: row.mode,
        quantity: row.quantity,
        total: product.calculate(row, row.mode) * row.quantity,
      }));

    const units = piezas
      .filter(([id]) => unitRows[id].selected)
      .map(([id, name, withMaterial, withoutMaterial]) => {
        const row = unitRows[id];
        return { id, category: "Piezas y accesorios", name, detail: "Precio unitario", mode: row.mode, quantity: row.quantity, total: (row.mode === "con" ? withMaterial : withoutMaterial) * row.quantity };
      });
    return [...measured, ...units];
  }, [campanaRows, guillotinaRows, unitRows]);

  const subtotal = quoteLines.reduce((sum, line) => sum + line.total, 0);
  const iva = subtotal * 0.19;

  const updateMeasured = (group: "campanas" | "guillotinas", id: string, patch: Partial<MeasureRow>) => {
    const setter = group === "campanas" ? setCampanaRows : setGuillotinaRows;
    setter((current) => ({ ...current, [id]: { ...current[id], ...patch } }));
  };

  const reset = () => {
    setCampanaRows(initialMeasureRows(campanas));
    setGuillotinaRows(initialMeasureRows(guillotinas));
    setUnitRows(initialUnitRows());
    setClient({ nombre: "", proyecto: "", telefono: "", email: "" });
  };

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <header className="bg-navy-800 px-5 py-6 text-white print:bg-white print:px-0 print:text-slate-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-300 print:text-slate-500">N Proyectos Ltda.</p>
            <h1 className="mt-1 text-2xl font-extrabold sm:text-3xl">Cotizador técnico</h1>
          </div>
          <Link href="/" className="rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold hover:bg-white/10 print:hidden">Volver al sitio</Link>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 lg:grid-cols-[1fr_380px] print:block print:px-0">
        <div className="space-y-6 print:hidden">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-600 text-sm font-bold text-white">1</span><h2 className="text-lg font-bold">Datos del cliente</h2></div>
            <div className="grid gap-4 sm:grid-cols-2">
              {([['nombre', 'Nombre o empresa'], ['proyecto', 'Proyecto'], ['telefono', 'Teléfono'], ['email', 'Correo']] as const).map(([key, label]) => (
                <label key={key} className="text-sm font-semibold text-slate-700">{label}<input className="form-input mt-2" value={client[key]} onChange={(event) => setClient({ ...client, [key]: event.target.value })} /></label>
              ))}
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 p-5"><div className="mb-4 flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-600 text-sm font-bold text-white">2</span><div><h2 className="text-lg font-bold">Agregar productos</h2><p className="text-sm text-slate-500">Valores netos según la planilla entregada.</p></div></div>
              <div className="flex gap-2 overflow-x-auto">
                {([['campanas','Campanas'],['guillotinas','Guillotinas y quincho'],['piezas','Piezas y accesorios']] as const).map(([id, label]) => <button key={id} onClick={() => setSection(id)} className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-bold ${section === id ? 'bg-navy-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{label}</button>)}
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {(section === "campanas" ? campanas : section === "guillotinas" ? guillotinas : []).map((product) => {
                const group = section as "campanas" | "guillotinas";
                const row = group === "campanas" ? campanaRows[product.id] : guillotinaRows[product.id];
                const unitPrice = product.calculate(row, row.mode);
                return <div key={product.id} className={`p-5 transition-colors ${row.selected ? 'bg-blue-50/60' : ''}`}>
                  <div className="flex items-start gap-3"><input type="checkbox" className="mt-1 h-5 w-5 accent-blue-700" checked={row.selected} onChange={(e) => updateMeasured(group, product.id, { selected: e.target.checked })} /><div className="min-w-0 flex-1"><div className="flex flex-wrap items-start justify-between gap-2"><div><h3 className="font-bold">{product.name}</h3>{product.note && <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">{product.note}</p>}</div><strong className="text-navy-700">{row.selected ? money(unitPrice * row.quantity) : '—'}</strong></div>
                    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
                      {product.fields.map((field) => <label key={field} className="text-xs font-bold text-slate-500">{fieldNames[field]} (mm)<input type="number" min="0" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-800 outline-none focus:border-navy-500" value={row[field] || ''} onChange={(e) => updateMeasured(group, product.id, { [field]: Number(e.target.value) })} /></label>)}
                      <label className="text-xs font-bold text-slate-500">Cantidad<input type="number" min="1" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" value={row.quantity} onChange={(e) => updateMeasured(group, product.id, { quantity: Math.max(1, Number(e.target.value)) })} /></label>
                      <label className="text-xs font-bold text-slate-500">Modalidad<select className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2" value={row.mode} onChange={(e) => updateMeasured(group, product.id, { mode: e.target.value as Mode })}><option value="con">Con material</option><option value="sin">Sin material</option></select></label>
                    </div>
                  </div></div>
                </div>;
              })}

              {section === "piezas" && piezas.map(([id, name, withMaterial, withoutMaterial]) => {
                const row = unitRows[id];
                const price = row.mode === "con" ? withMaterial : withoutMaterial;
                return <div key={id} className={`flex flex-col gap-4 p-5 sm:flex-row sm:items-center ${row.selected ? 'bg-blue-50/60' : ''}`}><div className="flex min-w-0 flex-1 items-start gap-3"><input type="checkbox" className="mt-1 h-5 w-5 accent-blue-700" checked={row.selected} onChange={(e) => setUnitRows({ ...unitRows, [id]: { ...row, selected: e.target.checked } })} /><div><h3 className="font-bold">{name}</h3><p className="text-sm text-slate-500">Unidad: {money(price)}</p></div></div><div className="flex items-end gap-3"><label className="text-xs font-bold text-slate-500">Modalidad<select className="mt-1 rounded-lg border border-slate-200 bg-white px-3 py-2" value={row.mode} onChange={(e) => setUnitRows({ ...unitRows, [id]: { ...row, mode: e.target.value as Mode } })}><option value="con">Con material</option><option value="sin">Sin material</option></select></label><label className="w-20 text-xs font-bold text-slate-500">Cantidad<input type="number" min="1" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" value={row.quantity} onChange={(e) => setUnitRows({ ...unitRows, [id]: { ...row, quantity: Math.max(1, Number(e.target.value)) } })} /></label><strong className="min-w-24 pb-2 text-right text-navy-700">{row.selected ? money(price * row.quantity) : '—'}</strong></div></div>;
              })}
            </div>
          </section>
        </div>

        <aside className="lg:sticky lg:top-6 lg:self-start print:static">
          <section className="overflow-hidden rounded-2xl bg-navy-800 text-white shadow-xl print:rounded-none print:bg-white print:text-slate-900 print:shadow-none">
            <div className="border-b border-white/10 p-5 print:border-slate-300 print:px-0"><p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300 print:text-slate-500">Resumen</p><h2 className="mt-1 text-xl font-bold">Cotización</h2><div className="mt-3 hidden text-sm print:block"><p>Cliente: {client.nombre || '—'}</p><p>Proyecto: {client.proyecto || '—'}</p><p>Teléfono: {client.telefono || '—'} · Correo: {client.email || '—'}</p></div></div>
            <div className="max-h-[52vh] divide-y divide-white/10 overflow-y-auto print:max-h-none print:divide-slate-200">
              {quoteLines.length === 0 ? <p className="p-6 text-center text-sm text-slate-300 print:text-slate-500">Selecciona productos para comenzar.</p> : quoteLines.map((line) => <div key={`${line.category}-${line.id}`} className="p-4"><div className="flex justify-between gap-3"><div><p className="text-[10px] font-bold uppercase tracking-wider text-blue-300 print:text-slate-500">{line.category}</p><p className="mt-1 text-sm font-bold">{line.name}</p><p className="mt-1 text-xs text-slate-300 print:text-slate-500">{line.detail}{line.detail && ' · '}{line.mode === 'con' ? 'Con material' : 'Sin material'} · Cant. {line.quantity}</p></div><strong className="whitespace-nowrap text-sm">{money(line.total)}</strong></div></div>)}
            </div>
            <div className="border-t border-white/10 bg-navy-900 p-5 print:border-slate-300 print:bg-white print:px-0">
              <div className="space-y-2 text-sm"><div className="flex justify-between"><span className="text-slate-300 print:text-slate-600">Subtotal neto</span><strong>{money(subtotal)}</strong></div><div className="flex justify-between"><span className="text-slate-300 print:text-slate-600">IVA 19%</span><strong>{money(iva)}</strong></div><div className="mt-3 flex justify-between border-t border-white/10 pt-3 text-lg print:border-slate-300"><span className="font-bold">Total</span><strong>{money(subtotal + iva)}</strong></div></div>
              <div className="mt-5 grid gap-2 print:hidden"><button onClick={() => quoteLines.length ? window.print() : alert('Selecciona al menos un producto.')} className="rounded-xl bg-white px-4 py-3 text-sm font-bold text-navy-800 hover:bg-blue-50">Imprimir / Guardar PDF</button><button onClick={reset} className="rounded-xl border border-white/20 px-4 py-3 text-sm font-bold hover:bg-white/10">Limpiar cotización</button></div>
            </div>
          </section>
          <p className="mt-3 px-2 text-xs leading-relaxed text-slate-500 print:mt-6 print:px-0">Valores calculados desde la planilla comercial proporcionada. Cotización referencial sujeta a validación técnica y comercial de N Proyectos Ltda.</p>
        </aside>
      </div>
    </main>
  );
}
