import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Generador interno",
  robots: { index: false, follow: false },
};

export default function FormulaLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
