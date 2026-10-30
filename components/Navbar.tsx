"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import BrandLogo from "@/components/BrandLogo";
import { companyInfo, navLinks } from "@/components/siteData";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const transparentHome = pathname === "/" && !isScrolled;
  const publicLinks = navLinks.filter((link) => !["/#inicio", "/#contacto", "/generador-formulas"].includes(link.href));

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${transparentHome ? "border-white/20 bg-[#17191b]/15 text-white backdrop-blur-sm" : "border-slate-200/90 bg-white/95 text-slate-700 shadow-[0_8px_30px_rgba(15,35,55,0.08)] backdrop-blur"}`}>
      <div className="container-custom flex h-[76px] items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link href="/" className="flex items-center" aria-label={`Ir al inicio de ${companyInfo.shortName}`}>
          <BrandLogo variant={transparentHome ? "dark" : "light"} priority />
        </Link>

        <div className="hidden items-center gap-3 xl:flex 2xl:gap-5">
          {publicLinks.map((link) => (
            <Link key={link.href} href={link.href} className={`whitespace-nowrap text-[11px] font-semibold 2xl:text-xs ${transparentHome ? "text-white/90 hover:text-white" : "text-slate-600 hover:text-blue-700"}`}>{link.label}</Link>
          ))}
          <a href="/#contacto" className={`inline-flex min-h-10 shrink-0 items-center justify-center gap-2 px-4 text-xs font-semibold ${transparentHome ? "bg-white text-[#17191b] hover:bg-blue-50" : "btn-primary !min-h-10 !px-4 !text-xs"}`}>Cotizar <ArrowRight className="h-4 w-4" /></a>
        </div>

        <button type="button" onClick={() => setIsOpen((value) => !value)} className={`inline-flex h-10 w-10 items-center justify-center xl:hidden ${transparentHome ? "text-white hover:bg-white/10" : "text-slate-900 hover:bg-slate-100"}`} aria-expanded={isOpen} aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}>
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
