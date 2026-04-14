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

export const contactMarketingSchema = z.object({
  turnstileToken: z.string().optional().default(""),
  form_type: z.string().max(80).optional().default("contact"),
  first_name: z.string().min(1).max(200),
  business_name: z.string().min(1).max(300),
  phone: z.string().max(80).optional().default(""),
  email: z.string().email(),
  business_website: websiteField,
  company: z.string().max(200).optional().default(""),
  package_interest: z.string().max(100).optional().default(""),
  inbound_source: z.string().max(200).optional().default(""),
  contact_intent: z.string().max(200).optional().default(""),
  _subject: z.string().max(600).optional()
});

export const jaxWaitlistSchema = z.object({
  turnstileToken: z.string().optional().default(""),
  email: z.string().email().max(320)
});
