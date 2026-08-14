import { database } from "@/lib/activeSession";

export type LoginHistoryEntry = {
  id: string;
  username: string;
  loggedInAt: string;
};

export type LoginHistorySummary = {
  username: string;
  loginCount: number;
  lastLoginAt: string;
  active: boolean;
};

export async function ensureLoginHistoryTable() {
  const sql = database();
  await sql`CREATE TABLE IF NOT EXISTS login_history (
    id BIGSERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    logged_in_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`;
  await sql`CREATE INDEX IF NOT EXISTS login_history_logged_in_at_idx
    ON login_history (logged_in_at DESC)`;
  return sql;
}

export async function recordLogin(username: string) {
  const sql = await ensureLoginHistoryTable();
  await sql`
    INSERT INTO login_history (username)
    VALUES (${username})
  `;
}

export async function getLoginHistory() {
  const sql = await ensureLoginHistoryTable();
  const [entries, summaries] = await Promise.all([
    sql`
      SELECT id::text AS id, username, logged_in_at
      FROM login_history
      ORDER BY logged_in_at DESC
      LIMIT 50
    `,
    sql`
      SELECT
        history.username,
        COUNT(*)::int AS login_count,
        MAX(history.logged_in_at) AS last_login_at,
        EXISTS (
          SELECT 1
          FROM active_sessions active
          WHERE active.username = LOWER(history.username)
            AND active.expires_at > NOW()
        ) AS active
      FROM login_history history
      GROUP BY history.username
      ORDER BY MAX(history.logged_in_at) DESC
    `,
  ]);

  return {
    entries: entries.map((entry) => ({
      id: String(entry.id),
      username: String(entry.username),
      loggedInAt: new Date(String(entry.logged_in_at)).toISOString(),
    })) satisfies LoginHistoryEntry[],
    summaries: summaries.map((summary) => ({
      username: String(summary.username),
      loginCount: Number(summary.login_count),
      lastLoginAt: new Date(String(summary.last_login_at)).toISOString(),
      active: Boolean(summary.active),
    })) satisfies LoginHistorySummary[],
  };
}
