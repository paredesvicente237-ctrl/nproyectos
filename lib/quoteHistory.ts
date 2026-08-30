import { database } from "@/lib/activeSession";

export type StoredQuoteLine = {
  category: string;
  name: string;
  detail: string;
  modeText: string;
  quantity: number;
  total: number;
};

export type QuoteHistoryEntry = {
  id: string;
  number: number;
  username: string;
  subtotal: number;
  iva: number;
  total: number;
  items: StoredQuoteLine[];
  emailedTo: string;
  emailSent: boolean;
  createdAt: string;
};

export async function ensureQuoteHistoryTables() {
  const sql = database();
  await sql`CREATE TABLE IF NOT EXISTS quote_counter (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    value BIGINT NOT NULL DEFAULT 0
  )`;
  await sql`CREATE TABLE IF NOT EXISTS quote_history (
    id BIGSERIAL PRIMARY KEY,
    quote_number BIGINT NOT NULL UNIQUE,
    username TEXT NOT NULL,
    subtotal BIGINT NOT NULL,
    iva BIGINT NOT NULL,
    total BIGINT NOT NULL,
    items JSONB NOT NULL,
    emailed_to TEXT NOT NULL,
    email_sent BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`;
  await sql`CREATE INDEX IF NOT EXISTS quote_history_created_at_idx
    ON quote_history (created_at DESC)`;
  return sql;
}

export async function createQuoteHistory(
  username: string,
  lines: StoredQuoteLine[],
  emailedTo: string
) {
  const subtotal = Math.round(lines.reduce((sum, line) => sum + line.total, 0));
  const iva = Math.round(subtotal * 0.19);
  const total = subtotal + iva;
  const sql = await ensureQuoteHistoryTables();
  const rows = await sql`
    WITH next_number AS (
      INSERT INTO quote_counter (id, value)
      VALUES (1, 1)
      ON CONFLICT (id) DO UPDATE SET value = quote_counter.value + 1
      RETURNING value
    )
    INSERT INTO quote_history (
      quote_number, username, subtotal, iva, total, items, emailed_to
    )
    SELECT
      value,
      ${username},
      ${subtotal},
      ${iva},
      ${total},
      CAST(${JSON.stringify(lines)} AS JSONB),
      ${emailedTo}
    FROM next_number
    RETURNING id::text AS id, quote_number, created_at
  `;

  return {
    id: String(rows[0].id),
    number: Number(rows[0].quote_number),
    subtotal,
    iva,
    total,
    createdAt: new Date(String(rows[0].created_at)).toISOString(),
  };
}

export async function markQuoteEmailSent(id: string) {
  const sql = await ensureQuoteHistoryTables();
  await sql`
    UPDATE quote_history
    SET email_sent = TRUE
    WHERE id = ${id}
  `;
}

export async function getQuoteHistory() {
  const sql = await ensureQuoteHistoryTables();
  const rows = await sql`
    SELECT
      id::text AS id,
      quote_number,
      username,
      subtotal,
      iva,
      total,
      items,
      emailed_to,
      email_sent,
      created_at
    FROM quote_history
    ORDER BY created_at DESC
  `;

  return rows.map((row) => ({
    id: String(row.id),
    number: Number(row.quote_number),
    username: String(row.username),
    subtotal: Number(row.subtotal),
    iva: Number(row.iva),
    total: Number(row.total),
    items: row.items as StoredQuoteLine[],
    emailedTo: String(row.emailed_to),
    emailSent: Boolean(row.email_sent),
    createdAt: new Date(String(row.created_at)).toISOString(),
  })) satisfies QuoteHistoryEntry[];
}
