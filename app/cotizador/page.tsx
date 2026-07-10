"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { siteAssets } from "@/components/siteAssets";

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
  const [quoteNumber, setQuoteNumber] = useState<number | null>(null);
  const [preparingPdf, setPreparingPdf] = useState(false);

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
    setQuoteNumber(null);
  };

  const printQuote = async () => {
    if (!quoteLines.length) {
      alert("Selecciona al menos un producto.");
      return;
    }

    setPreparingPdf(true);
    try {
      let number = quoteNumber;
      if (number === null) {
        const response = await fetch("/api/quotes/number", { method: "POST" });
        const result = (await response.json()) as { number?: number; error?: string };
        if (!response.ok || !result.number) throw new Error(result.error || "No fue posible generar el folio.");
        number = result.number;
        setQuoteNumber(number);
        await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
      }
      window.print();
    } catch (error) {
      alert(error instanceof Error ? error.message : "No fue posible generar el folio.");
    } finally {
      setPreparingPdf(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-200 text-slate-950">
      <header className="border-b-4 border-amber-400 bg-navy-950 px-5 py-6 text-white shadow-xl print:bg-white print:px-0 print:text-slate-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5">
          <div className="flex min-w-0 items-center gap-4 sm:gap-6">
            <div className="flex shrink-0 items-center gap-3 sm:gap-4">
              <div className="flex h-14 items-center rounded-xl bg-white px-3 py-2 shadow-md print:border print:border-slate-300 print:shadow-none">
                <Image src={siteAssets.logo} alt="Logo N Proyectos" priority className="h-9 w-auto object-contain sm:h-10" />
              </div>
              <span className="h-10 w-px bg-white/30 print:bg-slate-400" aria-hidden="true" />
              <div className="flex h-14 items-center rounded-xl border-2 border-white bg-white px-4 shadow-md print:border-slate-900 print:shadow-none">
                <span className="text-lg font-black tracking-[0.16em] text-black sm:text-xl">VARVACOA</span>
              </div>
            </div>
            <div className="hidden border-l border-white/20 pl-6 md:block print:block print:border-slate-300">
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-amber-300 print:text-slate-700">Cotización técnica</p>
              <h1 className="mt-1 text-2xl font-extrabold text-white print:text-slate-950 sm:text-3xl">Cotizador Varvacoa</h1>
            </div>
          </div>
          <div className="flex gap-2 print:hidden">
            <Link href="/" className="rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold hover:bg-white/10">Volver al sitio</Link>
            <form action="/api/auth/logout" method="post">
              <button className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-navy-800 hover:bg-blue-50">Cerrar sesión</button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 lg:grid-cols-[1fr_380px] print:block print:px-0">
        <div className="space-y-6 print:hidden">
          <section className="rounded-2xl border-2 border-slate-400 bg-white p-5 shadow-md">
            <div className="mb-4 flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-600 text-sm font-bold text-white">1</span><h2 className="text-lg font-bold">Datos del cliente</h2></div>
            <div className="grid gap-4 sm:grid-cols-2">
              {([['nombre', 'Nombre o empresa'], ['proyecto', 'Proyecto'], ['telefono', 'Teléfono'], ['email', 'Correo']] as const).map(([key, label]) => (
                <label key={key} className="text-sm font-bold text-slate-950">{label}<input className="form-input mt-2 border-slate-400 bg-slate-50 text-slate-950 placeholder:text-slate-600" value={client[key]} onChange={(event) => setClient({ ...client, [key]: event.target.value })} /></label>
              ))}
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border-2 border-slate-400 bg-white shadow-md">
            <div className="border-b-2 border-slate-300 p-5"><div className="mb-4 flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-800 text-sm font-bold text-white">2</span><div><h2 className="text-lg font-extrabold text-slate-950">Agregar productos</h2><p className="text-sm font-medium text-slate-700">Valores netos según la planilla entregada.</p></div></div>
              <div className="flex gap-2 overflow-x-auto">
                {([['campanas','Campanas'],['guillotinas','Guillotinas y quincho'],['piezas','Piezas y accesorios']] as const).map(([id, label]) => <button key={id} onClick={() => setSection(id)} className={`whitespace-nowrap rounded-xl border-2 px-4 py-2.5 text-sm font-extrabold ${section === id ? 'border-navy-950 bg-navy-950 text-white shadow-md' : 'border-slate-400 bg-white text-slate-900 hover:border-navy-700 hover:bg-slate-100'}`}>{label}</button>)}
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {(section === "campanas" ? campanas : section === "guillotinas" ? guillotinas : []).map((product) => {
                const group = section as "campanas" | "guillotinas";
                const row = group === "campanas" ? campanaRows[product.id] : guillotinaRows[product.id];
                const unitPrice = product.calculate(row, row.mode);
                return <div key={product.id} className={`p-5 transition-colors ${row.selected ? 'border-l-4 border-amber-500 bg-amber-50' : 'bg-white'}`}>
                  <div className="flex items-start gap-3"><input type="checkbox" className="mt-1 h-5 w-5 accent-blue-700" checked={row.selected} onChange={(e) => updateMeasured(group, product.id, { selected: e.target.checked })} /><div className="min-w-0 flex-1"><div className="flex flex-wrap items-start justify-between gap-2"><div><h3 className="font-bold">{product.name}</h3>{product.note && <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">{product.note}</p>}</div><strong className="text-navy-700">{row.selected ? money(unitPrice * row.quantity) : '—'}</strong></div>
                    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
                      {product.fields.map((field) => <label key={field} className="text-xs font-extrabold text-slate-800">{fieldNames[field]} (mm)<input type="number" min="0" className="mt-1 w-full rounded-lg border-2 border-slate-400 bg-white px-3 py-2 font-semibold text-slate-950 outline-none focus:border-navy-700 focus:ring-2 focus:ring-blue-200" value={row[field] || ''} onChange={(e) => updateMeasured(group, product.id, { [field]: Number(e.target.value) })} /></label>)}
                      <label className="text-xs font-extrabold text-slate-800">Cantidad<input type="number" min="1" className="mt-1 w-full rounded-lg border-2 border-slate-400 px-3 py-2 font-semibold text-slate-950" value={row.quantity} onChange={(e) => updateMeasured(group, product.id, { quantity: Math.max(1, Number(e.target.value)) })} /></label>
                      <label className="text-xs font-extrabold text-slate-800">Modalidad<select className="mt-1 w-full rounded-lg border-2 border-slate-400 bg-white px-3 py-2 font-semibold text-slate-950" value={row.mode} onChange={(e) => updateMeasured(group, product.id, { mode: e.target.value as Mode })}><option value="con">Con material</option><option value="sin">Sin material</option></select></label>
                    </div>
                  </div></div>
                </div>;
              })}

              {section === "piezas" && piezas.map(([id, name, withMaterial, withoutMaterial]) => {
                const row = unitRows[id];
                const price = row.mode === "con" ? withMaterial : withoutMaterial;
                return <div key={id} className={`flex flex-col gap-4 p-5 sm:flex-row sm:items-center ${row.selected ? 'border-l-4 border-amber-500 bg-amber-50' : 'bg-white'}`}><div className="flex min-w-0 flex-1 items-start gap-3"><input type="checkbox" className="mt-1 h-5 w-5 accent-blue-800" checked={row.selected} onChange={(e) => setUnitRows({ ...unitRows, [id]: { ...row, selected: e.target.checked } })} /><div><h3 className="font-extrabold text-slate-950">{name}</h3><p className="text-sm font-semibold text-slate-700">Unidad: {money(price)}</p></div></div><div className="flex items-end gap-3"><label className="text-xs font-extrabold text-slate-800">Modalidad<select className="mt-1 rounded-lg border-2 border-slate-400 bg-white px-3 py-2 font-semibold text-slate-950" value={row.mode} onChange={(e) => setUnitRows({ ...unitRows, [id]: { ...row, mode: e.target.value as Mode } })}><option value="con">Con material</option><option value="sin">Sin material</option></select></label><label className="w-20 text-xs font-extrabold text-slate-800">Cantidad<input type="number" min="1" className="mt-1 w-full rounded-lg border-2 border-slate-400 px-3 py-2 font-semibold text-slate-950" value={row.quantity} onChange={(e) => setUnitRows({ ...unitRows, [id]: { ...row, quantity: Math.max(1, Number(e.target.value)) } })} /></label><strong className="min-w-24 pb-2 text-right text-navy-950">{row.selected ? money(price * row.quantity) : '—'}</strong></div></div>;
              })}
            </div>
          </section>
        </div>

        <aside className="lg:sticky lg:top-6 lg:self-start print:static">
          <section className="overflow-hidden rounded-2xl border-2 border-navy-950 bg-navy-950 text-white shadow-2xl print:rounded-none print:bg-white print:text-slate-900 print:shadow-none">
            <div className="border-b border-white/10 p-5 print:border-slate-300 print:px-0"><p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300 print:text-slate-500">Resumen</p><div className="mt-1 flex items-center justify-between gap-3"><h2 className="text-xl font-bold">Cotización</h2><strong className="rounded-lg bg-white px-3 py-1.5 text-sm text-navy-950 print:border print:border-slate-400">N.º {quoteNumber === null ? "Pendiente" : String(quoteNumber).padStart(6, "0")}</strong></div><div className="mt-3 hidden text-sm print:block"><p>Cliente: {client.nombre || '—'}</p><p>Proyecto: {client.proyecto || '—'}</p><p>Teléfono: {client.telefono || '—'} · Correo: {client.email || '—'}</p></div></div>
            <div className="max-h-[52vh] divide-y divide-white/10 overflow-y-auto print:max-h-none print:divide-slate-200">
              {quoteLines.length === 0 ? <p className="p-6 text-center text-sm text-slate-300 print:text-slate-500">Selecciona productos para comenzar.</p> : quoteLines.map((line) => <div key={`${line.category}-${line.id}`} className="p-4"><div className="flex justify-between gap-3"><div><p className="text-[10px] font-bold uppercase tracking-wider text-blue-300 print:text-slate-500">{line.category}</p><p className="mt-1 text-sm font-bold">{line.name}</p><p className="mt-1 text-xs text-slate-300 print:text-slate-500">{line.detail}{line.detail && ' · '}{line.mode === 'con' ? 'Con material' : 'Sin material'} · Cant. {line.quantity}</p></div><strong className="whitespace-nowrap text-sm">{money(line.total)}</strong></div></div>)}
            </div>
            <div className="border-t border-white/10 bg-navy-900 p-5 print:border-slate-300 print:bg-white print:px-0">
              <div className="space-y-2 text-sm"><div className="flex justify-between"><span className="text-slate-300 print:text-slate-600">Subtotal neto</span><strong>{money(subtotal)}</strong></div><div className="flex justify-between"><span className="text-slate-300 print:text-slate-600">IVA 19%</span><strong>{money(iva)}</strong></div><div className="mt-3 flex justify-between border-t border-white/10 pt-3 text-lg print:border-slate-300"><span className="font-bold">Total</span><strong>{money(subtotal + iva)}</strong></div></div>
              <div className="mt-5 grid gap-2 print:hidden"><button onClick={printQuote} disabled={preparingPdf} className="rounded-xl bg-white px-4 py-3 text-sm font-bold text-navy-800 hover:bg-blue-50 disabled:cursor-wait disabled:opacity-60">{preparingPdf ? "Generando folio…" : quoteNumber === null ? "Generar folio e imprimir PDF" : "Imprimir / Guardar PDF"}</button><button onClick={reset} className="rounded-xl border border-white/20 px-4 py-3 text-sm font-bold hover:bg-white/10">Limpiar cotización</button></div>
            </div>
          </section>
          <p className="mt-3 px-2 text-xs leading-relaxed text-slate-500 print:mt-6 print:px-0">Valores calculados desde la planilla comercial proporcionada. Cotización referencial sujeta a validación técnica y comercial de N Proyectos Ltda.</p>
        </aside>
      </div>
    </main>
  );
}
