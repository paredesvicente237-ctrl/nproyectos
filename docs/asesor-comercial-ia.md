# Asesor comercial con IA

## Qué incluye

- Asistente flotante únicamente en las páginas públicas: inicio, productos, maestranza en Santiago y páginas públicas de servicios. No aparece en el cotizador ni en la intranet.
- Responde en español usando exclusivamente el catálogo de `lib/productData.ts`, los servicios de `lib/serviceData.ts` y los datos publicados de la empresa. No calcula precios ni inventa stock, plazos, garantías o capacidades.
- El visitante ve un aviso de procesamiento mediante IA antes de poder conversar. El chat vive en memoria del navegador y la aplicación no guarda la conversación.
- El formulario prepara un resumen editable. Solo envía datos al correo comercial si la persona confirma el envío y autoriza compartirlos. La solicitud llega al contacto comercial vigente desde `components/siteData.ts`; el navegador no puede cambiar el destinatario.
- No se envía texto libre, nombre, teléfono ni correo a Google Analytics. Los eventos usan únicamente categorías controladas y `trackGaEvent`, que respeta la aceptación de analítica existente.
- Las rutas API validan el origen, limitan tamaño y frecuencia, descartan contenido no textual y usan un campo trampa para bots. La frecuencia se limita a 24 mensajes cada 10 minutos y 4 solicitudes por hora por IP. En producción se usa un hash SHA-256 de la IP en Neon, no la IP en claro; las filas vencidas se eliminan en las solicitudes siguientes.

## Configuración requerida antes de producción

1. Configurar el AI Gateway de Vercel para este proyecto y habilitar OIDC en la configuración de la aplicación. En Vercel, el SDK obtiene el token de la solicitud; para desarrollo local se necesita `AI_GATEWAY_API_KEY` en `.env.local`. No se agrega ninguna credencial al repositorio.
2. Configurar en Vercel `DATABASE_URL` para el límite de frecuencia distribuido. Si falta en producción, la API falla de forma cerrada y no responde con el modelo.
3. Confirmar `RESEND_API_KEY` (o el nombre heredado `Resend`) y verificar que `noreply@nproyectos.cl` esté autorizado como remitente en Resend. El destinatario se toma de la ficha de contacto del sitio.
4. Actualizar/revisar la política de privacidad para informar que los mensajes conversacionales se procesan con servicios externos de IA y que los datos del formulario confirmado se envían por correo a ventas. Revisar también las políticas de retención del proveedor IA elegido; que la aplicación no guarde el chat no significa que el proveedor no lo procese o retenga según sus condiciones.
5. Probar en una vista previa controlada el chat, cancelación, error del modelo, formulario, envío real de correo, límites de frecuencia y eventos GA4 con consentimiento aceptado/denegado. No usar información confidencial real en pruebas.

## Eventos de analítica

- `assistant_conversation_started`
- `assistant_service_interest`
- `assistant_quote_intent`
- `assistant_conversation_closed_without_lead`
- `generate_lead` cuando Resend confirma el envío de la solicitud

El código invoca `trackGaEvent`; el helper existente solo transmite eventos si existe un ID GA4 válido, el visitante aceptó analítica y `gtag` está disponible. No hay evento de clic separado para confirmar el formulario, para evitar contar una solicitud antes de que haya sido enviada.

## Costos y límites

El modelo configurado es `openai/gpt-5-mini`, con un máximo de 450 tokens de salida y sin reintentos automáticos. El costo real depende del largo de la conversación, tarifas vigentes del proveedor, uso y otros servicios; revisar el consumo y límites desde AI Gateway antes de habilitarlo públicamente. Las rutas no ejecutan compras, pedidos ni cotizaciones automáticas.

## Pruebas locales y despliegue

Con `AI_GATEWAY_API_KEY`, `DATABASE_URL` y la configuración Resend en `.env.local`, ejecutar:

```sh
npm run lint
npx tsc --noEmit
npm run build
```

En Vercel Preview comprobar primero que los eventos GA4 respeten el consentimiento y que la solicitud llegue una sola vez a ventas. El código está preparado, pero no se ha desplegado ni se ha enviado una solicitud de prueba real. No publicar hasta terminar la revisión de privacidad, credenciales, remitente y pruebas de extremo a extremo.
