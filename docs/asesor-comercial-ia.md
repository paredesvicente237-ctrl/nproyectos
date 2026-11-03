# Asesor comercial con IA

## Integración

- El chat público conserva Vercel AI SDK para validar y transmitir la conversación, pero usa el proveedor oficial `@ai-sdk/openai` para conectar directamente con `api.openai.com`. No depende de AI Gateway.
- El streaming del chat y su interfaz no se reconstruyen.
- El modelo se lee de `OPENAI_MODEL`; configuración recomendada: `gpt-6-luna`.
- `OPENAI_API_KEY` se lee exclusivamente desde el servidor. No debe tener prefijo `NEXT_PUBLIC_`, agregarse a archivos versionados ni compartirse por chat.
- Las solicitudes usan la API Responses, con `store: false`, razonamiento `none` y baja verbosidad. `store: false` evita guardar el estado de la respuesta en la aplicación de OpenAI, pero no equivale a Zero Data Retention: OpenAI indica que los registros de prevención de abuso pueden conservar contenido por hasta 30 días de forma predeterminada.

## Alcance, privacidad y cotizaciones

- Asistente únicamente en páginas públicas: inicio, productos, maestranza en Santiago y páginas públicas de servicios. No se monta en cotizador ni intranet.
- Responde en español usando los datos publicados en `lib/productData.ts`, `lib/serviceData.ts` y la ficha de empresa. No inventa precios, stock, plazos, garantías ni capacidades.
- La web no guarda el texto de las conversaciones; conserva un UUID aleatorio en `sessionStorage` para aplicar la cuota por pestaña. No se envían mensajes a Google Analytics ni parámetros arbitrarios de URL.
- OpenAI declara que los datos de API no se usan para entrenar sus modelos salvo autorización. Aun así, los registros de abuso pueden retener contenido por hasta 30 días salvo que la organización tenga controles de retención distintos aprobados.
- El visitante revisa/edita el resumen, completa sus datos, autoriza compartirlos y confirma. Solo producción intenta enviar la solicitud a ventas mediante Resend. Preview/local simula el envío y no usa la clave de Resend.
- `generate_lead` solo se registra tras un envío real confirmado por Resend y con consentimiento de analítica.
- El formulario general de contacto aplica la misma política: consentimiento explícito, validación en servidor, límite de tamaño/frecuencia, honeypot y una clave de idempotencia de Resend. En Preview/local se simula la respuesta. Los avisos por clic en WhatsApp/correo tampoco envían emails desde Preview/local.
- La política pública está en `/privacidad`. Es un borrador técnico; requiere revisión jurídica y aprobación de N Proyectos, especialmente el plazo de conservación de los correos de ventas, transferencias internacionales y su actualización antes de la entrada en vigor de la Ley 21.719.

## Controles de seguridad y costos

- Origen same-site obligatorio; cuerpo máximo 80 KB, texto total hasta 16.000 caracteres, últimos 22 mensajes, máximo 1.800 caracteres por mensaje de usuario y salida de 450 tokens.
- Máximo 24 mensajes por IP cada 10 minutos y 30 por identificador de sesión en 24 horas. Formulario: hasta 4 solicitudes por IP por hora.
- Máximo 4 respuestas de IA simultáneas en toda la aplicación y 1 por sesión; bloqueos con concesión de 60 segundos.
- En producción, cuotas y bloqueos usan Neon y guardan hashes, no IP ni contenido. `DATABASE_URL` es obligatorio en producción y el sistema falla cerrado si falta. Preview/local usa memoria temporal.
- Timeout de respuesta de 26 segundos, función de 35 segundos y cero reintentos automáticos. Los logs guardan solo conteos de tokens, duración, motivo de finalización y tipo de error.
- GPT-6 Luna tiene tarifas publicadas de US$0,10 por millón de tokens de entrada y US$0,50 por millón de salida. Para 30 pruebas de un turno, una estimación conservadora de 8.000 tokens de entrada y 450 de salida por caso es aproximadamente **US$0,031** (redondear a US$0,04). Si un escenario requiere varios turnos, el costo aumenta; se medirá el uso real y se detendrá la evaluación antes de acercarse a US$1. Es una estimación, no una garantía del saldo de la cuenta.

