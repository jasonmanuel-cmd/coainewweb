import { z } from "zod";
import { ACTIVITY_PAGES } from "@/lib/crm/activity";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import { getClientIp, hasJsonContentType, isSameSiteRequest } from "@/lib/security/request-guards";
import { takeRateLimitToken } from "@/lib/utils/rate-limit";
import { recordRedisView, usesRedisCrm } from "@/lib/crm/redis-store";
export async function POST(request: Request) {
  const empty = (status = 204) => new Response(null, { status, headers: { "Cache-Control": "no-store" } });
  if (process.env.COAI_CRM_ENABLED !== "true") return empty();
  if (!hasJsonContentType(request) || !isSameSiteRequest(request)) return empty(403);
  if (request.headers.get("dnt") === "1" || request.headers.get("sec-gpc") === "1") return empty();
  try {
    if (!(await takeRateLimitToken(`activity:${getClientIp(request)}`, 30, 60000))) return empty(429);
    const parsed = z.object({ page: z.enum(ACTIVITY_PAGES) }).strict().safeParse(await request.json());
    if (!parsed.success) return empty(400);
    if (usesRedisCrm()) { await recordRedisView(parsed.data.page); return empty(); }
    const db = getSupabaseAdmin(); if (!db) return empty(503);
    const { error } = await db.rpc("coai_crm_count_view", { requested_page: parsed.data.page });
    return empty(error ? 503 : 204);
  } catch { return empty(503); }
}
