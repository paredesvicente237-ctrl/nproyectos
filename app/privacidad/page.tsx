import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { companyInfo, salesContact } from "@/components/siteData";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Cómo N Proyectos utiliza y protege los datos enviados desde su sitio web y asesor comercial.",
  alternates: { canonical: "/privacidad" },
};

const externalLinkClass = "font-medium text-blue-800 underline underline-offset-4 hover:text-blue-950";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-[60vh] bg-white px-5 pb-20 pt-28 sm:px-8 sm:pt-36 lg:px-10">
        <div className="mx-auto max-w-3xl">
          <p className="mb-4 border-l-2 border-blue-700 pl-3 text-sm font-semibold text-blue-800">N Proyectos Ltda</p>
          <h1 className="text-4xl leading-tight sm:text-5xl">Política de privacidad</h1>
          <p className="mt-4 text-sm text-slate-500">Última actualización: 3 de noviembre de 2026</p>
          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-700">
            Esta política explica qué información se procesa cuando visitas nproyectos.cl, usas sus formularios de contacto o conversas con el asesor comercial con inteligencia artificial.
          </p>

          <div className="mt-10 space-y-9 text-[15px] leading-7 text-slate-700">
            <section aria-labelledby="responsable">
              <h2 id="responsable" className="text-2xl">Responsable y contacto</h2>
              <p className="mt-3">
                El responsable informado para este sitio es {companyInfo.legalName}. Para consultas o solicitudes sobre datos personales, escribe a <a className={externalLinkClass} href={salesContact.emailHref}>{salesContact.email}</a> e indica “Privacidad” en el asunto. También puedes usar este canal para solicitar información, corrección o eliminación cuando corresponda conforme a la ley.
              </p>
            </section>

            <section aria-labelledby="datos">
              <h2 id="datos" className="text-2xl">Qué información podemos recibir</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-blue-700">
                <li>En el formulario de contacto: nombre, empresa, correo, teléfono, área de interés y descripción del requerimiento.</li>
                <li>En el asesor IA: los mensajes que escribes y la página pública desde la que consultas. Si preparas una solicitud, también los datos de contacto y antecedentes que revisas y decides compartir con ventas.</li>
                <li>Para seguridad y límites de uso: identificadores aleatorios de sesión, contadores de solicitudes y hashes de identificadores técnicos. El asesor no guarda el texto de la conversación en una base de datos de N Proyectos.</li>
                <li>Para medición: datos agregados de navegación de Vercel Analytics y, solo si aceptas, eventos de Google Analytics como páginas visitadas, tipo de servicio de interés y canal de contacto. No enviamos a Google Analytics el nombre, correo, teléfono ni texto de formularios.</li>
              </ul>
              <p className="mt-3">No incluyas información sensible, financiera ni confidencial en el chat o en los formularios.</p>
            </section>

            <section aria-labelledby="finalidades">
              <h2 id="finalidades" className="text-2xl">Para qué se utiliza</h2>
              <p className="mt-3">
                Usamos los datos para responder consultas comerciales, preparar solicitudes de cotización, contactar a quien lo pide, operar y proteger el sitio, limitar spam y abuso, y medir el uso del sitio de acuerdo con las preferencias de analítica seleccionadas.
              </p>
              <p className="mt-3">
                Al pulsar ciertos enlaces de WhatsApp o correo del sitio, se envía a N Proyectos un aviso interno con el canal, la página y la hora del clic. Ese aviso no incluye el mensaje que envíes por WhatsApp o correo y no confirma que hayas iniciado una conversación.
              </p>
              <p className="mt-3">
                Los mensajes del asesor se procesan en el momento para generar respuestas. Si preparas una solicitud, podrás revisar el resumen y abrir WhatsApp con los datos que completaste. N Proyectos no recibe la solicitud hasta que pulses “Enviar” dentro de WhatsApp; el chat por sí solo no se convierte en una solicitud y puedes seguir navegando sin compartir tus datos de contacto.
              </p>
            </section>

            <section aria-labelledby="proveedores">
              <h2 id="proveedores" className="text-2xl">Proveedores que intervienen</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-blue-700">
                <li><strong>Vercel:</strong> aloja el sitio y presta Vercel Analytics. Su analítica no usa cookies de terceros; utiliza una identificación derivada de la solicitud por hasta 24 horas para estadísticas agregadas. Vercel también puede procesar datos técnicos necesarios para operar y proteger el servicio.</li>
                <li><strong>OpenAI API:</strong> recibe los mensajes del asesor y genera respuestas. La aplicación solicita que no se almacene el estado de respuesta (`store: false`). OpenAI indica que los datos de API no se usan para entrenar modelos salvo autorización; los registros de prevención de abuso pueden conservar contenido hasta 30 días por defecto.</li>
                <li><strong>Neon:</strong> en producción, el asesor utiliza tablas dedicadas a límites de frecuencia y concurrencia; guarda hashes de identificadores y contadores con vencimiento, no el contenido del chat ni los datos de cotización. El Cotizador VA y la intranet operan con flujos y tablas aparte, no consultados por el asesor público.</li>
                <li><strong>Resend:</strong> entrega al correo de ventas los formularios generales de contacto que envías desde el sitio. Resend recibe los datos contenidos en ese formulario para procesar su envío.</li>
                <li><strong>WhatsApp (Meta):</strong> cuando eliges abrir el mensaje preparado del asesor y luego pulsas “Enviar”, WhatsApp procesa el texto y los datos incluidos para entregarlos al contacto comercial de N Proyectos. Abrir el enlace no envía la solicitud por sí solo.</li>
                <li><strong>Google Analytics 4:</strong> solo se activa si aceptas la medición. Puedes cambiar o retirar esa preferencia desde el enlace “Preferencias de cookies” del pie de página.</li>
              </ul>
              <p className="mt-3">
                Estos proveedores pueden tratar información en infraestructura ubicada fuera de Chile, de acuerdo con sus servicios y condiciones. La configuración de regiones, contratos y transferencias debe revisarse para la operación definitiva.
              </p>
            </section>

            <section aria-labelledby="retencion">
              <h2 id="retencion" className="text-2xl">Conservación y seguridad</h2>
              <p className="mt-3">
                N Proyectos no almacena el contenido de las conversaciones del asesor en su base de datos. La aplicación conserva temporalmente contadores y hashes técnicos para aplicar controles contra abuso; sus registros se eliminan al vencer o al ejecutarse la limpieza periódica. Si envías una solicitud, la información queda en el correo de ventas para atenderla y cumplir obligaciones aplicables; la empresa debe mantener un plazo interno de revisión y eliminación de esos correos.
              </p>
              <p className="mt-3">
                OpenAI informa que, aunque la aplicación usa `store: false`, sus registros de prevención de abuso pueden conservar contenido hasta 30 días por defecto. Para más detalle, consulta la <a className={externalLinkClass} href="https://developers.openai.com/api/docs/guides/your-data" target="_blank" rel="noopener noreferrer">documentación de datos de OpenAI API</a> y la <a className={externalLinkClass} href="https://vercel.com/docs/analytics/privacy-policy" target="_blank" rel="noopener noreferrer">política de Vercel Analytics</a>.
              </p>
            </section>

            <section aria-labelledby="derechos">
              <h2 id="derechos" className="text-2xl">Tus solicitudes sobre datos</h2>
              <p className="mt-3">
                Puedes escribir a <a className={externalLinkClass} href={salesContact.emailHref}>{salesContact.email}</a> para consultar qué información asociada a tu solicitud se conserva y pedir su corrección o eliminación cuando proceda. N Proyectos revisará cada petición conforme a la normativa vigente y responderá por el mismo canal.
              </p>
              <p className="mt-3">
                Esta política toma como referencia la <a className={externalLinkClass} href="https://www.bcn.cl/leychile/navegar?idNorma=141599" target="_blank" rel="noopener noreferrer">Ley 19.628</a>. La <a className={externalLinkClass} href="https://www.bcn.cl/leychile/navegar?idNorma=1209272" target="_blank" rel="noopener noreferrer">Ley 21.719</a> tiene entrada en vigor diferida al 1 de diciembre de 2026; el texto y los procedimientos deberán actualizarse para cumplir los requisitos que resulten aplicables.
              </p>
            </section>

            <section aria-labelledby="cambios">
              <h2 id="cambios" className="text-2xl">Cambios a esta política</h2>
              <p className="mt-3">Podemos actualizar esta página cuando cambien el sitio, sus proveedores o las obligaciones aplicables. La fecha indicada al inicio identifica la última revisión publicada.</p>
            </section>
          </div>

          <div className="mt-12 border-t border-slate-200 pt-6 text-sm text-slate-600">
            <Link href="/" className="font-semibold text-blue-800 underline underline-offset-4 hover:text-blue-950">Volver a N Proyectos</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
