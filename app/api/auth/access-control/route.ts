import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AUTH_COOKIE, getSession } from "@/lib/auth";
import { isActiveSession } from "@/lib/activeSession";
import { getCotizadorAccessControl, setCotizadorExclusiveAccess } from "@/lib/cotizadorAccessControl";
import { canManageExclusiveAccess } from "@/lib/permissions";

export const dynamic = "force-dynamic";

async function getAuthorizedSession() {
  const cookieStore = await cookies();
  const session = await getSession(
    cookieStore.get(AUTH_COOKIE)?.value,
    process.env.COTIZADOR_SESSION_SECRET
  );

  if (!session || !(await isActiveSession(session))) return { error: "Sesión no autorizada.", status: 401 } as const;
  if (!canManageExclusiveAccess(session.user)) return { error: "No tienes permiso para controlar el acceso.", status: 403 } as const;
  return { session } as const;
}

export async function GET() {
  const authorization = await getAuthorizedSession();
  if ("error" in authorization) {
    return NextResponse.json({ error: authorization.error }, { status: authorization.status });
  }

  return NextResponse.json(await getCotizadorAccessControl(), {
    headers: { "Cache-Control": "no-store, max-age=0" },
  });
}

export async function POST(request: Request) {
  const authorization = await getAuthorizedSession();
  if ("error" in authorization) {
    return NextResponse.json({ error: authorization.error }, { status: authorization.status });
  }

  const body = (await request.json().catch(() => null)) as { exclusive?: unknown } | null;
  if (typeof body?.exclusive !== "boolean") {
    return NextResponse.json({ error: "Estado de acceso no válido." }, { status: 400 });
  }

  const control = await setCotizadorExclusiveAccess(authorization.session.user, body.exclusive);
  return NextResponse.json(control, {
    headers: { "Cache-Control": "no-store, max-age=0" },
  });
}
