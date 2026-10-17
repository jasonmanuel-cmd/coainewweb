import { cookies } from "next/headers";
import { z } from "zod";
import { HQ_COOKIE, isHqOwner, requireHqOwner } from "@/lib/crm/auth";
import { crmError, privateJson } from "@/lib/crm/response";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import { PublicError } from "@/lib/public-error";
import { getClientIp, hasJsonContentType, isSameSiteRequest } from "@/lib/security/request-guards";
import { takeRateLimitToken } from "@/lib/utils/rate-limit";

export async function GET() {
  try { await requireHqOwner(); return privateJson({ ok: true, capture_enabled: process.env.COAI_CRM_ENABLED === "true" }); } catch (error) { return crmError(error); }
}
export async function POST(request: Request) {
  try {
    if (!isSameSiteRequest(request) || !hasJsonContentType(request)) throw new PublicError("Forbidden", 403);
    if (!(await takeRateLimitToken(`hq-login:${getClientIp(request)}`, 5, 900_000))) throw new PublicError("Too many sign-in attempts. Try again later.", 429);
    const body = z.object({ email: z.string().email().max(320), password: z.string().min(1).max(256) }).safeParse(await request.json());
    if (!body.success) throw new PublicError("Enter your email and password.", 400);
    const db = getSupabaseAdmin();
    if (!db || !process.env.HQ_ADMIN_USER_IDS?.trim()) throw new PublicError("HQ is awaiting owner and database setup.", 503);
    const { data, error } = await db.auth.signInWithPassword(body.data);
    if (error || !data.session || !isHqOwner(data.user.id)) throw new PublicError("Unable to sign in with that account.", 401);
    (await cookies()).set(HQ_COOKIE, data.session.access_token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/api/hq", maxAge: Math.min(data.session.expires_in, 3600) });
    return privateJson({ ok: true, capture_enabled: process.env.COAI_CRM_ENABLED === "true" });
  } catch (error) { return crmError(error); }
}
export async function DELETE(request: Request) {
  try {
    if (!isSameSiteRequest(request)) throw new PublicError("Forbidden", 403);
    (await cookies()).set(HQ_COOKIE, "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/api/hq", maxAge: 0 });
    return privateJson({ ok: true });
  } catch (error) { return crmError(error); }
}
