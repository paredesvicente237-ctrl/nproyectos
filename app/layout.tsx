import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { companyInfo } from "@/components/siteData";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(companyInfo.website),
  title: {
    default: "Maestranza en Santiago y fabricación en acero | N Proyectos",
    template: "%s | N Proyectos",
  },
  description:
    "Maestranza en Santiago para fabricación en acero, corte y plegado de planchas, soldadura MIG/TIG y control acústico industrial. Cotiza tu proyecto a medida.",
  keywords: [
    "metalmecánica Santiago",
    "fabricación en acero Santiago",
    "corte y plegado de planchas",
    "soldadura MIG TIG Santiago",
    "control acústico industrial",
    "maestranza Santiago",
    "maestranza La Granja",
    "fabricación acero inoxidable Santiago",
    "estructuras metálicas Santiago",
    "N Proyectos Ltda",
  ],
  applicationName: companyInfo.shortName,
  authors: [{ name: companyInfo.legalName, url: companyInfo.website }],
  creator: companyInfo.legalName,
  publisher: companyInfo.legalName,
  category: "Metalmecánica industrial",
  verification: {
    google: "eH3H6pVDPXb9MD39NW4vskeCo_2PHSlcXbtniXNkBl0",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "/",
    siteName: companyInfo.shortName,
    title: "Maestranza en Santiago y fabricación en acero | N Proyectos",
    description:
      "Fabricación en acero, corte y plegado, soldadura MIG/TIG y control acústico para proyectos industriales en Santiago.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maestranza y fabricación en acero | N Proyectos",
    description:
      "Fabricación en acero, corte y plegado, soldadura y control acústico en Santiago.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${outfit.variable} ${dmSans.variable}`}>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
