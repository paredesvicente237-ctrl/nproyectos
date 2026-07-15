"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Source = "fijo" | "largo" | "ancho" | "alto" | "area" | "frente" | "lateral" | "perimetro";
type Rule = { id: number; source: Source; factor: number; onlyWithMaterial: boolean };
type SavedFormula = { id: number; name: string; rules: Rule[]; updatedAt: string };

const sources: Record<Source, { label: string; description: string; formula: string }> = {
  fijo: { label: "Monto fijo", description: "un cobro base", formula: "1" },
  largo: { label: "Largo", description: "el largo", formula: "largo" },
  ancho: { label: "Ancho", description: "el ancho", formula: "ancho" },
  alto: { label: "Alto", description: "el alto", formula: "alto" },
  area: { label: "Largo × ancho", description: "el área de la base", formula: "largo * ancho" },
  frente: { label: "Largo × alto", description: "el área frontal", formula: "largo * alto" },
  lateral: { label: "Ancho × alto", description: "el área lateral", formula: "ancho * alto" },
  perimetro: { label: "2 × (largo + ancho)", description: "el perímetro", formula: "2 * (largo + ancho)" },
};

const initialRules: Rule[] = [
  { id: 1, source: "fijo", factor: 150000, onlyWithMaterial: false },
  { id: 2, source: "area", factor: 0.24, onlyWithMaterial: true },
];

const money = (value: number) => new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(Math.round(value));

function sourceValue(source: Source, measures: { largo: number; ancho: number; alto: number }) {
  if (source === "fijo") return 1;
  if (source === "largo" || source === "ancho" || source === "alto") return measures[source];
  if (source === "area") return measures.largo * measures.ancho;
  if (source === "frente") return measures.largo * measures.alto;
  if (source === "lateral") return measures.ancho * measures.alto;
  return 2 * (measures.largo + measures.ancho);
}

