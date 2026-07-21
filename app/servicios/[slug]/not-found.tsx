import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function ServiceNotFound() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[75vh] items-center bg-slate-50 px-5 pb-20 pt-36">
        <div className="container-custom text-center">
          <p className="eyebrow">Servicio no encontrado</p>
          <h1 className="mx-auto mt-5 max-w-2xl text-4xl font-semibold sm:text-5xl">La página que buscas no está disponible.</h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-7 text-slate-600">Puedes volver al inicio para revisar nuestras capacidades de fabricación y soluciones en acero.</p>
          <Link href="/#especialidades" className="btn-primary mt-8">Ver servicios</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
