import type { Metadata } from "next";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { siteAssets } from "@/components/siteAssets";
import { companyInfo } from "@/components/siteData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Productos acústicos e industriales",
  description:
    "Productos acústicos e industriales fabricados a medida en Chile: espuma acústica, splitters, celosías, paneles perforados y pantallas móviles.",
  alternates: { canonical: "/productos" },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "/productos",
    title: "Productos acústicos e industriales | N Proyectos",
    description:
      "Espuma acústica, splitters, celosías, paneles perforados y pantallas móviles fabricados según cada proyecto.",
  },
};

type ProductSpec = { label: string; value: string };
type ProductImage = { src: StaticImageData; alt: string };

type Product = {
  id: string;
  name: string;
  code: string;
  category: string;
  description: string;
  specs: ProductSpec[];
  uses: string[];
  images: ProductImage[];
};

const products: Product[] = [
  {
    id: "espuma-acustica",
    name: "Espuma Acústica",
    code: "NFonoAB",
    category: "Acústica",
    description:
      "Acondicionamiento acústico para espacios donde el control de ruido y reverberación es crítico. Ideal para estudios, salas de conferencias y recintos industriales.",
    specs: [
      { label: "Dimensión", value: "60 x 60 cm" },
      { label: "Espesores", value: "4 cm / 6 cm" },
      { label: "Densidad", value: "20 kg/m³" },
      { label: "Color", value: "Gris" },
      { label: "Tratamiento", value: "Ignífugo retardante de llama" },
      { label: "Instalación", value: "Con adhesivo" },
    ],
    uses: [
      "Estudios de grabación",
      "Teatros y cines",
      "Salas de conferencias",
      "Home studio",
      "Oficinas y aulas",
      "Sistemas de ventilación",
    ],
    images: [
      { src: siteAssets.espumaAcustica, alt: "Espuma acústica NFonoAB primer plano" },
      { src: siteAssets.espumaAplicacion, alt: "Espuma acústica instalada en cielo" },
      { src: siteAssets.espumaEstudio, alt: "Espuma acústica en estudio de grabación" },
    ],
  },
  {
    id: "splitter",
    name: "Splitter Acústico",
    code: "NSplitter",
    category: "Acústica",
    description:
      "Atenuador acústico tipo splitter para sistemas de ventilación y ductos industriales. Reduce el ruido generado por el flujo de aire manteniendo la eficiencia del sistema.",
    specs: [
      { label: "Material", value: "Acero galvanizado" },
      { label: "Relleno", value: "Lana mineral / Espuma" },
      { label: "Largo", value: "Hasta 3.000 mm" },
      { label: "Distancia entre splitters", value: "30 a 90 mm" },
      { label: "Fabricación", value: "A medida" },
      { label: "Aplicación", value: "Ductos de ventilación" },
    ],
    uses: [
      "Sistemas HVAC",
      "Ductos industriales",
      "Salas de máquinas",
      "Recintos hospitalarios",
      "Edificios comerciales",
    ],
    images: [
      { src: siteAssets.splitter, alt: "Splitter acústico de acero galvanizado" },
    ],
  },
  {
    id: "celosia",
    name: "Celosía Acústica",
    code: "NCelosía",
    category: "Acústica",
    description:
      "Celosías metálicas diseñadas para ventilación con atenuación acústica. Permiten el paso de aire controlando la transmisión de ruido en fachadas e instalaciones industriales.",
    specs: [
      { label: "Material", value: "Acero galvanizado / Inoxidable" },
      { label: "Tipo", value: "Láminas inclinadas" },
      { label: "Fabricación", value: "A medida" },
      { label: "Montaje", value: "Empotrado o sobrepuesto" },
      { label: "Acabado", value: "Galvanizado / Pintura" },
    ],
    uses: [
      "Fachadas industriales",
      "Salas de generadores",
      "Subestaciones eléctricas",
      "Sistemas de ventilación",
      "Recintos con equipos ruidosos",
    ],
    images: [
      { src: siteAssets.celosia, alt: "Celosía acústica instalada en fachada" },
    ],
  },
  {
    id: "panel-perforado",
    name: "Panel Perforado",
    code: "NPerfAB",
    category: "Acústica",
    description:
      "Paneles metálicos perforados para revestimiento acústico de muros y cielos. Combinan absorción acústica con estética industrial, utilizados en conjunto con material absorbente.",
    specs: [
      { label: "Material", value: "Acero galvanizado / Inoxidable" },
      { label: "Perforación", value: "Circular / Según diseño" },
      { label: "Fabricación", value: "A medida" },
      { label: "Espesor plancha", value: "0,5 a 1,5 mm" },
      { label: "Acabado", value: "Galvanizado / Pintura" },
    ],
    uses: [
      "Revestimiento de muros",
      "Cielos acústicos",
      "Salas de máquinas",
      "Recintos industriales",
      "Edificios comerciales",
    ],
    images: [
      { src: siteAssets.panelPerforado, alt: "Panel perforado metálico" },
      { src: siteAssets.panelAplicacion, alt: "Panel perforado instalado en cielo" },
    ],
  },
  {
    id: "pantalla-movil",
    name: "Pantalla Móvil",
    code: "NMóvil",
    category: "Seguridad Industrial",
    description:
      "Pantalla móvil plegable con ruedas para protección en trabajos de soldadura y esmerilado. Estructura metálica robusta con paneles translúcidos que permiten visibilidad controlada.",
    specs: [
      { label: "Material", value: "Acero con pintura epóxica" },
      { label: "Paneles", value: "3 cuerpos plegables" },
      { label: "Ruedas", value: "Con freno" },
      { label: "Tipo", value: "Translúcido / Opaco" },
      { label: "Fabricación", value: "A medida" },
    ],
    uses: [
      "Talleres de soldadura",
      "Zonas de esmerilado",
      "Áreas de trabajo industrial",
      "Separación de espacios",
      "Protección visual y de partículas",
    ],
    images: [
      { src: siteAssets.pantallaMovil, alt: "Pantalla móvil plegable para soldadura" },
    ],
  },
];

