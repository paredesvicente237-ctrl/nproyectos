import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[75vh] items-center bg-slate-50 px-5 pb-20 pt-36">
        <div className="container-custom text-center">
          <p className="eyebrow">Error 404</p>
          <h1 className="mx-auto mt-5 max-w-2xl text-4xl font-semibold sm:text-5xl">
            Esta página no está disponible.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-7 text-slate-600">
            Puede que la dirección haya cambiado. Revisa nuestros productos o vuelve al inicio.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/" className="btn-primary">Ir al inicio</Link>
            <Link href="/productos" className="btn-outline">Ver productos</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
