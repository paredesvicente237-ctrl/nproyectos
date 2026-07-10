import { neon } from "@neondatabase/serverless";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AUTH_COOKIE, getSession } from "@/lib/auth";
import { isActiveSession } from "@/lib/activeSession";

export async function POST() {
  const cookieStore = await cookies();
  const session = await getSession(
    cookieStore.get(AUTH_COOKIE)?.value,
    process.env.COTIZADOR_SESSION_SECRET
  );

  if (!session || !(await isActiveSession(session))) {
    return NextResponse.json({ error: "Sesión no autorizada." }, { status: 401 });
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    return NextResponse.json({ error: "El contador de cotizaciones aún no está configurado." }, { status: 503 });
  }

  const sql = neon(databaseUrl);
  await sql`CREATE TABLE IF NOT EXISTS quote_counter (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    value BIGINT NOT NULL DEFAULT 0
  )`;
  const rows = await sql`
    INSERT INTO quote_counter (id, value)
    VALUES (1, 1)
    ON CONFLICT (id) DO UPDATE SET value = quote_counter.value + 1
    RETURNING value
  `;

  return NextResponse.json({ number: Number(rows[0].value) });
}
