export const AUTH_COOKIE = "nproyectos_cotizador_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 8;

function bytesToHex(bytes: ArrayBuffer) {
  return Array.from(new Uint8Array(bytes), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function signature(value: string, secret: string) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  return bytesToHex(await crypto.subtle.sign("HMAC", key, encoder.encode(value)));
}

function safeEqual(left: string, right: string) {
  if (left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index++) {
    difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return difference === 0;
}

export async function createSession(secret: string) {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS;
  return `${expiresAt}.${await signature(String(expiresAt), secret)}`;
}

export async function verifySession(value: string | undefined, secret: string | undefined) {
  if (!value || !secret) return false;
  const [expiresAt, suppliedSignature] = value.split(".");
  if (!expiresAt || !suppliedSignature || Number(expiresAt) <= Math.floor(Date.now() / 1000)) return false;
  return safeEqual(suppliedSignature, await signature(expiresAt, secret));
}

export const sessionMaxAge = SESSION_DURATION_SECONDS;
