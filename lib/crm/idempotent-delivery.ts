import { createHash } from "node:crypto";
import { deliverForm } from "@/lib/form-delivery";
import { PublicError } from "@/lib/public-error";
import { claimDelivery, finishDelivery } from "./delivery-store";

export const idempotentDeliveryEnabled = () => process.env.COAI_IDEMPOTENT_DELIVERY_ENABLED === "true";
const retainedFailure = () => new PublicError("Your inquiry is saved, but delivery is not confirmed. Please contact us directly so we can check it; submitting again will not retry delivery.", 503);

export async function deliverIdempotently(endpoint: string, fields: Record<string, string>, key?: string) {
  if (process.env.CRM_STORAGE !== "neon" || process.env.COAI_CRM_ENABLED !== "true" || !key) {
    throw new PublicError("Delivery is temporarily unavailable. Please contact us directly.", 503);
  }
  // Capture binds the key to source + validated lead content. Attribution/subjects may change on replay.
  const fingerprint = createHash("sha256").update(JSON.stringify([endpoint, key])).digest("hex");
  let claim;
  try { claim = await claimDelivery(key, fingerprint); } catch { throw retainedFailure(); }
  if (claim.fingerprint !== fingerprint) {
    throw new PublicError("This submission reference was already used. Please contact us directly to update your inquiry.", 409);
  }
  if (!claim.owned) {
    if (claim.state === "accepted") return;
    throw retainedFailure();
  }
  try { await deliverForm(endpoint, fields); }
  catch {
    // Even HTTP errors can follow an upstream side effect. No response is proof of non-delivery.
    try { await finishDelivery(claim.id, "unknown", claim.attempts); } catch { /* Pending is equally non-retryable. */ }
    throw retainedFailure();
  }
  try { await finishDelivery(claim.id, "accepted", claim.attempts); } catch { throw retainedFailure(); }
}
