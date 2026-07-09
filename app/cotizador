"use client";

import { useMemo, useState } from "react";

type Option = "con" | "sin" | "ninguno";

type Item = {
  name: string;
  base: number;
  m2: number;
  noMaterial: number;
};

type Category = {
  name: string;
  measure2: string;
  items: Item[];
};

type RowState = {
  largo: number;
  medida2: number;
  option: Option;
};

const categories: Category[] = [
  {
    name: "Parrillas",
    measure2: "Ancho MM",
    items: [
      { name: "Estructura Inox", base: 220000, m2: 155000, noMaterial: 115000 },
      { name: "Estructura acero", base: 160000, m2: 110000, noMaterial: 80000 },
      { name: "Módulo barra inox Ø8", base: 90000, m2: 60000, noMaterial: 45000 },
      { name: "Módulo v 1,5 inox", base: 85000, m2: 55000, noMaterial: 40000 },
      { name: "Frontal va 2 mm inox", base: 120000, m2: 70000, noMaterial: 50000 },
      { name: "Frontal va 3 mm acero", base: 95000, m2: 50000, noMaterial: 38000 },
      { name: "Bandeja grasa inox", base: 70000, m2: 45000, noMaterial: 32000 },
      { name: "Pata falsa inox", base: 60000, m2: 40000, noMaterial: 30000 },
      { name: "Pata falsa fierro", base: 45000, m2: 30000, noMaterial: 22000 },
      { name: "Manilla", base: 25000, m2: 0, noMaterial: 18000 },
    ],
  },
  {
    name: "Puerta guillotina",
    measure2: "Alto MM",
    items: [
      { name: "Puerta guillotina", base: 260000, m2: 85000, noMaterial: 62000 },
      { name: "Mueble guillotina", base: 180000, m2: 65000, noMaterial: 48000 },
      { name: "Puerta quincho", base: 150000, m2: 52000, noMaterial: 39000 },
      { name: "Estructura P. quincho guillotina", base: 145000, m2: 50000, noMaterial: 36000 },
      { name: "Estructura P. quincho", base: 120000, m2: 44000, noMaterial: 32000 },
    ],
  },
];

function clp(value: number) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(Math.round(value || 0));
}

function rowKey(categoryIndex: number, itemIndex: number) {
  return `${categoryIndex}-${itemIndex}`;
}

function calculateValue(item: Item, row: RowState) {
  if (row.option === "ninguno") return 0;

  const largo = Number(row.largo || 0);
  const medida2 = Number(row.medida2 || 0);
  const areaM2 = largo > 0 && medida2 > 0 ? (largo * medida2) / 1000000 : 0;

  if (row.option === "con") return item.base + areaM2 * item.m2;
  if (row.option === "sin") return item.base * 0.55 + areaM2 * item.noMaterial;

  return 0;
}

