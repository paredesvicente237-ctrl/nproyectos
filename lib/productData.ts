export type ProductSpec = { label: string; value: string };

export type Product = {
  id: string;
  name: string;
  code: string;
  category: string;
  description: string;
  datasheet: string;
  specs: ProductSpec[];
  uses: string[];
};

export const products: Product[] = [
  {
    id: "espuma-acustica",
    name: "Espuma Acústica",
    code: "NFonoAB",
    category: "Acústica",
    datasheet: "/fichas-tecnicas/espuma-acustica-nfonoab.pdf",
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
  },
  {
    id: "panel-acustico-naislanpanel",
    name: "Panel Acústico",
    code: "NAislanPANEL",
    category: "Control acústico",
    datasheet: "/fichas-tecnicas/panel-acustico-naislanpanel.pdf",
    description:
      "Panel acústico modular con terminación en metal galvanizado, diseñado para reducir la transmisión de ruido y formar encierros o barreras resistentes para instalaciones industriales.",
    specs: [
      { label: "Dimensión", value: "97 x 300 cm" },
      { label: "Espesores", value: "5 cm / 10 cm" },
      { label: "Aislación", value: "35 a 45 Rw" },
      { label: "Terminación", value: "Metal galvanizado" },
      { label: "Propiedades", value: "Ignífugo y resistente a la corrosión" },
      { label: "Fabricación", value: "Medidas especiales a pedido" },
    ],
    uses: [
      "Salas de bombas",
      "Salas de máquinas",
      "Grupos electrógenos",
      "Plantas de tratamiento de aguas",
      "Encierros de equipos",
      "Galpones",
      "Pantallas y barreras",
    ],
  },
  {
    id: "splitter",
    name: "Splitter Acústico",
    code: "NSplitter",
    category: "Acústica",
    datasheet: "/fichas-tecnicas/splitter-acustico-nsplitter.pdf",
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
  },
  {
    id: "celosia",
    name: "Celosía Acústica",
    code: "NCelosía",
    category: "Acústica",
    datasheet: "/fichas-tecnicas/celosia-acustica-ncelosia.pdf",
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
  },
  {
    id: "silenciador-escape-gases",
    name: "Silenciador de Escape de Gases",
    code: "NSilenSE",
    category: "Control acústico industrial",
    datasheet: "/fichas-tecnicas/silenciador-escape-gases-nsilense.pdf",
    description:
      "Silenciador diseñado para controlar el ruido en admisiones y escapes de motores de combustión interna, sopladores y bombas de vacío, con fabricación según los requerimientos de cada instalación.",
    specs: [
      { label: "Grado industrial", value: "12 a 18 dBA N.R." },
      { label: "Grado residencial", value: "20 a 25 dBA N.R." },
      { label: "Grado crítico", value: "25 a 32 dBA N.R." },
      { label: "Grado súper crítico", value: "30 a 38 dBA N.R." },
      { label: "Grado hospitalario", value: "35 a 50 dBA N.R." },
      { label: "Fabricación", value: "A medida; accesorios disponibles" },
    ],
    uses: [
      "Admisiones y escapes de motores de combustión interna",
      "Admisiones y descargas de sopladores",
      "Descargas de bombas de vacío",
    ],
  },
  {
    id: "panel-perforado",
    name: "Panel Perforado",
    code: "NPerfAB",
    category: "Acústica",
    datasheet: "/fichas-tecnicas/panel-perforado-nperfab.pdf",
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
  },
  {
    id: "pantalla-movil",
    name: "Pantalla Móvil",
    code: "NMóvil",
    category: "Seguridad Industrial",
    datasheet: "/fichas-tecnicas/pantalla-movil-nmovil.pdf",
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
  },
];
