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
    <span className={`relative block aspect-[4.89/1] shrink-0 overflow-hidden ${onDark ? "bg-transparent" : "bg-white"} ${variant === "dark" ? "ring-1 ring-[#e8e6e3]" : ""} ${className || "w-[180px]"}`}>
      <Image
        src={onDark ? "/images/nproyectos-sobre-grafito.svg" : "/images/nproyectos-ingenieria-soluciones-white.png"}
        alt={`NProyectos — ${companyInfo.tagline}`}
        fill
        priority={priority}
        sizes="240px"
        className="object-contain"
      />
    </span>
  );
}
