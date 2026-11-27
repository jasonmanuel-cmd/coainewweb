import { z } from "zod";
import { submissionIdField } from "./contact-marketing";

/** The short "call me back" form: a name and a phone number, nothing else required. */
export const callbackSchema = z.object({
  submission_id: submissionIdField,
  turnstileToken: z.string().optional().default(""),
  first_name: z.string().trim().min(1).max(200),
  phone: z.string().trim().min(7).max(80).refine(value => value.replace(/\D/g, "").length >= 7, "Enter a valid phone number."),
  company: z.string().max(200).optional().default(""),
  contact_reference: z.string().max(200).optional().default("")
});
