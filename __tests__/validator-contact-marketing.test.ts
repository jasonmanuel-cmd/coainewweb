import { describe, it, expect } from "vitest";
import { contactMarketingSchema, jaxWaitlistSchema } from "@/lib/validators/contact-marketing";

const validBase = {
  first_name: "Jane",
  business_name: "Acme Corp",
  email: "jane@example.com",
  business_website: "https://acme.com"
};

// ---------------------------------------------------------------------------
// contactMarketingSchema
// ---------------------------------------------------------------------------
describe("contactMarketingSchema", () => {
  it("accepts a minimal valid payload", () => {
    const result = contactMarketingSchema.safeParse(validBase);
    expect(result.success).toBe(true);
  });

  it("accepts a full valid payload", () => {
    const result = contactMarketingSchema.safeParse({
      ...validBase,
      phone: "6611234567",
      company: "Acme",
      package_interest: "growth",
      inbound_source: "google",
      contact_intent: "audit"
    });
    expect(result.success).toBe(true);
  });

  it("rejects when first_name is missing", () => {
    const { first_name: _, ...rest } = validBase;
    expect(contactMarketingSchema.safeParse(rest).success).toBe(false);
  });

  it("rejects when first_name is empty", () => {
    expect(contactMarketingSchema.safeParse({ ...validBase, first_name: "" }).success).toBe(false);
  });

  it("rejects when first_name exceeds 200 chars", () => {
    expect(
      contactMarketingSchema.safeParse({ ...validBase, first_name: "a".repeat(201) }).success
    ).toBe(false);
  });

  it("rejects when business_name is missing", () => {
    const { business_name: _, ...rest } = validBase;
    expect(contactMarketingSchema.safeParse(rest).success).toBe(false);
  });

  it("rejects an invalid email", () => {
    expect(
      contactMarketingSchema.safeParse({ ...validBase, email: "not-an-email" }).success
    ).toBe(false);
  });

  it("rejects an invalid business_website", () => {
    expect(
      contactMarketingSchema.safeParse({ ...validBase, business_website: "not a valid url" }).success
    ).toBe(false);
  });

  it("accepts 'none' as business_website", () => {
    const result = contactMarketingSchema.safeParse({ ...validBase, business_website: "none" });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.business_website).toBe("none");
  });

  it("accepts 'N/A' as business_website (case-insensitive)", () => {
    const result = contactMarketingSchema.safeParse({ ...validBase, business_website: "N/A" });
    expect(result.success).toBe(true);
  });

  it("accepts 'no' as business_website", () => {
    const result = contactMarketingSchema.safeParse({ ...validBase, business_website: "no" });
    expect(result.success).toBe(true);
  });

  it("prepends https:// to bare domain in business_website", () => {
    const result = contactMarketingSchema.safeParse({ ...validBase, business_website: "acme.com" });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.business_website).toBe("https://acme.com");
  });

  it("defaults form_type to 'contact'", () => {
    const result = contactMarketingSchema.safeParse(validBase);
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.form_type).toBe("contact");
  });

  it("defaults turnstileToken to empty string", () => {
    const result = contactMarketingSchema.safeParse(validBase);
    if (result.success) expect(result.data.turnstileToken).toBe("");
  });
});

// ---------------------------------------------------------------------------
// jaxWaitlistSchema
// ---------------------------------------------------------------------------
describe("jaxWaitlistSchema", () => {
  it("accepts a valid email", () => {
    expect(jaxWaitlistSchema.safeParse({ email: "user@example.com" }).success).toBe(true);
  });

  it("rejects an invalid email", () => {
    expect(jaxWaitlistSchema.safeParse({ email: "bad-email" }).success).toBe(false);
  });

  it("rejects an email exceeding 320 chars", () => {
    const longEmail = `${"a".repeat(315)}@b.com`;  // 315 + 6 = 321 chars
    expect(jaxWaitlistSchema.safeParse({ email: longEmail }).success).toBe(false);
  });

  it("defaults turnstileToken to empty string", () => {
    const result = jaxWaitlistSchema.safeParse({ email: "user@example.com" });
    if (result.success) expect(result.data.turnstileToken).toBe("");
  });
});
