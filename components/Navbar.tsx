"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { siteAssets } from "@/components/siteAssets";
import { companyInfo, navLinks } from "@/components/siteData";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const publicLinks = navLinks.filter((link) => !["/#inicio", "/#contacto", "/generador-formulas"].includes(link.href));

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white/95 transition-all backdrop-blur ${isScrolled ? "shadow-[0_8px_30px_rgba(15,23,42,0.06)]" : ""}`}>
      <div className="container-custom flex h-[76px] items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link href="/" className="flex items-center" aria-label={`Ir al inicio de ${companyInfo.shortName}`}>
          <span className="overflow-hidden bg-white">
            <Image src={siteAssets.logo} alt={`Logo ${companyInfo.shortName}`} priority className="h-10 w-auto object-contain mix-blend-multiply sm:h-11" />
          </span>
        </Link>

        <div className="hidden items-center gap-6 xl:flex">
          {publicLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-[13px] font-medium text-slate-600 hover:text-blue-700">{link.label}</Link>
          ))}
          <a href="/#contacto" className="btn-primary !min-h-11 !px-5">Cotizar <ArrowRight className="h-4 w-4" /></a>
        </div>

        <button type="button" onClick={() => setIsOpen((value) => !value)} className="inline-flex h-10 w-10 items-center justify-center rounded-sm text-slate-900 hover:bg-slate-100 xl:hidden" aria-expanded={isOpen} aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}>
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-slate-200 bg-white px-5 pb-6 pt-3 xl:hidden">
          <div className="container-custom flex flex-col">
            {publicLinks.map((link) => <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="border-b border-slate-100 py-3 text-sm font-medium text-slate-700">{link.label}</Link>)}
            <a href="/#contacto" onClick={() => setIsOpen(false)} className="btn-primary mt-5">Solicitar cotización <ArrowRight className="h-4 w-4" /></a>
            <a href={companyInfo.phoneHref} className="btn-outline mt-4"><Phone className="h-4 w-4" /> {companyInfo.phoneDisplay}</a>
          </div>
        </div>
      )}
    </nav>
  );
}
