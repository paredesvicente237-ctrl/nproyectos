export type ProductSpec = { label: string; value: string };
export type ProductFaq = { question: string; answer: string };

export type Product = {
  id: string;
  slug: string;
  name: string;
  code: string;
  category: string;
  description: string;
  catalogSummary: string;
  searchHeading: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  seoTitle: string;
  seoDescription: string;
  datasheet: string;
  specs: ProductSpec[];
  uses: string[];
  faqs: ProductFaq[];
};

export const products: Product[] = [
  {
    id: "espuma-acustica",
    slug: "espuma-acustica",
    name: "Espuma Acústica",
    code: "NFonoAB",
    category: "Acústica",
    datasheet: "/fichas-tecnicas/espuma-acustica-nfonoab.pdf",
    seoTitle: "Espuma acústica NFonoAB para acondicionar salas | N Proyectos",
    seoDescription:
      "Espuma acústica NFonoAB de 60 × 60 cm para estudios, oficinas y recintos que requieren acondicionamiento acústico. Revisa especificaciones y ficha técnica.",
    description:
      "Espuma acústica para acondicionar estudios, salas de conferencias y otros recintos. Ayuda a controlar la reverberación en espacios donde se requiere mejorar el ambiente sonoro.",
    catalogSummary: "Material absorbente acústico en placas de 60 × 60 cm para acondicionar estudios, salas y oficinas.",
    searchHeading: "Espuma acústica NFonoAB para estudios y salas",
    primaryKeyword: "espuma acústica para estudios",
    secondaryKeywords: ["espuma acústica", "material absorbente acústico", "espuma acústica para salas"],
    faqs: [
      { question: "¿Qué formatos tiene la espuma acústica NFonoAB?", answer: "La ficha técnica indica placas de 60 × 60 cm, espesores de 4 cm y 6 cm, densidad de 20 kg/m³ y color gris." },
      { question: "¿En qué espacios se puede aplicar?", answer: "El catálogo la indica para estudios de grabación, teatros, cines, salas de conferencias, oficinas, aulas y sistemas de ventilación. Comparte el tipo de recinto y el objetivo acústico para revisar si corresponde a tu proyecto." },
      { question: "¿La espuma acústica sustituye un sistema de aislamiento?", answer: "La ficha la describe para acondicionamiento acústico y control de reverberación; no presenta un valor de aislamiento de un recinto. Comparte el ruido que quieres resolver para orientar la consulta." },
    ],
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
    slug: "panel-acustico-industrial",
    name: "Panel Acústico",
    code: "NAislanPANEL",
    category: "Control acústico",
    datasheet: "/fichas-tecnicas/panel-acustico-naislanpanel.pdf",
    seoTitle: "Paneles acústicos industriales en Chile | N Proyectos",
    seoDescription:
      "Panel acústico industrial NAislanPANEL de 97 × 300 cm para salas de máquinas, generadores y encierros. Consulta medidas especiales y cotización en Chile.",
    description:
      "Panel acústico industrial modular con terminación en metal galvanizado. Se utiliza para formar encierros y barreras acústicas en salas de máquinas, grupos electrógenos y otras instalaciones.",
    catalogSummary: "Panel acústico galvanizado para barreras y encierros de salas de máquinas y equipos industriales.",
    searchHeading: "Panel acústico industrial NAislanPANEL",
    primaryKeyword: "panel acústico industrial",
    secondaryKeywords: ["panel para sala de máquinas", "paneles para insonorización industrial", "panel acústico galvanizado"],
    faqs: [
      { question: "¿Cuál es la medida del panel NAislanPANEL?", answer: "La ficha técnica indica 97 × 300 cm como formato y espesores de 5 cm o 10 cm. También señala que se pueden consultar medidas especiales." },
      { question: "¿Para qué instalaciones se utiliza?", answer: "El catálogo incluye salas de bombas, salas de máquinas, grupos electrógenos, plantas de tratamiento, encierros de equipos, galpones y barreras." },
      { question: "¿Qué información conviene enviar para cotizar paneles acústicos?", answer: "Indica las dimensiones del área, el equipo o fuente de ruido, el tipo de montaje y la ubicación del proyecto. Si tienes planos o fotografías del lugar, puedes adjuntarlos a la consulta." },
    ],
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
    slug: "splitter-acustico",
    name: "Splitter Acústico",
    code: "NSplitter",
    category: "Acústica",
    datasheet: "/fichas-tecnicas/splitter-acustico-nsplitter.pdf",
    seoTitle: "Splitter acústico para ductos en Chile | N Proyectos",
    seoDescription:
      "Silenciador tipo splitter NSplitter para ductos HVAC y ventilación industrial. Fabricación a medida en galvanizado. Revisa ficha y cotiza en Chile.",
    description:
      "Splitter acústico para atenuar el ruido en ductos industriales y sistemas de ventilación. Su configuración se define según el flujo de aire y los requerimientos del proyecto.",
    catalogSummary: "Silenciador tipo splitter para atenuar ruido en ductos HVAC y sistemas de ventilación industrial.",
    searchHeading: "Splitter acústico para ductos de ventilación",
    primaryKeyword: "splitter acústico para ductos",
    secondaryKeywords: ["silenciador tipo splitter", "atenuador acústico para ductos", "splitter acústico industrial"],
    faqs: [
      { question: "¿Qué es un silenciador acústico tipo splitter?", answer: "Es un atenuador que se instala en ductos o sistemas de ventilación para controlar el ruido del flujo de aire. La configuración debe revisarse con los antecedentes del sistema." },
      { question: "¿Qué largo puede tener el NSplitter?", answer: "La ficha indica largos de hasta 3.000 mm y fabricación a medida. La selección final depende del ducto y de las condiciones de operación." },
      { question: "¿Qué datos necesito para solicitar una cotización?", answer: "Comparte las dimensiones del ducto, caudal o velocidad de aire si están disponibles, fuente de ruido, espacio de instalación y material requerido." },
    ],
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
    slug: "celosia-acustica",
    name: "Celosía Acústica",
    code: "NCelosía",
    category: "Acústica",
    datasheet: "/fichas-tecnicas/celosia-acustica-ncelosia.pdf",
    seoTitle: "Celosías acústicas para ventilación en Chile | N Proyectos",
    seoDescription:
      "Celosía acústica metálica para fachadas, salas de generadores y ventilación industrial. Fabricación en acero galvanizado o inoxidable según proyecto.",
    description:
      "Celosía acústica metálica que permite el paso de aire y ayuda a controlar la transmisión de ruido en fachadas, salas de generadores e instalaciones industriales.",
    catalogSummary: "Celosía metálica de ventilación acústica para fachadas y salas de equipos.",
    searchHeading: "Celosía acústica industrial para ventilación",
    primaryKeyword: "celosía acústica industrial",
    secondaryKeywords: ["celosía acústica para ventilación", "celosías para salas de generadores", "louver acústico metálico"],
    faqs: [
      { question: "¿Qué materiales se especifican para la celosía acústica?", answer: "La ficha contempla acero galvanizado o inoxidable, láminas inclinadas y acabados galvanizados o pintados." },
      { question: "¿La celosía permite ventilar una sala de equipos?", answer: "El producto está descrito para ventilación con atenuación acústica. Para evaluar un caso, se deben revisar el caudal requerido, el espacio disponible y la configuración del recinto." },
      { question: "¿Se fabrica en medidas especiales?", answer: "La ficha señala fabricación a medida y montaje empotrado o sobrepuesto. Envía dimensiones y fotografías del vano para revisar la solicitud." },
    ],
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
    slug: "silenciador-escape-gases",
    name: "Silenciador de Escape de Gases",
    code: "NSilenSE",
    category: "Control acústico industrial",
    datasheet: "/fichas-tecnicas/silenciador-escape-gases-nsilense.pdf",
    seoTitle: "Silenciadores de escape industriales en Chile | N Proyectos",
    seoDescription:
      "Silenciador industrial para escapes de motores, sopladores y bombas de vacío. NSilenSE se fabrica según los requerimientos de cada instalación.",
    description:
      "Silenciador de escape de gases para controlar ruido en motores de combustión interna, sopladores y bombas de vacío. Se fabrica según los requerimientos de cada instalación.",
    catalogSummary: "Silenciador industrial de escape de gases para motores, sopladores y bombas de vacío.",
    searchHeading: "Silenciador industrial de escape de gases NSilenSE",
    primaryKeyword: "silenciador industrial de escape de gases",
    secondaryKeywords: ["silenciador para grupo electrógeno", "silenciador para motores", "silenciador de escape industrial"],
    faqs: [
      { question: "¿Para qué equipos se ofrece el NSilenSE?", answer: "La ficha indica aplicaciones en admisiones y escapes de motores de combustión interna, descargas de sopladores y descargas de bombas de vacío." },
      { question: "¿Se puede definir la atenuación solo con el nombre del equipo?", answer: "No. La ficha diferencia categorías de atenuación, pero el resultado depende de las condiciones de operación y del sistema. Envía los datos del equipo y el objetivo del proyecto para revisión." },
      { question: "¿Qué antecedentes se requieren para cotizar un silenciador?", answer: "Comparte el tipo y modelo del equipo, gases o flujo, temperatura y presión si están disponibles, dimensiones de conexión, espacio y objetivo acústico." },
    ],
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
    slug: "panel-perforado",
    name: "Panel Perforado",
    code: "NPerfAB",
    category: "Acústica",
    datasheet: "/fichas-tecnicas/panel-perforado-nperfab.pdf",
    seoTitle: "Panel metálico perforado NPerfAB para revestimiento acústico | N Proyectos",
    seoDescription:
      "Panel metálico perforado para revestir muros y cielos acústicos en recintos industriales y comerciales. Acero galvanizado o inoxidable, a medida.",
    description:
      "Panel metálico perforado para revestimiento acústico de muros y cielos. Se utiliza junto con material absorbente en salas de máquinas y otros recintos industriales o comerciales.",
    catalogSummary: "Revestimiento acústico metálico perforado para muros y cielos, combinado con material absorbente.",
    searchHeading: "Panel metálico perforado para revestimiento acústico",
    primaryKeyword: "panel perforado acústico",
    secondaryKeywords: ["panel metálico perforado", "revestimiento acústico metálico", "paneles perforados para muros y cielos"],
    faqs: [
      { question: "¿El panel perforado se utiliza solo?", answer: "La ficha describe su uso junto con material absorbente para revestir muros y cielos. La composición completa se define según el recinto y el proyecto." },
      { question: "¿Qué materiales y espesores están disponibles?", answer: "El catálogo indica acero galvanizado o inoxidable y espesores de plancha de 0,5 a 1,5 mm, con perforación circular o según diseño." },
      { question: "¿Se puede cotizar con un patrón de perforación específico?", answer: "La ficha indica que la perforación puede ser circular o según diseño. Envía plano, dimensiones, material y cantidad para revisar la factibilidad." },
    ],
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
    slug: "pantalla-movil-soldadura",
    name: "Pantalla Móvil",
    code: "NMóvil",
    category: "Seguridad Industrial",
    datasheet: "/fichas-tecnicas/pantalla-movil-nmovil.pdf",
    seoTitle: "Pantalla móvil NMóvil para soldadura y esmerilado | N Proyectos",
    seoDescription:
      "Pantalla móvil plegable para separar y proteger áreas de soldadura y esmerilado. Estructura metálica con ruedas y paneles configurables.",
    description:
      "Pantalla móvil plegable para delimitar áreas de soldadura y esmerilado. Tiene estructura de acero, ruedas con freno y paneles translúcidos u opacos.",
    catalogSummary: "Biombo móvil para soldadura y esmerilado con paneles translúcidos u opacos.",
    searchHeading: "Pantalla móvil de soldadura NMóvil",
    primaryKeyword: "pantalla móvil para soldadura",
    secondaryKeywords: ["biombo industrial para soldar", "pantalla de protección para soldadura", "barrera móvil de soldadura"],
    faqs: [
      { question: "¿La pantalla móvil NMóvil se puede plegar?", answer: "Sí. La ficha describe tres cuerpos plegables y ruedas con freno para desplazar la pantalla y ubicarla en el área de trabajo." },
      { question: "¿Los paneles son transparentes u opacos?", answer: "El catálogo contempla paneles translúcidos u opacos. La elección debe confirmarse al solicitar la cotización." },
      { question: "¿Qué protege esta pantalla de soldadura?", answer: "Está indicada para separar espacios y delimitar áreas de soldadura o esmerilado. La ficha no especifica certificaciones ni niveles de protección, por lo que conviene confirmar las exigencias de seguridad de la faena." },
    ],
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
