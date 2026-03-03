import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NProyectos | Corte y Plegado de Láminas de Acero",
  description:
    "Servicio profesional de corte láser, corte plasma y plegado CNC de láminas de acero. Precisión, calidad y cumplimiento garantizado.",
  keywords: [
    "corte láser",
    "corte plasma",
    "plegado CNC",
    "láminas de acero",
    "metalurgia",
    "NProyectos",
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
