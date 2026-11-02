import { neon } from "@neondatabase/serverless";
import { randomUUID } from "node:crypto";
import { deliverForm } from "@/lib/form-delivery";
import { PublicError } from "@/lib/public-error";
import { usesNeonCrm } from "./neon-store";
import { deliverIdempotently, idempotentDeliveryEnabled } from "./idempotent-delivery";

export const notificationJournalEnabled = () => usesNeonCrm() && process.env.COAI_CRM_ENABLED === "true" && process.env.COAI_NOTIFICATION_JOURNAL_ENABLED === "true";
// Deliberately no dispatch route, cron, worker or environment switch in this draft.
export const notificationDispatchEnabled = false;
function db() {
  if (!process.env.DATABASE_URL) throw new PublicError("Notification storage is not configured.", 503);
  return neon(process.env.DATABASE_URL, { fetchOptions: { signal: AbortSignal.timeout(2000) } });
}

async function beginAttempt(key: string) {
  const id = randomUUID();
  const rows = await db()`with journal as (
    insert into coai_hq.notification_journal(lead_id)
      select id from coai_hq.leads where submission_key=${key} and source in ('intake','contact')
      on conflict(lead_id) do update set lead_id=excluded.lead_id returning lead_id
  ) insert into coai_hq.notification_attempts(id,lead_id)
    select ${id}::uuid,lead_id from journal returning id`;
  if (rows.length !== 1) throw new Error("Notification journal could not identify the captured inquiry");
  return id;
}
async function finishAttempt(id: string, outcome: "accepted" | "unconfirmed") {
  await db()`update coai_hq.notification_attempts set outcome=${outcome},finished_at=clock_timestamp()
    where id=${id}::uuid and outcome='pending'`;
}
function recordingFailure() {
  // Never include SQL, upstream responses, credentials or inquiry data in logs.
  console.error("[notification-journal] Recording unavailable; inspect pending journal entries");
}

/** Adds an optional journal around the existing synchronous send. Its errors never change provider response semantics. */
export async function deliverCapturedForm(endpoint: string, fields: Record<string, string>, submissionKey?: string) {
  if (idempotentDeliveryEnabled()) return deliverIdempotently(endpoint, fields, submissionKey);
  let attempt: string | undefined;
  if (submissionKey && notificationJournalEnabled()) {
    try { attempt = await beginAttempt(submissionKey); } catch { recordingFailure(); }
  }
  try { await deliverForm(endpoint, fields); }
  catch (error) {
    if (attempt) { try { await finishAttempt(attempt, "unconfirmed"); } catch { recordingFailure(); } }
    throw error;
  }
  if (attempt) { try { await finishAttempt(attempt, "accepted"); } catch { recordingFailure(); } }
}

export async function listNotifications() {
  return db()`select j.lead_id,l.business_name,l.source,j.created_at,
    count(a.id)::int as attempts,
    case when count(*) filter (where a.outcome='accepted')>0 then 'accepted'
      when count(*) filter (where a.outcome='unconfirmed')>0 then 'unconfirmed'
      else 'pending' end as status
    from coai_hq.notification_journal j join coai_hq.leads l on l.id=j.lead_id
    left join coai_hq.notification_attempts a on a.lead_id=j.lead_id
    group by j.lead_id,l.business_name,l.source,j.created_at
    order by (count(*) filter (where a.outcome='accepted')>0) asc,j.created_at desc,j.lead_id
    limit 50`;
}
