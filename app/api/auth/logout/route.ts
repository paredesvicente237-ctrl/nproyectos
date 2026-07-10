import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AUTH_COOKIE, getSession } from "@/lib/auth";
import { releaseActiveSession } from "@/lib/activeSession";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const session = await getSession(cookieStore.get(AUTH_COOKIE)?.value, process.env.COTIZADOR_SESSION_SECRET);
  await releaseActiveSession(session);
  const response = NextResponse.redirect(new URL("/acceso", request.url), 303);
  response.cookies.set(AUTH_COOKIE, "", { httpOnly: true, expires: new Date(0), path: "/" });
  return response;
}
