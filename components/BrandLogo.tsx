import Image from "next/image";
import { companyInfo } from "@/components/siteData";

type BrandLogoProps = {
  variant: "light" | "dark";
  priority?: boolean;
  className?: string;
};

export default function BrandLogo({ variant, priority = false, className = "" }: BrandLogoProps) {
  return (
    <span className={`relative block aspect-[4.89/1] w-[180px] shrink-0 overflow-hidden bg-white sm:w-[210px] ${variant === "dark" ? "ring-1 ring-[#e8e6e3]" : ""} ${className}`}>
      <Image
        src="/images/nproyectos-ingenieria-soluciones-white.png"
        alt={`NProyectos — ${companyInfo.tagline}`}
        fill
        priority={priority}
        sizes="210px"
        className="object-contain"
      />
    </span>
  );
}
