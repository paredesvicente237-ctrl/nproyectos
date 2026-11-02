export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? "";
export const ANALYTICS_CONSENT_KEY = "nproyectos-analytics-consent-v1";

type GtagArguments = [string, ...unknown[]];

declare global {
  interface Window {
    dataLayer?: GtagArguments[];
    gtag?: (...args: GtagArguments) => void;
    __nproyectosGaConfigured?: string;
    __nproyectosGaLoaded?: boolean;
    __nproyectosAnalyticsConsent?: "granted" | "denied";
  }
}

export function isValidGaMeasurementId(value = GA_MEASUREMENT_ID) {
  return /^G-[A-Z0-9]+$/i.test(value);
}

export function readAnalyticsConsent(): "granted" | "denied" | null {
  if (typeof window === "undefined") return null;

  try {
    const value = window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
    if (value === "granted" || value === "denied") return value;
  } catch {
    // Fall back to the in-memory choice for this visit.
  }

  return window.__nproyectosAnalyticsConsent ?? null;
}

export function saveAnalyticsConsent(value: "granted" | "denied") {
  window.__nproyectosAnalyticsConsent = value;
  try {
    window.localStorage.setItem(ANALYTICS_CONSENT_KEY, value);
  } catch {
    // The current page can still honor the choice if storage is unavailable.
  }
}

export function updateGoogleConsent(value: "granted" | "denied") {
  if (typeof window === "undefined" || !window.gtag) return;

  window.gtag("consent", "update", {
    analytics_storage: value,
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

export function trackGaEvent(
  eventName: string,
  parameters: Record<string, string | number | boolean> = {},
) {
  if (
    typeof window === "undefined" ||
    !isValidGaMeasurementId() ||
    readAnalyticsConsent() !== "granted" ||
    !window.gtag
  ) {
    return;
  }

  window.gtag("event", eventName, parameters);
}
