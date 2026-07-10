import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE, verifySession } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get(AUTH_COOKIE)?.value;
  const authorized = await verifySession(session, process.env.COTIZADOR_SESSION_SECRET);

  if (authorized) return NextResponse.next();

  const loginUrl = new URL("/acceso", request.url);
  loginUrl.searchParams.set("desde", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/cotizador/:path*"],
};
