export const salesContact = {
  name: "Américo Véliz",
  role: "Cotizaciones y ventas",
  phoneDisplay: "+56 9 5010 7432",
  phoneInternational: "+56950107432",
  phoneHref: "tel:+56950107432",
  email: "ventasnproyectosltda@gmail.com",
  emailHref: "mailto:ventasnproyectosltda@gmail.com",
  whatsappHref:
    "https://wa.me/56950107432?text=Hola%20Am%C3%A9rico%2C%20quiero%20cotizar%20un%20proyecto%20con%20N%20Proyectos.",
};

export const companyInfo = {
  legalName: "N Proyectos Ltda",
  shortName: "N Proyectos",
  tagline: "Servicios y Proyectos en Aceros",
  website: "https://www.nproyectos.cl",
  phoneDisplay: salesContact.phoneDisplay,
  phoneInternational: salesContact.phoneInternational,
  phoneHref: salesContact.phoneHref,
  email: salesContact.email,
  emailHref: salesContact.emailHref,
  address: "Av. Yungay 743, La Granja",
  streetAddress: "Av. Yungay 743",
  locality: "La Granja",
  region: "Región Metropolitana",
  country: "CL",
  serviceArea: "Santiago y Región Metropolitana, Chile",
  whatsappHref: salesContact.whatsappHref,
  mapsEmbed:
    "https://www.google.com/maps?q=Av.+Yungay+743,+La+Granja,+Chile&output=embed",
};

export const navLinks = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Quiénes Somos", href: "/#nosotros" },
  { label: "Servicios", href: "/#especialidades" },
  { label: "Equipamiento", href: "/#equipamiento" },
  { label: "Productos", href: "/productos" },
  { label: "Cotizador VA", href: "/cotizador" },
  { label: "GDF", href: "/generador-formulas" },
  { label: "Contacto", href: "/#contacto" },
];
