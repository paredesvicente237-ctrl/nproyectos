import type { StaticImageData } from "next/image";
import { siteAssets } from "@/components/siteAssets";

export type ProductImage = { src: StaticImageData; alt: string };

export const productImages: Record<string, ProductImage[]> = {
  "espuma-acustica": [
    { src: siteAssets.espumaAcustica, alt: "Imagen referencial de espuma acústica NFonoAB" },
    { src: siteAssets.espumaAplicacion, alt: "Imagen referencial de espuma acústica instalada en cielo" },
    { src: siteAssets.espumaEstudio, alt: "Imagen referencial de espuma acústica en estudio de grabación" },
  ],
  "panel-acustico-naislanpanel": [
    { src: siteAssets.naislanPanelProducto, alt: "Imagen referencial de panel acústico NAislanPANEL galvanizado" },
    { src: siteAssets.naislanPanelAplicacion, alt: "Imagen referencial de encierro industrial con paneles acústicos NAislanPANEL" },
  ],
  splitter: [{ src: siteAssets.splitter, alt: "Imagen referencial de splitter acústico de acero galvanizado para ductos" }],
  celosia: [{ src: siteAssets.celosia, alt: "Imagen referencial de celosía acústica metálica para ventilación" }],
  "silenciador-escape-gases": [{ src: siteAssets.silenciadorEscapeGases, alt: "Imagen referencial de silenciador industrial de escape de gases NSilenSE" }],
  "panel-perforado": [
    { src: siteAssets.panelPerforado, alt: "Imagen referencial de panel metálico perforado para revestimiento acústico" },
    { src: siteAssets.panelAplicacion, alt: "Imagen referencial de panel perforado instalado en cielo" },
  ],
  "pantalla-movil": [{ src: siteAssets.pantallaMovil, alt: "Imagen referencial de pantalla móvil plegable para soldadura" }],
};
