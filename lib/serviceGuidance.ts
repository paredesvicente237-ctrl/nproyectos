type ServiceGuidance = {
  heading: string;
  introduction: string;
  checklist: string[];
  faqs: { question: string; answer: string }[];
  applications?: { title: string; text: string }[];
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
    applications: [
      { title: "Corte y plegado de acero inoxidable", text: "Para cubiertas, mobiliario y componentes inoxidables, indica el material especificado, espesor, medidas y terminación. Revisamos el corte y los pliegues necesarios para obtener la forma solicitada, sin asumir una calidad de acero ni una capacidad de máquina no confirmadas." },
      { title: "Perfiles y canales en acero carbono o galvanizado", text: "Comparte el plano de la sección, largo, ángulos y cantidad. Esos antecedentes permiten evaluar el desarrollo de la plancha y la secuencia de plegado para perfiles y canales según diseño." },
      { title: "Bandejas, paneles y piezas según plano", text: "Si la pieza necesita perforaciones, recortes, pliegues o soldadura posterior, incluye el diseño completo. Así se puede revisar el proceso de corte y la relación entre las medidas de la pieza plana y del componente terminado." },
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
    applications: [
      { title: "Fabricación en acero inoxidable", text: "El servicio contempla cubiertas, mobiliario y componentes metálicos a medida. Para revisar tu solicitud, envía la función de la pieza, material especificado, espesor, terminación y dimensiones; no es necesario partir de un producto estándar del catálogo." },
      { title: "Gabinetes, bandejas y ductería metálica", text: "Estos conjuntos pueden reunir piezas cortadas, plegadas y soldadas. Indica medidas interiores y exteriores, uniones, accesos o puntos de fijación definidos en el proyecto para delimitar qué se necesita fabricar." },
      { title: "Reposición de piezas y prototipos", text: "Una muestra o fotografías con medidas pueden ayudar a evaluar un componente de reposición o un desarrollo especial. Antes de fabricar se revisan el uso, las dimensiones críticas y los antecedentes que falten para definir el trabajo." },
    ],
    faqs: [
      { question: "¿Fabrican piezas según plano o muestra?", answer: "Sí. N Proyectos revisa planos, modelos, muestras y medidas para evaluar la fabricación de piezas y conjuntos metálicos. Si falta información, se define qué antecedentes se necesitan antes de cotizar." },
      { question: "¿La fabricación puede incluir corte, plegado y soldadura?", answer: "Sí. Estos procesos pueden integrarse en una misma solicitud. Indica si necesitas solo piezas cortadas, componentes plegados o un conjunto armado y soldado para delimitar el trabajo." },
      { question: "¿Puedo solicitar una pieza de reposición o un prototipo?", answer: "El servicio contempla reposiciones, prototipos y desarrollos especiales. Comparte la función de la pieza, sus medidas, material y condiciones de uso para revisar la factibilidad de tu solicitud." },
    ],
  },
  "soldadura-mig-tig": {
    heading: "Armado y soldadura industrial de piezas y conjuntos metálicos",
    introduction: "Puedes consultar por la unión de componentes que ya tienes o por un trabajo que integre fabricación, armado y soldadura. Revisamos material, geometría de las piezas, tipo de unión y terminación para definir el proceso adecuado. No se confirma una certificación, una tolerancia ni un procedimiento específico sin revisar los antecedentes del proyecto.",
    checklist: [
      "Material y espesor de las piezas que se necesitan unir.",
      "Plano o fotografías de las uniones y medidas del conjunto.",
      "Cantidad, terminación requerida y condiciones de uso.",
      "Indicar si entregas las piezas preparadas o si necesitas corte y plegado.",
      "Ubicación y alcance requerido para revisar las condiciones del trabajo.",
    ],
    applications: [
      { title: "Soldadura y armado en acero inoxidable", text: "Para componentes, cubiertas, campanas o ductería inoxidable, comparte el material especificado, los espesores y la terminación esperada. El equipo revisará el proceso MIG/TIG que corresponda al requerimiento; el nombre del material por sí solo no define la unión." },
      { title: "Conjuntos soldados en acero carbono", text: "La fabricación de soportes y estructuras puede integrar presentación, fijación y soldadura de componentes. Indica el uso del conjunto, las uniones del plano y las dimensiones que deben verificarse durante el armado." },
      { title: "Gabinetes, ductos y componentes industriales", text: "Cuando una solicitud incluye piezas cortadas o plegadas, especifica cuáles necesitan soldarse y si suministras los componentes. Esto permite distinguir un servicio de unión de una fabricación completa." },
    ],
    faqs: [
      { question: "¿Puedo solicitar solo soldadura de piezas que ya tengo?", answer: "Sí. El servicio publicado contempla componentes suministrados por el cliente. Comparte material, espesores, fotografías y el tipo de conjunto para confirmar factibilidad y alcance antes de llevar las piezas." },
      { question: "¿La solicitud puede incluir corte, plegado y armado?", answer: "Sí. Puedes consultar por un conjunto completo e indicar qué procesos necesitas. Se revisa el diseño para coordinar la preparación de las piezas y su unión." },
      { question: "¿Trabajan con acero inoxidable y acero carbono?", answer: "Ambos materiales forman parte de los servicios publicados. Indica la especificación del material y su espesor para evaluar el proceso y la terminación del proyecto concreto." },
      { question: "¿Puedo dar por incluida una soldadura certificada o trabajo en terreno?", answer: "No. El sitio no publica certificaciones ni confirma condiciones de trabajo en terreno para toda solicitud. Si tu proyecto exige un procedimiento, una acreditación o un lugar de ejecución específicos, indícalos para que el equipo confirme su disponibilidad y alcance." },
    ],
  },
  "estructuras-metalicas-industriales": {
    heading: "Estructuras y soportes industriales con un alcance definido",
    introduction: "Una estructura para soportar un equipo requiere revisar su función, geometría, uniones y puntos de fijación. La solicitud debe distinguir la fabricación del diseño estructural, los anclajes y el montaje. N Proyectos revisa los antecedentes para cotizar el alcance que corresponda; no se publica una capacidad de carga ni se ofrece un cálculo estructural automático.",
    checklist: [
      "Uso de la estructura o del soporte y equipo al que se destina.",
      "Planos disponibles y dimensiones generales: largo, ancho y alto.",
      "Material, perfiles o secciones especificadas, cantidad y terminación.",
      "Detalles de uniones y fijaciones, cargas y requisitos del proyecto cuando estén definidos.",
      "Lugar de entrega y necesidad de montaje para confirmar el alcance por separado.",
    ],
    faqs: [
      { question: "¿Fabrican estructuras metálicas según plano?", answer: "Sí. La fabricación de estructuras y soportes industriales está publicada dentro de las capacidades metalmecánicas. Envía los planos, dimensiones, material y detalles del proyecto para revisar el trabajo específico." },
      { question: "¿Puedo consultar si solo tengo medidas aproximadas?", answer: "Sí. Puedes comenzar indicando el uso y las dimensiones generales. El equipo revisará qué antecedentes técnicos faltan; las medidas preliminares no sustituyen los datos necesarios para confirmar cargas, uniones o anclajes." },
      { question: "¿La cotización incluye cálculo estructural y montaje?", answer: "No se deben asumir incluidos. Indica expresamente si necesitas diseño, revisión estructural, anclajes o montaje para que el equipo confirme qué puede ofrecer y qué información requiere." },
      { question: "¿Son lo mismo una estructura industrial y una pieza metalmecánica?", answer: "Una estructura o soporte se evalúa por la función del conjunto y sus fijaciones. La fabricación metalmecánica también abarca piezas individuales, gabinetes, bandejas y ductería. Puedes consultar el servicio general si tu requerimiento no corresponde a un conjunto estructural." },
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
