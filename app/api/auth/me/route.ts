import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AUTH_COOKIE, getSessionUser } from "@/lib/auth";

export async function GET() {
  const cookieStore = await cookies();
  const user = await getSessionUser(
    cookieStore.get(AUTH_COOKIE)?.value,
    process.env.COTIZADOR_SESSION_SECRET
  );

  if (!user) return NextResponse.json({ error: "Sesión no autorizada." }, { status: 401 });
  return NextResponse.json({ user });
}
