"use client";

import { GA_MEASUREMENT_ID, isValidGaMeasurementId } from "@/lib/analytics";
import { OPEN_PREFERENCES_EVENT } from "@/components/GoogleAnalyticsConsent";

export default function AnalyticsPreferencesButton() {
  if (!isValidGaMeasurementId(GA_MEASUREMENT_ID)) return null;

  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT))}
      className="text-xs text-slate-500 underline underline-offset-4 hover:text-white"
    >
      Preferencias de cookies
    </button>
  );
}
