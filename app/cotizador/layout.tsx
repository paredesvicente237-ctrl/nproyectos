import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cotizador interno",
  robots: { index: false, follow: false },
};

export default function QuoteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