export default function CotizadorPage() {
  const today = new Date().toISOString().slice(0, 10);

  const [client, setClient] = useState({
    cliente: "",
    proyecto: "",
    telefono: "",
    fecha: today,
  });

  const [rows, setRows] = useState<Record<string, RowState>>(() => {
    const initial: Record<string, RowState> = {};

    categories.forEach((category, categoryIndex) => {
      category.items.forEach((item, itemIndex) => {
        initial[rowKey(categoryIndex, itemIndex)] = {
          largo: 0,
          medida2: 0,
          option: "ninguno",
        };
      });
    });

    return initial;
  });

  const selectedRows = useMemo(() => {
    return categories.flatMap((category, categoryIndex) =>
      category.items
        .map((item, itemIndex) => {
          const key = rowKey(categoryIndex, itemIndex);
          const row = rows[key];
          const value = calculateValue(item, row);

          return {
            key,
            category: category.name,
            item: item.name,
            measure2: category.measure2,
            largo: row.largo,
            medida2: row.medida2,
            option: row.option,
            value,
          };
        })
        .filter((row) => row.value > 0)
    );
  }, [rows]);

  const subtotal = selectedRows.reduce((sum, row) => sum + row.value, 0);
  const iva = subtotal * 0.19;
  const total = subtotal + iva;

  function updateRow(key: string, patch: Partial<RowState>) {
    setRows((prev) => ({
      ...prev,
      [key]: { ...prev[key], ...patch },
    }));
  }

  function clearAll() {
    const cleared: Record<string, RowState> = {};

    categories.forEach((category, categoryIndex) => {
      category.items.forEach((item, itemIndex) => {
        cleared[rowKey(categoryIndex, itemIndex)] = {
          largo: 0,
          medida2: 0,
          option: "ninguno",
        };
      });
    });

    setRows(cleared);
    setClient({ cliente: "", proyecto: "", telefono: "", fecha: today });
  }

  function printQuote() {
    if (selectedRows.length === 0) {
      alert("Selecciona al menos un producto.");
      return;
    }

    window.print();
  }

  return (
    <main className="min-h-screen bg-neutral-100 px-4 py-6 text-neutral-900">
      <div className="mx-auto max-w-7xl">
        <section className="mb-5 rounded-2xl bg-neutral-950 p-6 text-white shadow-xl">
          <p className="mb-1 text-xs uppercase tracking-[0.2em] text-neutral-400">
            Cotizador tipo planilla técnica
          </p>
          <h1 className="text-3xl font-black md:text-4xl">Cotizador de Productos</h1>
          <p className="mt-2 max-w-2xl text-neutral-300">
            Ingresa medidas en milímetros, selecciona con material, sin material o ninguno, y el sistema calculará el valor automáticamente.
          </p>
        </section>

        <section className="mb-5 rounded-2xl border border-neutral-300 bg-white p-5 shadow-sm print:hidden">
          <h2 className="mb-4 text-xl font-black">Datos de cotización</h2>
          <div className="grid gap-3 md:grid-cols-4">
            <label className="text-sm font-bold text-neutral-700">
              Cliente
              <input
                className="mt-2 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3 py-2 outline-none focus:border-blue-600"
                value={client.cliente}
                onChange={(event) => setClient({ ...client, cliente: event.target.value })}
                placeholder="Nombre cliente"
              />
            </label>

            <label className="text-sm font-bold text-neutral-700">
              Proyecto
              <input
                className="mt-2 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3 py-2 outline-none focus:border-blue-600"
                value={client.proyecto}
                onChange={(event) => setClient({ ...client, proyecto: event.target.value })}
                placeholder="Nombre proyecto"
              />
            </label>

            <label className="text-sm font-bold text-neutral-700">
              Teléfono
              <input
                className="mt-2 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3 py-2 outline-none focus:border-blue-600"
                value={client.telefono}
                onChange={(event) => setClient({ ...client, telefono: event.target.value })}
                placeholder="+56 9..."
              />
            </label>

            <label className="text-sm font-bold text-neutral-700">
              Fecha
              <input
                type="date"
                className="mt-2 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3 py-2 outline-none focus:border-blue-600"
                value={client.fecha}
                onChange={(event) => setClient({ ...client, fecha: event.target.value })}
              />
            </label>
          </div>
        </section>

        <section className="hidden print:block">
          <h2 className="text-xl font-black">Cotización técnica</h2>
          <p>Cliente: {client.cliente || "Sin cliente"}</p>
          <p>Proyecto: {client.proyecto || "-"}</p>
          <p>Teléfono: {client.telefono || "-"}</p>
          <p>Fecha: {client.fecha}</p>
        </section>

        {categories.map((category, categoryIndex) => (
          <section key={category.name} className="mb-5 rounded-2xl border border-neutral-300 bg-white p-5 shadow-sm">
            <h2 className="mb-2 text-xl font-black">{category.name}</h2>
            <p className="mb-4 text-sm text-neutral-500 print:hidden">
              Selecciona una opción por fila. Las fórmulas actuales son de ejemplo y se pueden reemplazar por las fórmulas reales.
            </p>

            <div className="overflow-x-auto rounded-xl border border-neutral-300">
              <table className="w-full min-w-[1050px] border-collapse bg-white text-sm">
                <thead>
                  <tr className="bg-neutral-200 text-xs uppercase">
                    <th className="border border-neutral-300 px-3 py-2 text-left">Ítem</th>
                    <th className="border border-neutral-300 px-3 py-2">Largo MM</th>
                    <th className="border border-neutral-300 px-3 py-2">{category.measure2}</th>
                    <th className="border border-neutral-300 px-3 py-2">Con Material</th>
                    <th className="border border-neutral-300 px-3 py-2">Sin Material</th>
                    <th className="border border-neutral-300 px-3 py-2">Ninguno</th>
                    <th className="border border-neutral-300 px-3 py-2 text-right">Valor</th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="bg-neutral-950 text-white">
                    <td className="border border-neutral-700 px-3 py-2 font-black uppercase" colSpan={7}>
                      {category.name}
                    </td>
                  </tr>

                  {category.items.map((item, itemIndex) => {
                    const key = rowKey(categoryIndex, itemIndex);
                    const row = rows[key];
                    const value = calculateValue(item, row);
                    const active = value > 0;

                    return (
                      <tr key={key} className={active ? "bg-blue-50" : "bg-white"}>
                        <td className="border border-neutral-300 px-3 py-2 text-left font-bold text-neutral-700">
                          {item.name}
                        </td>

                        <td className="border border-neutral-300 px-3 py-2 text-center">
                          <input
                            type="number"
                            min={0}
                            className="w-28 rounded-lg border border-neutral-300 bg-neutral-50 px-2 py-1 text-right print:border-0 print:bg-white"
                            value={row.largo || ""}
                            onChange={(event) => updateRow(key, { largo: Number(event.target.value || 0) })}
                            placeholder="0"
                          />
                        </td>

                        <td className="border border-neutral-300 px-3 py-2 text-center">
                          <input
                            type="number"
                            min={0}
                            className="w-28 rounded-lg border border-neutral-300 bg-neutral-50 px-2 py-1 text-right print:border-0 print:bg-white"
                            value={row.medida2 || ""}
                            onChange={(event) => updateRow(key, { medida2: Number(event.target.value || 0) })}
                            placeholder="0"
                          />
                        </td>

                        {(["con", "sin", "ninguno"] as Option[]).map((option) => (
                          <td key={option} className="border border-neutral-300 px-3 py-2 text-center">
                            <input
                              type="radio"
                              name={`option-${key}`}
                              checked={row.option === option}
                              onChange={() => updateRow(key, { option })}
                              className="scale-125"
                            />
                          </td>
                        ))}

                        <td className="border border-neutral-300 px-3 py-2 text-right font-black">
                          {clp(value)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        ))}

        <section className="sticky bottom-0 z-20 mb-5 flex flex-col gap-3 rounded-2xl border border-neutral-300 bg-white p-4 shadow-xl md:flex-row md:items-center md:justify-end print:static print:shadow-none">
          <div className="flex min-w-40 justify-between rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3">
            <span>Subtotal</span>
            <strong>{clp(subtotal)}</strong>
          </div>

          <div className="flex min-w-40 justify-between rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3">
            <span>IVA 19%</span>
            <strong>{clp(iva)}</strong>
          </div>

          <div className="flex min-w-44 justify-between rounded-xl bg-neutral-950 px-4 py-3 text-white">
            <span>Total</span>
            <strong>{clp(total)}</strong>
          </div>

          <button onClick={printQuote} className="rounded-xl bg-blue-600 px-5 py-3 font-black text-white print:hidden">
            Imprimir / Guardar PDF
          </button>

          <button onClick={clearAll} className="rounded-xl bg-red-600 px-5 py-3 font-black text-white print:hidden">
            Limpiar
          </button>
        </section>
      </div>
    </main>
  );
}
