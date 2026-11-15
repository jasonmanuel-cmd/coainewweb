import { neon } from "@neondatabase/serverless";
import { randomUUID } from "node:crypto";

export type DeliveryState = "pending" | "accepted" | "unknown" | "ready";
export interface DeliveryClaim { id: string; fingerprint: string; state: DeliveryState; attempts: number; owned: boolean }
function db() {
  if (!process.env.DATABASE_URL) throw new Error("Delivery receipt storage unavailable");
  return neon(process.env.DATABASE_URL, { fetchOptions: { signal: AbortSignal.timeout(2000) } });
}

/** A unique lead receipt is a permanent claim, not a lease. Never reclaim after timeout. */
export async function claimDelivery(key: string, fingerprint: string): Promise<DeliveryClaim> {
  const sql = db();
  const id = randomUUID();
  const inserted = await sql`insert into coai_hq.delivery_receipts(id,lead_id,fingerprint)
    select ${id}::uuid,id,${fingerprint} from coai_hq.leads where submission_key=${key}
    on conflict(lead_id) do nothing returning id,fingerprint,state,attempts`;
  if (inserted.length === 1) return { ...inserted[0], owned: true } as DeliveryClaim;
  // Only a reviewed operator reconciliation may arm one further explicit visitor retry.
  const retried = await sql`update coai_hq.delivery_receipts r set state='pending',attempts=attempts+1,finished_at=null
    from coai_hq.leads l where l.id=r.lead_id and l.submission_key=${key}
      and r.state='ready' and r.attempts=1 and r.fingerprint=${fingerprint}
      and r.reconciliation_ref is not null returning r.id,r.fingerprint,r.state,r.attempts`;
  if (retried.length === 1) return { ...retried[0], owned: true } as DeliveryClaim;
  // Separate statement obtains a fresh snapshot after a concurrent insert commits.
  const existing = await sql`select r.id,r.fingerprint,r.state,r.attempts from coai_hq.delivery_receipts r
    join coai_hq.leads l on l.id=r.lead_id where l.submission_key=${key}`;
  if (existing.length !== 1) throw new Error("Captured lead receipt unavailable");
  return { ...existing[0], owned: false } as DeliveryClaim;
}

export async function finishDelivery(id: string, state: "accepted" | "unknown", attempts: number) {
  const rows = await db()`update coai_hq.delivery_receipts set state=${state},finished_at=clock_timestamp()
    where id=${id}::uuid and state='pending' and attempts=${attempts} returning id`;
  if (rows.length !== 1) throw new Error("Delivery receipt update unconfirmed");
}
