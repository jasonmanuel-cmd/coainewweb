import { cookies } from "next/headers";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import { PublicError } from "@/lib/public-error";

export const HQ_COOKIE = "coai_hq_session";
export function isHqOwner(id: string): boolean {
  return (process.env.HQ_ADMIN_USER_IDS ?? "").split(",").map(x => x.trim()).filter(Boolean).includes(id);
}
export async function requireHqOwner() {
  const token = (await cookies()).get(HQ_COOKIE)?.value;
  if (!token) throw new PublicError("Sign in to your owner account.", 401);
  const db = getSupabaseAdmin();
  if (!db) throw new PublicError("HQ is awaiting database setup.", 503);
  const { data, error } = await db.auth.getUser(token);
  if (error || !data.user || !isHqOwner(data.user.id)) throw new PublicError("Your account cannot access HQ.", 403);
  return db;
}
