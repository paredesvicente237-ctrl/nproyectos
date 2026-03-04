"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { siteAssets } from "@/components/siteAssets";
import { companyInfo, navLinks } from "@/components/siteData";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "border-b border-slate-200 bg-white/90 py-3 shadow-lg shadow-slate-200/30 backdrop-blur-xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container-custom px-5 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#inicio"
            className="flex items-center gap-3"
            aria-label={`Ir al inicio de ${companyInfo.shortName}`}
          >
            <div className="overflow-hidden rounded-xl bg-white p-1.5 shadow-md">
              <Image
                src={siteAssets.logo}
                alt={`Logo ${companyInfo.shortName}`}
                priority
                className="h-9 w-auto object-contain sm:h-11"
              />
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 xl:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isScrolled
                    ? "text-slate-600 hover:text-navy-600"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Spacer for alignment when no CTA */}
          <div className="hidden md:block xl:hidden w-11" />

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setIsOpen((c) => !c)}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-xl transition-colors xl:hidden ${
              isScrolled
                ? "bg-slate-100 text-slate-700"
                : "bg-white/10 text-white backdrop-blur-sm"
            }`}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`overflow-hidden transition-all duration-300 xl:hidden ${
            isOpen ? "max-h-[36rem] pt-5 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-navy-50 hover:text-navy-600"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <a href={companyInfo.phoneHref} className="btn-outline justify-center">
                Llamar
              </a>
              <a href={companyInfo.whatsappHref} className="btn-primary justify-center">
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
