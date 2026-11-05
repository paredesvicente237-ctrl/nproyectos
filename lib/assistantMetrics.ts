import { neon } from "@neondatabase/serverless";

type DatabaseClient = ReturnType<typeof neon<false, false>>;

let tableReady: Promise<void> | null = null;

function assistantDatabase(): DatabaseClient {
  const connectionString = process.env.AI_ASSISTANT_DATABASE_URL;
  if (!connectionString) throw new Error("AI_ASSISTANT_DATABASE_URL no está configurada.");
  return neon(connectionString);
}

async function ensureConversationCountTable(sql: DatabaseClient) {
  if (!tableReady) {
    tableReady = sql`
      CREATE TABLE IF NOT EXISTS public_assistant_daily_conversation_counts (
        conversation_date DATE PRIMARY KEY,
        conversation_count BIGINT NOT NULL DEFAULT 0 CHECK (conversation_count >= 0)
      )
    `.then(() => undefined).catch((error) => {
      tableReady = null;
      throw error;
    });
  }

  await tableReady;
}

/** Stores only a daily total; it does not persist a visitor, session, or message identifier. */
export async function recordAssistantConversationStart() {
  const sql = assistantDatabase();
  await ensureConversationCountTable(sql);
  await sql`DELETE FROM public_assistant_daily_conversation_counts
    WHERE conversation_date < CURRENT_DATE - 29`;
  await sql`
    INSERT INTO public_assistant_daily_conversation_counts (conversation_date, conversation_count)
    VALUES (CURRENT_DATE, 1)
    ON CONFLICT (conversation_date) DO UPDATE
      SET conversation_count = public_assistant_daily_conversation_counts.conversation_count + 1
  `;
}
