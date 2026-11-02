"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { trackGaEvent } from "@/lib/analytics";

type ContactChannel = "whatsapp" | "email";

type TrackedContactLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  channel: ContactChannel;
};

export default function TrackedContactLink({ channel, onClick, ...props }: TrackedContactLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    trackGaEvent("contact_click", {
      contact_method: channel,
      page_path: window.location.pathname,
    });

    void fetch("/api/contact-click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ channel, path: window.location.pathname }),
      keepalive: true,
    }).catch(() => {
      // El enlace de contacto debe seguir funcionando aunque el aviso falle.
    });
  };

  return <a {...props} onClick={handleClick} />;
}