## Variables de entorno

| Variable | Valor recomendado | Dónde |
| --- | --- | --- |
| `OPENAI_API_KEY` | Clave de proyecto OpenAI, secreta | Vercel Preview (ya configurada); Production solo tras autorización de publicación |
| `OPENAI_MODEL` | `gpt-6-luna` | Vercel Preview (ya configurada); Production solo tras autorización de publicación |
| `DATABASE_URL` | Conexión de Neon | Ya aparece en Vercel Production; no se comprobó conectividad |
| `RESEND_API_KEY` | Clave secreta de Resend | Ya aparece en Vercel Preview/Production; no se verificó su validez ni el remitente |

No hay credenciales de OpenAI en el entorno local. En Vercel, ambas variables de OpenAI quedaron configuradas únicamente para Preview: `OPENAI_API_KEY` como Secret y `OPENAI_MODEL` como Config (`gpt-6-luna`). La clave pertenece al proyecto OpenAI “N Proyectos”, solo puede solicitar respuestas de modelo y vence el 2 de diciembre de 2026. Production no fue modificada. El panel muestra `DATABASE_URL` solo en Production y `RESEND_API_KEY` en Preview y Production; no se descifraron esos secretos ni se probó su conectividad.

## Evaluación y estado

Los 30 casos de `docs/asesor-comercial-ia-evaluacion.md` se ejecutaron en Vercel Preview con llamadas reales a OpenAI y datos ficticios. Se registraron 37 respuestas exitosas, incluyendo repeticiones y una comprobación adicional; los registros revisados no muestran errores del modelo. El uso medido fue de 97.269 tokens de entrada y 1.800 de salida. Con las tarifas publicadas de `gpt-6-luna`, el costo estimado es **US$0,0106**, muy por debajo del máximo autorizado de US$1.

El caso 30 inicialmente insinuó que se podía fabricar una parrilla a medida, aunque eso no está en el catálogo. Se endureció la instrucción del asesor en el commit `a600b92` y el retest respondió que las parrillas no aparecen en el catálogo y que no puede confirmar fabricación ni stock. El caso 3 fue seguro pero parcial: pidió plano o croquis y omitió otros antecedentes útiles en la primera respuesta. El caso 13 se repitió y confirmó que el sitio no publica tarifa por m²; no inventó precio.

El flujo de cotización se probó en Preview con datos ficticios y respondió que la prueba se completó sin enviar correo. No se envió ninguna solicitud real a ventas. La clave/modelo de OpenAI solo están en Preview; Production no fue modificada. El despliegue de revisión está en `codex/openai-direct-preview` (`a600b92`): https://nproyectos-iddytdf3r-paredesvicente237-4079s-projects.vercel.app/.

### Revisión final de producción — 2026-11-03

- OpenAI sigue directo desde el servidor con `@ai-sdk/openai`, modelo `gpt-6-luna`, `store: false`, streaming, límite 450 tokens, cuota por IP/sesión, concurrencia y timeout. La respuesta de estructura se reforzó para preguntar por uso y dimensiones antes de plano, una pregunta a la vez, y derivar revisión de cargas/factibilidad al equipo técnico.
- Vercel confirma `OPENAI_API_KEY` y `OPENAI_MODEL` solo en Preview. No hay clave de OpenAI en Production. La clave de Preview vence el 2 de diciembre de 2026; no debe copiarse. Tras autorización de publicación, crear una clave de producción separada, restringida a solicitudes de modelo, y configurar `OPENAI_API_KEY` (Secret) + `OPENAI_MODEL=gpt-6-luna` solo en Production.
- En OpenAI Platform, el proyecto `N Proyectos` aparece como proyecto correcto. El gasto mensual visible al revisar era `$0,00 / $100`; el límite de organización figura como “no aplicado”, el proyecto no tiene límite de gasto propio, y solo hay alertas al 80% y 100%. Las cuotas del modelo visibles eran 2.000.000 TPM, 5.000 RPM y 20.000.000 TPD para `gpt-6-luna`. Esas cuotas de frecuencia no limitan el gasto mensual. No se modificó facturación ni se activaron recargas.
- La suma histórica de 37 respuestas de prueba fue 97.269 tokens de entrada y 1.800 de salida. Con precios estándar publicados de US$0,10/M entrada y US$0,50/M salida, el coste calculado es aproximadamente **US$0,0106**. El panel muestra `$0,00` por redondeo a centavos; no es una confirmación de coste cero.

