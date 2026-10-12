import * as Sentry from "@sentry/nextjs";
import { NextResponse } from "next/server";
import { ZodError, type ZodIssue } from "zod";
import { PublicError } from "./public-error";

/** Short, human wording for a single failed field. Never exposes zod's internal issue JSON. */
function fieldMessage(issue: ZodIssue): string {
  switch (issue.code) {
    case "invalid_type":
      return /received undefined/i.test(issue.message) ? "This field is required." : "This field isn't valid.";
    case "too_small":
      return issue.origin === "string" && Number(issue.minimum) <= 1 ? "This field is required." : "This is too short.";
    case "too_big":
      return "This is too long.";
    case "invalid_format":
      if (issue.format === "email") return "Enter a valid email address.";
      if (issue.format === "url") return "Enter a valid web address.";
      return "This isn't in the right format.";
    case "custom":
      // Authored by our own validators (e.g. "Enter a valid URL or none"), so it is safe to show.
      return issue.message || "Check this field.";
    default:
      return "Check this field.";
  }
}

function fieldLabel(path: PropertyKey[]): string {
  const key = String(path[0] ?? "form");
  return key.replace(/_/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase();
}

function validationResponse(error: ZodError): NextResponse {
  const fields: Record<string, string> = {};
  const labels: string[] = [];
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (key in fields) continue;
    fields[key] = fieldMessage(issue);
    labels.push(fieldLabel(issue.path));
  }
  const message =
    labels.length === 1
      ? `Please check your ${labels[0]} and try again.`
      : `Please check these fields and try again: ${labels.join(", ")}.`;
  return NextResponse.json({ error: message, fields }, { status: 400 });
}

/**
 * Turns anything thrown inside an API route into a safe JSON response.
 *
 * - Validation failures become a readable sentence plus per-field hints.
 * - PublicError keeps its own message and status.
 * - Malformed JSON bodies become a plain 400.
 * - Everything else (database, network, upstream, bugs) is logged server-side and reported to Sentry,
 *   and the visitor only sees `fallback`. Internal messages can contain table names, hostnames or
 *   upstream response bodies, so they are never forwarded.
 */
export function apiErrorResponse(error: unknown, options: { route: string; fallback: string }): NextResponse {
  if (error instanceof ZodError) return validationResponse(error);
  if (error instanceof PublicError) return NextResponse.json({ error: error.message }, { status: error.status });
  if (error instanceof SyntaxError) {
    return NextResponse.json({ error: "That request couldn't be read. Please try again." }, { status: 400 });
  }

  console.error(`[api/${options.route}]`, error instanceof Error ? `${error.name}: ${error.message}` : "non-Error thrown");
  Sentry.captureException(error, { tags: { route: options.route } });
  return NextResponse.json({ error: options.fallback }, { status: 500 });
}
