"use client";

import Link from "next/link";
import { ArrowRight, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import BrandLogo from "@/components/BrandLogo";
import { companyInfo, navLinks } from "@/components/siteData";
import TrackedContactLink from "@/components/TrackedContactLink";
import TrackedQuoteLink from "@/components/TrackedQuoteLink";

type NavbarProps = {
  appearance?: "standard" | "cinematic";
};

export default function Navbar({ appearance = "standard" }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const isHeroHeader = appearance === "cinematic" && !isScrolled;
  const publicLinks = navLinks.filter((link) => !["/#inicio", "/#contacto", "/generador-formulas"].includes(link.href));

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`npro-site-header fixed inset-x-0 top-0 z-50 border-b border-slate-200/90 bg-white/95 text-slate-700 backdrop-blur transition-[background-color,border-color,box-shadow] duration-300 ${appearance === "cinematic" ? "npro-site-header--cinematic" : ""} ${isHeroHeader ? "npro-site-header--at-hero" : ""} ${isScrolled ? "shadow-[0_8px_30px_rgba(15,35,55,0.08)]" : "shadow-none"}`}>
      <div className="container-custom flex h-[76px] items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link href="/" className="flex items-center" aria-label={`Ir al inicio de ${companyInfo.shortName}`}>
          <BrandLogo variant="light" priority className="w-[164px] sm:w-[196px]" />
        </Link>

        <div className="hidden items-center gap-3 xl:flex 2xl:gap-5">
          {publicLinks.map((link) => (
            <Link key={link.href} href={link.href} className="whitespace-nowrap text-[11px] font-semibold text-slate-600 hover:text-blue-700 2xl:text-xs">{link.label}</Link>
          ))}
          <TrackedQuoteLink href="/#contacto" location="navigation" className="btn-primary !min-h-10 shrink-0 !px-4 !text-xs">Cotizar <ArrowRight className="h-4 w-4" /></TrackedQuoteLink>
        </div>

        <button type="button" onClick={() => setIsOpen((value) => !value)} className={`inline-flex h-10 w-10 items-center justify-center xl:hidden ${isHeroHeader ? "text-white hover:bg-white/10" : "text-slate-900 hover:bg-slate-100"}`} aria-expanded={isOpen} aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}>
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen && (
        <div className={`border-t px-5 pb-6 pt-3 xl:hidden ${isHeroHeader ? "border-white/15 bg-[#151c21]" : "border-slate-200 bg-white"}`}>
          <div className="container-custom flex flex-col">
            {publicLinks.map((link) => <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className={`border-b py-3 text-sm font-medium ${isHeroHeader ? "border-white/10 text-white/85" : "border-slate-100 text-slate-700"}`}>{link.label}</Link>)}
            <TrackedQuoteLink href="/#contacto" location="mobile_navigation" onClick={() => setIsOpen(false)} className="btn-primary mt-5">Solicitar cotización <ArrowRight className="h-4 w-4" /></TrackedQuoteLink>
            <TrackedContactLink channel="phone" href={companyInfo.phoneHref} className="btn-outline mt-4"><Phone className="h-4 w-4" /> {companyInfo.phoneDisplay}</TrackedContactLink>
          </div>
        </div>
      )}
    </nav>
  );
}
