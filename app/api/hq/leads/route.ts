import { z } from "zod";
import { requireHqOwner } from "@/lib/crm/auth";
import { crmError, privateJson } from "@/lib/crm/response";
import { LEAD_STAGES } from "@/lib/crm/types";
import { PublicError } from "@/lib/public-error";
import { hasJsonContentType, isSameSiteRequest } from "@/lib/security/request-guards";
import { listRedisLeads, updateRedisLead, usesRedisCrm } from "@/lib/crm/redis-store";
import { getSupabaseAdmin } from "@/lib/supabase/client";

export async function GET(request: Request) {
  try {
    await requireHqOwner();
    const url = new URL(request.url); const page = Math.max(0, Math.min(10000, Number(url.searchParams.get("page")) || 0));
    const stage = url.searchParams.get("stage"); const search = (url.searchParams.get("q") ?? "").slice(0, 150);
    if (usesRedisCrm()) {
      const leads=(await listRedisLeads()).filter(row => (!stage || row.stage===stage) && (!search || [row.first_name,row.business_name,row.email,row.phone].join(" ").toLowerCase().includes(search.toLowerCase())));
      return privateJson({leads:leads.slice(Math.floor(page)*50,Math.floor(page)*50+50),total:leads.length,page:Math.floor(page)});
    }
    const db=getSupabaseAdmin(); if (!db) throw new PublicError("HQ storage is unavailable.",503);
    let query = db.from("coai_crm_leads").select("id,first_name,business_name,email,phone,business_website,source,intent,industry,sms_consent,stage,notes,follow_up_on,created_at,updated_at,details", { count: "exact" });
    if (stage && LEAD_STAGES.includes(stage as typeof LEAD_STAGES[number])) query = query.eq("stage", stage);
    if (search) query = query.ilike("search_text", `%${search.replace(/[\\%_]/g, "\\$&")}%`);
    const { data, error, count } = await query.order("created_at", { ascending: false }).order("id", { ascending: false }).range(Math.floor(page) * 50, Math.floor(page) * 50 + 49);
    if (error) throw new PublicError("Lead storage is unavailable. Check the database setup.", 503);
    return privateJson({ leads: data, total: count, page: Math.floor(page) });
  } catch (error) { return crmError(error); }
}
const update = z.object({ id: z.string().uuid(), updated_at: z.string().datetime({ offset: true }), stage: z.enum(LEAD_STAGES), notes: z.string().max(10000), follow_up_on: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(s => !Number.isNaN(Date.parse(s))).nullable() }).strict();
export async function PATCH(request: Request) {
  try {
    if (!isSameSiteRequest(request) || !hasJsonContentType(request)) throw new PublicError("Forbidden", 403);
    await requireHqOwner(); const body = update.safeParse(await request.json());
    if (!body.success) throw new PublicError("Check the lead stage, notes and follow-up date.", 400);
    const { id, updated_at, ...fields } = body.data;
    if (usesRedisCrm()) {
      if (!(await updateRedisLead(id,updated_at,fields))) throw new PublicError("This lead changed in another tab. Reload it before saving.",409);
      return privateJson({ok:true});
    }
    const db=getSupabaseAdmin(); if (!db) throw new PublicError("HQ storage is unavailable.",503);
    const { data, error } = await db.from("coai_crm_leads").update(fields).eq("id", id).eq("updated_at", updated_at).select("id").maybeSingle();
    if (error) throw new PublicError("The lead could not be saved.", 503);
    if (!data) throw new PublicError("This lead changed in another tab. Reload it before saving.", 409);
    return privateJson({ ok: true });
  } catch (error) { return crmError(error); }
}
