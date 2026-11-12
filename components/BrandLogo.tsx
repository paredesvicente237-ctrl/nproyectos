import Image from "next/image";
import { companyInfo } from "@/components/siteData";

type BrandLogoProps = {
  variant: "light" | "dark";
  onDark?: boolean;
  priority?: boolean;
  className?: string;
};

export default function BrandLogo({ variant, onDark = false, priority = false, className = "" }: BrandLogoProps) {
  return (
    <span className={`relative block aspect-[4.89/1] w-[180px] shrink-0 overflow-hidden ${onDark ? "bg-transparent" : "bg-white"} ${variant === "dark" ? "ring-1 ring-[#e8e6e3]" : ""} ${className}`}>
      {onDark ? (
        <svg className="h-full w-full" viewBox="0 0 1320 270" aria-hidden="true" focusable="false">
          <defs>
            <filter id="nproyectos-logo-white-ink" colorInterpolationFilters="sRGB" x="0" y="0" width="1320" height="270" filterUnits="userSpaceOnUse">
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 -.2126 -.7152 -.0722 0 1" />
              <feComponentTransfer><feFuncA type="linear" slope="3" intercept="-1.5" /></feComponentTransfer>
            </filter>
            <filter id="nproyectos-logo-orange" colorInterpolationFilters="sRGB" x="0" y="0" width="1320" height="270" filterUnits="userSpaceOnUse">
              <feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 1 0 -1 0 0" />
            </filter>
          </defs>
          <image href="/images/nproyectos-ingenieria-soluciones-white.png" width="1320" height="270" filter="url(#nproyectos-logo-white-ink)" />
          <image href="/images/nproyectos-ingenieria-soluciones-white.png" width="1320" height="270" filter="url(#nproyectos-logo-orange)" />
        </svg>
      ) : (
        <Image
          src="/images/nproyectos-ingenieria-soluciones-white.png"
          alt={`NProyectos — ${companyInfo.tagline}`}
          fill
          priority={priority}
          sizes="210px"
          className="object-contain"
        />
      )}
    </span>
  );
}
