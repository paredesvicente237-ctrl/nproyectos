import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
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
    <html lang="es" className={`${outfit.variable} ${dmSans.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
