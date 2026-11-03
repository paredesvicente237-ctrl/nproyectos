"use client";

import { DefaultChatTransport, type UIMessage } from "ai";
import { useChat } from "@ai-sdk/react";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Check,
  ChevronDown,
  FileCheck2,
  LockKeyhole,
  MessageCircle,
  Minus,
  Phone,
  Send,
  ShieldCheck,
  Square,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { salesContact } from "@/components/siteData";
import { trackGaEvent } from "@/lib/analytics";

type PublicSalesAssistantProps = {
  initialService?: string;
};

type LeadForm = {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  projectSummary: string;
  material: string;
  dimensions: string;
  quantity: string;
  deadline: string;
  location: string;
};

const WELCOME_MESSAGE: UIMessage = {
  id: "nproyectos-welcome",
  role: "assistant",
  parts: [{
    type: "text",
    text: "Hola, soy el asesor comercial de N Proyectos. Cuéntame qué necesitas fabricar o resolver y te ayudo a ordenar los antecedentes para una cotización.",
  }],
};

const CHAT_SESSION_STORAGE_KEY = "nproyectos-ai-chat-session-v1";
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const EMPTY_LEAD: LeadForm = {
  name: "",
  company: "",
  email: "",
  phone: "",
  service: "",
  projectSummary: "",
  material: "",
  dimensions: "",
  quantity: "",
  deadline: "",
  location: "",
};

function createWhatsAppQuoteMessage(lead: LeadForm, pagePath: string) {
  const details = [
    "Hola, Américo. Quiero solicitar una cotización con N Proyectos.",
    "",
    `Nombre: ${lead.name.trim().slice(0, 100)}`,
    lead.company.trim() ? `Empresa: ${lead.company.trim().slice(0, 100)}` : "",
    lead.email.trim() ? `Correo: ${lead.email.trim().slice(0, 180)}` : "",
    lead.phone.trim() ? `Teléfono: ${lead.phone.trim().slice(0, 30)}` : "",
    lead.service.trim() ? `Servicio o producto: ${lead.service.trim().slice(0, 120)}` : "",
    `Resumen: ${lead.projectSummary.trim().slice(0, 1_200)}`,
    lead.material.trim() ? `Material: ${lead.material.trim().slice(0, 120)}` : "",
    lead.dimensions.trim() ? `Medidas: ${lead.dimensions.trim().slice(0, 120)}` : "",
    lead.quantity.trim() ? `Cantidad: ${lead.quantity.trim().slice(0, 80)}` : "",
    lead.deadline.trim() ? `Plazo deseado: ${lead.deadline.trim().slice(0, 80)}` : "",
    lead.location.trim() ? `Ubicación: ${lead.location.trim().slice(0, 80)}` : "",
    `Página de origen: ${pagePath.slice(0, 160)}`,
  ];

  return details.filter(Boolean).join("\n");
}

const serviceOptions = [
  "Fabricación metalmecánica",
  "Corte y plegado de planchas",
  "Soldadura MIG/TIG",
  "Estructuras y soportes metálicos",
  "Control acústico industrial",
  "Producto del catálogo",
  "No estoy seguro",
  "Otro requerimiento industrial",
];

function messageText(message: UIMessage) {
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("\n")
    .trim();
}