function ProductCard({ product, index }: { product: Product; index: number }) {
  const isReversed = index % 2 !== 0;

  return (
    <div id={product.id} className="scroll-mt-24">
      <div
        className={`grid gap-10 lg:grid-cols-2 lg:items-center ${
          isReversed ? "lg:[direction:rtl]" : ""
        }`}
      >
        {/* Images */}
        <div className={isReversed ? "lg:[direction:ltr]" : ""}>
          {product.images.length === 1 ? (
            <div className="overflow-hidden rounded-md border border-slate-200">
              <Image
                src={product.images[0].src}
                alt={product.images[0].alt}
                className="aspect-[4/3] w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          ) : product.images.length === 2 ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-md border border-slate-200">
                <Image
                  src={product.images[0].src}
                  alt={product.images[0].alt}
                  className="aspect-[3/4] w-full object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="overflow-hidden rounded-md border border-slate-200">
                <Image
                  src={product.images[1].src}
                  alt={product.images[1].alt}
                  className="aspect-[3/4] w-full object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 overflow-hidden rounded-md border border-slate-200 sm:col-span-1 sm:row-span-2">
                <Image
                  src={product.images[0].src}
                  alt={product.images[0].alt}
                  className="h-full w-full object-cover sm:aspect-auto sm:min-h-[400px]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="overflow-hidden rounded-md border border-slate-200">
                <Image
                  src={product.images[1].src}
                  alt={product.images[1].alt}
                  className="aspect-[4/3] w-full object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="overflow-hidden rounded-md border border-slate-200">
                <Image
                  src={product.images[2].src}
                  alt={product.images[2].alt}
                  className="aspect-[4/3] w-full object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
            </div>
          )}
        </div>

        {/* Info */}
        <div className={isReversed ? "lg:[direction:ltr]" : ""}>
          <span className="inline-flex items-center gap-2 rounded-full bg-navy-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-navy-600">
            {product.category}
          </span>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            {product.name}
          </h2>
          <p className="mt-1 text-sm font-medium text-slate-400">
            Código: {product.code}
          </p>
          <p className="mt-4 text-lg leading-relaxed text-slate-500">
            {product.description}
          </p>

          {/* Specs */}
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
            {product.specs.map((spec) => (
              <div key={spec.label}>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  {spec.label}
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {spec.value}
                </p>
              </div>
            ))}
          </div>

          {/* Uses */}
          <div className="mt-8">
            <p className="text-sm font-bold text-slate-900">Aplicaciones</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.uses.map((use) => (
                <span
                  key={use}
                  className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-medium text-slate-600"
                >
                  {use}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <a
            href={`${companyInfo.whatsappHref.replace(
              "cotizar%20un%20proyecto",
              `cotizar%20${encodeURIComponent(product.name)}`
            )}`}
            className="btn-primary mt-8"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.75.75 0 00.913.913l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.319 0-4.478-.671-6.306-1.828l-.452-.279-2.677.897.897-2.677-.279-.452A9.953 9.953 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
            </svg>
            Cotizar este producto
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ProductosPage() {
  return (
    <>
      <Navbar />
      <main className="relative z-10">
        {/* Hero */}
        <section className="relative overflow-hidden bg-navy-950 px-5 pb-20 pt-36 sm:px-8 md:pb-28 md:pt-44 lg:px-10">
          <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-navy-500/10 blur-[120px]" />
          <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-navy-400/10 blur-[120px]" />
          <div className="container-custom relative text-center">
            <span className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.15em] text-navy-400">
              <span className="inline-block h-[3px] w-8 rounded-full bg-navy-400" />
              Catálogo
              <span className="inline-block h-[3px] w-8 rounded-full bg-navy-400" />
            </span>
            <h1 className="mt-5 text-4xl font-semibold text-white sm:text-5xl lg:text-6xl">
              Nuestros Productos
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-400">
              Soluciones acústicas e industriales fabricadas a medida. Cada
              producto es diseñado y producido según los requerimientos
              específicos de tu proyecto.
            </p>

            {/* Quick nav */}
            <div className="mx-auto mt-10 flex flex-wrap justify-center gap-3">
              {products.map((p) => (
                <a
                  key={p.id}
                  href={`#${p.id}`}
                  className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-slate-300 transition-all hover:border-navy-400/40 hover:bg-navy-500/10 hover:text-white"
                >
                  {p.name}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Products */}
        <div className="divide-y divide-slate-100">
          {products.map((product, i) => (
            <section
              key={product.id}
              className={`section-padding ${
                i % 2 === 0 ? "bg-white" : "bg-slate-50"
              }`}
            >
              <div className="container-custom">
                <ProductCard product={product} index={i} />
              </div>
            </section>
          ))}
        </div>

        {/* CTA final */}
        <section className="section-padding bg-navy-950 relative overflow-hidden">
          <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-navy-500/10 blur-[100px]" />
          <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-navy-400/10 blur-[100px]" />
          <div className="container-custom relative text-center">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              ¿Necesitas un producto a medida?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-slate-400">
              Fabricamos según tus especificaciones técnicas. Cuéntanos tu
              proyecto y te entregamos una cotización sin compromiso.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href={companyInfo.whatsappHref}
                className="btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Cotizar por WhatsApp
              </a>
              <Link href="/#contacto" className="btn-white">
                Formulario de contacto
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
