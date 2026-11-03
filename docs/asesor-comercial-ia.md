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
- El visitante revisa/edita el resumen, completa sus datos y autoriza abrir WhatsApp con el mensaje. La solicitud solo llega a ventas si el visitante pulsa “Enviar” en WhatsApp; la aplicación no afirma haberla recibido ni guarda el resumen.
- El asesor no registra `generate_lead` al preparar o abrir WhatsApp, ya que la aplicación no puede confirmar que el visitante envió el mensaje. `assistant_whatsapp_opened` representa solo el clic y no incluye datos personales.
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
| `OPENAI_API_KEY` | Clave de proyecto OpenAI, secreta | Vercel Preview y Production; solo servidor |
| `OPENAI_MODEL` | `gpt-6-luna` | Vercel Preview y Production |
| `DATABASE_URL` | Conexión de Neon | Configurada en Vercel Production; la conexión y el esquema del asesor deben validarse antes de activarlo |
| `RESEND_API_KEY` | Clave secreta de Resend | Se usa en el formulario general de contacto; la cotización del asesor usa WhatsApp mientras el remitente no esté verificado |

No hay credenciales de OpenAI en el entorno local. En Vercel, la clave de Production está guardada como Secret y el modelo configurado es `gpt-6-luna`; la clave es específica del proyecto N Proyectos, limitada a solicitudes de modelo y con vencimiento el 2 de diciembre de 2026. El límite mensual de US$5 está aplicado como límite efectivo y las recargas automáticas siguen desactivadas. Los secretos no se leen ni se imprimen desde el panel.

## Evaluación y estado

Los 30 casos de `docs/asesor-comercial-ia-evaluacion.md` se ejecutaron en Vercel Preview con llamadas reales a OpenAI y datos ficticios. Se registraron 37 respuestas exitosas, incluyendo repeticiones y una comprobación adicional; los registros revisados no muestran errores del modelo. El uso medido fue de 97.269 tokens de entrada y 1.800 de salida. Con las tarifas publicadas de `gpt-6-luna`, el costo estimado es **US$0,0106**, muy por debajo del máximo autorizado de US$1.

El caso 30 inicialmente insinuó que se podía fabricar una parrilla a medida, aunque eso no está en el catálogo. Se endureció la instrucción del asesor en el commit `a600b92` y el retest respondió que las parrillas no aparecen en el catálogo y que no puede confirmar fabricación ni stock. El caso 3 fue seguro pero parcial: pidió plano o croquis y omitió otros antecedentes útiles en la primera respuesta. El caso 13 se repitió y confirmó que el sitio no publica tarifa por m²; no inventó precio.

El Preview anterior probó el flujo de correo simulado, no la nueva entrega por WhatsApp. En esta versión, el visitante revisa el texto y debe pulsar “Enviar” en WhatsApp; la web no afirma recepción. Las pruebas HTTP locales de esta revisión usaron datos ficticios y no enviaron mensajes, correos ni solicitudes a OpenAI.

### Revisión final de producción — 2026-11-03

- **OpenAI:** la integración sigue directa y el Preview anterior completó los 30 casos comerciales; se registraron 37 respuestas con datos ficticios y costo estimado de US$0,0106. Vercel muestra la clave de Production como secreto configurado y `OPENAI_MODEL` está definido para `gpt-6-luna`. La consola de OpenAI muestra el límite de gasto mensual de US$5 como “Limit enforced”; no se activaron recargas.
- **Neon:** la rama temporal `nproyectos-ai-qa-20261103` se probó con registros ficticios para límite por sesión y concurrencia, y se limpiaron esos registros. El Preview no está conectado a esa rama. El asesor crea tablas de seguridad al primer uso si no existen; no se ha validado ese cambio sobre Production ni debe activarse sin autorizar y probar la conexión/esquema aislados.
- **Resend y canal de cotización:** la zona autoritativa usa Cloudflare, pero la cuenta disponible no contiene `nproyectos.cl`; el subdominio `cotizaciones.nproyectos.cl` no está verificado. No se cambió DNS ni se envió correo. El asesor no depende de Resend para cotizaciones mientras tanto: el resumen se revisa y se prepara para WhatsApp `+56 9 5010 7432`; solo se recibe si el cliente pulsa “Enviar” en WhatsApp. El endpoint de correo del asesor responde `410`. El formulario general de contacto conserva su flujo Resend independiente.
- **Seguridad:** `.env.example` contiene valores sensibles vacíos y GitHub Push Protection está activado. El escaneo histórico y la rotación de cualquier credencial expuesta siguen pendientes; no se modificaron credenciales del Cotizador VA ni se reescribió el historial.
- **Pruebas de esta revisión:** lint, TypeScript, build y 38 verificaciones HTTP locales pasan. Se cubrieron las rutas públicas, recursos WebP/PDF, validación de consentimiento, honeypot, simulación del formulario y retiro del endpoint antiguo de cotización. No se llamaron OpenAI ni Resend, ni se enviaron mensajes reales. Falta validar esta versión en Preview.
- **Pendientes antes de Production:** autorizar y comprobar la conexión/schema de Neon que requiere el limitador del asesor, validar el Preview final y obtener la revisión jurídica de `/privacidad`. Resend queda fuera del envío de cotizaciones del asesor; el canal temporal es WhatsApp. La solicitud solo se considera enviada si la persona pulsa “Enviar” allí.

## Referencias

- [Modelos y precios de OpenAI](https://developers.openai.com/api/docs/models/gpt-6-luna)
- [Datos y retención en OpenAI API](https://developers.openai.com/api/docs/guides/your-data)
- [Proveedor OpenAI para AI SDK](https://ai-sdk.dev/providers/ai-sdk-providers/openai)
- [Facturación de ChatGPT y API](https://help.openai.com/en/articles/9039756-managing-billing-for-chatgpt-and-the-api-platform)
