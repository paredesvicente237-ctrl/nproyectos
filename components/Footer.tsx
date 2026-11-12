import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import { companyInfo, salesContact } from "@/components/siteData";
import TrackedContactLink from "@/components/TrackedContactLink";
import { services } from "@/lib/serviceData";
import AnalyticsPreferencesButton from "@/components/AnalyticsPreferencesButton";

export default function Footer() {
  return (
    <footer className="border-t border-[#dedbd7] bg-white text-[#252729]">
      <div className="container-custom px-5 py-12 sm:px-8 lg:px-10">
        <div className="grid gap-10 md:grid-cols-[1.1fr_1fr_0.8fr]">
          <div>
            <BrandLogo variant="dark" className="w-[188px] sm:w-[210px]" />
            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600">
              Ingeniería, fabricación y soluciones metalmecánicas para la industria.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#a94f00]">Servicios</p>
            <nav className="mt-4 grid gap-2" aria-label="Servicios del pie de página">
              <Link href="/maestranza-santiago" className="text-sm font-semibold text-slate-700 hover:text-[#a94f00]">
                Maestranza en Santiago
              </Link>
              {services.map((service) => (
                <Link key={service.slug} href={`/servicios/${service.slug}`} className="text-sm text-slate-600 hover:text-[#a94f00]">
                  {service.shortName}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#a94f00]">Contacto</p>
            <div className="mt-4 flex flex-col gap-2 text-sm text-slate-600">
              <p className="font-semibold text-slate-700">{salesContact.name} · {salesContact.role}</p>
              <TrackedContactLink channel="phone" href={salesContact.phoneHref} className="hover:text-[#a94f00]">{salesContact.phoneDisplay}</TrackedContactLink>
              <TrackedContactLink channel="email" href={salesContact.emailHref} className="hover:text-[#a94f00]">{salesContact.email}</TrackedContactLink>
              <span>{companyInfo.address}, Chile</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col gap-2 border-t border-[#dedbd7] pt-6 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {companyInfo.legalName}. Todos los derechos reservados.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <AnalyticsPreferencesButton />
            <Link href="/privacidad" className="text-xs text-slate-600 underline underline-offset-4 hover:text-[#a94f00]">
              Privacidad
            </Link>
            <p>
              Creado por{" "}
              <a
                href="https://viselix.cl"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-slate-600 transition-colors hover:text-[#a94f00]"
              >
                VISELIX
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
