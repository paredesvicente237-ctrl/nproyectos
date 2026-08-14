import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AUTH_COOKIE, getSession } from "@/lib/auth";
import { isActiveSession } from "@/lib/activeSession";
import { getLoginHistory } from "@/lib/loginHistory";
import { canViewLoginHistory } from "@/lib/permissions";

export const dynamic = "force-dynamic";

export async function GET() {
  const cookieStore = await cookies();
  const session = await getSession(
    cookieStore.get(AUTH_COOKIE)?.value,
    process.env.COTIZADOR_SESSION_SECRET
  );

  if (!session || !(await isActiveSession(session))) {
    return NextResponse.json({ error: "Sesión no autorizada." }, { status: 401 });
  }

  if (!canViewLoginHistory(session.user)) {
    return NextResponse.json({ error: "No tienes permiso para ver este historial." }, { status: 403 });
  }

  const history = await getLoginHistory();
  return NextResponse.json(history, {
    headers: { "Cache-Control": "no-store, max-age=0" },
  });
}
