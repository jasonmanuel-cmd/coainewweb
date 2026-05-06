import { describe, it, expect } from "vitest";
import { registerSchema } from "@/lib/validators/register";

const validBase = {
  url: "https://example.com",
  phone: "6611234567",
  email: "user@example.com"
};

describe("registerSchema", () => {
  it("accepts a minimal valid payload", () => {
    expect(registerSchema.safeParse(validBase).success).toBe(true);
  });

  it("accepts a full payload", () => {
    const result = registerSchema.safeParse({
      ...validBase,
      companyName: "Acme",
      businessName: "Acme LLC",
      website: "https://acme.com",
      startedAt: 1700000000000,
      turnstileToken: "tok_abc"
    });
    expect(result.success).toBe(true);
  });

  // --- url ---
  it("rejects when url is not a valid URL", () => {
    expect(registerSchema.safeParse({ ...validBase, url: "not-a-url" }).success).toBe(false);
  });

  it("rejects when url is missing", () => {
    const { url: _, ...rest } = validBase;
    expect(registerSchema.safeParse(rest).success).toBe(false);
  });

  // --- phone ---
  it("rejects phone shorter than 7 characters", () => {
    expect(registerSchema.safeParse({ ...validBase, phone: "123456" }).success).toBe(false);
  });

  it("accepts phone with exactly 7 characters", () => {
    expect(registerSchema.safeParse({ ...validBase, phone: "1234567" }).success).toBe(true);
  });

  it("rejects when phone is missing", () => {
    const { phone: _, ...rest } = validBase;
    expect(registerSchema.safeParse(rest).success).toBe(false);
  });

  // --- email ---
  it("rejects an invalid email", () => {
    expect(registerSchema.safeParse({ ...validBase, email: "bad" }).success).toBe(false);
  });

  it("rejects when email is missing", () => {
    const { email: _, ...rest } = validBase;
    expect(registerSchema.safeParse(rest).success).toBe(false);
  });

  // --- defaults ---
  it("defaults companyName to empty string", () => {
    const result = registerSchema.safeParse(validBase);
    if (result.success) expect(result.data.companyName).toBe("");
  });

  it("defaults startedAt to 0", () => {
    const result = registerSchema.safeParse(validBase);
    if (result.success) expect(result.data.startedAt).toBe(0);
  });

  it("coerces a string startedAt to a number", () => {
    const result = registerSchema.safeParse({ ...validBase, startedAt: "1234567890" });
    if (result.success) expect(result.data.startedAt).toBe(1234567890);
  });
});
