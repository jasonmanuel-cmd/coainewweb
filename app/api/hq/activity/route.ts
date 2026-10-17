import { requireHqOwner } from "@/lib/crm/auth";
import { crmError, privateJson } from "@/lib/crm/response";
import { PublicError } from "@/lib/public-error";
export async function GET() {
  try {
    const db = await requireHqOwner(); const since = new Date(Date.now() - 29 * 86400000).toISOString().slice(0, 10);
    const { data, error } = await db.from("coai_crm_daily").select("day,page,views").gte("day", since).order("day", { ascending: false }).limit(150);
    if (error) throw new PublicError("Activity totals are unavailable.", 503);
    return privateJson({ days: data });
  } catch (error) { return crmError(error); }
}
