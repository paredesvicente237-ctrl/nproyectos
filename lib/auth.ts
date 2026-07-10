export const AUTH_COOKIE = "nproyectos_cotizador_session";
const SESSION_DURATION_SECONDS = 60 * 30;

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

export type SessionData = { user: string; sessionId: string; expiresAt: number };

export async function createSession(secret: string, username: string, sessionId: string) {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS;
  const payload = `${expiresAt}.${encodeURIComponent(username)}.${sessionId}`;
  return `${payload}.${await signature(payload, secret)}`;
}

export async function getSession(value: string | undefined, secret: string | undefined): Promise<SessionData | null> {
  if (!value || !secret) return null;
  const [expiresAt, encodedUsername, sessionId, suppliedSignature] = value.split(".");
  if (!expiresAt || !encodedUsername || !sessionId || !suppliedSignature || Number(expiresAt) <= Math.floor(Date.now() / 1000)) return null;
  const payload = `${expiresAt}.${encodedUsername}.${sessionId}`;
  if (!safeEqual(suppliedSignature, await signature(payload, secret))) return null;
  try {
    return { user: decodeURIComponent(encodedUsername), sessionId, expiresAt: Number(expiresAt) };
  } catch {
    return null;
  }
}

export async function getSessionUser(value: string | undefined, secret: string | undefined) {
  return (await getSession(value, secret))?.user ?? null;
}

export async function verifySession(value: string | undefined, secret: string | undefined) {
  return (await getSession(value, secret)) !== null;
}

export const sessionMaxAge = SESSION_DURATION_SECONDS;