Estimación OpenAI, suponiendo 4 respuestas por conversación y el promedio medido por respuesta (2.629 tokens de entrada y 49 de salida):

| Conversaciones al mes | Solicitudes estimadas | Coste IA estimado |
| ---: | ---: | ---: |
| 100 | 400 | US$0,115 |
| 500 | 2.000 | US$0,575 |
| 1.000 | 4.000 | US$1,15 |

Es una proyección, no una garantía: chats largos, historial creciente y respuestas mayores pueden elevarla. No incluye Vercel, Neon, Resend ni Google Analytics. No existe un presupuesto duro mensual dentro de la aplicación; al no haber límite de gasto de proyecto efectivo en OpenAI, esto es un riesgo pendiente antes de producción.

- Neon: `DATABASE_URL` existe solo en Vercel Production; Preview no tiene esa variable y usa memoria temporal. Se intentó una consulta estrictamente de solo lectura desde el entorno disponible, pero la salida de red fue bloqueada antes de autenticar; no se alteraron tablas ni datos. El código del cotizador utiliza `quote_counter` y `quote_history`; además la aplicación usa `active_sessions`, `login_history` y `cotizador_access_control`. El asesor público solo consulta/actualiza sus tablas nuevas `public_assistant_rate_limits` y `public_assistant_request_locks`, que se crean al primer uso si no existen. La existencia, columnas y conexión real de esas tablas aún deben validarse desde un entorno con acceso Neon antes de publicar.
- Resend: Vercel muestra `RESEND_API_KEY` en Preview y Production, pero no se reveló ni probó. DNS público revisado: presente `resend._domainkey.nproyectos.cl`, y en `send.nproyectos.cl` hay SPF `include:amazonses.com` y MX de Amazon SES en `sa-east-1`. No existe respuesta TXT para `_dmarc.nproyectos.cl`, y no se encontró SPF en el dominio raíz. No se pudo confirmar desde Resend que `noreply@nproyectos.cl` esté verificado o que la clave sea válida. No se envió ningún correo. Hace falta corregir/verificar autenticación alineada del remitente y completar una prueba a un destinatario de QA autorizado.
- La prueba de conexión a Neon no mostró errores de autenticación: falló por restricción de red de este entorno. El listado de variables y su presencia no demuestra conectividad.
- No se obtuvo una dirección autorizada para recibir un correo de QA; por seguridad, no se usó el buzón real de ventas. Los flujos de contacto y cotización están preparados para simularse en Preview/local sin enviar correos.
- Se añadió `npm run test:public`, que revisa rutas del sitemap y política, archivos asociados visibles, rechazo de orígenes externos, consentimiento, honeypot y cotización ficticia sin correo. Ejecutarlo contra localhost. No existe un marco de pruebas unitarias previo en el proyecto.
- Las reglas de analítica de Google ahora excluyen parámetros de búsqueda arbitrarios de `page_path` y `page_location`; GA4 se activa solo después de aceptar. Vercel Analytics permanece activo sin banner de consentimiento, es sin cookies de terceros y usa una señal temporal para métricas agregadas; su uso debe figurar claramente en la política.

### Bloqueos antes de producción

