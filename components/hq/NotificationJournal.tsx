"use client";
import { useEffect, useState } from "react";
type Entry = { lead_id: string; business_name: string; source: string; attempts: number; status: "accepted" | "unconfirmed" | "pending" };
export function NotificationJournal({ revision }: { revision: number }) {
  const [data, setData] = useState<{ enabled: boolean; notifications: Entry[] } | null>(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    setData(null); setError(false);
    void fetch("/api/hq/notifications", { cache: "no-store", signal: AbortSignal.any([controller.signal, AbortSignal.timeout(15000)]) })
      .then(async response => { if (!response.ok) throw new Error(); return response.json(); })
      .then(body => { if (!controller.signal.aborted) setData(body); })
      .catch(() => { if (!controller.signal.aborted) setError(true); });
    return () => controller.abort();
  }, [revision]);
  return <section className="hq-activity" aria-label="Notification delivery journal">
    <h2>Notification delivery</h2>
    <p>Automatic retries are off. Provider acceptance does not confirm inbox receipt. Review unconfirmed or pending attempts before considering a resend.</p>
    {error ? <p role="alert">Delivery journal unavailable. Refresh the inbox to try again.</p> : !data ? <p role="status">Loading delivery status.</p> : !data.enabled ? <p>Delivery journal is not enabled. Existing form notifications continue unchanged.</p> : <>
      <p>Up to 50 entries; inquiries without confirmed provider acceptance appear first.</p>
      {data.notifications.length ? <ul>{data.notifications.map(entry => <li key={entry.lead_id}>
        <strong>{entry.business_name}</strong> — {entry.source}: {entry.status === "accepted" ? "Provider accepted" : entry.status === "unconfirmed" ? "Acceptance unconfirmed — review required" : "Pending / interrupted — review required"} ({entry.attempts} attempts)
      </li>)}</ul> : <p>No recorded notification intents yet.</p>}
    </>}
  </section>;
}
