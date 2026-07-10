import { NextResponse } from "next/server";
import { pbkdf2Sync, timingSafeEqual } from "crypto";
import { AUTH_COOKIE, createSession, sessionMaxAge } from "@/lib/auth";

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

  const response = NextResponse.json({ ok: true });
  response.cookies.set(AUTH_COOKIE, await createSession(secret, user.usuario), {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: sessionMaxAge,
  });
  return response;
}
