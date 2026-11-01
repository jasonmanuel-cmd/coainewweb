// Fixed vocabularies deliberately reject arbitrary campaign text, URLs, IDs and PII.
export const ATTRIBUTION_VALUES: Record<string, readonly string[]> = {
  utm_source: ["facebook", "instagram", "google", "linkedin", "youtube", "referral"],
  utm_medium: ["social", "organic", "paid-social", "referral", "email"],
  utm_campaign: ["coai-contact", "coai-intake"],
  utm_content: ["profile", "post", "story", "bio"],
  inbound_source: ["diagnostic", "pricing", "facebook", "instagram", "google", "linkedin", "youtube", "referral"],
  contact_intent: ["packages", "jason", "audit", "build", "scorecard"],
  landing_page: ["/", "/demo", "/pricing", "/intake", "/contact"],
  referrer_source: ["facebook", "instagram", "google", "linkedin", "youtube"]
};

export function sanitizeAttribution(value: unknown): Record<string, string> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const input = value as Record<string, unknown>;
  return Object.fromEntries(Object.entries(ATTRIBUTION_VALUES).flatMap(([key, allowed]) =>
    typeof input[key] === "string" && allowed.includes(input[key] as string) ? [[key, input[key] as string]] : []));
}

export function attributionFromLocation(href: string, referrer: string) {
  try {
    const url = new URL(href);
    const input: Record<string, string> = { landing_page: url.pathname };
    for (const key of Object.keys(ATTRIBUTION_VALUES).filter(key => key.startsWith("utm_"))) input[key] = url.searchParams.get(key) ?? "";
    try {
      const ref = new URL(referrer);
      if (["http:", "https:"].includes(ref.protocol)) {
        for (const source of ATTRIBUTION_VALUES.referrer_source) {
          if (ref.hostname === `${source}.com` || ref.hostname.endsWith(`.${source}.com`)) input.referrer_source = source;
        }
      }
    } catch { /* No referrer is normal. */ }
    return sanitizeAttribution(input);
  } catch { return {}; }
}

const STORAGE_KEY = "coai:inquiry-attribution:v1";
/** First public landing in this tab; no identifier, network request or raw URL is stored. */
export function inquiryAttribution(): Record<string, string> {
  if (typeof window === "undefined") return {};
  if (navigator.doNotTrack === "1" || (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl) {
    try { window.sessionStorage.removeItem(STORAGE_KEY); } catch { /* Storage may be blocked. */ }
    return {};
  }
  if (window.location.pathname.startsWith("/hq")) return {};
  const current = attributionFromLocation(window.location.href, document.referrer);
  try {
    const saved = window.sessionStorage.getItem(STORAGE_KEY);
    if (saved) return sanitizeAttribution(JSON.parse(saved));
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch { /* Submission remains usable without browser storage. */ }
  return current;
}
