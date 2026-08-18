import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AUTH_COOKIE, getSession } from "@/lib/auth";
import { isActiveSession } from "@/lib/activeSession";
import { userCanEnterCotizador } from "@/lib/cotizadorAccessControl";

export async function GET() {
  const cookieStore = await cookies();
  const session = await getSession(
    cookieStore.get(AUTH_COOKIE)?.value,
    process.env.COTIZADOR_SESSION_SECRET
  );

  if (!session || !(await isActiveSession(session)) || !(await userCanEnterCotizador(session.user))) {
    return NextResponse.json({ error: "Sesión no autorizada." }, { status: 401 });
  }
  return NextResponse.json({ user: session.user });
}
