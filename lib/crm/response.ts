import { NextResponse } from "next/server";
import { PublicError } from "@/lib/public-error";

export function privateJson(value: unknown, status = 200) {
  return NextResponse.json(value, { status, headers: { "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex, nofollow" } });
}
export function crmError(error: unknown) {
  return privateJson({ error: error instanceof PublicError ? error.message : "HQ couldn't complete that request. Please try again." }, error instanceof PublicError ? error.status : 500);
}
