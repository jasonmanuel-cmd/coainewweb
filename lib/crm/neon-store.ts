import { neon } from "@neondatabase/serverless";
import { randomUUID } from "node:crypto";
import { PublicError } from "@/lib/public-error";
import type { CrmLead } from "./types";
export const usesNeonCrm=()=>process.env.CRM_STORAGE==="neon";
function sql() {
  const url=process.env.DATABASE_URL;
  if(!url) throw new PublicError("HQ database is not configured.",503);
  return neon(url);
}
export async function storeNeonLead(lead: Omit<CrmLead,"id"|"stage"|"notes"|"follow_up_on"|"created_at"|"updated_at"> & {consent_version:string}, key:string) {
  await sql()`insert into coai_hq.leads(submission_key,first_name,business_name,email,phone,business_website,source,intent,industry,sms_consent,consent_version,details)
    values(${key},${lead.first_name},${lead.business_name},${lead.email},${lead.phone},${lead.business_website},${lead.source},${lead.intent},${lead.industry},${lead.sms_consent},${lead.consent_version},${JSON.stringify(lead.details)}::jsonb)
    on conflict(submission_key) do nothing`;
}
export async function listNeonLeads(page:number,stage:string|null,search:string) {
  const offset=Math.floor(page)*50;
  const rows=await sql()`with filtered as (
      select * from coai_hq.leads where (${stage||""}='' or stage=${stage||""})
        and (${search}='' or position(lower(${search}) in search_text)>0)
    ), paged as (select * from filtered order by created_at desc,id desc limit 50 offset ${offset})
    select (select count(*)::int from filtered) as total,
      coalesce((select jsonb_agg(to_jsonb(paged)-'submission_key'-'search_text') from paged),'[]'::jsonb) as leads`;
  return {...rows[0],page:Math.floor(page)};
}
export async function updateNeonLead(id:string,expected:string,fields:{stage:string;notes:string;follow_up_on:string|null}) {
  const rows=await sql()`update coai_hq.leads set stage=${fields.stage},notes=${fields.notes},follow_up_on=${fields.follow_up_on}::date,updated_at=clock_timestamp()
    where id=${id}::uuid and updated_at=${expected}::timestamptz returning id`;
  return rows.length===1;
}
export async function recordNeonView(page:string) {
  await sql()`insert into coai_hq.daily(day,page,views) values((now() at time zone 'UTC')::date,${page},1)
    on conflict(day,page) do update set views=coai_hq.daily.views+1`;
}
export async function neonActivity() {
  return sql()`select day::text,page,views::int from coai_hq.daily where day>=(now() at time zone 'UTC')::date-29 order by day desc`;
}
export async function neonHealth(write=false) {
  const db=sql();
  if(!write) { await db`select 1 from coai_hq.leads limit 1`; return true; }
  const id=randomUUID(),value=randomUUID();
  // A non-lead probe; atomically insert/read/delete within one transaction, leaving no sample data.
  const results=await db.transaction([
    db`insert into coai_hq.health_probe(id,value) values(${id}::uuid,${value})`,
    db`select value from coai_hq.health_probe where id=${id}::uuid`,
    db`delete from coai_hq.health_probe where id=${id}::uuid`
  ]);
  return results[1][0]?.value===value;
}
