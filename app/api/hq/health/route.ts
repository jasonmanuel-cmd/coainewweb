import { requireHqOwner } from "@/lib/crm/auth";
import { redisCommand, usesRedisCrm } from "@/lib/crm/redis-store";
import { privateJson, crmError } from "@/lib/crm/response";
import { PublicError } from "@/lib/public-error";
import { randomUUID } from "node:crypto";
import { isSameSiteRequest } from "@/lib/security/request-guards";
import {neonHealth,usesNeonCrm} from "@/lib/crm/neon-store";
import { getSupabaseAdmin } from "@/lib/supabase/client";
export async function GET() {
  try {
    await requireHqOwner();
    if(usesNeonCrm()) return privateJson({ok:await neonHealth(),storage:"neon",capture_enabled:process.env.COAI_CRM_ENABLED==="true"});
    if (!usesRedisCrm()) {
      const db = getSupabaseAdmin();
      if (!db) throw new PublicError("Supabase storage is not configured.", 503);
      const { error } = await db.from("coai_crm_leads").select("id").limit(1);
      if (error) throw new PublicError("Supabase lead storage is unavailable.", 503);
      return privateJson({ ok: true, storage: "supabase", capture_enabled: process.env.COAI_CRM_ENABLED === "true", storage_write_verified: false });
    }
    const pong=await redisCommand<string>("PING");
    return privateJson({ok:pong==="PONG",storage:"redis",capture_enabled:process.env.COAI_CRM_ENABLED==="true"});
  } catch(error) {return crmError(error);}
}
export async function POST(request:Request) {
  try {
    if(!isSameSiteRequest(request)) throw new PublicError("Forbidden",403);
    await requireHqOwner();
    if(usesNeonCrm()) {const ok=await neonHealth(true);return privateJson({ok,storage_write_verified:ok});}
    if (!usesRedisCrm()) throw new PublicError("Supabase write verification requires a separate approved database check. No probe was written.", 501);
    const key=`coai:hq:v1:health:${randomUUID()}`; const value=randomUUID();
    try {
      await redisCommand("SET",key,value,"EX",30);
      const read=await redisCommand<string>("GET",key);
      return privateJson({ok:read===value,storage_write_verified:read===value});
    } finally {await redisCommand("DEL",key);}
  } catch(error) {return crmError(error);}
}
