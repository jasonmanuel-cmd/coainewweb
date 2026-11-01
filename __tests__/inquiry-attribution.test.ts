import { afterEach, expect, it, vi } from "vitest";
import { attributionFromLocation, inquiryAttribution, sanitizeAttribution } from "@/lib/crm/attribution";
afterEach(() => { window.sessionStorage.clear(); vi.restoreAllMocks(); });
it("retains only fixed campaign vocabulary and public paths, never URL secrets or identities", () => {
  expect(attributionFromLocation("https://example.com/intake?utm_source=facebook&utm_campaign=coai-intake&utm_medium=social&utm_content=profile&email=private@example.com&token=secret#secret", "https://m.facebook.com/profile.php?id=123&secret=private")).toEqual({ utm_source: "facebook", utm_campaign: "coai-intake", utm_medium: "social", utm_content: "profile", landing_page: "/intake", referrer_source: "facebook" });
  expect(attributionFromLocation("https://example.com/private@example.com?utm_campaign=secret&utm_source=private@example.com", "https://facebook.com.evil.example/private")).toEqual({});
  expect(sanitizeAttribution({ utm_source: "facebook", utm_term: "private", token: "secret", landing_page: "/contact?email=private" })).toEqual({ utm_source: "facebook" });
  for (const input of [null, [], 123, "secret"]) expect(sanitizeAttribution(input)).toEqual({});
});
it("preserves only sanitized first-touch session data across navigation", () => {
  window.sessionStorage.setItem("coai:inquiry-attribution:v1", JSON.stringify({ utm_source: "facebook", landing_page: "/pricing", token: "secret" }));
  expect(inquiryAttribution()).toEqual({ utm_source: "facebook", landing_page: "/pricing" });
});
it("honors DNT and clears attribution without breaking submissions", () => {
  window.sessionStorage.setItem("coai:inquiry-attribution:v1", '{"utm_source":"facebook"}');
  vi.spyOn(navigator, "doNotTrack", "get").mockReturnValue("1");
  expect(inquiryAttribution()).toEqual({});
  expect(window.sessionStorage.getItem("coai:inquiry-attribution:v1")).toBeNull();
});
