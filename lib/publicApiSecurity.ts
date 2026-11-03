import { createHash, randomUUID } from "node:crypto";
import { neon } from "@neondatabase/serverless";

type MemoryBucket = { count: number; expiresAt: number };
type MemoryLock = { leaseId: string; expiresAt: number };

const localBuckets = new Map<string, MemoryBucket>();
const localLocks = new Map<string, MemoryLock>();
const securityTablesReady = new Map<"assistant" | "contact", Promise<void>>();

const MAX_ACTIVE_ASSISTANT_REQUESTS = 4;
const ASSISTANT_LOCK_LEASE_SECONDS = 60;
type DatabaseClient = ReturnType<typeof neon<false, false>>;

function assistantDatabase() {
  const connectionString = process.env.AI_ASSISTANT_DATABASE_URL;
  if (!connectionString) throw new Error("AI_ASSISTANT_DATABASE_URL no está configurada.");
  return neon(connectionString);
}

async function ensureSecurityTables(sql: DatabaseClient, storage: "assistant" | "contact") {
  if (!securityTablesReady.has(storage)) {
    securityTablesReady.set(storage, (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS public_assistant_rate_limits (
          key_hash TEXT PRIMARY KEY,
          hit_count INTEGER NOT NULL DEFAULT 0,
          expires_at TIMESTAMPTZ NOT NULL
        )
      `;
      await sql`CREATE INDEX IF NOT EXISTS public_assistant_rate_limits_expiry_idx
        ON public_assistant_rate_limits (expires_at)`;
      await sql`
        CREATE TABLE IF NOT EXISTS public_assistant_request_locks (
          lock_key TEXT PRIMARY KEY,
          lease_id TEXT NOT NULL,
          expires_at TIMESTAMPTZ NOT NULL
        )
      `;
      await sql`CREATE INDEX IF NOT EXISTS public_assistant_request_locks_expiry_idx
        ON public_assistant_request_locks (expires_at)`;
    })().catch((error) => {
      securityTablesReady.delete(storage);
      throw error;
    }));
  }
  await securityTablesReady.get(storage);
}

export function isSameOriginRequest(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;

  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

function requestAddress(request: Request) {
  return (
    request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || "unknown"
  );
}

function checkLocalRateLimit(key: string, maxHits: number, windowSeconds: number) {
  const now = Date.now();
  if (localBuckets.size > 2000) {
    for (const [bucketKey, bucket] of localBuckets) {
      if (bucket.expiresAt <= now) localBuckets.delete(bucketKey);
    }
  }

  const bucket = localBuckets.get(key);
  if (!bucket || bucket.expiresAt <= now) {
    localBuckets.set(key, { count: 1, expiresAt: now + windowSeconds * 1000 });
    return false;
  }

  bucket.count += 1;
  return bucket.count > maxHits;
}

export async function isPublicApiRateLimited(
  request: Request,
  scope: "chat" | "chat-session" | "lead" | "contact",
  maxHits: number,
  windowSeconds: number,
  identity?: string,
) {
  const hasDatabase = Boolean(process.env.AI_ASSISTANT_DATABASE_URL);
  const address = identity ? `session:${identity}` : `ip:${requestAddress(request)}`;
  const keyHash = createHash("sha256")
    .update(`nproyectos-public-v1:${scope}:${address}`)
    .digest("hex");

  if (!hasDatabase) {
    if (process.env.VERCEL_ENV === "production" || (!process.env.VERCEL_ENV && process.env.NODE_ENV === "production")) {
      throw new Error("Public API rate limit storage is not configured.");
    }
    return checkLocalRateLimit(`${scope}:${keyHash}`, maxHits, windowSeconds);
  }

  const sql = assistantDatabase();
  await ensureSecurityTables(sql, scope === "contact" ? "contact" : "assistant");

  await sql`DELETE FROM public_assistant_rate_limits WHERE expires_at <= NOW()`;
  const rows = await sql`
    INSERT INTO public_assistant_rate_limits (key_hash, hit_count, expires_at)
    VALUES (${keyHash}, 1, NOW() + (${windowSeconds} * INTERVAL '1 second'))
    ON CONFLICT (key_hash) DO UPDATE
      SET hit_count = public_assistant_rate_limits.hit_count + 1
    RETURNING hit_count
  `;

  return Number(rows[0]?.hit_count ?? 0) > maxHits;
}

function lockHash(scope: string, identity: string) {
  return createHash("sha256")
    .update(`nproyectos-assistant-lock-v1:${scope}:${identity}`)
    .digest("hex");
}

function acquireLocalLocks(sessionKey: string): (() => Promise<void>) | null {
  const now = Date.now();
  for (const [key, lock] of localLocks) {
    if (lock.expiresAt <= now) localLocks.delete(key);
  }

  if (localLocks.has(sessionKey)) return null;

  let globalSlot = "";
  for (let index = 0; index < MAX_ACTIVE_ASSISTANT_REQUESTS; index += 1) {
    const candidate = `global:${index}`;
    if (!localLocks.has(candidate)) {
      globalSlot = candidate;
      break;
    }
  }
  if (!globalSlot) return null;

  const leaseId = randomUUID();
  const expiresAt = now + ASSISTANT_LOCK_LEASE_SECONDS * 1000;
  localLocks.set(sessionKey, { leaseId, expiresAt });
  localLocks.set(globalSlot, { leaseId, expiresAt });

  return async () => {
    if (localLocks.get(sessionKey)?.leaseId === leaseId) localLocks.delete(sessionKey);
    if (localLocks.get(globalSlot)?.leaseId === leaseId) localLocks.delete(globalSlot);
  };
}

export async function acquireAssistantRequestSlot(
  sessionId: string,
): Promise<(() => Promise<void>) | null> {
  const sessionKey = lockHash("session", sessionId);

  if (!process.env.AI_ASSISTANT_DATABASE_URL) {
    if (process.env.VERCEL_ENV === "production" || (!process.env.VERCEL_ENV && process.env.NODE_ENV === "production")) {
      throw new Error("Assistant concurrency storage is not configured.");
    }
    return acquireLocalLocks(sessionKey);
  }

  const sql = assistantDatabase();
  await ensureSecurityTables(sql, "assistant");

  await sql`DELETE FROM public_assistant_request_locks WHERE expires_at <= NOW()`;

  const leaseId = randomUUID();
  const leaseDuration = ASSISTANT_LOCK_LEASE_SECONDS;
  const sessionRows = await sql`
    INSERT INTO public_assistant_request_locks (lock_key, lease_id, expires_at)
    VALUES (${sessionKey}, ${leaseId}, NOW() + (${leaseDuration} * INTERVAL '1 second'))
    ON CONFLICT (lock_key) DO UPDATE
      SET lease_id = EXCLUDED.lease_id, expires_at = EXCLUDED.expires_at
      WHERE public_assistant_request_locks.expires_at <= NOW()
    RETURNING lock_key
  `;
  if (sessionRows.length === 0) return null;

  let globalKey = "";
  let globalLeaseId = "";
  for (let index = 0; index < MAX_ACTIVE_ASSISTANT_REQUESTS; index += 1) {
    const candidateKey = lockHash("global", String(index));
    const candidateLeaseId = randomUUID();
    const rows = await sql`
      INSERT INTO public_assistant_request_locks (lock_key, lease_id, expires_at)
      VALUES (${candidateKey}, ${candidateLeaseId}, NOW() + (${leaseDuration} * INTERVAL '1 second'))
      ON CONFLICT (lock_key) DO UPDATE
        SET lease_id = EXCLUDED.lease_id, expires_at = EXCLUDED.expires_at
        WHERE public_assistant_request_locks.expires_at <= NOW()
      RETURNING lock_key
    `;
    if (rows.length > 0) {
      globalKey = candidateKey;
      globalLeaseId = candidateLeaseId;
      break;
    }
  }

  if (!globalKey) {
    await sql`DELETE FROM public_assistant_request_locks
      WHERE lock_key = ${sessionKey} AND lease_id = ${leaseId}`;
    return null;
  }

  return async () => {
    await Promise.all([
      sql`DELETE FROM public_assistant_request_locks
        WHERE lock_key = ${sessionKey} AND lease_id = ${leaseId}`,
      sql`DELETE FROM public_assistant_request_locks
        WHERE lock_key = ${globalKey} AND lease_id = ${globalLeaseId}`,
    ]);
  };
}
