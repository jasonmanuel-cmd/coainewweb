import type { CrmLead } from "./types";

export const FOLLOW_UP_QUEUES = ["all", "due", "overdue", "upcoming", "unscheduled", "closed"] as const;
export type FollowUpQueue = typeof FOLLOW_UP_QUEUES[number];
export const closedStages = ["won", "lost", "archived"];
export const utcToday = () => new Date().toISOString().slice(0, 10);
export function inFollowUpQueue(lead: Pick<CrmLead, "stage" | "follow_up_on">, queue: FollowUpQueue, today: string) {
  if (queue === "all") return true;
  const closed = closedStages.includes(lead.stage);
  if (queue === "closed") return closed;
  if (closed) return false;
  if (queue === "unscheduled") return !lead.follow_up_on;
  if (!lead.follow_up_on) return false;
  if (queue === "overdue") return lead.follow_up_on < today;
  if (queue === "due") return lead.follow_up_on <= today;
  return lead.follow_up_on > today;
}
export function followUpLabel(lead: Pick<CrmLead, "stage" | "follow_up_on">, today: string) {
  if (closedStages.includes(lead.stage)) return "Closed";
  if (!lead.follow_up_on) return "No follow-up scheduled";
  if (lead.follow_up_on < today) return `Overdue since ${lead.follow_up_on}`;
  if (lead.follow_up_on === today) return "Due today (UTC)";
  return `Follow up ${lead.follow_up_on}`;
}
