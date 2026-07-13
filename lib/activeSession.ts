import { neon } from "@neondatabase/serverless";
import type { SessionData } from "@/lib/auth";

export function database() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL no está configurada.");
  return neon(process.env.DATABASE_URL);
}

export async function ensureActiveSessionsTable() {
  const sql = database();
  await sql`CREATE TABLE IF NOT EXISTS active_sessions (
    username TEXT PRIMARY KEY,
    session_id TEXT NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL
  )`;
  return sql;
}

export async function isActiveSession(session: SessionData | null) {
  if (!session) return false;
  const sql = await ensureActiveSessionsTable();
  const rows = await sql`
    SELECT 1 FROM active_sessions
    WHERE username = ${session.user.toLocaleLowerCase("es")}
      AND session_id = ${session.sessionId}
      AND expires_at > NOW()
    LIMIT 1
  `;
  return rows.length === 1;
}

export async function releaseActiveSession(session: SessionData | null) {
  if (!session || !process.env.DATABASE_URL) return;
  const sql = await ensureActiveSessionsTable();
  await sql`
    DELETE FROM active_sessions
    WHERE username = ${session.user.toLocaleLowerCase("es")}
      AND session_id = ${session.sessionId}
  `;
}
