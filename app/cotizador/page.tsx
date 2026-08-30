"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { siteAssets } from "@/components/siteAssets";
import { ProductReference } from "@/components/cotizador/ProductReference";
import { canManageExclusiveAccess, canViewLoginHistory, canViewQuoteHistory } from "@/lib/permissions";

type Mode = "con" | "sin";
type PaintMode = "sin" | "poliuretano" | "electrostatica";
type Section = "parrillas" | "campanas" | "guillotinas" | "unitarios" | "personalizado";
type MeasureGroup = "parrillas" | "campanas" | "guillotinas";

type MeasureProduct = {
  id: string;
  name: string;
  note?: string;
  fields: ("largo" | "ancho" | "alto")[];
  fixedMeasures?: Partial<Measures>;
  modes?: Mode[];
  calculate: (values: Measures, mode: Mode) => number;
  paintArea?: (values: Measures) => number;
};

type Measures = { largo: number; ancho: number; alto: number };
type MeasureRow = Measures & { quantity: number; mode: Mode; paint: PaintMode; selected: boolean };
type UnitProduct = { id: string; name: string; packSize: number; unitPrice: number };
type UnitRow = { sets: number; selected: boolean };
type CustomRow = { id: number; description: string; price: number; quantity: number };
type AccessHistoryEntry = { id: string; username: string; loggedInAt: string };
type AccessHistorySummary = { username: string; loginCount: number; lastLoginAt: string; active: boolean };
type AccessHistoryResponse = { entries: AccessHistoryEntry[]; summaries: AccessHistorySummary[] };
type AccessControlResponse = { exclusive: boolean; exclusiveUsername: string | null; updatedAt: string | null };
type QuoteHistoryLine = { category: string; name: string; detail: string; modeText: string; quantity: number; total: number };
type QuoteHistoryEntry = { id: string; number: number; username: string; subtotal: number; iva: number; total: number; items: QuoteHistoryLine[]; emailedTo: string; emailSent: boolean; createdAt: string };
type QuoteHistoryResponse = { quotes: QuoteHistoryEntry[] };

const emptyMeasures: Measures = { largo: 0, ancho: 0, alto: 0 };

const paintRates: Record<Exclude<PaintMode, "sin">, number> = {
  poliuretano: 10500,
  electrostatica: 8500,
};

const conicalPaintArea = ({ largo, ancho, alto }: Measures) =>
  ((largo * alto) / 1_000_000) * 4 + ((ancho * alto) / 1_000_000) * 4 * 0.8;

const mediterraneanPaintArea = ({ largo, ancho, alto }: Measures) =>
  ((largo * alto) / 1_000_000) * 4 + ((ancho * alto) / 1_000_000) * 4;

const paintPrice = (product: MeasureProduct, row: MeasureRow) =>
  product.paintArea && row.paint !== "sin" ? product.paintArea(row) * paintRates[row.paint] : 0;

const paintNames: Record<PaintMode, string> = {
  sin: "Sin pintura",
  poliuretano: "Pintura poliuretano",
  electrostatica: "Pintura electrostática",
};

