import Image from "next/image";
import Link from "next/link";
import { siteAssets } from "@/components/siteAssets";
import { companyInfo } from "@/components/siteData";
import { services } from "@/lib/serviceData";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="container-custom px-5 py-12 sm:px-8 lg:px-10">
        <div className="grid gap-10 md:grid-cols-[1.1fr_1fr_0.8fr]">
          <div>
            <div className="inline-block overflow-hidden rounded bg-white p-1">
              <Image
                src={siteAssets.logo}
                alt={`Logo ${companyInfo.shortName}`}
                className="h-9 w-auto object-contain"
              />
            </div>
            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-500">
              Soluciones en acero para fabricación y proyectos industriales.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-300">Servicios</p>
            <nav className="mt-4 grid gap-2" aria-label="Servicios del pie de página">
              {services.map((service) => (
                <Link key={service.slug} href={`/servicios/${service.slug}`} className="text-sm text-slate-500 hover:text-white">
                  {service.shortName}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-300">Contacto</p>
            <div className="mt-4 flex flex-col gap-2 text-sm text-slate-500">
            <a href={companyInfo.phoneHref} className="hover:text-white">{companyInfo.phoneDisplay}</a>
            <a href={companyInfo.emailHref} className="hover:text-white">{companyInfo.email}</a>
              <span>{companyInfo.address}, Chile</span>
            </div>
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
