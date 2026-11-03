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
- La web no guarda el texto de las conversaciones; conserva un UUID aleatorio en `sessionStorage` para aplicar la cuota por pestaña. No se envían mensajes a Google Analytics.
- OpenAI declara que los datos de API no se usan para entrenar sus modelos salvo autorización. Aun así, los registros de abuso pueden retener contenido por hasta 30 días salvo que la organización tenga controles de retención distintos aprobados.
- El visitante revisa/edita el resumen, completa sus datos, autoriza compartirlos y confirma. Solo producción intenta enviar la solicitud a ventas mediante Resend. Preview/local simula el envío y no usa la clave de Resend.
- `generate_lead` solo se registra tras un envío real confirmado por Resend y con consentimiento de analítica.

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

Los 30 casos están descritos en `docs/asesor-comercial-ia-evaluacion.md`. Aún no se ejecutan contra OpenAI: las variables están preparadas para Preview, pero el código con la conexión directa sigue local y no se ha generado un despliegue Preview actualizado. No se hicieron envíos de prueba a ventas. Las pruebas deben usar solicitudes ficticias; el endpoint de cotización en Preview simula la entrega. La validez de Resend y la conexión a Neon requieren verificación separada, sin enviar correos comerciales.

En esta revisión se incorporó `@ai-sdk/openai`. Lint, TypeScript y build pasan; aún no se hizo ninguna llamada facturable al modelo. La auditoría encontró 0 vulnerabilidades en dependencias de producción y 18 moderadas en el árbol completo, asociadas a herramientas de desarrollo/ESLint; no se aplicaron actualizaciones mayores automáticas. La configuración de Preview está lista, pendiente de una rama/código desplegado para probar el flujo. Production no se modificó. Antes de publicar, completar las pruebas y revisar la política de privacidad de N Proyectos.

## Referencias

- [Modelos y precios de OpenAI](https://developers.openai.com/api/docs/models/gpt-6-luna)
- [Datos y retención en OpenAI API](https://developers.openai.com/api/docs/guides/your-data)
- [Proveedor OpenAI para AI SDK](https://ai-sdk.dev/providers/ai-sdk-providers/openai)
- [Facturación de ChatGPT y API](https://help.openai.com/en/articles/9039756-managing-billing-for-chatgpt-and-the-api-platform)
