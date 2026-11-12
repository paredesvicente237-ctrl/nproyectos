import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { companyInfo } from "@/components/siteData";
import GoogleAnalyticsConsent from "@/components/GoogleAnalyticsConsent";
import "./globals.css";

const outfit = localFont({
  src: "./fonts/outfit-latin.woff2",
  weight: "400 800",
  variable: "--font-outfit",
  display: "swap",
});

const dmSans = localFont({
  src: "./fonts/dm-sans-latin.woff2",
  weight: "400 600",
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(companyInfo.website),
  // Versioned icon URLs help browsers such as Safari refresh the previous brand mark.
  icons: {
    icon: [{ url: "/icon.png?v=20261112", type: "image/png", sizes: "512x512" }],
    shortcut: "/favicon.ico?v=20261112",
    apple: [{ url: "/apple-icon.png?v=20261112", sizes: "180x180" }],
  },
  title: {
    default: "Maestranza en Santiago y fabricación en acero | N Proyectos",
    template: "%s | N Proyectos",
  },
  description:
    "Maestranza en Santiago para fabricación en acero, corte y plegado de planchas, soldadura MIG/TIG y control acústico industrial. Cotiza tu proyecto a medida.",
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
    images: [
      {
        url: "/images/nproyectos-brand-social.webp",
        width: 1200,
        height: 630,
        alt: "Identidad NProyectos Ingeniería y Soluciones junto a una imagen referencial de soldadura industrial",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maestranza y fabricación en acero | N Proyectos",
    description:
      "Fabricación en acero, corte y plegado, soldadura y control acústico en Santiago.",
    images: ["/images/nproyectos-brand-social.webp"],
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
    <html lang="es-CL" className={`${outfit.variable} ${dmSans.variable}`}>
      <body className="antialiased">
        {children}
        <Analytics />
        <GoogleAnalyticsConsent />
      </body>
    </html>
  );
}
