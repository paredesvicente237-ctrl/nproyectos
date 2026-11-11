type ServiceGuidance = {
  heading: string;
  introduction: string;
  checklist: string[];
  faqs: { question: string; answer: string }[];
};

// Commercial guidance derived from the published services and product datasheets.
// No machine capacity, tolerance, lead time or acoustic result is guaranteed here.
export const serviceGuidance: Record<string, ServiceGuidance | undefined> = {
  "corte-plegado-planchas": {
    heading: "Corte de planchas y piezas plegadas según tu diseño",
    introduction: "Una pieza plana, un perfil plegado y un conjunto que después se soldará requieren antecedentes distintos. Revisamos el diseño para definir si corresponde corte láser, guillotina, plegado o una combinación de procesos. Atendemos consultas desde La Granja, Santiago; la factibilidad se confirma para cada material, espesor y geometría.",
    checklist: [
      "Plano, archivo de corte o croquis con medidas y unidades.",
      "Material, espesor de la plancha y cantidad de piezas.",
      "Para plegado: forma final, medidas de las caras y ángulos requeridos.",
      "Perforaciones, terminación, tolerancias indicadas en plano y procesos posteriores.",
      "Comuna de entrega o retiro y fecha requerida, sujeta a confirmación.",
    ],
    faqs: [
      { question: "¿Puedo cotizar corte y plegado en un mismo trabajo?", answer: "Sí. Revisamos ambos procesos para piezas como bandejas, canales, perfiles, paneles y gabinetes. Indica la geometría final y si el componente necesita armado o soldadura después del plegado." },
      { question: "¿Cuándo corresponde corte láser y cuándo guillotina?", answer: "La elección se revisa según la geometría, el material, el espesor y la cantidad. Enviar el plano permite evaluar qué proceso corresponde; no todos los trabajos requieren la misma solución de corte." },
      { question: "¿Puedo consultar si todavía no tengo un plano?", answer: "Puedes enviar un croquis, una muestra o fotografías con medidas. El equipo revisará si esos antecedentes bastan para cotizar o si se necesita desarrollar el diseño antes de fabricar." },
      { question: "¿Publican un precio por corte o un espesor máximo?", answer: "No hay una tarifa ni un espesor máximo universal publicado. Para confirmar factibilidad y valor necesitamos conocer material, espesor, geometría, cantidad y terminación. El plazo también se confirma en la cotización." },
    ],
  },
  "fabricacion-metalmecanica": {
    heading: "Fabricación metalmecánica desde una pieza hasta un conjunto",
    introduction: "La fabricación puede comenzar con un plano definido o con una necesidad de reposición, soporte o desarrollo. Revisamos el uso de la pieza y los procesos necesarios para integrar corte, plegado, armado y soldadura. Puedes consultar por componentes, estructuras, gabinetes, ductería y soluciones a medida desde nuestro taller en La Granja, Santiago.",
    checklist: [
      "Uso del componente, equipo o conjunto que necesitas fabricar.",
      "Plano, croquis, muestra o fotografías con dimensiones de referencia.",
      "Material, espesor, cantidad y terminación requerida.",
      "Uniones, puntos de fijación y tolerancias que deban respetarse.",
      "Ubicación del proyecto y fecha requerida para evaluar el alcance.",
    ],
    faqs: [
      { question: "¿Fabrican piezas según plano o muestra?", answer: "Sí. N Proyectos revisa planos, modelos, muestras y medidas para evaluar la fabricación de piezas y conjuntos metálicos. Si falta información, se define qué antecedentes se necesitan antes de cotizar." },
      { question: "¿La fabricación puede incluir corte, plegado y soldadura?", answer: "Sí. Estos procesos pueden integrarse en una misma solicitud. Indica si necesitas solo piezas cortadas, componentes plegados o un conjunto armado y soldado para delimitar el trabajo." },
      { question: "¿Puedo solicitar una pieza de reposición o un prototipo?", answer: "El servicio contempla reposiciones, prototipos y desarrollos especiales. Comparte la función de la pieza, sus medidas, material y condiciones de uso para revisar la factibilidad de tu solicitud." },
    ],
  },
  "control-acustico-industrial": {
    heading: "Control de ruido según la fuente, el recinto y la ventilación",
    introduction: "No es lo mismo acondicionar una sala que tratar un ducto de ventilación o el escape de un motor. El catálogo diferencia espuma absorbente, paneles para encierros y barreras, splitters para ductos, celosías de ventilación y silenciadores de escape de gases. La selección requiere revisar el uso y las condiciones de instalación; una ficha por sí sola no garantiza el resultado acústico del conjunto.",
    checklist: [
      "Equipo o fuente de ruido y objetivo de la intervención.",
      "Medidas del recinto, ducto, vano o conexión disponible.",
      "Planos y fotografías de la instalación y del espacio para montaje.",
      "Caudal de aire o datos de operación del equipo, cuando estén disponibles.",
      "Mediciones o requisitos acústicos del proyecto, si existen, y su ubicación.",
    ],
    faqs: [
      { question: "¿Qué diferencia hay entre un panel acústico y un splitter?", answer: "El panel NAislanPANEL se utiliza para formar encierros y barreras en instalaciones como salas de máquinas. El NSplitter está descrito para atenuar ruido en ductos y sistemas de ventilación. Se seleccionan según aplicaciones y condiciones diferentes." },
      { question: "¿Qué solución permite ventilar una sala de equipos?", answer: "El catálogo contempla celosías acústicas para vanos y fachadas, y splitters para ductos. Se deben revisar caudal, dimensiones y espacio disponible; elegir un producto solo por su tamaño no confirma el desempeño del sistema." },
      { question: "¿Los silenciadores de escape sirven para cualquier sistema de ventilación?", answer: "El NSilenSE se ofrece para admisiones y escapes de motores, sopladores y bombas de vacío. Para ductos HVAC el catálogo incluye NSplitter. Comparte los datos del equipo para orientar la solicitud al producto correspondiente." },
      { question: "¿Se puede garantizar una reducción de ruido sin revisar la instalación?", answer: "No. Los valores y categorías de las fichas deben interpretarse con las condiciones de operación, el montaje y el sistema completo. Indica los requisitos y mediciones disponibles para que el equipo revise el proyecto." },
    ],
  },
};