export default function FormulaGeneratorPage() {
  const [name, setName] = useState("Nueva fórmula");
  const [rules, setRules] = useState<Rule[]>(initialRules);
  const [measures, setMeasures] = useState({ largo: 1000, ancho: 500, alto: 600 });
  const [withMaterial, setWithMaterial] = useState(true);
  const [saved, setSaved] = useState<SavedFormula[]>([]);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    try {
      const value = window.localStorage.getItem("nproyectos-formulas");
      if (value) setSaved(JSON.parse(value) as SavedFormula[]);
    } catch { /* Un dato antiguo no debe bloquear el generador. */ }
  }, []);

  const result = useMemo(() => rules.reduce((total, rule) => {
    if (rule.onlyWithMaterial && !withMaterial) return total;
    return total + sourceValue(rule.source, measures) * rule.factor;
  }, 0), [measures, rules, withMaterial]);

  const generatedFormula = rules.length
    ? rules.map((rule) => {
        const calculation = rule.source === "fijo" ? String(rule.factor) : `(${sources[rule.source].formula}) * ${rule.factor}`;
        return rule.onlyWithMaterial ? `(mode === "con" ? ${calculation} : 0)` : calculation;
      }).join(" + ")
    : "0";

  const updateRule = (id: number, patch: Partial<Rule>) => setRules((current) => current.map((rule) => rule.id === id ? { ...rule, ...patch } : rule));
  const persist = (formulas: SavedFormula[]) => {
    setSaved(formulas);
    window.localStorage.setItem("nproyectos-formulas", JSON.stringify(formulas));
  };
  const saveFormula = () => {
    const formula: SavedFormula = { id: Date.now(), name: name.trim() || "Fórmula sin nombre", rules, updatedAt: new Date().toISOString() };
    persist([formula, ...saved]);
    setNotice("Fórmula guardada en este dispositivo.");
    window.setTimeout(() => setNotice(""), 3000);
  };

  return <main className="min-h-screen bg-slate-200 text-slate-950">
    <header className="border-b border-slate-700 bg-navy-950 px-4 py-5 text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
        <div><p className="text-xs font-extrabold uppercase tracking-[0.2em] text-amber-300">Herramienta de administración</p><h1 className="mt-1 text-2xl font-extrabold text-white sm:text-3xl">GDF</h1></div>
        <Link href="/" className="rounded-xl border border-white/30 px-4 py-2 text-sm font-bold hover:bg-white/10">← Volver al sitio</Link>
      </div>
    </header>

    <div className="mx-auto grid max-w-7xl gap-5 px-4 py-6 lg:grid-cols-[minmax(0,1fr)_380px]">
      <div className="space-y-5">
        <section className="rounded-md border border-slate-300 bg-white p-5">
          <span className="text-xs font-extrabold uppercase tracking-wider text-navy-700">Paso 1</span>
          <label className="mt-2 block text-sm font-extrabold">Nombre del artículo o fórmula<input className="mt-2 w-full rounded-xl border-2 border-slate-400 px-3 py-2.5 text-base outline-none focus:border-navy-700" value={name} onChange={(event) => setName(event.target.value)} /></label>
        </section>

        <section className="overflow-hidden rounded-md border border-slate-300 bg-white">
          <div className="border-b-2 border-slate-300 p-5"><span className="text-xs font-extrabold uppercase tracking-wider text-navy-700">Paso 2</span><h2 className="mt-1 text-xl font-extrabold">Arma el cobro por partes</h2><p className="mt-1 text-sm font-medium text-slate-600">Cada bloque se suma al precio final.</p></div>
          <div className="divide-y-8 divide-slate-200">
            {rules.map((rule, index) => <div key={rule.id} className="p-5">
              <div className="flex items-center justify-between gap-3"><h3 className="font-extrabold">Parte {index + 1}</h3><button type="button" onClick={() => setRules((current) => current.filter((item) => item.id !== rule.id))} className="rounded-lg border border-red-300 px-2 py-1 text-xs font-bold text-red-700 hover:bg-red-50">Quitar</button></div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="text-xs font-extrabold text-slate-800">¿Qué se cobra?<select className="mt-1 w-full rounded-xl border-2 border-slate-400 bg-white px-3 py-2.5 font-semibold" value={rule.source} onChange={(event) => updateRule(rule.id, { source: event.target.value as Source })}>{Object.entries(sources).map(([key, source]) => <option key={key} value={key}>{source.label}</option>)}</select></label>
                <label className="text-xs font-extrabold text-slate-800">{rule.source === "fijo" ? "Monto (pesos)" : "Valor por unidad"}<input type="number" step="any" className="mt-1 w-full rounded-xl border-2 border-slate-400 px-3 py-2.5 font-semibold" value={rule.factor} onChange={(event) => updateRule(rule.id, { factor: Number(event.target.value) })} /></label>
              </div>
              <label className="mt-4 flex items-center gap-3 rounded-xl bg-slate-100 p-3 text-sm font-bold"><input type="checkbox" className="h-5 w-5 accent-blue-700" checked={rule.onlyWithMaterial} onChange={(event) => updateRule(rule.id, { onlyWithMaterial: event.target.checked })} />Cobrar esta parte solamente cuando sea “Con material”</label>
              <p className="mt-3 text-sm text-slate-700">Se cobrará <strong>{rule.source === "fijo" ? money(rule.factor) : `${rule.factor} por ${sources[rule.source].description}`}</strong>{rule.onlyWithMaterial ? " únicamente al incluir material" : " siempre"}.</p>
            </div>)}
          </div>
          <div className="border-t border-slate-300 p-5"><button type="button" onClick={() => setRules((current) => [...current, { id: Date.now(), source: "fijo", factor: 0, onlyWithMaterial: false }])} className="w-full rounded-xl border-2 border-dashed border-navy-400 px-4 py-3 text-sm font-extrabold text-navy-800 hover:bg-navy-50 sm:w-auto">+ Agregar otra parte del cobro</button></div>
        </section>

        <section className="rounded-md border border-slate-300 bg-white p-5"><span className="text-xs font-extrabold uppercase tracking-wider text-navy-700">Paso 3</span><h2 className="mt-1 text-xl font-extrabold">Prueba con medidas reales</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">{(["largo", "ancho", "alto"] as const).map((field) => <label key={field} className="text-xs font-extrabold capitalize">{field} (mm)<input type="number" min="0" className="mt-1 w-full rounded-xl border-2 border-slate-400 px-3 py-2.5" value={measures[field]} onChange={(event) => setMeasures((current) => ({ ...current, [field]: Number(event.target.value) }))} /></label>)}</div>
          <label className="mt-4 flex items-center gap-3 text-sm font-bold"><input type="checkbox" className="h-5 w-5 accent-blue-700" checked={withMaterial} onChange={(event) => setWithMaterial(event.target.checked)} />Calcular con material</label>
        </section>
      </div>

      <aside className="lg:sticky lg:top-5 lg:self-start">
        <section className="overflow-hidden rounded-md border border-slate-300 bg-white">
          <div className="border-b-2 border-slate-300 p-5"><p className="text-xs font-extrabold uppercase tracking-wider text-navy-700">Resultado de la prueba</p><p className="mt-2 text-4xl font-black text-navy-950">{money(result)}</p><p className="mt-2 text-sm font-medium text-slate-600">Valor neto para las medidas ingresadas.</p></div>
          <div className="p-5"><h2 className="font-extrabold">Fórmula generada</h2><code className="mt-3 block overflow-x-auto rounded-xl bg-slate-950 p-4 text-xs leading-6 text-emerald-300">{generatedFormula}</code><p className="mt-3 text-xs font-medium text-slate-600">Esta fórmula todavía no modifica el cotizador. Primero revísala y pruébala.</p>
            <button type="button" disabled={!rules.length} onClick={saveFormula} className="mt-5 w-full rounded-xl bg-navy-900 px-4 py-3 text-sm font-extrabold text-white hover:bg-navy-800 disabled:opacity-50">Guardar fórmula</button>{notice && <p className="mt-3 rounded-lg bg-emerald-100 p-3 text-sm font-bold text-emerald-800">{notice}</p>}
          </div>
        </section>
        {saved.length > 0 && <section className="mt-5 rounded-md border border-slate-300 bg-white p-5"><h2 className="font-extrabold">Fórmulas guardadas</h2><div className="mt-3 space-y-2">{saved.map((formula) => <div key={formula.id} className="flex items-center justify-between gap-2 rounded-xl border border-slate-300 p-3"><button type="button" className="min-w-0 flex-1 text-left" onClick={() => { setName(formula.name); setRules(formula.rules); }}><strong className="block truncate text-sm">{formula.name}</strong><span className="text-xs text-slate-600">{formula.rules.length} partes</span></button><button type="button" aria-label={`Eliminar ${formula.name}`} onClick={() => persist(saved.filter((item) => item.id !== formula.id))} className="text-xs font-bold text-red-700">Eliminar</button></div>)}</div></section>}
      </aside>
    </div>
  </main>;
}