function normalizeText(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function serviceTypeForText(value: string) {
  const text = normalizeText(value);
  if (/corte|plegad|guillotina|laser/.test(text)) return "corte_plegado";
  if (/soldadur\w*|\bmig\b|\btig\b/.test(text)) return "soldadura";
  if (/acustic|ruido|silenciador|splitter|celosia|aislanpanel|fonoab|perforado/.test(text)) return "control_acustico";
  if (/fabric|metalmecan|estructura|soporte|pieza/.test(text)) return "fabricacion_metalmecanica";
  if (/producto|pantalla movil|espuma/.test(text)) return "productos";
  return "";
}

function serviceTypeForPath(pathname: string, initialService: string) {
  const service = serviceTypeForText(initialService);
  if (service) return service;
  if (pathname.startsWith("/productos")) return "productos";
  if (pathname.startsWith("/servicios/")) return serviceTypeForText(pathname.split("/").at(-1) ?? "") || "general";
  if (pathname === "/maestranza-santiago") return "fabricacion_metalmecanica";
  return "general";
}

function hasQuoteIntent(value: string) {
  const text = normalizeText(value);
  if (/\b(no quiero|no necesito|no voy a)\b.{0,24}\b(cotizar|cotizacion|presupuesto)\b/.test(text)) return false;
  return /cotiz|presupuest|precio|valor|comprar/.test(text);
}

export default function PublicSalesAssistant({ initialService = "" }: PublicSalesAssistantProps) {
  const pathname = usePathname();
  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/assistant/chat" }),
    [],
  );
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
  const [aiNoticeAccepted, setAiNoticeAccepted] = useState(false);
  const [lead, setLead] = useState<LeadForm>(EMPTY_LEAD);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [whatsAppMessage, setWhatsAppMessage] = useState("");
  const [leadError, setLeadError] = useState("");
  const [isProactiveHintVisible, setIsProactiveHintVisible] = useState(false);
  const chatSessionIdRef = useRef("");
  const userStartedRef = useRef(false);
  const quoteIntentTrackedRef = useRef(false);
  const requestPreparedRef = useRef(false);
  const trackedServicesRef = useRef(new Set<string>());
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);
  const isOpenRef = useRef(isOpen);
  isOpenRef.current = isOpen;
  const { messages, sendMessage, status, setMessages, clearError, stop } = useChat({
    transport,
    messages: [WELCOME_MESSAGE],
  });
  const serviceType = serviceTypeForPath(pathname, initialService);
  const hasConversation = messages.some((message) => message.role === "user");

  const getChatSessionId = () => {
    if (chatSessionIdRef.current) return chatSessionIdRef.current;

    try {
      const storedSessionId = sessionStorage.getItem(CHAT_SESSION_STORAGE_KEY);
      if (storedSessionId && UUID_PATTERN.test(storedSessionId)) {
        chatSessionIdRef.current = storedSessionId;
        return storedSessionId;
      }
    } catch {
      // Keep the random session identifier in memory when storage is unavailable.
    }

    const sessionId = globalThis.crypto.randomUUID();
    chatSessionIdRef.current = sessionId;
    try {
      sessionStorage.setItem(CHAT_SESSION_STORAGE_KEY, sessionId);
    } catch {
      // The chat still works; the session quota falls back to this page instance.
    }
    return sessionId;
  };

  const proactiveCopy = initialService
    ? `¿Estás revisando ${initialService.toLowerCase()}? Puedo ayudarte a preparar la solicitud.`
    : pathname.startsWith("/productos")
      ? "¿Buscas un producto industrial o acústico? Te ayudo a orientarte."
      : "¿Tienes un proyecto industrial? Te ayudo a ordenar la cotización.";

  useEffect(() => {
    try {
      if (sessionStorage.getItem("nproyectos-ai-assistant-hint-shown")) return;
    } catch {
      // The hint remains available even if session storage is blocked.
    }

    const timer = window.setTimeout(() => {
      if (isOpenRef.current) {
        try {
          sessionStorage.setItem("nproyectos-ai-assistant-hint-shown", "1");
        } catch {
          // No visitor or conversation data is stored in session storage.
        }
        return;
      }
      setIsProactiveHintVisible(true);
    }, 12_000);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen && !isLeadFormOpen && !whatsAppMessage && aiNoticeAccepted) inputRef.current?.focus();
  }, [isOpen, isLeadFormOpen, whatsAppMessage, aiNoticeAccepted]);

  useEffect(() => {
    if (wasOpenRef.current && !isOpen) launcherRef.current?.focus();
    wasOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, status, isLeadFormOpen]);

  useEffect(() => {
    if (messages.length <= 24 || status !== "ready") return;
    setMessages((current) => [WELCOME_MESSAGE, ...current.slice(-22)]);
  }, [messages, setMessages, status]);

  const trackVisitorMessage = (text: string) => {
    if (!userStartedRef.current) {
      userStartedRef.current = true;
      trackGaEvent("assistant_conversation_started", { service_type: serviceType });
    }

    const detectedService = serviceTypeForText(text);
    if (detectedService && !trackedServicesRef.current.has(detectedService)) {
      trackedServicesRef.current.add(detectedService);
      trackGaEvent("assistant_service_interest", { service_type: detectedService });
    }

    if (!quoteIntentTrackedRef.current && hasQuoteIntent(text)) {
      quoteIntentTrackedRef.current = true;
      trackGaEvent("assistant_quote_intent", {
        service_type: detectedService || serviceType,
      });
    }
  };

  const submitChatMessage = (text: string) => {
    const message = text.trim();
    if (!message || status === "submitted" || status === "streaming" || !aiNoticeAccepted) return;
    trackVisitorMessage(message);
    setInput("");
    if (status === "error") clearError();
    void sendMessage({ text: message }, {
      body: { pagePath: pathname, website, sessionId: getChatSessionId() },
    });
  };

  const openLeadForm = () => {
    const visitorSummary = messages
      .filter((message) => message.role === "user")
      .map(messageText)
      .filter(Boolean)
      .join("\n\n")
      .slice(0, 4_500);

    setLead({
      ...EMPTY_LEAD,
      service: initialService,
      projectSummary: visitorSummary,
    });
    setPrivacyConsent(false);
    setLeadError("");
    setWhatsAppMessage("");
    requestPreparedRef.current = false;
    setIsLeadFormOpen(true);
    if (initialService) {
      const detectedService = serviceTypeForText(initialService);
      if (detectedService) trackGaEvent("assistant_service_interest", { service_type: detectedService });
    }
    if (!quoteIntentTrackedRef.current) {
      quoteIntentTrackedRef.current = true;
      trackGaEvent("assistant_quote_intent", { service_type: serviceType });
    }
  };

  const clearConversation = () => {
    if (hasConversation && !requestPreparedRef.current) {
      trackGaEvent("assistant_conversation_closed_without_lead", { service_type: serviceType });
    }
    setMessages([WELCOME_MESSAGE]);
    setInput("");
    setLead(EMPTY_LEAD);
    setLeadError("");
    setWhatsAppMessage("");
    setIsLeadFormOpen(false);
    userStartedRef.current = false;
    quoteIntentTrackedRef.current = false;
    requestPreparedRef.current = false;
    trackedServicesRef.current.clear();
  };

  const updateLead = (field: keyof LeadForm, value: string) => {
    setLead((current) => ({ ...current, [field]: value }));
    setPrivacyConsent(false);
    if (leadError) {
      setLeadError("");
    }
  };

  const submitLead = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLeadError("");

    if (!privacyConsent) {
      setLeadError("Confirma que autorizas continuar a WhatsApp con los datos de esta solicitud.");
      return;
    }

    requestPreparedRef.current = true;
    setWhatsAppMessage(createWhatsAppQuoteMessage(lead, pathname));
    setIsLeadFormOpen(false);
  };

  const returnToLeadForm = () => {
    setWhatsAppMessage("");
    setPrivacyConsent(false);
    setIsLeadFormOpen(true);
  };

  const handleChatSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitChatMessage(input);
  };

  const dismissProactiveHint = () => {
    setIsProactiveHintVisible(false);
    try {
      sessionStorage.setItem("nproyectos-ai-assistant-hint-shown", "1");
    } catch {
      // This preference is optional and does not affect the assistant.
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    setIsProactiveHintVisible(false);
    try {
      sessionStorage.setItem("nproyectos-ai-assistant-hint-shown", "1");
    } catch {
      // No visitor or conversation data is stored in session storage.
    }
  };

  const quickActions = pathname.startsWith("/productos")
    ? [
        "Quiero conocer qué producto me sirve",
        "Necesito una solución para controlar ruido",
        "Quiero cotizar un producto del catálogo",
      ]
    : initialService
      ? [
          `Quiero orientación sobre ${initialService.toLowerCase()}`,
          "¿Qué información necesitan para cotizar?",
          "Tengo una duda técnica sobre este servicio",
        ]
      : [
          "Necesito fabricar una pieza metálica",
          "Busco corte y plegado de planchas",
          "No sé qué servicio necesito",
        ];

  return (
    <>
      {isProactiveHintVisible && !isOpen && (
        <div className="fixed bottom-[7.25rem] right-4 z-[59] flex max-w-[18rem] items-start gap-3 border border-slate-200 bg-white px-4 py-3 text-sm leading-5 text-slate-700 shadow-lg sm:bottom-[7.75rem] sm:right-6">
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" aria-hidden="true" />
          <p>{proactiveCopy}</p>
          <button type="button" onClick={dismissProactiveHint} className="-mr-1 -mt-1 p-1 text-slate-500 hover:text-slate-900" aria-label="Cerrar sugerencia">
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}

      {isOpen && (
        <section
          id="nproyectos-sales-assistant"
          role="dialog"
          aria-modal="false"
          aria-labelledby="nproyectos-assistant-title"
          className="fixed bottom-[9.5rem] right-3 z-[60] flex h-[min(72dvh,42rem)] w-[calc(100vw-1.5rem)] max-w-[27rem] flex-col overflow-hidden border border-slate-300 bg-[#f5f5f2] text-[#17191b] shadow-[0_24px_70px_rgba(15,23,42,.28)] sm:bottom-[10rem] sm:right-6 sm:w-[27rem]"
        >
          <header className="flex shrink-0 items-center justify-between gap-4 bg-[#17191b] px-4 py-3.5 text-white sm:px-5">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/25 bg-white/10 text-blue-200">
                <Bot className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h2 id="nproyectos-assistant-title" className="truncate text-sm font-semibold">Asesor comercial</h2>
                <p className="mt-0.5 truncate text-xs text-white/60">N Proyectos · Santiago</p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              {hasConversation && !isLeadFormOpen && !whatsAppMessage && (
                <button type="button" onClick={clearConversation} className="flex h-9 w-9 items-center justify-center text-white/70 hover:bg-white/10 hover:text-white" aria-label="Terminar y borrar conversación" title="Terminar y borrar conversación">
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
              <button type="button" onClick={() => setIsOpen(false)} className="flex h-9 w-9 items-center justify-center text-white/70 hover:bg-white/10 hover:text-white" aria-label="Minimizar asesor">
                <Minus className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </header>

          {whatsAppMessage ? (
            <div className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto px-6 py-8 text-center">
              <span className="flex h-14 w-14 items-center justify-center border border-blue-200 bg-blue-50 text-blue-700">
                <Check className="h-7 w-7" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-slate-950">Solicitud preparada</h3>
              <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600">
                N Proyectos aún no ha recibido nada. WhatsApp se abrirá con el resumen; revísalo allí y pulsa <strong>Enviar</strong> para compartirlo con Américo.
              </p>
              <div className="mt-4 max-h-44 w-full max-w-sm overflow-y-auto border border-slate-200 bg-white p-3 text-left text-xs leading-5 text-slate-700">
                <p className="mb-1 font-semibold text-slate-900">Vista previa del mensaje</p>
                <p className="whitespace-pre-wrap">{whatsAppMessage}</p>
              </div>
              <a
                href={`https://wa.me/${salesContact.phoneInternational.replace(/\D/g, "")}?text=${encodeURIComponent(whatsAppMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackGaEvent("assistant_whatsapp_opened", { service_type: serviceTypeForText(lead.service) || serviceType })}
                className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 bg-[#128c7e] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0d756a]"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" /> Abrir WhatsApp con mi solicitud
              </a>
              <button type="button" onClick={returnToLeadForm} className="mt-3 min-h-9 text-sm font-semibold text-blue-800 underline underline-offset-4 hover:text-blue-950">
                Volver a revisar o editar
              </button>
              <button type="button" onClick={clearConversation} className="mt-2 min-h-9 text-xs text-slate-500 underline underline-offset-4 hover:text-slate-800">
                Terminar y borrar esta solicitud preparada
              </button>
            </div>
          ) : isLeadFormOpen ? (
            <form onSubmit={submitLead} className="flex min-h-0 flex-1 flex-col">
              <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-3 sm:px-5">
                <button type="button" onClick={() => setIsLeadFormOpen(false)} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-950">
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Volver al chat
                </button>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500"><ShieldCheck className="h-4 w-4 text-blue-700" aria-hidden="true" /> Revisión previa</span>
              </div>

              <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4 sm:px-5">
                <div>
                  <h3 className="text-lg font-semibold text-slate-950">Prepara tu solicitud</h3>
                  <p className="mt-1 text-sm leading-5 text-slate-600">Revisa el resumen y agrega los datos que ya conozcas. Puedes dejar vacía la información técnica que aún no tienes.</p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="assistant-name" className="mb-1 block text-xs font-semibold text-slate-700">Nombre *</label>
                    <input id="assistant-name" autoComplete="name" value={lead.name} onChange={(event) => updateLead("name", event.target.value)} maxLength={100} required className="min-h-10 w-full border border-slate-300 bg-white px-3 text-sm outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100" />
                  </div>
                  <div>
                    <label htmlFor="assistant-company" className="mb-1 block text-xs font-semibold text-slate-700">Empresa <span className="font-normal text-slate-500">(opcional)</span></label>
                    <input id="assistant-company" autoComplete="organization" value={lead.company} onChange={(event) => updateLead("company", event.target.value)} maxLength={120} className="min-h-10 w-full border border-slate-300 bg-white px-3 text-sm outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100" />
                  </div>
                  <div>
                    <label htmlFor="assistant-email" className="mb-1 block text-xs font-semibold text-slate-700">Correo</label>
                    <input id="assistant-email" type="email" autoComplete="email" value={lead.email} onChange={(event) => updateLead("email", event.target.value)} maxLength={254} className="min-h-10 w-full border border-slate-300 bg-white px-3 text-sm outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100" />
                  </div>
                  <div>
                    <label htmlFor="assistant-phone" className="mb-1 block text-xs font-semibold text-slate-700">Teléfono</label>
                    <input id="assistant-phone" type="tel" autoComplete="tel" value={lead.phone} onChange={(event) => updateLead("phone", event.target.value)} maxLength={30} className="min-h-10 w-full border border-slate-300 bg-white px-3 text-sm outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100" />
                  </div>
                </div>
                <p className="-mt-2 text-xs text-slate-500">Correo y teléfono son opcionales; también podrán responderte por WhatsApp.</p>

                <div>
                  <label htmlFor="assistant-service" className="mb-1 block text-xs font-semibold text-slate-700">Servicio o producto</label>
                  <select id="assistant-service" value={lead.service} onChange={(event) => updateLead("service", event.target.value)} className="min-h-10 w-full border border-slate-300 bg-white px-3 text-sm outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100">
                    <option value="">Por definir</option>
                    {serviceOptions.map((service) => <option key={service} value={service}>{service}</option>)}
                  </select>
                </div>

                <div>
                  <label htmlFor="assistant-summary" className="mb-1 block text-xs font-semibold text-slate-700">Resumen que recibirá ventas *</label>
                  <textarea id="assistant-summary" rows={4} value={lead.projectSummary} onChange={(event) => updateLead("projectSummary", event.target.value)} maxLength={4500} minLength={5} required className="w-full resize-y border border-slate-300 bg-white px-3 py-2.5 text-sm leading-5 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100" placeholder="Describe en una o dos frases qué necesitas resolver." />
                </div>

                <details className="border-t border-slate-200 pt-3">
                  <summary className="cursor-pointer text-sm font-semibold text-slate-700">Agregar antecedentes técnicos (opcional)</summary>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <div>
                      <label htmlFor="assistant-material" className="mb-1 block text-xs font-semibold text-slate-700">Material</label>
                      <input id="assistant-material" value={lead.material} onChange={(event) => updateLead("material", event.target.value)} maxLength={160} className="min-h-10 w-full border border-slate-300 bg-white px-3 text-sm outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100" />
                    </div>
                    <div>
                      <label htmlFor="assistant-dimensions" className="mb-1 block text-xs font-semibold text-slate-700">Medidas aproximadas</label>
                      <input id="assistant-dimensions" value={lead.dimensions} onChange={(event) => updateLead("dimensions", event.target.value)} maxLength={160} className="min-h-10 w-full border border-slate-300 bg-white px-3 text-sm outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100" />
                    </div>
                    <div>
                      <label htmlFor="assistant-quantity" className="mb-1 block text-xs font-semibold text-slate-700">Cantidad</label>
                      <input id="assistant-quantity" value={lead.quantity} onChange={(event) => updateLead("quantity", event.target.value)} maxLength={100} className="min-h-10 w-full border border-slate-300 bg-white px-3 text-sm outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100" />
                    </div>
                    <div>
                      <label htmlFor="assistant-deadline" className="mb-1 block text-xs font-semibold text-slate-700">Plazo deseado</label>
                      <input id="assistant-deadline" value={lead.deadline} onChange={(event) => updateLead("deadline", event.target.value)} maxLength={120} className="min-h-10 w-full border border-slate-300 bg-white px-3 text-sm outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100" />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="assistant-location" className="mb-1 block text-xs font-semibold text-slate-700">Comuna o ubicación del proyecto</label>
                      <input id="assistant-location" value={lead.location} onChange={(event) => updateLead("location", event.target.value)} maxLength={120} className="min-h-10 w-full border border-slate-300 bg-white px-3 text-sm outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100" />
                    </div>
                  </div>
                </details>

                <div aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
                  <label htmlFor="assistant-website">Dejar vacío</label>
                  <input id="assistant-website" tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} />
                </div>

                <label className="flex items-start gap-2.5 border-t border-slate-200 pt-3 text-xs leading-5 text-slate-600">
                  <input type="checkbox" checked={privacyConsent} onChange={(event) => setPrivacyConsent(event.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-blue-700" />
                  <span>Autorizo abrir WhatsApp con este mensaje para compartirlo con el equipo comercial de N Proyectos. Meta/WhatsApp procesará el mensaje cuando lo envíe; N Proyectos solo lo recibirá si pulso “Enviar” allí. El chat no se guarda. <Link href="/privacidad" className="font-semibold text-blue-800 underline underline-offset-2">Lee la política de privacidad</Link>.</span>
                </label>

                {leadError && <p role="alert" className="border-l-2 border-red-600 bg-red-50 px-3 py-2 text-sm leading-5 text-red-800">{leadError}</p>}
              </div>

              <div className="shrink-0 border-t border-slate-200 bg-white px-4 py-3 sm:px-5">
                <button type="submit" className="inline-flex min-h-11 w-full items-center justify-center gap-2 bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800">
                  Revisar y preparar WhatsApp
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <p className="mt-2 text-center text-[11px] leading-4 text-slate-500">No es una cotización definitiva. El mensaje no se enviará hasta que lo confirmes en WhatsApp.</p>
              </div>
            </form>
          ) : (
            <>
              <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-4 sm:px-5" role="log" aria-label="Conversación con el asesor" aria-live="polite" aria-relevant="additions text">
                <div className="mb-4 border-l-2 border-blue-700 bg-white px-3 py-2.5 text-xs leading-5 text-slate-600">
                  <div className="flex items-start gap-2">
                    <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" aria-hidden="true" />
                    <p>Al continuar, tus mensajes se enviarán a OpenAI mediante su API para generar respuestas. N Proyectos no guarda el contenido del chat ni lo envía a analítica. OpenAI indica que los datos de API no se usan para entrenar modelos salvo autorización y que sus registros de prevención de abuso pueden conservar contenido hasta 30 días. No incluyas datos confidenciales. Si preparas una solicitud, podrás revisarla antes de abrir WhatsApp; solo llegará a N Proyectos si luego pulsas “Enviar” allí. <Link href="/privacidad" className="font-semibold text-blue-800 underline underline-offset-2">Política de privacidad</Link>.</p>
                  </div>
                  {!aiNoticeAccepted && (
                    <button type="button" onClick={() => setAiNoticeAccepted(true)} className="mt-2 inline-flex min-h-8 items-center gap-1.5 font-semibold text-blue-800 hover:text-blue-950">
                      Acepto y continuar <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  )}
                </div>

                {messages.map((message) => {
                  const text = messageText(message);
                  if (!text) return null;
                  const isUser = message.role === "user";
                  return (
                    <div key={message.id} className={`mb-3 flex ${isUser ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[89%] whitespace-pre-wrap px-3.5 py-3 text-sm leading-6 ${isUser ? "bg-[#173c5c] text-white" : "border border-slate-200 border-l-2 border-l-blue-700 bg-white text-slate-800"}`}>
                        {text}
                      </div>
                    </div>
                  );
                })}

                {(status === "submitted" || status === "streaming") && (
                  <div className="mb-3 flex items-center gap-2 self-start border border-slate-200 bg-white px-3.5 py-3 text-xs text-slate-500" aria-label="El asesor está escribiendo">
                    <span className="flex gap-1" aria-hidden="true"><span className="h-1.5 w-1.5 animate-pulse bg-blue-700 motion-reduce:animate-none" /><span className="h-1.5 w-1.5 animate-pulse bg-blue-700 [animation-delay:150ms] motion-reduce:animate-none" /><span className="h-1.5 w-1.5 animate-pulse bg-blue-700 [animation-delay:300ms] motion-reduce:animate-none" /></span>
                    Preparando una respuesta…
                  </div>
                )}

                {status === "error" && (
                  <div role="status" className="mb-3 border-l-2 border-amber-500 bg-amber-50 px-3.5 py-3 text-sm leading-5 text-amber-900">
                    No pude responder ahora. Puedes volver a intentarlo o preparar una solicitud para el equipo.
                    <button type="button" onClick={openLeadForm} className="mt-2 block font-semibold underline underline-offset-2">Preparar solicitud</button>
                  </div>
                )}

                {!aiNoticeAccepted && (
                  <p className="mb-3 text-xs text-slate-500">También puedes dejar una solicitud sin iniciar una conversación con IA.</p>
                )}

                {messages.filter((message) => message.role === "user").length === 0 && aiNoticeAccepted && (
                  <div className="mt-1 flex flex-wrap gap-2">
                    {quickActions.map((action) => (
                      <button key={action} type="button" onClick={() => submitChatMessage(action)} className="border border-slate-300 bg-white px-3 py-2 text-left text-xs font-medium leading-4 text-slate-700 hover:border-blue-700 hover:text-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">
                        {action}
                      </button>
                    ))}
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              <div className="shrink-0 border-t border-slate-200 bg-white px-3.5 py-3 sm:px-4">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <button type="button" onClick={openLeadForm} className="inline-flex min-h-8 items-center gap-1.5 text-xs font-semibold text-blue-800 hover:text-blue-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700">
                    <FileCheck2 className="h-4 w-4" aria-hidden="true" /> Preparar solicitud
                  </button>
                  <a href={salesContact.whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-8 items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700">
                    <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" /> WhatsApp
                  </a>
                </div>
                <form onSubmit={handleChatSubmit} className="flex items-end gap-2">
                  <label className="sr-only" htmlFor="nproyectos-assistant-input">Escribe tu consulta</label>
                  <input
                    id="nproyectos-assistant-input"
                    ref={inputRef}
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    maxLength={1_800}
                    disabled={!aiNoticeAccepted || status === "submitted" || status === "streaming"}
                    placeholder={aiNoticeAccepted ? "Escribe tu consulta…" : "Confirma para iniciar el chat"}
                    className="min-h-11 min-w-0 flex-1 border border-slate-300 bg-[#f8f9fa] px-3 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-700 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                  />
                  {status === "submitted" || status === "streaming" ? (
                    <button type="button" onClick={stop} className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#17191b] text-white" aria-label="Detener respuesta">
                      <Square className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  ) : (
                    <button type="submit" disabled={!aiNoticeAccepted || !input.trim()} className="flex h-11 w-11 shrink-0 items-center justify-center bg-blue-700 text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-300" aria-label="Enviar consulta">
                      <Send className="h-4 w-4" aria-hidden="true" />
                    </button>
                  )}
                </form>
                <div className="mt-2 flex items-center justify-between gap-3 text-[10px] text-slate-500">
                  <span>Orientación preliminar; ventas confirma la cotización.</span>
                  <a href={salesContact.phoneHref} className="inline-flex shrink-0 items-center gap-1 hover:text-slate-900">
                    <Phone className="h-3 w-3" aria-hidden="true" /> Llamar
                  </a>
                </div>
              </div>
            </>
          )}
        </section>
      )}

      <button
        type="button"
        onClick={isOpen ? () => setIsOpen(false) : handleOpen}
        aria-expanded={isOpen}
        aria-controls="nproyectos-sales-assistant"
        ref={launcherRef}
        aria-label={isOpen ? "Minimizar asesor comercial" : "Abrir asesor comercial de N Proyectos"}
        title="Asesor comercial N Proyectos"
        className="fixed bottom-[5.5rem] right-3 z-[60] flex h-12 w-12 items-center justify-center border border-white/20 bg-[#173c5c] text-white shadow-lg transition-colors hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 sm:bottom-[5.75rem] sm:right-6 sm:h-14 sm:w-14"
      >
        {isOpen ? <ChevronDown className="h-5 w-5" aria-hidden="true" /> : <MessageCircle className="h-5 w-5" aria-hidden="true" />}
      </button>
    </>
  );
}
