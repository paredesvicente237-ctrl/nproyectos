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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-white/10 bg-steel-950/92 py-3 shadow-2xl backdrop-blur-xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <a
            href="#inicio"
            className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/95 px-3 py-2 shadow-xl shadow-steel-950/10"
            aria-label={`Ir al inicio de ${companyInfo.shortName}`}
          >
            <Image
              src={siteAssets.logo}
              alt={`Logo ${companyInfo.shortName}`}
              priority
              className="h-9 w-auto object-contain sm:h-11"
            />
          </a>

          <div className="hidden xl:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold tracking-[0.18em] uppercase transition-colors ${
                  isScrolled
                    ? "text-industrial-200 hover:text-white"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href={companyInfo.phoneHref}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                isScrolled
                  ? "border-white/10 text-white hover:border-accent hover:text-accent"
                  : "border-white/25 text-white hover:border-white hover:bg-white/10"
              }`}
            >
              {companyInfo.phoneDisplay}
            </a>
            <a href={companyInfo.whatsappHref} className="btn-primary">
              WhatsApp
            </a>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border transition-colors md:hidden ${
              isScrolled
                ? "border-white/10 bg-white/10 text-white"
                : "border-white/25 bg-white/10 text-white"
            }`}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M6 6l12 12M6 18L18 6"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M4 7h16M4 12h16M4 17h16"
                />
              )}
            </svg>
          </button>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 md:hidden ${
            isOpen ? "max-h-[32rem] pt-4 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="rounded-3xl border border-white/10 bg-steel-900/95 p-5 shadow-2xl backdrop-blur-xl">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-2xl border border-white/5 px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-industrial-100 transition-colors hover:border-accent/50 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <a href={companyInfo.phoneHref} className="btn-secondary text-center">
                Llamar ahora
              </a>
              <a href={companyInfo.whatsappHref} className="btn-primary text-center">
                Escribir por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
