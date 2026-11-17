# SEO industrial: auditoría y seguimiento

Fecha de revisión: 17 de noviembre de 2026.

## Hallazgos y prioridades

1. Alta: verificar en Search Console la indexación real, consultas, impresiones y páginas de destino. El código no demuestra indexación ni posiciones. Inspeccionar la URL canónica de corte y plegado y enviar el sitemap; una solicitud no confirma indexación.
2. Alta: completar y verificar el Perfil de Empresa de Google con datos reales y fotos autorizadas. La dirección solo debe hacerse pública si cumple las políticas aplicables; los horarios requieren confirmación.
3. Alta: reforzar enlaces internos contextuales. Se corrigió la selección por posición de los servicios relacionados para conectar corte, plegado, fabricación, soldadura y estructuras según la intención del visitante.
4. Media: confirmar los datos comerciales con el propietario. El código centraliza el teléfono +56 9 5010 7432, correo ventasnproyectosltda@gmail.com y dirección Av. Yungay 743, La Granja. No se ha demostrado que todas las fuentes externas coincidan.
5. Media: obtener fotos reales autorizadas, materiales, espesores y capacidades verificadas. No prometer plazos ni prestaciones no confirmadas.
6. Media: medir velocidad de campo y móvil en Search Console o PageSpeed Insights. No se dispone aquí de resultados de Core Web Vitals reales por URL.
7. Bloqueo de validación local: existe un rediseño de portada sin terminar en components/CommercialStory.tsx, ajeno a esta auditoría; conserva un error JSX. Se dejó intacto. Probar los cambios SEO en una copia limpia de main y resolver ese trabajo por separado.

## Arquitectura existente

El proyecto define sitemap y robots, canonicals por servicio y producto, metadatos sociales y datos estructurados. Las rutas de servicio y producto contienen títulos, aplicaciones, preguntas frecuentes y acceso a cotización. La existencia de código no demuestra rastreo, validez de resultados enriquecidos ni despliegue.

La medición GA4 existente registra clics de cotización, contacto, descargas, conversaciones y envío exitoso del formulario; requiere un identificador válido y consentimiento. Verificar que la propiedad recibe eventos sin datos personales y evitar contar un clic como una cotización recibida.

## Mapa de búsquedas: hipótesis a validar

Sin volúmenes ni dificultad cuantificada: la competencia indicada es una apreciación cualitativa a partir de resultados visibles, no una métrica de una herramienta.

| Intención y términos | Página existente | Prioridad / competencia estimada |
| --- | --- | --- |
| Cotizar maestranza industrial en Santiago, maestranza en La Granja | /maestranza-santiago | Alta / alta |
| Corte láser, servicio de corte y plegado de planchas, acero inoxidable según plano | /servicios/corte-plegado-planchas | Alta / alta |
| Fabricación metalmecánica, piezas y conjuntos según plano | /servicios/fabricacion-metalmecanica | Alta / alta |
| Soldadura MIG TIG, armado de piezas industriales | /servicios/soldadura-mig-tig | Alta / alta |
| Estructuras y soportes metálicos industriales | /servicios/estructuras-metalicas-industriales | Alta / alta |
| Control acústico industrial, salas de máquinas | /servicios/control-acustico-industrial | Alta / por validar |
| Panel acústico, splitter para ductos, silenciador de escape, celosía y espuma | Sus páginas individuales en /productos | Alta / por validar |
| Panel perforado y pantalla para soldadura | Sus páginas individuales en /productos | Media / por validar |

No crear páginas adicionales de corte láser o plegado hasta contar con información técnica diferenciada y evidencia de consultas en Search Console: hoy se solaparían con la página existente.

## Contenido y medición

Priorizar guías originales sobre cómo cotizar según plano, diferencias entre láser y guillotina, selección de paneles para salas de máquinas y antecedentes para un silenciador. Validar cada afirmación técnica con el equipo; enlazar la guía al servicio o producto correspondiente.

En Search Console seleccionar la propiedad correcta, inspeccionar URLs comerciales y enviar https://www.nproyectos.cl/sitemap.xml. En Rendimiento comparar 28 días anteriores y posteriores con igual duración, anotando fechas de publicación, consultas, páginas, clics, impresiones y CTR. En GA4 comprobar adquisición orgánica y eventos aceptados por consentimiento; separar clics de contacto, formularios enviados y solicitudes realmente recibidas. No atribuir ventas a SEO sin datos comerciales.
