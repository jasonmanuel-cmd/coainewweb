export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const real = request.headers.get("x-real-ip")?.trim();
  return real || "unknown";
}

export function isSameSiteRequest(request: Request): boolean {
  const site = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!site) return true;
  let expected: string;
  try {
    expected = new URL(site).origin;
  } catch {
    return true;
  }

  const origin = request.headers.get("origin");
  if (origin) return origin === expected;

  const referer = request.headers.get("referer");
  if (referer) {
    try {
      return new URL(referer).origin === expected;
    } catch {
      return false;
    }
  }

  return process.env.NODE_ENV !== "production";
}

export function hasJsonContentType(request: Request): boolean {
  const contentType = request.headers.get("content-type") || "";
  return contentType.toLowerCase().includes("application/json");
}
