/**
 * Formspree form endpoint — contact, diagnostic intake, and JAX waitlist all POST here.
 * Delivery goes to whatever email is set in the Formspree dashboard for this form ID.
 * Keep that inbox aligned with `CONTACT.email` in `lib/site.ts` (e.g. chaoticallyorganizedai@gmail.com).
 */
export const FORMSPREE_ENDPOINT = "https://formspree.io/f/xvzbkovo";