const campanas: MeasureProduct[] = [
  {
    id: "conico-exterior",
    name: "Campana cónica exterior",
    fields: ["largo", "ancho", "alto"],
    modes: ["con"],
    paintArea: conicalPaintArea,
    calculate: ({ largo, ancho, alto }) => {
      const material =
        (((largo * alto * 1.2 * 8) / 1_000_000) * 1.2 * 2) +
        (((ancho * alto * 1.2 * 8) / 1_000_000) * 1.2 * 2);
      return material * 8000;
    },
  },
  {
    id: "conica-mediterranea",
    name: "Campana cónica mediterránea",
    fields: ["largo", "ancho", "alto"],
    modes: ["con"],
    paintArea: (values) => conicalPaintArea(values) + mediterraneanPaintArea(values),
    calculate: ({ largo, ancho, alto }) => {
      const materialConica =
        (((largo * alto * 1.2 * 8) / 1_000_000) * 1.2 * 2) +
        (((ancho * alto * 1.2 * 8) / 1_000_000) * 1.2 * 2);
      const materialMediterranea =
        ((((largo * alto * 1.2 * 8) / 1_000_000) * 2) +
          (((ancho * alto * 1.2 * 8) / 1_000_000) * 2 * 1.3)) *
        1.2;
      return materialConica * 5000 + materialMediterranea * 5000;
    },
  },
  {
    id: "mediterraneo-falso",
    name: "Mediterráneo falso",
    fields: ["largo", "ancho", "alto"],
    modes: ["con"],
    paintArea: mediterraneanPaintArea,
    calculate: ({ largo, ancho, alto }) => {
      const materialMediterranea =
        ((((largo * alto * 1.2 * 8) / 1_000_000) * 2) +
          (((ancho * alto * 1.2 * 8) / 1_000_000) * 2 * 1.3)) *
        1.2;
      return materialMediterranea * 6500;
    },
  },
  {
    id: "faldon",
    name: "Faldón",
    fields: ["largo", "alto"],
    modes: ["con"],
    paintArea: ({ largo, alto }) => ((largo * alto) / 1_000_000) * 2,
    calculate: ({ largo, alto }) => {
      const material = ((largo * alto * 1.2 * 8) / 1_000_000) * 1.2;
      return material * 2800;
    },
  },
  {
    id: "faldon-c",
    name: "Faldón C",
    fields: ["largo", "alto"],
    modes: ["con"],
    paintArea: ({ largo, alto }) => ((largo * alto) / 1_000_000) * 2 + 4,
    calculate: ({ largo, alto }) => {
      const material = ((largo * alto * 1.2 * 8) / 1_000_000) * 1.2 + 20;
      return material * 2800;
    },
  },
  {
    id: "chimenea",
    name: "Chimenea",
    fields: ["largo", "ancho", "alto"],
    modes: ["con"],
    paintArea: ({ largo, ancho, alto }) => (((largo + ancho) * alto * 4) / 1_000_000) + 2,
    calculate: ({ largo, ancho, alto }) => {
      const material = ((((largo + ancho) * alto * 1.2 * 8) / 1_000_000) * 2) * 1.67 + 10;
      return material * 2000;
    },
  },
  {
    id: "porta-ventilador",
    name: "Porta ventilador",
    fields: ["largo", "ancho"],
    modes: ["con"],
    calculate: ({ largo, ancho }) => (((largo + 200) * ancho * 1.2 * 8) / 1_000_000) * 3500,
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
    calculate: (_values, mode) => mode === "con" ? 15000 : 10000,
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

const parrillas: MeasureProduct[] = [
  {
    id: "estructura-inox",
    name: "Estructura inox",
    fields: ["largo", "ancho"],
    calculate: ({ largo, ancho }, mode) => 150000 + (mode === "con" ? (largo * ancho * 2 * 8) / 1_000_000 * 15000 : 0),
  },
  {
    id: "estructura-acero",
    name: "Estructura acero",
    fields: ["largo", "ancho"],
    calculate: ({ largo, ancho }, mode) => 100000 + (mode === "con" ? (largo * ancho * 2 * 8) / 1_000_000 * 9000 : 0),
  },
  {
    id: "modulo-barra-inox",
    name: "Módulo barra inox Ø8",
    fields: ["largo", "ancho"],
    calculate: ({ largo, ancho }, mode) => largo * 80 + (mode === "con" ? ((largo * ancho) / 2 / 10000) * 4600 : 0),
  },
  {
    id: "modulo-v-inox",
    name: "Módulo V 1,5 inox",
    fields: ["largo", "ancho"],
    calculate: ({ largo, ancho }, mode) => largo * 80 + (mode === "con" ? ((largo * ancho) / 2 / 10000) * 2000 : 0),
  },
  {
    id: "separador-parrilla",
    name: "Separador",
    fields: ["largo", "ancho"],
    fixedMeasures: { ancho: 200 },
    calculate: ({ largo, ancho }, mode) => 7000 + (mode === "con" ? ((ancho + 20) * (largo + 20) * 3 * 8) / 1_000_000 * 3000 : 0),
  },
  {
    id: "frontal-va-inox",
    name: "Tapa pro 2mm Inox",
    fields: ["largo", "ancho"],
    fixedMeasures: { ancho: 110 },
    calculate: ({ largo, ancho }, mode) => mode === "con" ? ((ancho + 50) * largo * 2 * 8) / 1_000_000 * 15700 : 20000,
  },
  {
    id: "frontal-va-acero",
    name: "Tapa pro 3mm Acero",
    fields: ["largo", "ancho"],
    fixedMeasures: { ancho: 110 },
    calculate: ({ largo, ancho }, mode) => mode === "con" ? ((ancho + 50) * largo * 3 * 8) / 1_000_000 * 7000 : 20000,
  },
  {
    id: "bandeja-grasa-inox",
    name: "Bandeja grasa inox",
    fields: ["largo", "ancho"],
    fixedMeasures: { ancho: 40 },
    calculate: ({ largo, ancho }, mode) => largo * 10 + (mode === "con" ? ((ancho + 50) * (largo + 60) * 3 * 8) / 1_000_000 * 6000 : 0),
  },
  { id: "pata-falsa-inox", name: "Pata falsa inox", fields: [], calculate: (_values, mode) => mode === "con" ? 14000 : 10000 },
  { id: "pata-falsa-fierro", name: "Pata falsa fierro", fields: [], calculate: (_values, mode) => mode === "con" ? 12000 : 8000 },
  { id: "manilla-parrilla", name: "Manilla", fields: [], calculate: (_values, mode) => mode === "con" ? 10000 : 5000 },
];

const unitProducts: UnitProduct[] = [
  { id: "bandeja-parrillera-aza-soldada", name: "Bandeja parrillera aza soldada", packSize: 16, unitPrice: 58200 },
  { id: "bandeja-parrillera-aza-unida", name: "Bandeja parrillera aza unida", packSize: 13, unitPrice: 57000 },
  { id: "bandeja-pq-abierta", name: "Bandeja PQ abierta", packSize: 13, unitPrice: 60000 },
  { id: "bandeja-pq-cerrada", name: "Bandeja PQ cerrada", packSize: 13, unitPrice: 67200 },
  { id: "bandeja-dos-quemadores", name: "Bandeja dos quemadores", packSize: 12, unitPrice: 57200 },
  { id: "bandeja-1-3", name: "Bandeja 1/3", packSize: 18, unitPrice: 60600 },
  { id: "bandeja-2-3", name: "Bandeja 2/3", packSize: 10, unitPrice: 74160 },
  { id: "bandeja-3-3", name: "Bandeja 3/3", packSize: 6, unitPrice: 98400 },
  { id: "nichos-acero", name: "Nichos · 3 mm A.C. + soldadura y pulido", packSize: 1, unitPrice: 140000 },
];

const initialMeasureRows = (products: MeasureProduct[]) =>
  Object.fromEntries(products.map((product) => [product.id, { ...emptyMeasures, ...product.fixedMeasures, quantity: 1, mode: product.modes?.[0] ?? "con", paint: "sin", selected: false }])) as Record<string, MeasureRow>;

const initialUnitRows = () =>
  Object.fromEntries(unitProducts.map((product) => [product.id, { sets: 1, selected: false }])) as Record<string, UnitRow>;

const money = (value: number) =>
  new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(Math.round(value));

const fieldNames = { largo: "Largo", ancho: "Ancho", alto: "Alto" };

const accessDateFormatter = new Intl.DateTimeFormat("es-CL", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "America/Santiago",
});

const formatAccessDate = (value: string) => accessDateFormatter.format(new Date(value));

export default function CotizadorPage() {
  const [section, setSection] = useState<Section>("parrillas");
  const [currentUser, setCurrentUser] = useState("Cargando…");
  const [campanaRows, setCampanaRows] = useState(() => initialMeasureRows(campanas));
  const [guillotinaRows, setGuillotinaRows] = useState(() => initialMeasureRows(guillotinas));
  const [parrillaRows, setParrillaRows] = useState(() => initialMeasureRows(parrillas));
  const [unitRows, setUnitRows] = useState(initialUnitRows);
  const [measureVariants, setMeasureVariants] = useState<Record<string, MeasureRow[]>>({});
  const [customRows, setCustomRows] = useState<CustomRow[]>([
    { id: 1, description: "", price: 0, quantity: 1 },
  ]);
  const [quoteNumber, setQuoteNumber] = useState<number | null>(null);
  const [preparingPdf, setPreparingPdf] = useState(false);
  const [quoteConfirmationOpen, setQuoteConfirmationOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [accessHistory, setAccessHistory] = useState<AccessHistoryResponse | null>(null);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState("");
  const [quoteHistoryOpen, setQuoteHistoryOpen] = useState(false);
  const [quoteHistory, setQuoteHistory] = useState<QuoteHistoryEntry[] | null>(null);
  const [quoteHistoryLoading, setQuoteHistoryLoading] = useState(false);
  const [quoteHistoryError, setQuoteHistoryError] = useState("");
  const [exclusiveAccess, setExclusiveAccess] = useState<boolean | null>(null);
  const [accessControlLoading, setAccessControlLoading] = useState(false);
  const [accessControlError, setAccessControlError] = useState("");
  const historyAllowed = canViewLoginHistory(currentUser);
  const quoteHistoryAllowed = canViewQuoteHistory(currentUser);
  const accessControlAllowed = canManageExclusiveAccess(currentUser);
  const pricesVisible = quoteNumber !== null;

  const loadExclusiveAccess = async () => {
    setAccessControlLoading(true);
    setAccessControlError("");
    try {
      const response = await fetch("/api/auth/access-control", { cache: "no-store" });
      const result = (await response.json()) as AccessControlResponse & { error?: string };
      if (!response.ok) throw new Error(result.error || "No fue posible consultar el acceso.");
      setExclusiveAccess(result.exclusive);
    } catch (error) {
      setAccessControlError(error instanceof Error ? error.message : "No fue posible consultar el acceso.");
    } finally {
      setAccessControlLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    let redirecting = false;
    const validateSession = async () => {
      try {
        const response = await fetch("/api/auth/me", { cache: "no-store" });
        if (!response.ok) throw new Error("Sesión no válida");
        const { user } = (await response.json()) as { user: string };
        if (mounted) setCurrentUser(user);
      } catch {
        if (!redirecting) {
          redirecting = true;
          window.location.assign("/acceso");
        }
      }
    };

    void validateSession();
    const sessionCheck = window.setInterval(() => void validateSession(), 5000);
    const validateVisibleSession = () => {
      if (document.visibilityState === "visible") void validateSession();
    };
    window.addEventListener("focus", validateSession);
    document.addEventListener("visibilitychange", validateVisibleSession);
    return () => {
      mounted = false;
      window.clearInterval(sessionCheck);
      window.removeEventListener("focus", validateSession);
      document.removeEventListener("visibilitychange", validateVisibleSession);
    };
  }, []);

  useEffect(() => {
    if (accessControlAllowed) void loadExclusiveAccess();
    // El permiso cambia únicamente cuando se resuelve el usuario conectado.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessControlAllowed]);

  const loadAccessHistory = async () => {
    setHistoryLoading(true);
    setHistoryError("");
    try {
      const response = await fetch("/api/auth/history", { cache: "no-store" });
      const result = (await response.json()) as AccessHistoryResponse & { error?: string };
      if (!response.ok) throw new Error(result.error || "No fue posible cargar el historial.");
      setAccessHistory({ entries: result.entries, summaries: result.summaries });
    } catch (error) {
      setHistoryError(error instanceof Error ? error.message : "No fue posible cargar el historial.");
    } finally {
      setHistoryLoading(false);
    }
  };

  const toggleAccessHistory = () => {
    const willOpen = !historyOpen;
    setHistoryOpen(willOpen);
    if (willOpen && !accessHistory) void loadAccessHistory();
  };

  const loadQuoteHistory = async () => {
    setQuoteHistoryLoading(true);
    setQuoteHistoryError("");
    try {
      const response = await fetch("/api/quotes", { cache: "no-store" });
      const result = (await response.json()) as QuoteHistoryResponse & { error?: string };
      if (!response.ok) throw new Error(result.error || "No fue posible cargar las cotizaciones.");
      setQuoteHistory(result.quotes);
    } catch (error) {
      setQuoteHistoryError(error instanceof Error ? error.message : "No fue posible cargar las cotizaciones.");
    } finally {
      setQuoteHistoryLoading(false);
    }
  };

  const toggleQuoteHistory = () => {
    const willOpen = !quoteHistoryOpen;
    setQuoteHistoryOpen(willOpen);
    if (willOpen && !quoteHistory) void loadQuoteHistory();
  };

  const toggleExclusiveAccess = async () => {
    const willEnable = !exclusiveAccess;
    if (willEnable && !window.confirm("Se cerrarán las sesiones de todos los demás usuarios y solo Nicolas podrá ingresar. ¿Activar acceso exclusivo?")) return;

    setAccessControlLoading(true);
    setAccessControlError("");
    try {
      const response = await fetch("/api/auth/access-control", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exclusive: willEnable }),
      });
      const result = (await response.json()) as AccessControlResponse & { error?: string };
      if (!response.ok) throw new Error(result.error || "No fue posible cambiar el acceso.");
      setExclusiveAccess(result.exclusive);
      if (historyOpen) void loadAccessHistory();
    } catch (error) {
      setAccessControlError(error instanceof Error ? error.message : "No fue posible cambiar el acceso.");
    } finally {
      setAccessControlLoading(false);
    }
  };

  const quoteLines = useMemo(() => {
    const measured = [
      ...parrillas.flatMap((product) => [parrillaRows[product.id], ...(measureVariants[`parrillas:${product.id}`] || [])].map((row, variantIndex) => ({ product, row, variantIndex, category: "Parrillas" }))),
      ...campanas.flatMap((product) => [campanaRows[product.id], ...(measureVariants[`campanas:${product.id}`] || [])].map((row, variantIndex) => ({ product, row, variantIndex, category: "Campanas" }))),
      ...guillotinas.flatMap((product) => [guillotinaRows[product.id], ...(measureVariants[`guillotinas:${product.id}`] || [])].map((row, variantIndex) => ({ product, row, variantIndex, category: "Mueble guillotina" }))),
    ]
      .filter(({ row }) => row.selected)
      .map(({ product, row, variantIndex, category }) => ({
        id: `${product.id}-${variantIndex}`,
        category,
        name: `${product.name}${variantIndex > 0 ? ` · Medida ${variantIndex + 1}` : ""}`,
        detail: product.fields.map((field) => `${fieldNames[field]} ${row[field]} mm`).join(" · "),
        mode: row.mode,
        modeText: `${row.mode === "con" ? "Con material" : "Sin material"}${product.paintArea ? ` · ${paintNames[row.paint]}` : ""}`,
        quantity: row.quantity,
        total: (product.calculate(row, row.mode) + paintPrice(product, row)) * row.quantity,
      }));

    const custom = customRows
      .filter((row) => row.price > 0)
      .map((row) => ({
        id: `custom-${row.id}`,
        category: "Personalizado",
        name: row.description.trim() || "Trabajo personalizado",
        detail: "",
        mode: "con" as Mode,
        modeText: "Precio",
        quantity: row.quantity,
        total: row.price * row.quantity,
      }));

    const unitary = unitProducts
      .map((product) => ({ product, row: unitRows[product.id] }))
      .filter(({ row }) => row.selected)
      .map(({ product, row }) => ({
          id: product.id,
          category: "Productos unitarios",
          name: product.name,
          detail: `${row.sets} ${row.sets === 1 ? "set" : "sets"} · 1 set = ${product.packSize} unid.${pricesVisible ? ` · ${money(product.unitPrice)} c/u` : ""}`,
          mode: "con" as Mode,
          modeText: "Con material",
          quantity: row.sets * product.packSize,
          total: product.unitPrice * product.packSize * row.sets,
        }));

    return [...measured, ...unitary, ...custom];
  }, [campanaRows, customRows, guillotinaRows, measureVariants, parrillaRows, pricesVisible, unitRows]);

  const subtotal = quoteLines.reduce((sum, line) => sum + line.total, 0);
  const iva = subtotal * 0.19;

  const updateMeasured = (group: MeasureGroup, id: string, patch: Partial<MeasureRow>) => {
    const setter = group === "parrillas" ? setParrillaRows : group === "campanas" ? setCampanaRows : setGuillotinaRows;
    setter((current) => ({ ...current, [id]: { ...current[id], ...patch } }));
  };

  const updateMeasureVariant = (group: MeasureGroup, id: string, variantIndex: number, patch: Partial<MeasureRow>) => {
    if (variantIndex === 0) {
      updateMeasured(group, id, patch);
      return;
    }
    const key = `${group}:${id}`;
    setMeasureVariants((current) => ({
      ...current,
      [key]: (current[key] || []).map((row, index) => index === variantIndex - 1 ? { ...row, ...patch } : row),
    }));
  };

  const addMeasureVariant = (group: MeasureGroup, product: MeasureProduct) => {
    const key = `${group}:${product.id}`;
    const newRow: MeasureRow = { ...emptyMeasures, ...product.fixedMeasures, quantity: 1, mode: product.modes?.[0] ?? "con", paint: "sin", selected: true };
    setMeasureVariants((current) => ({ ...current, [key]: [...(current[key] || []), newRow] }));
  };

  const removeMeasureVariant = (group: MeasureGroup, id: string, variantIndex: number) => {
    const key = `${group}:${id}`;
    setMeasureVariants((current) => ({
      ...current,
      [key]: (current[key] || []).filter((_, index) => index !== variantIndex - 1),
    }));
  };

  const updateCustomRow = (id: number, patch: Partial<CustomRow>) => {
    setCustomRows((current) => current.map((row) => row.id === id ? { ...row, ...patch } : row));
  };

  const addCustomRow = () => {
    setCustomRows((current) => [...current, { id: Date.now(), description: "", price: 0, quantity: 1 }]);
  };

  const updateUnitRow = (id: string, patch: Partial<UnitRow>) => {
    setUnitRows((current) => ({ ...current, [id]: { ...current[id], ...patch } }));
  };

  const reset = () => {
    setCampanaRows(initialMeasureRows(campanas));
    setGuillotinaRows(initialMeasureRows(guillotinas));
    setParrillaRows(initialMeasureRows(parrillas));
    setUnitRows(initialUnitRows());
    setMeasureVariants({});
    setCustomRows([{ id: 1, description: "", price: 0, quantity: 1 }]);
    setQuoteNumber(null);
  };

  const printQuote = async (confirmed = false) => {
    if (!quoteLines.length) {
      alert("Selecciona al menos un producto.");
      return;
    }

    if (quoteNumber === null && !confirmed) {
      setQuoteConfirmationOpen(true);
      return;
    }

    setPreparingPdf(true);
    try {
      let number = quoteNumber;
      if (number === null) {
        const response = await fetch("/api/quotes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lines: quoteLines }),
        });
        const result = (await response.json().catch(() => ({}))) as { number?: number; emailSent?: boolean; error?: string };
        if (!result.number) throw new Error(result.error || "No fue posible generar el folio.");
        number = result.number;
        setQuoteNumber(number);
        await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
        if (!response.ok || !result.emailSent) {
          alert(result.error || "La cotización quedó guardada, pero no fue posible enviar la copia por correo.");
        } else {
          alert(`Cotización N.º ${String(number).padStart(6, "0")} guardada. Se envió una copia a nproyectosltda@gmail.com.`);
        }
        if (quoteHistoryOpen) void loadQuoteHistory();
      } else {
        alert(`La cotización N.º ${String(number).padStart(6, "0")} ya fue guardada y enviada al correo de N Proyectos.`);
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
      {quoteConfirmationOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 print:hidden" role="presentation">
        <section role="dialog" aria-modal="true" aria-labelledby="quote-warning-title" aria-describedby="quote-warning-description" className="w-full max-w-md overflow-hidden rounded-2xl border-2 border-blue-300 bg-white shadow-2xl">
          <div className="border-b border-blue-200 bg-blue-50 px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-800 text-lg font-black text-white" aria-hidden="true">@</span>
              <h2 id="quote-warning-title" className="text-lg font-extrabold text-slate-950">Confirmar creación de la cotización</h2>
            </div>
          </div>
          <div className="px-5 py-5">
            <p id="quote-warning-description" className="text-sm font-semibold leading-6 text-slate-700">Al confirmar, la cotización quedará guardada y se enviará automáticamente una copia al correo de N Proyectos:</p>
            <p className="mt-3 break-all rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-center text-sm font-extrabold text-amber-950">nproyectosltda@gmail.com</p>
            <p className="mt-4 text-sm font-bold text-slate-950">¿Deseas crear la cotización?</p>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              <button type="button" onClick={() => setQuoteConfirmationOpen(false)} className="rounded-xl border-2 border-slate-400 bg-white px-4 py-3 text-sm font-extrabold text-slate-800 hover:bg-slate-100">No, cancelar</button>
              <button type="button" onClick={() => { setQuoteConfirmationOpen(false); void printQuote(true); }} className="rounded-xl border-2 border-amber-500 bg-amber-400 px-4 py-3 text-sm font-extrabold text-amber-950 hover:bg-amber-300">Sí, crear y enviar</button>
            </div>
          </div>
        </section>
      </div>}
      <header className="border-b border-slate-700 bg-navy-950 px-3 py-4 text-white sm:px-5 sm:py-6 print:bg-white print:px-0 print:text-slate-900">
        <div className="mx-auto flex max-w-7xl flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center sm:gap-5">
          <div className="flex min-w-0 items-center justify-center gap-3 sm:justify-start sm:gap-6">
            <div className="flex min-w-0 items-center gap-2 sm:gap-4">
              <div className="flex h-12 min-w-0 items-center rounded-xl bg-white px-2 py-2 shadow-md sm:h-14 sm:px-3 print:border print:border-slate-300 print:shadow-none">
                <Image src={siteAssets.logo} alt="Logo N Proyectos" priority className="h-8 w-auto max-w-32 object-contain sm:h-10 sm:max-w-none" />
              </div>
              <span className="h-10 w-px bg-white/30 print:bg-slate-400" aria-hidden="true" />
              <div className="flex h-12 items-center rounded-xl border-2 border-white bg-white px-3 shadow-md sm:h-14 sm:px-4 print:border-slate-900 print:shadow-none">
                <span className="text-base font-black tracking-[0.1em] text-black sm:text-xl sm:tracking-[0.16em]">VARVACOA</span>
              </div>
            </div>
            <div className="hidden border-l border-white/20 pl-6 md:block print:block print:border-slate-300">
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-amber-300 print:text-slate-700">Cotización técnica</p>
              <h1 className="mt-1 text-2xl font-extrabold text-white print:text-slate-950 sm:text-3xl">Cotizador Varvacoa</h1>
            </div>
          </div>
          <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto print:hidden">
            <Link href="/" className="flex items-center justify-center rounded-xl border border-white/30 px-3 py-2 text-center text-sm font-semibold hover:bg-white/10 sm:px-4">Volver al sitio</Link>
            <form action="/api/auth/logout" method="post">
              <button className="h-full w-full rounded-xl bg-white px-3 py-2 text-sm font-semibold text-navy-800 hover:bg-blue-50 sm:px-4">Cerrar sesión</button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-5 px-3 py-5 sm:gap-6 sm:px-5 sm:py-8 lg:grid-cols-[minmax(0,1fr)_380px] print:block print:px-0">
        <div className="space-y-6 print:hidden">
          <section className="rounded-md border border-slate-300 bg-white">
            <div className="flex flex-col items-stretch justify-between gap-4 p-4 sm:flex-row sm:items-center sm:p-5">
              <div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-800 text-sm font-bold text-white">1</span><div><p className="text-xs font-extrabold uppercase tracking-wider text-slate-600">Usuario conectado</p><h2 className="mt-0.5 text-xl font-extrabold text-slate-950">{currentUser}</h2></div></div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-extrabold text-emerald-800">Sesión activa</span>
                {historyAllowed && <button type="button" onClick={toggleAccessHistory} aria-expanded={historyOpen} className="rounded-lg border-2 border-navy-800 bg-white px-3 py-1.5 text-xs font-extrabold text-navy-900 transition-colors hover:bg-navy-50">
                  {historyOpen ? "Ocultar accesos" : "Historial de accesos"}
                </button>}
                {quoteHistoryAllowed && <button type="button" onClick={toggleQuoteHistory} aria-expanded={quoteHistoryOpen} className="rounded-lg border-2 border-amber-500 bg-amber-50 px-3 py-1.5 text-xs font-extrabold text-amber-950 transition-colors hover:bg-amber-100">
                  {quoteHistoryOpen ? "Ocultar cotizaciones" : "Historial de cotizaciones"}
                </button>}
              </div>
            </div>

            {accessControlAllowed && <div className={`border-t-2 px-4 py-4 sm:px-5 ${exclusiveAccess ? "border-red-300 bg-red-50" : "border-slate-300 bg-slate-50"}`}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <span className={`mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full ${exclusiveAccess === null ? "bg-slate-400" : exclusiveAccess ? "bg-red-600 shadow-[0_0_0_4px_rgba(220,38,38,0.12)]" : "bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.12)]"}`} aria-hidden="true" />
                  <div>
                    <p className={`text-sm font-extrabold ${exclusiveAccess ? "text-red-950" : "text-slate-950"}`}>{exclusiveAccess === null ? "Estado de acceso" : exclusiveAccess ? "Acceso exclusivo activo" : "Acceso compartido activo"}</p>
                    <p className={`mt-1 text-xs font-semibold leading-5 ${exclusiveAccess ? "text-red-800" : "text-slate-600"}`}>{exclusiveAccess === null ? "Consulta el estado antes de realizar cambios." : exclusiveAccess ? "Los demás usuarios fueron desconectados y no pueden volver a ingresar." : "Los usuarios autorizados pueden ingresar normalmente al cotizador."}</p>
                  </div>
                </div>
                <button type="button" onClick={() => void (exclusiveAccess === null ? loadExclusiveAccess() : toggleExclusiveAccess())} disabled={accessControlLoading} className={`min-h-10 shrink-0 rounded-lg border-2 px-4 text-xs font-extrabold transition-colors disabled:cursor-wait disabled:opacity-60 ${exclusiveAccess ? "border-emerald-700 bg-emerald-700 text-white hover:bg-emerald-800" : exclusiveAccess === false ? "border-red-700 bg-white text-red-800 hover:bg-red-700 hover:text-white" : "border-slate-500 bg-white text-slate-800 hover:bg-slate-100"}`}>
                  {accessControlLoading ? "Procesando…" : exclusiveAccess === null ? "Consultar estado" : exclusiveAccess ? "Permitir acceso nuevamente" : "Bloquear a los demás usuarios"}
                </button>
              </div>
              {accessControlError && <p role="alert" className="mt-3 rounded-lg border border-red-300 bg-white px-3 py-2 text-sm font-bold text-red-800">{accessControlError}</p>}
            </div>}

            {historyAllowed && historyOpen && <div className="border-t-2 border-slate-300 bg-slate-50 p-4 sm:p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-navy-700">Control de acceso</p>
                  <h3 className="mt-1 text-lg font-extrabold text-slate-950">Historial de usuarios</h3>
                  <p className="mt-1 text-sm font-medium text-slate-600">Registra los ingresos realizados desde la activación de esta función.</p>
                </div>
                <button type="button" onClick={() => void loadAccessHistory()} disabled={historyLoading} className="self-start rounded-lg border border-slate-400 bg-white px-3 py-2 text-xs font-extrabold text-slate-800 hover:bg-slate-100 disabled:cursor-wait disabled:opacity-60">
                  {historyLoading ? "Actualizando…" : "Actualizar"}
                </button>
              </div>

              {historyError && <p role="alert" className="mt-4 rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm font-bold text-red-800">{historyError}</p>}
              {historyLoading && !accessHistory && <p className="mt-4 text-sm font-semibold text-slate-600">Cargando accesos…</p>}
              {!historyLoading && accessHistory?.summaries.length === 0 && <p className="mt-4 rounded-lg border border-dashed border-slate-400 bg-white px-4 py-5 text-center text-sm font-semibold text-slate-600">Todavía no hay ingresos registrados. El próximo inicio de sesión aparecerá aquí.</p>}

              {(accessHistory?.summaries.length ?? 0) > 0 && <>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {accessHistory?.summaries.map((summary) => <article key={summary.username} className="relative overflow-hidden rounded-lg border border-slate-300 bg-white p-4 shadow-sm">
                    <span className={`absolute inset-y-0 left-0 w-1 ${summary.active ? "bg-emerald-500" : "bg-navy-700"}`} aria-hidden="true" />
                    <div className="flex items-start justify-between gap-3 pl-1">
                      <div><p className="text-base font-extrabold text-slate-950">{summary.username}</p><p className="mt-1 text-xs font-semibold text-slate-600">Último ingreso: {formatAccessDate(summary.lastLoginAt)}</p></div>
                      <span className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide ${summary.active ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-700"}`}>{summary.active ? "Activo" : "Sin sesión"}</span>
                    </div>
                    <p className="mt-3 pl-1 text-xs font-bold text-navy-800">{summary.loginCount} {summary.loginCount === 1 ? "inicio registrado" : "inicios registrados"}</p>
                  </article>)}
                </div>

                <div className="mt-4 overflow-hidden rounded-lg border border-slate-300 bg-white">
                  <div className="border-b border-slate-300 bg-navy-950 px-4 py-2.5 text-xs font-extrabold uppercase tracking-[0.14em] text-white">Últimos ingresos</div>
                  <div className="max-h-64 divide-y divide-slate-200 overflow-y-auto">
                    {accessHistory?.entries.map((entry) => <div key={entry.id} className="grid gap-1 px-4 py-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                      <span className="text-sm font-extrabold text-slate-950">{entry.username}</span>
                      <time dateTime={entry.loggedInAt} className="font-mono text-xs font-semibold text-slate-600">{formatAccessDate(entry.loggedInAt)}</time>
                    </div>)}
                  </div>
                </div>
              </>}
            </div>}

            {quoteHistoryAllowed && quoteHistoryOpen && <div className="border-t-2 border-amber-300 bg-amber-50/60 p-4 sm:p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-amber-800">Uso exclusivo de Nicolás</p>
                  <h3 className="mt-1 text-lg font-extrabold text-slate-950">Historial de cotizaciones</h3>
                  <p className="mt-1 text-sm font-medium text-slate-600">Incluye el folio, usuario, productos, total y estado del correo de cada cotización.</p>
                </div>
                <button type="button" onClick={() => void loadQuoteHistory()} disabled={quoteHistoryLoading} className="self-start rounded-lg border border-amber-500 bg-white px-3 py-2 text-xs font-extrabold text-amber-950 hover:bg-amber-100 disabled:cursor-wait disabled:opacity-60">
                  {quoteHistoryLoading ? "Actualizando…" : "Actualizar"}
                </button>
              </div>

              {quoteHistoryError && <p role="alert" className="mt-4 rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm font-bold text-red-800">{quoteHistoryError}</p>}
              {quoteHistoryLoading && !quoteHistory && <p className="mt-4 text-sm font-semibold text-slate-600">Cargando cotizaciones…</p>}
              {!quoteHistoryLoading && quoteHistory?.length === 0 && <p className="mt-4 rounded-lg border border-dashed border-amber-400 bg-white px-4 py-5 text-center text-sm font-semibold text-slate-600">Todavía no hay cotizaciones registradas. La próxima cotización generada aparecerá aquí.</p>}

              {(quoteHistory?.length ?? 0) > 0 && <div className="mt-4 space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border border-amber-300 bg-white p-4"><p className="text-xs font-extrabold uppercase tracking-wider text-amber-800">Cotizaciones registradas</p><p className="mt-1 text-2xl font-black text-slate-950">{quoteHistory?.length}</p></div>
                  <div className="rounded-lg border border-amber-300 bg-white p-4"><p className="text-xs font-extrabold uppercase tracking-wider text-amber-800">Monto total cotizado</p><p className="mt-1 text-2xl font-black text-slate-950">{money(quoteHistory?.reduce((sum, quote) => sum + quote.total, 0) ?? 0)}</p></div>
                </div>

                {quoteHistory?.map((quote) => <details key={quote.id} className="group overflow-hidden rounded-lg border border-slate-300 bg-white shadow-sm">
                  <summary className="cursor-pointer list-none p-4 marker:hidden">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2"><strong className="text-base text-slate-950">Cotización N.º {String(quote.number).padStart(6, "0")}</strong><span className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide ${quote.emailSent ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}`}>{quote.emailSent ? "Correo enviado" : "Correo pendiente"}</span></div>
                        <p className="mt-1 text-xs font-semibold text-slate-600">{quote.username} · {formatAccessDate(quote.createdAt)} · {quote.items.length} {quote.items.length === 1 ? "producto" : "productos"}</p>
                      </div>
                      <div className="flex items-center justify-between gap-4 sm:block sm:text-right"><span className="text-xs font-bold text-slate-500 sm:block">Total</span><strong className="text-lg text-navy-900">{money(quote.total)}</strong></div>
                    </div>
                  </summary>
                  <div className="border-t border-slate-300 bg-slate-50 p-4">
                    <div className="overflow-hidden rounded-lg border border-slate-300 bg-white">
                      <div className="divide-y divide-slate-200">
                        {quote.items.map((line, index) => <div key={`${quote.id}-${index}`} className="grid gap-2 px-4 py-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
                          <div><p className="text-[10px] font-extrabold uppercase tracking-wider text-navy-700">{line.category}</p><p className="mt-1 text-sm font-extrabold text-slate-950">{line.name}</p><p className="mt-1 text-xs font-medium text-slate-600">{[line.detail, line.modeText, `Cant. ${line.quantity}`].filter(Boolean).join(" · ")}</p></div>
                          <strong className="text-sm text-slate-950">{money(line.total)}</strong>
                        </div>)}
                      </div>
                    </div>
                    <div className="mt-3 ml-auto max-w-xs space-y-1.5 text-sm"><div className="flex justify-between gap-5"><span className="font-semibold text-slate-600">Subtotal</span><strong>{money(quote.subtotal)}</strong></div><div className="flex justify-between gap-5"><span className="font-semibold text-slate-600">IVA 19%</span><strong>{money(quote.iva)}</strong></div><div className="flex justify-between gap-5 border-t border-slate-400 pt-2 text-base"><span className="font-extrabold">Total</span><strong>{money(quote.total)}</strong></div></div>
                    <p className="mt-3 text-xs font-semibold text-slate-600">Copia: {quote.emailedTo}</p>
                  </div>
                </details>)}
              </div>}
            </div>}
          </section>

          <section className="overflow-hidden rounded-md border border-slate-300 bg-white">
            <div className="border-b-2 border-slate-300 p-5"><div className="mb-4 flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-800 text-sm font-bold text-white">2</span><div><h2 className="text-lg font-extrabold text-slate-950">Agregar productos</h2><p className="text-sm font-medium text-slate-700">Los valores se mostrarán al generar el número de cotización. Presiona una referencia para ver cómo tomar las medidas.</p></div></div>
              <div className="flex gap-2 overflow-x-auto">
                {([['parrillas','Parrillas'],['campanas','Campanas'],['guillotinas','Mueble guillotina'],['unitarios','Unitarios'],['personalizado','Personalizado']] as const).map(([id, label]) => <button key={id} onClick={() => setSection(id)} className={`whitespace-nowrap rounded-xl border-2 px-4 py-2.5 text-sm font-extrabold ${section === id ? 'border-navy-950 bg-navy-950 text-white shadow-md' : 'border-slate-400 bg-white text-slate-900 hover:border-navy-700 hover:bg-slate-100'}`}>{label}</button>)}
              </div>
            </div>

            <div>
              {(section === "parrillas" ? parrillas : section === "campanas" ? campanas : section === "guillotinas" ? guillotinas : []).map((product) => {
                const group = section as MeasureGroup;
                const primaryRow = group === "parrillas" ? parrillaRows[product.id] : group === "campanas" ? campanaRows[product.id] : guillotinaRows[product.id];
                const rows = [primaryRow, ...(measureVariants[`${group}:${product.id}`] || [])];
                return <div key={product.id} className="border-t-4 border-slate-300 bg-white first:border-t-0">
                  {rows.map((row, variantIndex) => {
                    const unitPrice = product.calculate(row, row.mode) + paintPrice(product, row);
                    return <div key={variantIndex} className={`p-3 transition-colors sm:p-4 ${row.selected ? 'border-l-4 border-amber-500 bg-amber-50' : 'bg-white'} ${variantIndex > 0 ? 'border-t-2 border-slate-300' : ''}`}>
                      <div className={`grid items-start gap-2 sm:gap-3 ${variantIndex === 0 ? 'grid-cols-[auto_minmax(0,1fr)_5rem]' : 'grid-cols-[auto_minmax(0,1fr)]'}`}>
                        <input type="checkbox" className="mt-1 h-5 w-5 shrink-0 accent-blue-700" checked={row.selected} onChange={(e) => updateMeasureVariant(group, product.id, variantIndex, { selected: e.target.checked })} />
                        <div className={`min-w-0 ${variantIndex === 0 ? 'col-span-2' : ''}`}>
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <div>
                              <div className="flex flex-wrap items-center gap-2"><h3 className="font-bold">{product.name}</h3>{variantIndex > 0 && <span className="rounded-full bg-navy-100 px-2 py-0.5 text-[10px] font-extrabold uppercase text-navy-800">Medida {variantIndex + 1}</span>}</div>
                              {product.note && <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">{product.note}</p>}
                            </div>
                            <div className="flex items-center gap-3">
                              <strong className="text-navy-700">{row.selected ? pricesVisible ? money(unitPrice * row.quantity) : "Valor oculto" : '—'}</strong>
                              {variantIndex > 0 && <button type="button" onClick={() => removeMeasureVariant(group, product.id, variantIndex)} className="rounded-lg border border-red-300 bg-white px-2 py-1 text-xs font-bold text-red-700 hover:bg-red-50">Quitar</button>}
                            </div>
                          </div>
                        </div>
                        <div className={`mt-1 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-5 ${variantIndex === 0 ? 'col-start-1 col-end-3 row-start-2' : 'col-span-2'}`}>
                          {product.fields.map((field) => {
                            const fixed = product.fixedMeasures?.[field] !== undefined;
                            return <label key={field} className="text-xs font-extrabold text-slate-800">{fieldNames[field]} (mm){fixed && <span className="ml-1 text-red-700">· Medida fija</span>}<input type="number" min="0" disabled={fixed} className={`mt-1 w-full rounded-lg border-2 px-3 py-2 font-semibold outline-none ${fixed ? 'cursor-not-allowed border-red-300 bg-red-50 text-red-900' : 'border-slate-400 bg-white text-slate-950 focus:border-navy-700 focus:ring-2 focus:ring-blue-200'}`} value={row[field] || ''} onChange={(e) => updateMeasureVariant(group, product.id, variantIndex, { [field]: Number(e.target.value) })} /></label>;
                          })}
                          <label className="text-xs font-extrabold text-slate-800">Cantidad<input type="number" min="1" className="mt-1 w-full rounded-lg border-2 border-slate-400 px-3 py-2 font-semibold text-slate-950" value={row.quantity} onChange={(e) => updateMeasureVariant(group, product.id, variantIndex, { quantity: Math.max(1, Number(e.target.value)) })} /></label>
                          {product.paintArea && <label className="text-xs font-extrabold text-slate-800">Pintura<select className="mt-1 w-full rounded-lg border-2 border-amber-400 bg-amber-50 px-3 py-2 font-semibold text-slate-950 outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-200" value={row.paint} onChange={(e) => updateMeasureVariant(group, product.id, variantIndex, { paint: e.target.value as PaintMode })}><option value="sin">Sin pintura</option><option value="poliuretano">Poliuretano</option><option value="electrostatica">Electrostática</option></select>{row.paint !== "sin" && <span className="mt-2 block rounded-md border border-amber-300 bg-amber-100 px-2 py-1.5 text-sm font-extrabold leading-tight text-amber-900">{pricesVisible ? `Valor: ${money(paintPrice(product, row))}` : "Valor oculto hasta generar la cotización"}</span>}</label>}
                          {(product.modes?.length ?? 2) > 1 && <label className="text-xs font-extrabold text-slate-800">Modalidad<select className="mt-1 w-full rounded-lg border-2 border-slate-400 bg-white px-3 py-2 font-semibold text-slate-950" value={row.mode} onChange={(e) => updateMeasureVariant(group, product.id, variantIndex, { mode: e.target.value as Mode })}>{(product.modes ?? (["con", "sin"] as Mode[])).map((mode) => <option key={mode} value={mode}>{mode === "con" ? "Con material" : "Sin material"}</option>)}</select></label>}
                        </div>
                        {variantIndex === 0 && <div className="col-start-3 row-start-2 self-start justify-self-end xl:self-end"><ProductReference productId={product.id} productName={product.name} fields={product.fields} fixedMeasures={product.fixedMeasures} /></div>}
                      </div>
                    </div>;
                  })}
                  {product.fields.length > 0 && <div className="border-t border-slate-200 px-4 py-3 sm:px-5"><button type="button" onClick={() => addMeasureVariant(group, product)} className="w-full rounded-lg border-2 border-dashed border-navy-400 px-3 py-2 text-xs font-extrabold text-navy-800 hover:border-navy-700 hover:bg-navy-50 sm:w-auto">+ Agregar otra medida</button></div>}
                </div>;
              })}

              {section === "unitarios" && <div className="bg-slate-200">
                <div className="border-b border-slate-300 bg-blue-50 px-4 py-4 sm:px-5">
                  <p className="text-sm font-extrabold text-navy-950">Productos por set</p>
                  <p className="mt-1 text-xs font-semibold leading-5 text-slate-700">Elige la cantidad de sets completos. Los valores unitarios y totales aparecerán al generar el número de cotización.</p>
                </div>
                {unitProducts.map((product) => {
                  const row = unitRows[product.id];
                  return <div key={product.id} className={`border-t-4 border-slate-300 p-4 transition-colors first:border-t-0 sm:p-5 ${row.selected ? 'border-l-4 border-amber-500 bg-amber-50' : 'bg-white'}`}>
                    <div className="grid gap-4 sm:grid-cols-[auto_minmax(0,1fr)]">
                      <input type="checkbox" className="mt-1 h-5 w-5 accent-blue-700" checked={row.selected} onChange={(event) => updateUnitRow(product.id, { selected: event.target.checked })} />
                      <div className="min-w-0">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <h3 className="font-extrabold text-slate-950">{product.name}</h3>
                            <span className="mt-2 inline-flex rounded-md border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-extrabold text-navy-800">1 set = {product.packSize} unidades</span>
                          </div>
                          <div className="sm:text-right">
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Total</p>
                            <strong className="mt-1 block text-lg text-navy-800">{row.selected ? pricesVisible ? money(product.unitPrice * product.packSize * row.sets) : "Valor oculto" : '—'}</strong>
                          </div>
                        </div>
                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                          <label className="text-xs font-extrabold text-slate-800">Cantidad de sets<input type="number" min="1" step="1" className="mt-1 w-full rounded-lg border-2 border-slate-400 bg-white px-3 py-2 font-semibold text-slate-950 outline-none focus:border-navy-700 focus:ring-2 focus:ring-blue-200" value={row.sets} onChange={(event) => updateUnitRow(product.id, { sets: Math.max(1, Math.floor(Number(event.target.value)) || 1) })} /><span className="mt-1.5 block text-xs font-bold text-navy-700">{row.sets} {row.sets === 1 ? 'set' : 'sets'} = {row.sets * product.packSize} unidades</span></label>
                          <div className="rounded-lg border-2 border-amber-300 bg-amber-50 px-3 py-2">
                            <p className="text-xs font-extrabold text-amber-900">Valor unitario</p>
                            <p className="mt-1 text-base font-extrabold text-amber-950">{pricesVisible ? money(product.unitPrice) : "Disponible al generar cotización"}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>;
                })}
              </div>}

              {section === "personalizado" && <div className="bg-slate-200">
                {customRows.map((row, index) => <div key={row.id} className="border-t-8 border-slate-300 bg-white p-4 sm:p-5">
                  <div className="flex items-center justify-between gap-3"><h4 className="font-extrabold text-slate-950">Pedido personalizado {index + 1}</h4>{customRows.length > 1 && <button type="button" onClick={() => setCustomRows((current) => current.filter((item) => item.id !== row.id))} className="rounded-lg border border-red-300 px-2 py-1 text-xs font-bold text-red-700 hover:bg-red-50">Quitar</button>}</div>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <label className="text-xs font-extrabold text-slate-800 sm:col-span-2">Descripción<textarea rows={5} className="mt-1 w-full resize-y rounded-xl border-2 border-slate-400 bg-white px-3 py-2 text-sm font-medium text-slate-950 outline-none focus:border-navy-700 focus:ring-2 focus:ring-blue-200" placeholder="Escribe aquí el pedido completo, sus medidas, materiales y detalles…" value={row.description} onChange={(event) => updateCustomRow(row.id, { description: event.target.value })} /></label>
                    <label className="text-xs font-extrabold text-slate-800">Precio<input type="number" min="0" className="mt-1 w-full rounded-xl border-2 border-slate-400 bg-white px-3 py-2 font-semibold text-slate-950 outline-none focus:border-navy-700" placeholder="0" value={row.price || ""} onChange={(event) => updateCustomRow(row.id, { price: Math.max(0, Number(event.target.value)) })} /></label>
                    <label className="text-xs font-extrabold text-slate-800">Cantidad<input type="number" min="1" className="mt-1 w-full rounded-xl border-2 border-slate-400 bg-white px-3 py-2 font-semibold text-slate-950 outline-none focus:border-navy-700" value={row.quantity} onChange={(event) => updateCustomRow(row.id, { quantity: Math.max(1, Number(event.target.value)) })} /></label>
                  </div>
                  {row.price > 0 && <div className="mt-4 flex justify-between rounded-xl bg-navy-50 px-4 py-3 text-sm"><span className="font-bold text-slate-700">Total</span><strong className="text-navy-950">{pricesVisible ? money(row.price * row.quantity) : "Valor oculto"}</strong></div>}
                </div>)}
                <div className="border-t border-slate-300 bg-white p-4 sm:p-5"><button type="button" onClick={addCustomRow} className="w-full rounded-xl border-2 border-dashed border-navy-400 px-4 py-3 text-sm font-extrabold text-navy-800 hover:border-navy-700 hover:bg-navy-50 sm:w-auto">+ Agregar otro trabajo personalizado</button></div>
              </div>}
            </div>
          </section>
        </div>

        <aside className="lg:sticky lg:top-6 lg:self-start print:static">
          <section className="overflow-hidden rounded-md border border-slate-300 bg-white text-slate-950 print:rounded-none">
            <div className="border-b-2 border-slate-300 p-5 print:px-0"><p className="text-xs font-extrabold uppercase tracking-[0.2em] text-navy-700">Resumen</p><div className="mt-1 flex items-center justify-between gap-3"><h2 className="text-xl font-extrabold text-slate-950">Cotización</h2><strong className="rounded-lg border-2 border-navy-800 bg-navy-50 px-3 py-1.5 text-sm text-navy-950">N.º {quoteNumber === null ? "Pendiente" : String(quoteNumber).padStart(6, "0")}</strong></div><p className="mt-3 text-sm font-bold text-slate-700">Usuario: {currentUser}</p></div>
            <div className="max-h-[52vh] divide-y divide-slate-300 overflow-y-auto print:max-h-none">
              {quoteLines.length === 0 ? <p className="p-6 text-center text-sm font-semibold text-slate-600">Selecciona productos para comenzar.</p> : quoteLines.map((line) => <div key={`${line.category}-${line.id}`} className="p-4"><div className="flex justify-between gap-3"><div><p className="text-[10px] font-extrabold uppercase tracking-wider text-navy-700">{line.category}</p><p className="mt-1 text-sm font-extrabold text-slate-950">{line.name}</p><p className="mt-1 text-xs font-medium text-slate-700">{line.detail}{line.detail && ' · '}{line.modeText} · Cant. {line.quantity}</p></div><strong className="whitespace-nowrap text-sm text-slate-950">{pricesVisible ? money(line.total) : "Valor oculto"}</strong></div></div>)}
            </div>
            <div className="border-t-2 border-slate-300 bg-slate-50 p-5 print:bg-white print:px-0">
              {pricesVisible ? <div className="space-y-2 text-sm"><div className="flex justify-between"><span className="font-semibold text-slate-700">Subtotal neto</span><strong className="text-slate-950">{money(subtotal)}</strong></div><div className="flex justify-between"><span className="font-semibold text-slate-700">IVA 19%</span><strong className="text-slate-950">{money(iva)}</strong></div><div className="mt-3 flex justify-between border-t-2 border-slate-400 pt-3 text-lg"><span className="font-extrabold text-slate-950">Total</span><strong className="text-slate-950">{money(subtotal + iva)}</strong></div></div> : <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-bold leading-5 text-navy-900">Los valores se mostrarán después de generar el número de cotización.</div>}
              <div className="mt-5 grid gap-2 print:hidden"><button onClick={() => void printQuote()} disabled={preparingPdf} className="rounded-xl bg-navy-900 px-4 py-3 text-sm font-bold text-white hover:bg-navy-800 disabled:cursor-wait disabled:opacity-60">{preparingPdf ? "Generando folio…" : quoteNumber === null ? "Generar folio e imprimir PDF" : "Imprimir / Guardar PDF"}</button><button onClick={reset} className="rounded-xl border-2 border-slate-400 bg-white px-4 py-3 text-sm font-bold text-slate-800 hover:bg-slate-100">Limpiar cotización</button></div>
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}
