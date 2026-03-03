import Image from "next/image";
import { siteAssets } from "@/components/siteAssets";
import { companyInfo, navLinks } from "@/components/siteData";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-steel-950 text-industrial-300">
      <div className="container-custom section-padding pb-10">
        <div className="grid gap-10 xl:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="inline-flex items-center rounded-2xl border border-white/10 bg-white/95 px-3 py-2 shadow-lg">
              <Image
                src={siteAssets.logo}
                alt={`Logo ${companyInfo.shortName}`}
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="mt-6 max-w-2xl text-base leading-8 text-industrial-300">
              {companyInfo.legalName} desarrolla soluciones en acero para
              fabricación, proyectos, control acústico y requerimientos
              industriales que necesitan ejecución seria y soporte técnico.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                Navegación
              </p>
              <div className="mt-5 flex flex-col gap-3">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm font-semibold uppercase tracking-[0.18em] text-industrial-300 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                Contacto
              </p>
              <div className="mt-5 flex flex-col gap-3 text-sm leading-7">
                <a href={companyInfo.phoneHref} className="hover:text-white">
                  {companyInfo.phoneDisplay}
                </a>
                <a href={companyInfo.emailHref} className="break-all hover:text-white">
                  {companyInfo.email}
                </a>
                <p>{companyInfo.address}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-industrial-400">
          <p>
            {companyInfo.legalName} | {companyInfo.phoneDisplay} |{" "}
            {companyInfo.email} | {companyInfo.address}
          </p>
        </div>
      </div>
    </footer>
  );
}
