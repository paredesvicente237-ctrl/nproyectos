import Image from "next/image";
import { siteAssets } from "@/components/siteAssets";
import { companyInfo } from "@/components/siteData";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="container-custom px-5 py-12 sm:px-8 lg:px-10">
        {/* Top row: logo left, contact right */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="inline-block overflow-hidden rounded bg-white p-1">
              <Image
                src={siteAssets.logo}
                alt={`Logo ${companyInfo.shortName}`}
                className="h-9 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-slate-500">
              Soluciones en acero para fabricación y proyectos industriales.
            </p>
          </div>

          <div className="flex flex-col gap-1 text-sm text-slate-500 sm:items-end">
            <a href={companyInfo.phoneHref} className="hover:text-white">{companyInfo.phoneDisplay}</a>
            <a href={companyInfo.emailHref} className="hover:text-white">{companyInfo.email}</a>
            <span>{companyInfo.address}</span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {companyInfo.legalName}. Todos los derechos reservados.</p>
          <p>
            Creado por{" "}
            <a
              href="https://viselix.cl"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-slate-400 transition-colors hover:text-white"
            >
              VISELIX
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
