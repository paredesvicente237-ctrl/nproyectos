import type { Metadata } from "next";
import { Rajdhani, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "N Proyectos Ltda | Servicios y Proyectos en Aceros",
  description:
    "Servicios y proyectos en aceros para minería, manufactura, industria y construcción. Corte, plegado, armado, soldadura y apoyo técnico para fabricación industrial.",
  keywords: [
    "maestranza",
    "fabricación en acero",
    "corte láser",
    "corte guillotina",
    "plegado",
    "soldadura",
    "proyectos en acero",
    "N Proyectos Ltda",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${rajdhani.variable} ${sourceSans.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
