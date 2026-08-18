import { database } from "@/lib/activeSession";

const CONTROL_KEY = "cotizador-va";

export type CotizadorAccessControl = {
  exclusive: boolean;
  exclusiveUsername: string | null;
  updatedAt: string | null;
};

export async function ensureCotizadorAccessControlTable() {
  const sql = database();
  await sql`CREATE TABLE IF NOT EXISTS cotizador_access_control (
    control_key TEXT PRIMARY KEY,
    exclusive_username TEXT,
    updated_at TIMESTAMPTZ
  )`;
  await sql`
    INSERT INTO cotizador_access_control (control_key, exclusive_username, updated_at)
    VALUES (${CONTROL_KEY}, NULL, NULL)
    ON CONFLICT (control_key) DO NOTHING
  `;
  return sql;
}

export async function getCotizadorAccessControl(): Promise<CotizadorAccessControl> {
  const sql = await ensureCotizadorAccessControlTable();
  const rows = await sql`
    SELECT exclusive_username, updated_at
    FROM cotizador_access_control
    WHERE control_key = ${CONTROL_KEY}
    LIMIT 1
  `;
  const row = rows[0];
  const exclusiveUsername = row?.exclusive_username ? String(row.exclusive_username) : null;

  return {
    exclusive: exclusiveUsername !== null,
    exclusiveUsername,
    updatedAt: row?.updated_at ? new Date(String(row.updated_at)).toISOString() : null,
  };
}

export async function userCanEnterCotizador(username: string) {
  const control = await getCotizadorAccessControl();
  return !control.exclusive || control.exclusiveUsername === username.trim().toLocaleLowerCase("es");
}

export async function setCotizadorExclusiveAccess(username: string, enabled: boolean) {
  const normalizedUsername = username.trim().toLocaleLowerCase("es");
  const sql = await ensureCotizadorAccessControlTable();
  await sql`
    UPDATE cotizador_access_control
    SET exclusive_username = ${enabled ? normalizedUsername : null}, updated_at = NOW()
    WHERE control_key = ${CONTROL_KEY}
  `;

  if (enabled) {
    await sql`
      DELETE FROM active_sessions
      WHERE username <> ${normalizedUsername}
    `;
  }

  return getCotizadorAccessControl();
}