- **Riesgo de credenciales en el historial Git:** la versión actual de `.env.example` en `HEAD`, `origin/codex/openai-direct-preview` y `origin/main` tenía valores no vacíos para configuración de usuarios del Cotizador VA, secreto de sesión, conexión de base de datos y Resend. La plantilla de trabajo local ya quedó vaciada, pero los commits existentes conservan esos valores. No se copiaron a esta documentación ni se publicaron de nuevo. Tratarlos como expuestos: confirmar si eran reales, rotar los que correspondan y coordinar una limpieza del historial con el responsable del repositorio; no hacer push ni reescritura forzada sin esa coordinación. La URL encontrada tampoco permite confirmar que la base sea Neon.
1. El proyecto OpenAI no tiene límite de gasto configurado y el tope de organización aparece no aplicado. Definir un presupuesto/alerta que N Proyectos acepte y comprobar si el mecanismo de límite es duro o solo de aviso; la app hoy no mantiene un presupuesto mensual global.
2. Verificar conexión y esquema Neon desde un runtime autorizado con acceso de red; no ejecutar datos de cotizaciones reales ni cambios de esquema como parte de esa comprobación.
3. Revisar en Resend el estado del dominio, el remitente y la validez de la clave. Configurar DMARC con una política progresiva/alineada y evaluar SPF del dominio usado como `From`; verificarlo en DNS y en Resend antes de enviar.
4. Entregar un correo de QA explícitamente autorizado y aprobar una prueba aislada. No usar ventas ni clientes reales.
5. Aprobar jurídicamente `/privacidad`, fijar el plazo de borrado de mensajes en el buzón y actualizar la referencia legal para la entrada en vigor de Ley 21.719.
6. Repetir los escenarios comerciales prioritarios en el Preview del código final y completar las comprobaciones visuales automatizadas/manuales en móvil y escritorio.
7. Crear y configurar una clave separada de OpenAI Production solo cuando exista aprobación de producción. No publicar ni integrar en `main` hasta cerrar estos puntos.

### Verificación local final — 2026-11-03 UTC

- `npm run lint`: aprobado.
- `npx tsc --noEmit`: aprobado.
- `npm run build`: aprobado; Next.js generó las 25 páginas estáticas previstas y compiló las rutas dinámicas/API. La portada pesa 186 kB de JS inicial; la política de privacidad, 119 kB; el JS compartido, 103 kB.
- `npm run test:public`: 39 verificaciones aprobadas contra localhost. Cubrieron las rutas públicas incluidas en el sitemap, `/privacidad`, `robots.txt`, favicon, imágenes WebP transformadas por Next.js, las 7 fichas PDF, rechazo de orígenes externos, consentimiento, honeypot y simulación de ambos formularios con datos ficticios. No se llamó a OpenAI ni se envió correo.
- Revisión visual manual en escritorio (1280×720) y móvil (390×844): navegación, asesor, formulario de contacto y política legibles, sin desbordamiento horizontal observado. Consola del navegador sin errores durante la prueba.
- No se obtuvo una medición Lighthouse/Core Web Vitals ni Navigation Timing reproducible desde el navegador conectado; los tamaños del bundle son datos del build, no una medición de velocidad real ni de usuarios.
- `npm audit --omit=dev --audit-level=moderate` no pudo consultar el registro por bloqueo DNS del entorno (`registry.npmjs.org`); no se modificaron dependencias. Una instalación anterior reportó 18 vulnerabilidades moderadas, pendientes de revisión con acceso al registro.

Estas pruebas locales no sustituyen la validación del despliegue Preview final. La nueva pauta para estructuras industriales aún requiere una prueba real con el modelo en el Preview actualizado antes de considerar terminada su evaluación comercial.

## Referencias

- [Modelos y precios de OpenAI](https://developers.openai.com/api/docs/models/gpt-6-luna)
- [Datos y retención en OpenAI API](https://developers.openai.com/api/docs/guides/your-data)
- [Proveedor OpenAI para AI SDK](https://ai-sdk.dev/providers/ai-sdk-providers/openai)
- [Facturación de ChatGPT y API](https://help.openai.com/en/articles/9039756-managing-billing-for-chatgpt-and-the-api-platform)
