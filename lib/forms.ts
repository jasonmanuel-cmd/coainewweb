/** Diagnostic intake form → jasonm@coaibakersfield.com */
export const FORMSPREE_INTAKE = "https://formspree.io/f/xwvzgggl";

/** Contact page + JAX waitlist → jasonm@coaibakersfield.com */
export const FORMSPREE_CONTACT = "https://formspree.io/f/mqeozzkw";

/** Send a lead notification email via Formspree (fire-and-forget, never throws) */
export async function notifyLead(fields: Record<string, string>): Promise<void> {
  try {
    const fd = new FormData();
    for (const [k, v] of Object.entries(fields)) fd.set(k, v);
    await fetch(FORMSPREE_CONTACT, { method: "POST", body: fd, headers: { Accept: "application/json" } });
  } catch {
    // notification failure must never break the main request
  }
}
