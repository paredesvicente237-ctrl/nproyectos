import Image from "next/image";
import { companyInfo } from "@/components/siteData";
import { siteAssets } from "@/components/siteAssets";

type BrandLogoProps = {
  variant: "light" | "dark";
  priority?: boolean;
  className?: string;
};

export default function BrandLogo({ variant, priority = false, className = "" }: BrandLogoProps) {
  const onDarkBackground = variant === "dark";

  return (
    <span className={`relative block h-10 w-[128px] shrink-0 sm:h-11 sm:w-[140px] ${className}`}>
      <Image
        src={siteAssets.transparentLogo}
        alt={`Logo ${companyInfo.shortName}`}
        fill
        priority={priority}
        sizes="140px"
        className={`object-contain ${onDarkBackground ? "brightness-0 invert [clip-path:inset(0_0_0_25%)]" : ""}`}
      />
      {onDarkBackground && (
        <Image
          src={siteAssets.transparentLogo}
          alt=""
          aria-hidden="true"
          fill
          sizes="140px"
          className="pointer-events-none object-contain [clip-path:inset(0_74%_0_0)]"
        />
      )}
    </span>
  );
}
