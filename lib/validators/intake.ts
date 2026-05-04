import { z } from "zod";

const websiteField = z
  .string()
  .min(1)
  .max(2000)
  .superRefine((val, ctx) => {
    const t = val.trim();
    if (/^(none|n\/a|no)$/i.test(t)) return;
    const n = /^https?:\/\//i.test(t) ? t : `https://${t}`;
    try {
      new URL(n);
    } catch {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Enter a valid URL or none" });
    }
  })
  .transform((val) => {
    const t = val.trim();
    if (/^(none|n\/a|no)$/i.test(t)) return t;
    return /^https?:\/\//i.test(t) ? t : `https://${t}`;
  });

export const intakeSubmissionSchema = z.object({
  turnstileToken: z.string().optional().default(""),
  form_type: z.string().max(80).optional().default("diagnostic_intake"),
  first_name: z.string().min(1).max(200),
  business_name: z.string().min(1).max(300),
  phone: z.string().min(7).max(80),
  email: z.string().email().max(320),
  business_website: websiteField,
  company: z.string().max(200).optional().default(""),
  package_interest: z.string().max(100).optional().default(""),
  industry: z.string().max(200).optional().default(""),
  website_type: z.string().max(200).optional().default(""),
  missed_calls: z.string().max(50).optional().default(""),
  ticket_value: z.string().max(50).optional().default(""),
  closing_rate: z.string().max(50).optional().default(""),
  revenue_leak: z.string().max(80).optional().default(""),
  intake_session_id: z.string().max(120).optional().default(""),
  intake_started_step: z.string().max(20).optional().default(""),
  intake_completed_step: z.string().max(20).optional().default(""),
  intake_recovery_tag: z.string().max(80).optional().default(""),
  intake_abandonment_signal: z.string().max(80).optional().default("")
});
