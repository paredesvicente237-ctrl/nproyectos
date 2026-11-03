import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";

const baseUrl = new URL(process.env.BASE_URL ?? "http://localhost:3000");
assert.ok(["localhost", "127.0.0.1", "::1"].includes(baseUrl.hostname), "Las pruebas con formularios solo se permiten contra localhost.");

let passed = 0;
async function check(name, callback) {
  await callback();
  passed += 1;
  console.log(`OK ${name}`);
}

const get = (path) => fetch(new URL(path, baseUrl));
const post = (path, payload, origin = baseUrl.origin) => fetch(new URL(path, baseUrl), {
  method: "POST",
  headers: { "Content-Type": "application/json", ...(origin ? { Origin: origin } : {}) },
  body: JSON.stringify(payload),
});

const sitemapResponse = await get("/sitemap.xml");
assert.equal(sitemapResponse.status, 200, "sitemap.xml debe responder 200.");
const sitemapXml = await sitemapResponse.text();
const sitemapUrls = [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
assert.ok(sitemapUrls.length > 0, "El sitemap debe contener rutas públicas.");

const routes = [...new Set([...sitemapUrls, "/privacidad"])];
const pageAssets = new Map();
for (const path of routes) {
  await check(`ruta pública ${path}`, async () => {
    const response = await get(path);
    assert.equal(response.status, 200, `${path} respondió ${response.status}.`);
    const html = await response.text();
    assert.match(html, /<h1\b/i, `${path} no tiene título principal.`);
    for (const match of html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/gi)) {
      const candidate = new URL(match[1].replaceAll("&amp;", "&"), baseUrl);
      const sourceImage = candidate.searchParams.get("url") ?? candidate.pathname;
      if (candidate.origin === baseUrl.origin && /\.webp$/i.test(sourceImage)) {
        pageAssets.set(candidate.toString(), "webp");
      }
    }
    for (const match of html.matchAll(/<a\b[^>]*\bhref="([^"]+\.pdf(?:\?[^\"]*)?)"/gi)) {
      const candidate = new URL(match[1].replaceAll("&amp;", "&"), baseUrl);
      if (candidate.origin === baseUrl.origin) pageAssets.set(candidate.toString(), "pdf");
    }
  });
}

for (const route of ["/robots.txt", "/favicon.ico"]) {
  await check(`${route} accesible`, async () => {
    const response = await get(route);
    assert.equal(response.status, 200, `${route} respondió ${response.status}.`);
  });
}

for (const [assetUrl, expectedType] of pageAssets) {
  await check(`${expectedType.toUpperCase()} ${new URL(assetUrl).pathname}`, async () => {
    const response = await fetch(assetUrl, { headers: { Accept: expectedType === "webp" ? "image/webp,*/*" : "application/pdf,*/*" } });
    assert.equal(response.status, 200, `${assetUrl} respondió ${response.status}.`);
    const contentType = response.headers.get("content-type") ?? "";
    assert.match(contentType, expectedType === "webp" ? /image\/(webp|avif)/i : /application\/pdf/i, `Tipo inesperado: ${contentType}`);
  });
}

await check("chat rechaza origen externo sin llamar al modelo", async () => {
  const response = await post("/api/assistant/chat", {}, "https://sitio-ajeno.example");
  assert.equal(response.status, 403);
});

await check("formulario de contacto rechaza origen externo", async () => {
  const response = await post("/api/send", {}, "https://sitio-ajeno.example");
  assert.equal(response.status, 403);
});

await check("formulario de contacto exige autorización", async () => {
  const response = await post("/api/send", { name: "Prueba QA", email: "qa@example.com", message: "Mensaje ficticio de prueba", submissionId: randomUUID() });
  assert.equal(response.status, 400);
});

const fakeContact = {
  name: "Prueba QA",
  company: "Empresa ficticia QA",
  email: "qa@example.com",
  phone: "+56 9 1111 1111",
  service: "Fabricación metalmecánica",
  message: "Solicitud de prueba ficticia, no contactar a ventas.",
  privacyConsent: true,
  submissionId: randomUUID(),
  website: "",
};

await check("contacto local simula entrega sin enviar correo", async () => {
  const response = await post("/api/send", fakeContact);
  assert.equal(response.status, 200);
  const result = await response.json();
  assert.equal(result.sent, true);
  assert.equal(result.simulated, true);
});

await check("campo trampa detiene bots sin correo", async () => {
  const response = await post("/api/send", { website: "bot-test" });
  assert.equal(response.status, 200);
  const result = await response.json();
  assert.equal(result.simulated, true);
});

await check("endpoint anterior de cotización no envía correos", async () => {
  const response = await post("/api/assistant/lead", {
    name: "Prueba QA",
    projectSummary: "Solicitud ficticia; no enviar.",
    privacyConsent: true,
  });
  assert.equal(response.status, 410);
  const result = await response.json();
  assert.match(result.error, /WhatsApp/);
});

console.log(`\n${passed} verificaciones superadas. Solo se usaron datos ficticios en localhost; no se enviaron correos ni mensajes a OpenAI.`);
