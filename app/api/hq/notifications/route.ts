import { requireHqOwner } from "@/lib/crm/auth";
import { privateJson, crmError } from "@/lib/crm/response";
import { notificationJournalEnabled, notificationDispatchEnabled, listNotifications } from "@/lib/crm/notifications";

export async function GET() {
  try {
    await requireHqOwner();
    const enabled = notificationJournalEnabled();
    return privateJson({ enabled, dispatch_enabled: notificationDispatchEnabled, notifications: enabled ? await listNotifications() : [] });
  } catch (error) { return crmError(error); }
}
