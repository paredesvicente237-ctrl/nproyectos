"use client";

import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { trackGaEvent } from "@/lib/analytics";

type TrackedQuoteLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick" | "children"> &
  Pick<LinkProps, "href"> & {
    location: string;
    serviceType?: string;
    children: ReactNode;
    onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  };

export default function TrackedQuoteLink({ location, serviceType = "general", onClick, ...props }: TrackedQuoteLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    trackGaEvent("quote_cta_click", {
      cta_location: location,
      page_path: window.location.pathname,
      service_type: serviceType,
    });
  };

  return <Link {...props} onClick={handleClick} />;
}
