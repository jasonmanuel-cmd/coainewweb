import { createHash, randomUUID } from "node:crypto";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import { PublicError } from "@/lib/public-error";
import { storeRedisLead, usesRedisCrm } from "./redis-store";
import { storeNeonLead, usesNeonCrm } from "./neon-store";

/** Capture only validated, verified form submissions. Never store CAPTCHA tokens, IPs or honeypots. */
export async function captureCrmLead(source: "intake" | "contact" | "audit" | "waitlist", fields: Record<string, string>) {
  // Enable only after the table and owner access have been verified. Email remains operational before rollout.
  if (process.env.COAI_CRM_ENABLED !== "true") return;
  const db = getSupabaseAdmin();
  if (!db && !usesRedisCrm() && !usesNeonCrm()) throw new PublicError("We couldn't save your inquiry. Please contact us directly.", 503);
  const detailKeys = ["package_interest", "website_type", "missed_calls", "ticket_value", "closing_rate", "revenue_leak", "inbound_source", "contact_intent"];
  const details = Object.fromEntries(detailKeys.filter(k => fields[k]).map(k => [k, fields[k]]));
  const lead = {
    first_name: fields.first_name ?? "", business_name: fields.business_name ?? "",
    email: fields.email ?? "", phone: fields.phone ?? "", business_website: fields.business_website ?? "",
    source, intent: fields.package_interest === "2" ? "build" : source === "intake" ? "scorecard" : source,
    industry: fields.industry ?? "", sms_consent: fields.sms_consent === "yes" ? "yes" : "no", consent_version: "request-only-v1", details
  };
  // Suppress same-payload retries within a ten-minute time bucket, without overwriting owner edits.
  const submission_key = createHash("sha256").update(JSON.stringify([lead, Math.floor(Date.now() / 600_000)])).digest("hex");
  if(usesNeonCrm()) {await storeNeonLead({...lead,sms_consent:lead.sms_consent as "yes"|"no"},submission_key);return;}
  if (usesRedisCrm()) {
    const now=new Date().toISOString();
    await storeRedisLead({...lead,id:randomUUID(),sms_consent:lead.sms_consent as "yes"|"no",stage:"new",notes:"",follow_up_on:null,created_at:now,updated_at:now},submission_key); return;
  }
  const { error } = await db!.from("coai_crm_leads").upsert({ ...lead, submission_key }, { onConflict: "submission_key", ignoreDuplicates: true });
  if (error) throw new PublicError("We couldn't save your inquiry. Please try again or contact us directly.", 503);
}
