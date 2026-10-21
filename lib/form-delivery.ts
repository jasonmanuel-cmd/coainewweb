import { PublicError } from "./public-error";
import * as Sentry from "@sentry/nextjs";

function deliveryFailure(): PublicError {
  // Report the boundary failure, never the lead payload or an upstream response.
  const diagnostic = new Error("Lead form provider did not confirm acceptance");
  console.error("[form-delivery] Provider acceptance failed");
  Sentry.captureException(diagnostic, { tags: { component: "form-delivery" } });
  return new PublicError("We couldn't confirm delivery. Please try again or contact us directly.", 502);
}

/** Require acceptance by the form provider before reporting success to a visitor. */
export async function deliverForm(endpoint: string, fields: Record<string, string>): Promise<void> {
  const body = new FormData();
  for (const [key, value] of Object.entries(fields)) body.set(key, value);
  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      body,
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(12_000)
    });
  } catch {
    throw deliveryFailure();
  }
  if (!response.ok) {
    throw deliveryFailure();
  }
}
