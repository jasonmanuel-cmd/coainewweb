export const LEAD_STAGES = ["new", "contacted", "qualified", "proposal", "won", "lost", "archived"] as const;
export type LeadStage = typeof LEAD_STAGES[number];
export type CrmLead = {
  id: string; first_name: string; business_name: string; email: string; phone: string;
  business_website: string; source: string; intent: string; industry: string;
  sms_consent: "yes" | "no"; stage: LeadStage; notes: string; follow_up_on: string | null;
  created_at: string; updated_at: string; details: Record<string, string>;
};
