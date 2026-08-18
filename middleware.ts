import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE, getSession } from "@/lib/auth";
import { isActiveSession } from "@/lib/activeSession";
import { userCanEnterCotizador } from "@/lib/cotizadorAccessControl";

export async function middleware(request: NextRequest) {
  const session = await getSession(
    request.cookies.get(AUTH_COOKIE)?.value,
    process.env.COTIZADOR_SESSION_SECRET
  );
  const authorized = session
    && await isActiveSession(session)
    && await userCanEnterCotizador(session.user);

  if (authorized) return NextResponse.next();

  const loginUrl = new URL("/acceso", request.url);
  loginUrl.searchParams.set("desde", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/cotizador/:path*", "/generador-formulas/:path*"],
};
