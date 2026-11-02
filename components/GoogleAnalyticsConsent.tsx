"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  GA_MEASUREMENT_ID,
  isValidGaMeasurementId,
  readAnalyticsConsent,
  saveAnalyticsConsent,
  trackGaEvent,
  updateGoogleConsent,
} from "@/lib/analytics";

type ConsentChoice = "granted" | "denied" | null;

const OPEN_PREFERENCES_EVENT = "nproyectos:open-analytics-preferences";

export default function GoogleAnalyticsConsent() {
  const pathname = usePathname();
  const lastPageView = useRef<string | null>(null);
  const [choice, setChoice] = useState<ConsentChoice>(null);
  const [resolvedChoice, setResolvedChoice] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [gaReady, setGaReady] = useState(false);

  useEffect(() => {
    setChoice(readAnalyticsConsent());
    setResolvedChoice(true);

    const openPreferences = () => setShowPreferences(true);
    window.addEventListener(OPEN_PREFERENCES_EVENT, openPreferences);
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, openPreferences);
  }, []);

  useEffect(() => {
    if (!resolvedChoice || !isValidGaMeasurementId()) return;

    const existingScript = document.getElementById("nproyectos-google-analytics") as HTMLScriptElement | null;

    if (choice === "denied") {
      updateGoogleConsent("denied");
      setGaReady(false);
      return;
    }

    if (choice !== "granted") return;

    window.dataLayer = window.dataLayer ?? [];
    window.gtag = window.gtag ?? ((...args) => window.dataLayer?.push(args));

    if (window.__nproyectosGaConfigured !== GA_MEASUREMENT_ID) {
      window.gtag("consent", "default", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
      window.gtag("js", new Date());
      window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });
      window.__nproyectosGaConfigured = GA_MEASUREMENT_ID;
    }

    updateGoogleConsent("granted");

    if (window.__nproyectosGaLoaded) {
      setGaReady(true);
      return;
    }

    const onLoad = () => {
      window.__nproyectosGaLoaded = true;
      setGaReady(true);
    };

    if (existingScript) {
      existingScript.addEventListener("load", onLoad, { once: true });
      return () => existingScript.removeEventListener("load", onLoad);
    }

    const script = document.createElement("script");
    script.id = "nproyectos-google-analytics";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
    script.addEventListener("load", onLoad, { once: true });
    document.head.appendChild(script);
    return () => script.removeEventListener("load", onLoad);
  }, [choice, resolvedChoice]);

  useEffect(() => {
    if (!gaReady || choice !== "granted" || !isValidGaMeasurementId()) return;

    const page = `${pathname}${window.location.search}`;
    if (lastPageView.current === page) return;

    trackGaEvent("page_view", {
      page_path: page,
      page_location: window.location.href,
      page_title: document.title,
    });
    lastPageView.current = page;
  }, [choice, gaReady, pathname]);

  const saveChoice = (nextChoice: Exclude<ConsentChoice, null>) => {
    saveAnalyticsConsent(nextChoice);
    updateGoogleConsent(nextChoice);
    setChoice(nextChoice);
    setShowPreferences(false);
  };

  if (!isValidGaMeasurementId() || !resolvedChoice) return null;

  const isOpen = showPreferences || choice === null;
  if (!isOpen) return null;

  return (
    <aside
      aria-label="Preferencias de medición"
      aria-live="polite"
      className="fixed bottom-4 left-4 right-20 z-[70] max-w-[34rem] border border-slate-200 bg-white p-5 text-slate-800 shadow-xl sm:bottom-6 sm:left-6 sm:right-auto sm:p-6"
    >
      <p className="text-sm font-semibold text-slate-950">Preferencias de medición</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Google Analytics puede usar cookies para medir el uso del sitio. Solo se activa si aceptas. No enviamos a Analytics tu nombre, correo, teléfono ni el contenido del formulario.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" onClick={() => saveChoice("granted")} className="btn-primary !min-h-10 !px-4 !py-2 !text-xs">
          Aceptar medición
        </button>
        <button type="button" onClick={() => saveChoice("denied")} className="btn-outline !min-h-10 !px-4 !py-2 !text-xs">
          Rechazar
        </button>
      </div>
    </aside>
  );
}

export { OPEN_PREFERENCES_EVENT };
