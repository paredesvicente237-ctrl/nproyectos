import { createHash } from "node:crypto";
import { database } from "@/lib/activeSession";

type MemoryBucket = { count: number; expiresAt: number };

const localBuckets = new Map<string, MemoryBucket>();
let rateLimitTableReady: Promise<void> | undefined;

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
  scope: "chat" | "lead",
  maxHits: number,
  windowSeconds: number,
) {
  const address = requestAddress(request);
  const keyHash = createHash("sha256")
    .update(`nproyectos-public-v1:${scope}:${address}`)
    .digest("hex");

  if (!process.env.DATABASE_URL) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Rate limit storage is not configured.");
    }
    return checkLocalRateLimit(`${scope}:${keyHash}`, maxHits, windowSeconds);
  }

  const sql = database();
  if (!rateLimitTableReady) {
    rateLimitTableReady = sql`
      CREATE TABLE IF NOT EXISTS public_assistant_rate_limits (
        key_hash TEXT PRIMARY KEY,
        hit_count INTEGER NOT NULL DEFAULT 0,
        expires_at TIMESTAMPTZ NOT NULL
      )
    `.then(async () => {
      await sql`CREATE INDEX IF NOT EXISTS public_assistant_rate_limits_expiry_idx
        ON public_assistant_rate_limits (expires_at)`;
    }).catch((error) => {
      rateLimitTableReady = undefined;
      throw error;
    });
  }
  await rateLimitTableReady;

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
