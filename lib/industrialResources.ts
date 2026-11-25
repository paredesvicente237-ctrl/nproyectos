export type IndustrialResourceSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type IndustrialResource = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  summary: string;
  updatedAt: string;
  serviceSlug: string;
  serviceLabel: string;
  productSlugs?: string[];
  sections: IndustrialResourceSection[];
  sources?: { label: string; href: string }[];
};

// Material práctico para orientar una solicitud; las capacidades particulares
// se confirman en cada cotización y no se deducen de la guía.
export const industrialResources: IndustrialResource[] = [
  {
    slug: "corte-laser-y-corte-con-guillotina",
    title: "Corte láser y corte con guillotina de planchas metálicas",
    seoTitle: "Corte láser y guillotina de planchas",
    description: "Cómo preparar una consulta por corte láser o corte con guillotina: geometría, material, espesor, cantidad y antecedentes útiles para evaluar una pieza.",
    summary: "El proceso depende de la forma de la pieza y de los antecedentes del trabajo. Aprende qué compartir para que el equipo pueda evaluar el corte.",
    updatedAt: "2026-11-25",
    serviceSlug: "corte-plegado-planchas",
    serviceLabel: "Corte y plegado de planchas",
    sections: [
      { heading: "El proceso se define a partir de la pieza", paragraphs: ["Una consulta de corte puede corresponder a una plancha con contorno, perforaciones o una línea recta. La geometría, el material, el espesor y la cantidad ayudan a determinar qué alternativa conviene revisar; no existe un único proceso correcto para todos los trabajos.", "En N Proyectos puedes consultar por corte láser y corte con guillotina. La disponibilidad y factibilidad se confirman al revisar los antecedentes concretos, sin asumir espesores máximos, tolerancias o plazos no publicados."] },
      { heading: "Qué enviar para revisar una cotización", paragraphs: ["Un plano o archivo de corte facilita entender el contorno y las dimensiones. Si todavía no tienes un archivo, también puedes iniciar con un croquis, fotografías de una muestra o medidas de referencia; el equipo te indicará si falta información para cotizar."], bullets: ["Material especificado y espesor de la plancha.", "Dimensiones generales y geometría de la pieza.", "Cantidad de piezas y, si corresponde, repetición del trabajo.", "Terminación o procesos posteriores que necesitas.", "Lugar de entrega o retiro y fecha objetivo, sujeta a confirmación."] },
      { heading: "No hace falta adivinar el proceso", paragraphs: ["Si no sabes si corresponde láser o guillotina, describe qué necesitas fabricar y comparte el plano o croquis. La evaluación considera la forma y los antecedentes del material; puedes solicitar solo el corte, sin plegado posterior.", "Cuando la pieza debe doblarse, indica su forma final y las medidas disponibles. No es necesario que traduzcas tu idea a términos técnicos: una foto, muestra o dibujo puede servir como punto de partida para aclarar el alcance."] },
    ],
  },
  {
    slug: "como-cotizar-corte-y-plegado",
    title: "Cómo cotizar corte y plegado de planchas",
    seoTitle: "Cómo cotizar corte y plegado de planchas",
    description: "Guía para solicitar corte y plegado de planchas en Santiago: planos o croquis, material, espesor, cantidad, forma final y entrega.",
    summary: "Una solicitud clara ayuda a revisar el trabajo completo, desde la plancha hasta la pieza plegada, sin exigir que el cliente conozca cada detalle de fabricación.",
    updatedAt: "2026-11-25",
    serviceSlug: "corte-plegado-planchas",
    serviceLabel: "Corte y plegado de planchas",
    sections: [
      { heading: "Parte por el resultado que necesitas", paragraphs: ["Describe para qué se usará la pieza y qué forma debe tener al final. Si tienes un plano, adjúntalo. Si aún no existe, puedes enviar un croquis con medidas principales, fotografías de una pieza similar o una muestra para evaluar qué antecedentes faltan.", "El equipo necesita distinguir entre corte de piezas planas, corte y plegado, y un conjunto que también requiera armado o soldadura. Explicar el resultado esperado ayuda a delimitar la cotización."] },
      { heading: "Antecedentes que aceleran la revisión", paragraphs: ["No hay que completar una ficha técnica compleja para iniciar. Comparte los datos que conozcas y deja explícito lo que aún está por definir."], bullets: ["Plano, archivo, croquis o fotografía con dimensiones de referencia.", "Material y espesor si están especificados.", "Cantidad de piezas y si todas son iguales.", "Forma final o sección que buscas; una imagen puede ayudar.", "Perforaciones, terminación, soldadura u otro proceso posterior.", "Comuna de entrega o retiro y fecha que tienes en mente."] },
      { heading: "Si no tienes ángulos o desarrollo", paragraphs: ["No tienes que calcular el desarrollo de la plancha ni describir el pliegue con fórmulas. Una vista lateral, una muestra o un dibujo de la forma final permite conversar sobre el alcance. Si una dimensión técnica es necesaria para fabricar con precisión, se solicita durante la revisión del proyecto, no como requisito para empezar a preguntar."] },
      { heading: "El alcance y el plazo se confirman para cada trabajo", paragraphs: ["La factibilidad, el proceso y la fecha se revisan según material, geometría, cantidad y carga de trabajo. La página no publica una tarifa universal ni un plazo garantizado; la cotización debe indicar qué se incluye y las condiciones acordadas."] },
    ],
  },
  {
    slug: "soldadura-mig-y-tig",
    title: "Soldadura MIG y TIG: diferencias para una solicitud industrial",
    seoTitle: "Soldadura MIG y TIG para proyectos industriales",
    description: "Orientación general sobre soldadura MIG y TIG, qué antecedentes compartir y cómo solicitar armado o unión de componentes metálicos.",
    summary: "MIG y TIG son procesos distintos. La elección depende del material, las piezas, la unión y la terminación; la evaluación debe realizarse para cada trabajo.",
    updatedAt: "2026-11-25",
    serviceSlug: "soldadura-mig-tig",
    serviceLabel: "Soldadura MIG/TIG",
    sections: [
      { heading: "Dos procesos de arco, aplicaciones distintas", paragraphs: ["MIG suele nombrar el proceso de soldadura por arco con electrodo consumible y protección gaseosa, clasificado como GMAW en terminología técnica. TIG suele nombrar GTAW: el arco se establece con un electrodo de tungsteno no consumible. La denominación comercial puede variar; confirma con el responsable técnico qué proceso corresponde a tu pieza.", "La diferencia del nombre no basta para elegir. Influyen el material, el espesor, la geometría, el tipo de unión, la posición y la terminación especificada. La guía es introductoria y no reemplaza un procedimiento de soldadura ni una revisión de ingeniería."] },
      { heading: "Qué información compartir", paragraphs: ["Para revisar un servicio de soldadura, indica si necesitas unir piezas que ya tienes o fabricar un conjunto completo. Adjunta planos o fotos de la unión y describe el material y el uso del conjunto."], bullets: ["Material base y espesores indicados, si los conoces.", "Fotografías o detalle de las uniones.", "Dimensiones y cantidad de componentes.", "Terminación visual o requisitos definidos en el plano.", "Si necesitas corte, plegado, armado, reparación o solo soldadura."] },
      { heading: "Aclara requisitos especiales antes de cotizar", paragraphs: ["Si el proyecto exige un procedimiento, inspección, certificación, ensayo o trabajo en terreno, menciónalo al comienzo para confirmar si forma parte del alcance posible. No se deben asumir certificaciones ni calificaciones que no estén expresamente acreditadas para el trabajo."] },
    ],
    sources: [{ label: "American Welding Society: introducción a GMAW/MIG", href: "https://www.aws.org/magazines-and-media/welding-digest/2025/june/wd-june-2025-what-is-gmaw/" }, { label: "American Welding Society: introducción a GTAW/TIG", href: "https://www.aws.org/magazines-and-media/welding-digest/2025/december/wd-dec-2025-what-is-gta-welding/" }],
  },
  {
    slug: "fabricacion-metalica-a-medida",
    title: "Fabricación metalmecánica a medida: de una necesidad a una pieza",
    seoTitle: "Fabricación metalmecánica a medida en Santiago",
    description: "Qué considerar al solicitar fabricación metalmecánica según plano, muestra o necesidad funcional: uso, medidas, material, cantidad y alcance.",
    summary: "Una fabricación puede comenzar con un plano terminado o con una necesidad de reposición. Estos antecedentes ayudan a definir lo que se necesita revisar antes de cotizar.",
    updatedAt: "2026-11-25",
    serviceSlug: "fabricacion-metalmecanica",
    serviceLabel: "Fabricación metalmecánica",
    sections: [
      { heading: "Describe la función antes que la solución", paragraphs: ["Si no conoces el nombre de la pieza, explica qué equipo o proceso debe atender, dónde se instala y qué problema buscas resolver. Las medidas, fotografías y una muestra ayudan a convertir esa necesidad en un alcance revisable.", "La fabricación puede integrar corte, plegado, armado y soldadura cuando el trabajo lo requiere. No todo proyecto necesita todos los procesos, y el diseño, cálculo, montaje o puesta en marcha deben confirmarse como alcances separados."] },
      { heading: "Antecedentes para una primera revisión", paragraphs: ["La información disponible puede ser parcial. Comparte lo que tienes y señala qué debe definirse; no presentes dimensiones aproximadas como si fueran medidas finales."], bullets: ["Uso de la pieza o conjunto y condiciones conocidas de operación.", "Plano, modelo, croquis, muestra o fotografías con referencias de medida.", "Material especificado, espesor, cantidad y terminación.", "Puntos de fijación, conexiones o tolerancias indicados en documentos.", "Ubicación, entrega y fecha requerida para delimitar la solicitud."] },
      { heading: "Una cotización útil deja claro qué incluye", paragraphs: ["Antes de aceptar, revisa que la propuesta identifique cantidades, material, procesos incluidos, terminación, entrega y cualquier supuesto pendiente. Para estructuras, cargas, anclajes y montaje necesitan definición propia; no se deducen de una foto ni de una cotización de fabricación."] },
    ],
  },
  {
    slug: "control-de-ruido-industrial",
    title: "Cómo empezar a evaluar un problema de ruido industrial",
    seoTitle: "Control de ruido industrial: cómo evaluar una solución",
    description: "Identifica la fuente, el camino de transmisión y el espacio receptor antes de cotizar paneles, splitters, celosías o silenciadores industriales.",
    summary: "El problema puede estar en una máquina, un ducto, una descarga o el recinto. Separar fuente, camino y receptor orienta la conversación, pero no sustituye mediciones ni diseño acústico.",
    updatedAt: "2026-11-25",
    serviceSlug: "control-acustico-industrial",
    serviceLabel: "Control acústico industrial",
    productSlugs: ["panel-acustico-industrial", "splitter-acustico", "celosia-acustica", "silenciador-escape-gases"],
    sections: [
      { heading: "Ubica la fuente y el camino del ruido", paragraphs: ["Anota qué equipo opera, cuándo se presenta el ruido y qué zona se quiere proteger. Después observa si el sonido se transmite por una pared o cerramiento, se propaga por un ducto, o sale por una admisión o escape. Esta descripción ayuda a orientar la consulta sin asumir una única solución.", "Las guías de prevención de ruido industrial suelen considerar la fuente, el recorrido de transmisión y el trabajador o espacio receptor. La intervención apropiada depende de condiciones de operación, instalación y mediciones que deben revisarse en contexto."] },
      { heading: "La solución depende de la aplicación", paragraphs: ["Un panel puede formar parte de un encierro o barrera; un splitter se integra a un ducto; una celosía se utiliza en vanos que requieren ventilación; un silenciador de gases se revisa para líneas de admisión o escape indicadas por la ficha. No son piezas intercambiables.", "Una ficha técnica describe un producto, pero no garantiza el resultado de un sistema instalado. Para evaluar la solicitud conviene compartir el equipo, dimensiones, flujo o datos disponibles, fotografías y restricciones del espacio."] },
      { heading: "Qué antecedentes reunir", paragraphs: ["Si existen mediciones, planos o requisitos del proyecto, inclúyelos. Si no, comienza con fotografías y una descripción clara de la fuente, el lugar y el objetivo. No hace falta comprar un producto antes de confirmar cuál problema necesita tratarse."], bullets: ["Equipo, proceso o fuente de ruido.", "Lugar donde se percibe y horarios de operación.", "Planos y fotos del recinto, ducto o conexión.", "Medidas, caudal o datos operacionales disponibles.", "Mediciones o límites exigidos por el proyecto, si existen."] },
    ],
    sources: [{ label: "NIOSH: controles de ingeniería para exposición a ruido", href: "https://www.cdc.gov/niosh/noise/prevent/engineering.html" }, { label: "OSHA: controles de exposición al ruido", href: "https://www.osha.gov/noise/exposure-controls" }],
  },
  {
    slug: "splitter-acustico-para-ductos",
    title: "Splitter acústico para ductos: qué revisar antes de cotizar",
    seoTitle: "Splitter acústico para ductos industriales",
    description: "Conoce qué antecedentes ayudan a evaluar un splitter acústico para ductos HVAC y ventilación industrial, y revisa la ficha NSplitter.",
    summary: "Un splitter acústico forma parte de una vía de aire. Ducto, flujo, espacio disponible y condición de montaje deben entenderse en conjunto.",
    updatedAt: "2026-11-25",
    serviceSlug: "control-acustico-industrial",
    serviceLabel: "Control acústico industrial",
    productSlugs: ["splitter-acustico"],
    sections: [
      { heading: "Qué hace y dónde se instala", paragraphs: ["El splitter NSplitter se describe en el catálogo de N Proyectos como un silenciador para ductos HVAC y sistemas de ventilación. Sus celdas se disponen dentro del recorrido del aire. La configuración debe evaluarse con dimensiones y condiciones de operación; el producto no reemplaza la revisión del sistema completo.", "La selección acústica y el comportamiento del flujo de aire están relacionados. Por eso no es suficiente elegir un largo o una separación a partir de una foto; los datos de la ficha deben cotejarse con los antecedentes reales de la instalación."] },
      { heading: "Datos que conviene enviar", paragraphs: ["Si están disponibles, adjunta un plano o una vista del ducto y explica el objetivo del proyecto. No es obligatorio contar con todos los datos para iniciar la conversación; indica cuáles no tienes."], bullets: ["Ancho, alto y recorrido del ducto.", "Caudal o velocidad de aire y datos del ventilador, si existen.", "Fuente de ruido y lugar donde se desea reducir su propagación.", "Espacio para montaje, acceso y conexión con el ducto.", "Requisito acústico o mediciones disponibles."] },
      { heading: "Revisa la ficha antes de comparar", paragraphs: ["La ficha del producto informa las especificaciones publicadas de NSplitter. Contrasta esos datos con tu proyecto y consulta por el alcance fabricable antes de asumir dimensiones, atenuación, pérdida de presión o compatibilidad."] },
    ],
  },
  {
    slug: "silenciador-de-escape-de-gases",
    title: "Silenciador de escape de gases para equipos industriales",
    seoTitle: "Silenciador de escape de gases NSilenSE",
    description: "Información del silenciador NSilenSE para admisión y escape de motores, sopladores y bombas de vacío; antecedentes útiles para revisar su aplicación.",
    summary: "La aplicación se define por el equipo, la línea y las condiciones de operación. Revisa la ficha del NSilenSE y comparte los datos disponibles antes de cotizar.",
    updatedAt: "2026-11-25",
    serviceSlug: "control-acustico-industrial",
    serviceLabel: "Control acústico industrial",
    productSlugs: ["silenciador-escape-gases"],
    sections: [
      { heading: "Distingue el escape de un ducto de ventilación", paragraphs: ["El catálogo de N Proyectos identifica NSilenSE para admisiones y escapes de motores, sopladores y bombas de vacío. Un ducto HVAC o de ventilación corresponde a otra aplicación y puede requerir revisar el producto splitter u otra solución.", "La conexión, el fluido, la temperatura y las condiciones de operación deben verificarse para cada equipo. Una fotografía puede orientar la conversación, pero no permite confirmar por sí sola compatibilidad o desempeño."] },
      { heading: "Qué datos ayudan a evaluar el equipo", paragraphs: ["Comparte el modelo del equipo y los datos de la línea que estén disponibles. Si hay mediciones o exigencias acústicas del proyecto, adjúntalas sin interpretarlas como garantía automática de resultado."], bullets: ["Tipo de motor, soplador o bomba y ficha del fabricante.", "Diámetro y configuración de la conexión.", "Condiciones de operación conocidas y espacio disponible.", "Fotografías o planos de la instalación.", "Objetivo acústico o requisito especificado."] },
      { heading: "Confirma condiciones con la ficha técnica", paragraphs: ["Las dimensiones y características de NSilenSE deben revisarse en su ficha junto con la instalación real. Si el proyecto requiere cálculo, medición, certificación o montaje, inclúyelo explícitamente para que se confirme si forma parte del alcance."] },
    ],
  },
  {
    slug: "panel-acustico-y-celosia-industrial",
    title: "Panel acústico y celosía: aplicaciones diferentes en una instalación",
    seoTitle: "Panel acústico y celosías industriales",
    description: "Compara cuándo revisar un panel acústico para barreras o encierros y cuándo una celosía acústica para vanos con ventilación.",
    summary: "El panel y la celosía responden a condiciones distintas de espacio, ventilación, montaje y control de ruido. La aplicación concreta define qué producto revisar.",
    updatedAt: "2026-11-25",
    serviceSlug: "control-acustico-industrial",
    serviceLabel: "Control acústico industrial",
    productSlugs: ["panel-acustico-industrial", "celosia-acustica", "espuma-acustica"],
    sections: [
      { heading: "Panel para encierros y barreras", paragraphs: ["NAislanPANEL se presenta en el catálogo para formar encierros o barreras alrededor de instalaciones y equipos, por ejemplo salas de máquinas. Para evaluar un caso, indica el área a cubrir, fuente de ruido, puertas o accesos, puntos de apoyo y espacio de montaje.", "Una envolvente no debe bloquear accesos ni resolver por sí sola necesidades de ventilación, disipación térmica o seguridad. Esos requisitos deben revisarse con el equipo responsable de la instalación."] },
      { heading: "Celosía cuando se requiere paso de aire", paragraphs: ["NCelosía está descrita como una solución metálica para vanos y fachadas que necesitan ventilación. La geometría, el caudal y el área libre importan junto con el objetivo acústico. Comparte las dimensiones del vano y la condición de montaje para saber qué debe confirmarse."] },
      { heading: "Acondicionamiento interior no es lo mismo que aislamiento", paragraphs: ["La espuma NFonoAB se describe para acondicionamiento acústico y control de reverberación en recintos. No se debe asumir que una espuma, un panel de cerramiento o una celosía produzcan el mismo efecto. Identifica si buscas tratar reflexiones dentro de una sala, reducir transmisión hacia otra zona o mantener ventilación."] },
      { heading: "Antecedentes para orientar la consulta", paragraphs: ["Si no sabes cuál producto corresponde, explica qué equipo genera ruido, qué área está afectada y si el recinto requiere ingreso de aire. Incluye plano, medidas, fotos, caudal o mediciones cuando estén disponibles; la selección final se revisa según la instalación."] },
    ],
  },
  {
    slug: "factores-de-una-cotizacion-metalica",
    title: "Qué factores se revisan al cotizar una pieza metálica",
    seoTitle: "Cotización de piezas metálicas: datos que influyen",
    description: "Material, dimensiones, cantidad, geometría y procesos son antecedentes que ayudan a evaluar una cotización metalmecánica; no existe un precio universal por pieza.",
    summary: "Una solicitud completa hace más fácil delimitar el trabajo, comparar alcances y aclarar qué información falta antes de confirmar precio y plazo.",
    updatedAt: "2026-11-25",
    serviceSlug: "fabricacion-metalmecanica",
    serviceLabel: "Fabricación metalmecánica",
    sections: [
      { heading: "El material y la geometría cambian el alcance", paragraphs: ["La cotización debe identificar el material especificado, espesor, dimensiones y geometría de la pieza. En trabajos con planchas, contornos, perforaciones, pliegues y desperdicio de material pueden cambiar la preparación y los procesos que se necesitan revisar.", "Por eso un precio genérico por kilo o por corte no basta para comparar trabajos distintos. El valor debe corresponder a un alcance y una cantidad concretos."] },
      { heading: "Procesos, cantidad y terminación", paragraphs: ["Aclara si necesitas solo una pieza cortada, un componente plegado o un conjunto armado y soldado. Cantidad, repetición, terminación, tolerancias del plano y procesos posteriores ayudan a determinar el trabajo que se está cotizando."], bullets: ["Plano, archivo, croquis o muestra.", "Material, espesor y cantidad.", "Procesos incluidos y terminación esperada.", "Dimensiones críticas y tolerancias que sí estén documentadas.", "Entrega, retiro y fecha requerida, sujetas a confirmación."] },
      { heading: "Compara propuestas equivalentes", paragraphs: ["Antes de comparar proveedores, verifica material, cantidades, terminaciones, tolerancias, embalaje, transporte y qué partidas están excluidas. Pregunta qué supuestos se usaron si algún antecedente no estaba disponible.", "N Proyectos no publica un tarifario universal para estos servicios. Precio y plazo se confirman en una cotización según los datos y el alcance del proyecto; una guía no reemplaza esa evaluación."] },
    ],
  },
];

export const industrialResourcesBySlug = Object.fromEntries(
  industrialResources.map((resource) => [resource.slug, resource]),
) as Record<string, IndustrialResource>;
