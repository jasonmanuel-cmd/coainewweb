import { describe, it, expect } from "vitest";
import { intakeSubmissionSchema } from "@/lib/validators/intake";

const validBase = {
  first_name: "John",
  business_name: "Plumbing Pro",
  phone: "6611234567",
  email: "john@example.com",
  business_website: "https://example.com"
};

describe("intakeSubmissionSchema", () => {
  it("accepts a minimal valid payload", () => {
    expect(intakeSubmissionSchema.safeParse(validBase).success).toBe(true);
  });

  it("accepts a fully populated payload", () => {
    const result = intakeSubmissionSchema.safeParse({
      ...validBase,
      company: "Pro LLC",
      package_interest: "starter",
      industry: "plumbing",
      website_type: "service",
      missed_calls: "10",
      ticket_value: "500",
      closing_rate: "40",
      revenue_leak: "high",
      intake_session_id: "sess_abc123",
      intake_started_step: "1",
      intake_completed_step: "5",
      intake_recovery_tag: "tag_xyz",
      intake_abandonment_signal: "exit"
    });
    expect(result.success).toBe(true);
  });

  // --- first_name ---
  it("rejects empty first_name", () => {
    expect(intakeSubmissionSchema.safeParse({ ...validBase, first_name: "" }).success).toBe(false);
  });

  it("rejects first_name exceeding 200 chars", () => {
    expect(
      intakeSubmissionSchema.safeParse({ ...validBase, first_name: "a".repeat(201) }).success
    ).toBe(false);
  });

  // --- business_name ---
  it("rejects empty business_name", () => {
    expect(
      intakeSubmissionSchema.safeParse({ ...validBase, business_name: "" }).success
    ).toBe(false);
  });

  // --- phone ---
  it("rejects phone shorter than 7 characters", () => {
    expect(intakeSubmissionSchema.safeParse({ ...validBase, phone: "123" }).success).toBe(false);
  });

  it("accepts phone with exactly 7 characters", () => {
    expect(intakeSubmissionSchema.safeParse({ ...validBase, phone: "1234567" }).success).toBe(true);
  });

  // --- email ---
  it("rejects invalid email", () => {
    expect(intakeSubmissionSchema.safeParse({ ...validBase, email: "bademail" }).success).toBe(
      false
    );
  });

  it("rejects email exceeding 320 chars", () => {
    const longEmail = `${"x".repeat(315)}@x.com`;  // 315 + 6 = 321 chars
    expect(intakeSubmissionSchema.safeParse({ ...validBase, email: longEmail }).success).toBe(
      false
    );
  });

  // --- business_website ---
  it("accepts 'none' as business_website", () => {
    expect(
      intakeSubmissionSchema.safeParse({ ...validBase, business_website: "none" }).success
    ).toBe(true);
  });

  it("rejects a garbage business_website", () => {
    expect(
      intakeSubmissionSchema.safeParse({ ...validBase, business_website: "not a valid url" }).success
    ).toBe(false);
  });

  it("prepends https:// to bare domain", () => {
    const result = intakeSubmissionSchema.safeParse({
      ...validBase,
      business_website: "mysite.com"
    });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.business_website).toBe("https://mysite.com");
  });

  // --- defaults ---
  it("defaults form_type to 'diagnostic_intake'", () => {
    const result = intakeSubmissionSchema.safeParse(validBase);
    if (result.success) expect(result.data.form_type).toBe("diagnostic_intake");
  });

  it("defaults turnstileToken to empty string", () => {
    const result = intakeSubmissionSchema.safeParse(validBase);
    if (result.success) expect(result.data.turnstileToken).toBe("");
  });

  it("defaults optional string fields to empty string", () => {
    const result = intakeSubmissionSchema.safeParse(validBase);
    if (result.success) {
      expect(result.data.company).toBe("");
      expect(result.data.industry).toBe("");
      expect(result.data.missed_calls).toBe("");
    }
  });
});
