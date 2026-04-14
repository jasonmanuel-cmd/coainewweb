import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

type Bucket = {
  count: number;
  resetAt: number;
};

const memoryBuckets = new Map<string, Bucket>();

function memoryTake(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const current = memoryBuckets.get(key);

  if (!current || now > current.resetAt) {
    memoryBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (current.count >= limit) return false;
  current.count += 1;
  return true;
}

let redisSingleton: Redis | null | undefined;

function getRedis(): Redis | null {
  if (redisSingleton !== undefined) return redisSingleton;
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (!url || !token) {
    redisSingleton = null;
    return null;
  }
  try {
    redisSingleton = new Redis({ url, token });
  } catch {
    redisSingleton = null;
  }
  return redisSingleton;
}

const ratelimitInstances = new Map<string, Ratelimit>();

function getRatelimit(limit: number, windowSec: number): Ratelimit | null {
  const redis = getRedis();
  if (!redis) return null;
  const cacheKey = `${limit}:${windowSec}`;
  let rl = ratelimitInstances.get(cacheKey);
  if (!rl) {
    rl = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(limit, `${windowSec} s`),
      prefix: `coai_rl_${limit}_${windowSec}`,
      analytics: false
    });
    ratelimitInstances.set(cacheKey, rl);
  }
  return rl;
}

/**
 * Distributed limit when Upstash env is set; otherwise in-memory per instance (dev / fallback).
 */
export async function takeRateLimitToken(key: string, limit: number, windowMs: number): Promise<boolean> {
  const windowSec = Math.max(1, Math.round(windowMs / 1000));
  const rl = getRatelimit(limit, windowSec);
  if (rl) {
    const { success } = await rl.limit(key);
    return success;
  }
  return memoryTake(key, limit, windowMs);
}
