"use client";

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { trackGaEvent } from "@/lib/analytics";

type TrackedProductDownloadLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "onClick" | "children"> & {
  productName: string;
  productCode: string;
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export default function TrackedProductDownloadLink({
  productName,
  productCode,
  onClick,
  ...props
}: TrackedProductDownloadLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    trackGaEvent("product_datasheet_download", {
      product_name: productName,
      product_code: productCode,
      file_extension: "pdf",
      page_path: window.location.pathname,
    });
  };

  return <a {...props} onClick={handleClick} />;
}
