import { BOOKING_URL, BUSINESS_HOURS_LABEL, CONTACT } from "@/lib/site";

/**
 * One plain-text confirmation to the person who just submitted a request.
 *
 * Off unless COAI_AUTOREPLY_ENABLED=true and both RESEND_API_KEY and COAI_AUTOREPLY_FROM are set
 * (a sender on a domain verified in Resend). Best effort: it never throws and never changes the
 * response the visitor gets, and it logs only a fixed label, never an address or a provider body.
 * It promises nothing beyond the published business hours.
 */
export function autoreplyEnabled(): boolean {
  return process.env.COAI_AUTOREPLY_ENABLED === "true" && Boolean(process.env.RESEND_API_KEY) && Boolean(process.env.COAI_AUTOREPLY_FROM);
}

export function confirmationMessage(firstName: string, kind: "contact" | "intake") {
  const name = firstName.replace(/[\r\n]+/g, " ").trim().slice(0, 60) || "there";
  const what = kind === "intake" ? "your request" : "your message";
  return {
    subject: "We got your request — Chaotically Organized AI",
    text: [
      `Hi ${name},`,
      "",
      `Thanks for reaching out. We received ${what}.`,
      "",
      `Jason reviews inquiries during published business hours (${BUSINESS_HOURS_LABEL}). Scope, timing and any fees are confirmed with you before any work begins.`,
      "",
      `Want to talk sooner? Call ${CONTACT.phoneDisplay}, or pick a time that works for you: ${BOOKING_URL}`,
      "",
      "To add details, just reply to this email.",
      "",
      "— Chaotically Organized AI, Bakersfield, CA",
      "",
      "You are getting this single confirmation because you submitted a request at chaoticallyorganizedai.com. We do not add you to a mailing list."
    ].join("\n")
  };
}

export async function sendLeadConfirmation(input: { email: string | undefined; firstName: string | undefined; kind: "contact" | "intake" }): Promise<void> {
  if (!autoreplyEnabled() || !input.email) return;
  const { subject, text } = confirmationMessage(input.firstName ?? "", input.kind);
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: process.env.COAI_AUTOREPLY_FROM, to: [input.email], reply_to: CONTACT.email, subject, text }),
      signal: AbortSignal.timeout(4_000)
    });
    if (!response.ok) console.warn("[autoreply] Provider did not accept the confirmation");
  } catch {
    console.warn("[autoreply] Confirmation could not be sent");
  }
}
