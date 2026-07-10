import { NextResponse } from "next/server";
import { pbkdf2Sync, randomUUID, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { AUTH_COOKIE, createSession, getSession, sessionMaxAge } from "@/lib/auth";
import { ensureActiveSessionsTable } from "@/lib/activeSession";

type StoredUser = { usuario: string; salt: string; hash: string };

function validPassword(password: string, user: StoredUser) {
  const calculated = pbkdf2Sync(password, Buffer.from(user.salt, "base64"), 210000, 32, "sha256");
  const stored = Buffer.from(user.hash, "base64");
  return calculated.length === stored.length && timingSafeEqual(calculated, stored);
}

export async function POST(request: Request) {
  const configuredUsers = process.env.COTIZADOR_USERS_JSON;
  const secret = process.env.COTIZADOR_SESSION_SECRET;

  if (!configuredUsers || !secret) {
    return NextResponse.json({ error: "El acceso al cotizador aún no está configurado." }, { status: 503 });
  }

  const body = (await request.json()) as { usuario?: string; password?: string };
  let users: StoredUser[] = [];
  try {
    users = JSON.parse(configuredUsers) as StoredUser[];
  } catch {
    return NextResponse.json({ error: "La configuración de acceso no es válida." }, { status: 503 });
  }

  const user = users.find(
    (candidate) => candidate.usuario.toLocaleLowerCase("es") === body.usuario?.trim().toLocaleLowerCase("es")
  );
  if (!user || !body.password || !validPassword(body.password, user)) {
    return NextResponse.json({ error: "Usuario o contraseña incorrectos." }, { status: 401 });
  }

  const cookieStore = await cookies();
  const currentSession = await getSession(cookieStore.get(AUTH_COOKIE)?.value, secret);
  const sessionId = currentSession?.user.toLocaleLowerCase("es") === user.usuario.toLocaleLowerCase("es")
    ? currentSession.sessionId
    : randomUUID();
  const expiresAt = new Date(Date.now() + sessionMaxAge * 1000).toISOString();
  const sql = await ensureActiveSessionsTable();
  const claimed = await sql`
    INSERT INTO active_sessions (username, session_id, expires_at)
    VALUES (${user.usuario.toLocaleLowerCase("es")}, ${sessionId}, ${expiresAt})
    ON CONFLICT (username) DO UPDATE
      SET session_id = EXCLUDED.session_id, expires_at = EXCLUDED.expires_at
      WHERE active_sessions.expires_at <= NOW()
         OR active_sessions.session_id = ${sessionId}
    RETURNING session_id
  `;

  if (claimed.length === 0) {
    return NextResponse.json(
      { error: "Este usuario ya tiene una sesión activa en otro dispositivo. Cierra esa sesión antes de volver a ingresar." },
      { status: 409 }
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(AUTH_COOKIE, await createSession(secret, user.usuario, sessionId), {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: sessionMaxAge,
  });
  return response;
}
