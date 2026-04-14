import { z } from "zod";

export const registerSchema = z.object({
  url: z.string().url(),
  companyName: z.string().optional().default(""),
  phone: z.string().min(7),
  email: z.string().email(),
  businessName: z.string().optional().default(""),
  website: z.string().optional().default(""),
  startedAt: z.coerce.number().optional().default(0),
  turnstileToken: z.string().optional().default("")
});

export type RegisterPayload = z.infer<typeof registerSchema>;
