# Cobertura orgánica de búsquedas industriales

12 de noviembre de 2026. N Proyectos. Sin campañas pagadas.

## Criterio

La cobertura corresponde a servicios y productos publicados, no a «todas las palabras de la industria». No se estimaron volúmenes de búsqueda, posiciones ni ventas. Cada familia tiene una página principal y enlaces relacionados, en lugar de crear páginas repetidas para cada sinónimo o comuna. No se añadieron etiquetas meta keywords, texto oculto, opiniones ni capacidades de maquinaria inventadas.

## Familias y página principal

Las expresiones son temas relevantes para redactar contenido útil, no un listado que deba copiarse literalmente al sitio.

| Familia | Ejemplos de consultas cubiertas | Página principal |
| --- | --- | --- |
| Maestranza | maestranza industrial, taller metalmecánico, maestranza en Santiago, maestranza en La Granja | `/maestranza-santiago` |
| Fabricación | fabricación metalmecánica, piezas metálicas a medida, fabricación según plano, prototipos metálicos, reposición de piezas | `/servicios/fabricacion-metalmecanica` |
| Estructuras | fabricación de estructuras metálicas industriales, soportes metálicos para equipos, conjuntos soldados según plano | `/servicios/estructuras-metalicas-industriales` (nueva) |
| Corte y plegado | corte láser de planchas, corte con guillotina, plegado de acero inoxidable, plegado de acero carbono, perfiles y canales plegados | `/servicios/corte-plegado-planchas` |
| Inoxidable y conjuntos | fabricación en acero inoxidable, cubiertas y mobiliario inoxidable, gabinetes metálicos, bandejas, ductería | `/servicios/fabricacion-metalmecanica` |
| Soldadura | soldadura MIG, soldadura TIG, armado y soldadura industrial, soldadura de acero inoxidable, conjuntos soldados en acero carbono | `/servicios/soldadura-mig-tig` |
| Ruido industrial | control acústico industrial, control de ruido industrial, soluciones para salas de máquinas, cabinas y barreras según proyecto | `/servicios/control-acustico-industrial` |
| Paneles | paneles acústicos industriales, panel para salas de máquinas, paneles para encierros de equipos, panel acústico galvanizado | `/productos/panel-acustico-industrial` |
| Ductos HVAC | splitter acústico, atenuador para ductos, silenciador tipo splitter, ruido en ventilación industrial | `/productos/splitter-acustico` |
| Ventilación de recintos | celosía acústica, celosía metálica de ventilación, louver acústico, ventilación de salas de generadores | `/productos/celosia-acustica` |
| Escapes | silenciador industrial de escape de gases, silenciador para motores, silenciador para grupos electrógenos | `/productos/silenciador-escape-gases` |
| Revestimientos | panel metálico perforado, revestimiento acústico metálico, paneles perforados para muros y cielos | `/productos/panel-perforado` |
| Absorción | espuma acústica, material absorbente acústico, acondicionamiento de salas, control de reverberación | `/productos/espuma-acustica` |
| Separación de trabajos | pantalla móvil para soldadura, biombo para soldadura, pantalla para esmerilado | `/productos/pantalla-movil-soldadura` |

## Implementación de esta ampliación

- Una nueva página de servicio, estructuras metálicas industriales, con contenido de fabricación, antecedentes, límites de alcance y preguntas frecuentes propios. No ofrece cálculo estructural, cargas, montaje ni certificaciones sin confirmación.
- Enlaces desde inicio, maestranza, fabricación y pie de página. El sitemap y el catálogo de servicios se generan desde los datos compartidos y pasan de 15 a 16 URL públicas cuando se publique.
- Nuevas explicaciones por trabajo/material dentro de corte, fabricación y soldadura. Se conserva el diseño y el flujo comercial existente.
- La información del asesor usa los servicios compartidos; no se alteraron sus reglas, OpenAI, Neon, contactos ni WhatsApp.
- No se volvieron a cambiar los títulos de las siete fichas que acababan de optimizarse. No se duplicaron páginas por ciudad ni por cada variante de una palabra.

## Fuera de cobertura sin confirmación

No anunciar torneado, fresado, mecanizado CNC, fundición, tratamientos térmicos, galvanizado como servicio, certificaciones, tolerancias, capacidades máximas o venta de parrillas solo por pertenecer a la industria. «Acero galvanizado» como material publicado no equivale a prestar galvanizado. Las aplicaciones de soldadura no implican certificación o trabajo en terreno garantizados.

## Publicación y medición

Estos cambios requieren commit/push y despliegue antes de estar disponibles en el dominio público. Validar HTTP 200, canonical, Service/BreadcrumbList y presencia de la nueva URL en el sitemap después del despliegue. Solo entonces enviar la nueva página a Search Console; no solicitar una URL que aún responda 404 en producción.

Comparar períodos equivalentes de 28 días en Search Console por familia y página, especialmente consultas sin marca: impresiones, clics y CTR. Comprobar visitas en el panel de Vercel y oportunidades comerciales por separado; no deducir ventas a partir de impresiones.

La revisión del 11 de noviembre confirmó las siete fichas y las cuatro páginas comerciales entonces existentes como indexadas. Eso no confirma indexación de esta nueva ruta ni garantiza posiciones. Google Maps continúa pendiente del video presencial del taller; no se añadió publicidad ni se contrató nada.

Referencias: [Guía SEO de Google](https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=es) y [políticas contra el relleno de palabras clave y páginas puerta](https://developers.google.com/search/docs/essentials/spam-policies?hl=es).
