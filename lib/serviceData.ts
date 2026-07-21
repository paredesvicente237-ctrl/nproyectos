import { siteAssets } from "@/components/siteAssets";

export type Service = {
  slug: string;
  name: string;
  shortName: string;
  eyebrow: string;
  title: string;
  description: string;
  summary: string;
  image: typeof siteAssets.goodBending;
  imageAlt: string;
  benefits: string[];
  applications: string[];
  materials: string[];
  process: { title: string; text: string }[];
};

export const services: Service[] = [
  {
    slug: "fabricacion-metalmecanica",
    name: "Fabricación metalmecánica en Santiago",
    shortName: "Fabricación metalmecánica",
    eyebrow: "Fabricación industrial",
    title: "Fabricación metalmecánica para proyectos industriales",
    description:
      "Fabricación metalmecánica en Santiago para minería, manufactura, construcción e industria. Desarrollamos piezas, estructuras y equipos en acero a medida.",
    summary:
      "Transformamos planos, prototipos o requerimientos funcionales en piezas, partes y soluciones industriales fabricables. Integramos revisión técnica, selección de materiales, corte, conformado, armado y soldadura para reducir coordinaciones y mantener visible cada decisión del proyecto.",
    image: siteAssets.goodSparks,
    imageAlt: "Trabajo de fabricación metalmecánica y soldadura en acero",
    benefits: [
      "Desarrollo desde planos, modelos CAD o una necesidad funcional",
      "Fabricación de piezas únicas, conjuntos y soluciones a medida",
      "Coordinación de corte, plegado, armado y soldadura",
      "Revisión de factibilidad y optimización de materiales",
    ],
    applications: [
      "Estructuras y soportes industriales",
      "Gabinetes, bandejas y ductería",
      "Campanas y piping",
      "Mobiliario y cubiertas de acero inoxidable",
      "Prototipos y equipos especiales",
      "Piezas y partes para mantenimiento",
    ],
    materials: ["Acero carbono", "Acero inoxidable", "Acero galvanizado", "Aluminio", "Cobre", "Bronce"],
    process: [
      { title: "Levantamiento", text: "Revisamos uso, medidas, cantidades, material, tolerancias y plazo requerido." },
      { title: "Desarrollo", text: "Validamos la solución y preparamos planos o modelos para fabricación cuando el proyecto lo requiere." },
      { title: "Fabricación", text: "Coordinamos los procesos productivos y verificamos dimensiones y terminaciones." },
      { title: "Entrega", text: "Acordamos el retiro o despacho de la solución terminada según el alcance." },
    ],
  },
  {
    slug: "corte-plegado-planchas",
    name: "Corte y plegado de planchas en Santiago",
    shortName: "Corte y plegado de planchas",
    eyebrow: "Conformado de metales",
    title: "Corte y plegado de planchas metálicas a medida",
    description:
      "Servicio de corte láser, corte con guillotina y plegado de planchas en Santiago. Trabajamos acero carbono, inoxidable, galvanizado y otros metales.",
    summary:
      "Fabricamos componentes metálicos a partir de planos, archivos de corte, muestras o medidas. Seleccionamos el proceso de corte y conformado según geometría, material, espesor y terminación esperada, con apoyo técnico para convertir cada requerimiento en una pieza fabricable.",
    image: siteAssets.goodBending,
    imageAlt: "Plegado de plancha metálica en taller industrial",
    benefits: [
      "Corte láser y corte con guillotina según el requerimiento",
      "Plegado de perfiles, canales, bandejas y cubiertas",
      "Apoyo en desarrollo de piezas y optimización de material",
      "Trabajo a medida para proyectos y reposición de componentes",
    ],
    applications: [
      "Perfiles y canales plegados",
      "Bandejas y ductos metálicos",
      "Paneles y gabinetes",
      "Cubiertas y mobiliario inoxidable",
      "Piezas para armado y soldadura",
      "Componentes según plano",
    ],
    materials: ["Acero carbono", "Acero inoxidable", "Galvanizado", "Aluminio", "Plancha diamantada", "Plancha perforada"],
    process: [
      { title: "Revisión", text: "Recibimos el plano, archivo, muestra o medidas y revisamos material, espesor y cantidad." },
      { title: "Preparación", text: "Definimos desarrollos, secuencia de plegado y aprovechamiento de plancha." },
      { title: "Corte y plegado", text: "Ejecutamos los procesos definidos para obtener la geometría solicitada." },
      { title: "Control", text: "Verificamos medidas principales y coordinamos entrega o procesos posteriores." },
    ],
  },
  {
    slug: "soldadura-mig-tig",
    name: "Soldadura MIG y TIG en Santiago",
    shortName: "Soldadura MIG/TIG",
    eyebrow: "Armado y soldadura",
    title: "Soldadura MIG y TIG para fabricación industrial",
    description:
      "Servicios de soldadura MIG y TIG en Santiago para acero carbono, acero inoxidable y fabricación industrial. Armado de piezas, estructuras y equipos a medida.",
    summary:
      "Realizamos armado y soldadura como parte de proyectos metalmecánicos o sobre componentes suministrados por el cliente. Elegimos el proceso de unión de acuerdo con el material, la geometría y la terminación requerida, integrándolo con corte, plegado y fabricación cuando el proyecto necesita una solución completa.",
    image: siteAssets.goodWelding,
    imageAlt: "Soldadura industrial MIG y TIG de componentes metálicos",
    benefits: [
      "Soldadura MIG y TIG para diferentes aplicaciones industriales",
      "Armado a partir de planos, piezas cortadas o conjuntos existentes",
      "Trabajo en acero carbono, inoxidable y otros metales",
      "Integración con fabricación de piezas y terminaciones",
    ],
    applications: [
      "Campanas y ductería",
      "Piping y equipos industriales",
      "Gabinetes y cabinas",
      "Puertas y portones acústicos",
      "Estructuras y soportes",
      "Reparación o modificación de componentes",
    ],
    materials: ["Acero carbono", "Acero inoxidable", "Acero galvanizado", "Aluminio"],
    process: [
      { title: "Definición", text: "Revisamos planos, material base, uniones, terminación y condiciones de servicio." },
      { title: "Preparación", text: "Preparamos piezas, bordes, puntos de referencia y secuencia de armado." },
      { title: "Armado", text: "Presentamos y fijamos los componentes para controlar geometría y dimensiones." },
      { title: "Soldadura", text: "Ejecutamos la unión y verificamos la terminación acordada para el conjunto." },
    ],
  },
  {
    slug: "control-acustico-industrial",
    name: "Control acústico industrial en Chile",
    shortName: "Control acústico industrial",
    eyebrow: "Acústica y ruido",
    title: "Soluciones de control acústico para industria y edificación",
    description:
      "Diseño y fabricación de soluciones de control acústico industrial: splitters, celosías, paneles perforados, pantallas, cabinas y atenuadores a medida.",
    summary:
      "Diseñamos y fabricamos soluciones metálicas para reducir o controlar la propagación de ruido en sistemas de ventilación, salas de máquinas, fachadas y recintos industriales. Cada elemento se desarrolla según el espacio disponible, el flujo de aire, la forma de instalación y las necesidades del proyecto.",
    image: siteAssets.fotobuenax2,
    imageAlt: "Fabricación de solución metálica para control acústico industrial",
    benefits: [
      "Soluciones fabricadas según medidas y condiciones del proyecto",
      "Integración de desempeño acústico, ventilación y montaje",
      "Desarrollo de componentes metálicos y material absorbente",
      "Apoyo desde la definición hasta la fabricación",
    ],
    applications: [
      "Salas de máquinas y generadores",
      "Sistemas HVAC y ductos",
      "Fachadas y tomas de aire",
      "Recintos industriales",
      "Cabinas y barreras acústicas",
      "Estudios, oficinas y salas técnicas",
    ],
    materials: ["Acero galvanizado", "Acero inoxidable", "Panel metálico perforado", "Lana mineral", "Espuma acústica"],
    process: [
      { title: "Antecedentes", text: "Revisamos fuente de ruido, espacio, ventilación, montaje y objetivo del proyecto." },
      { title: "Propuesta", text: "Definimos la tipología, dimensiones, materiales y configuración fabricable." },
      { title: "Fabricación", text: "Producimos paneles, splitters, celosías, pantallas u otros componentes a medida." },
      { title: "Coordinación", text: "Entregamos la solución y los antecedentes necesarios para su instalación según alcance." },
    ],
  },
];

export const servicesBySlug = Object.fromEntries(
  services.map((service) => [service.slug, service])
) as Record<string, Service>;
