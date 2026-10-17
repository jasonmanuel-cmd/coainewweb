"use client";

import { useEffect, useState, type FormEvent } from "react";
import { LEAD_STAGES, type CrmLead } from "@/lib/crm/types";

const example: CrmLead = { id: "example", first_name: "Jamie", business_name: "Example Fence Co. (fictional)", email: "jamie@example.com", phone: "6615550100", business_website: "none", source: "intake", intent: "build", industry: "Trades & Contractors", sms_consent: "no", stage: "new", notes: "Sample only: ask how quote requests reach the owner today.", follow_up_on: null, created_at: "2026-10-17T12:00:00Z", updated_at: "2026-10-17T12:00:00Z", details: { website_type: "No website", package_interest: "2" } };

async function api(path: string, init?: RequestInit) {
  const response = await fetch(`/api/hq/${path}`, { ...init, cache: "no-store", signal: AbortSignal.timeout(15000) });
  const body = await response.json();
  if (!response.ok) throw new Error(body.error || "HQ is unavailable. Please try again.");
  return body;
}

export function HqWorkspace() {
  const [ready, setReady] = useState(false); const [checking, setChecking] = useState(true);
  const [sample, setSample] = useState(false); const [busy, setBusy] = useState(false);
  const [captureEnabled, setCaptureEnabled] = useState(false);
  const [error, setError] = useState(""); const [leads, setLeads] = useState<CrmLead[]>([]);
  const [selected, setSelected] = useState<CrmLead | null>(null); const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0); const [stage, setStage] = useState(""); const [search, setSearch] = useState("");
  const [query, setQuery] = useState(""); const [revision, setRevision] = useState(0);
  const [activity, setActivity] = useState<Array<{ day: string; page: string; views: number }> | null>(null);

  useEffect(() => { let active = true;
    api("session").then(body => { if (active) { setReady(true); setCaptureEnabled(body.capture_enabled === true); } }).catch(() => {}).finally(() => { if (active) setChecking(false); });
    return () => { active = false; };
  }, []);
  useEffect(() => {
    if (!ready || sample) return;
    let active = true; setBusy(true); setError(""); setLeads([]); setSelected(null);
    api(`leads?${new URLSearchParams({ page: String(page), stage, q: query })}`)
      .then(body => { if (active) { setLeads(body.leads); setTotal(body.total); } })
      .catch(e => { if (active) setError(e.message); }).finally(() => { if (active) setBusy(false); });
    return () => { active = false; };
  }, [ready, sample, page, stage, query, revision]);
  useEffect(() => {
    if (!ready || sample) return;
    let active = true;
    api("activity").then(body => { if (active) setActivity(body.days); }).catch(() => { if (active) setActivity(null); });
    return () => { active = false; };
  }, [ready, sample, revision]);

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = event.currentTarget; const values = new FormData(form); setBusy(true); setError("");
    try { const body = await api("session", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: values.get("email"), password: values.get("password") }) }); form.reset(); setCaptureEnabled(body.capture_enabled === true); setReady(true); }
    catch (e) { setError(e instanceof Error ? e.message : "Sign-in failed."); } finally { setBusy(false); }
  }
  async function signOut() {
    setBusy(true); setError("");
    try { if (!sample) await api("session", { method: "DELETE" }); setReady(false); setSample(false); setLeads([]); setSelected(null); setTotal(0); }
    catch { setError("Sign-out could not finish. Please try again."); } finally { setBusy(false); }
  }
  const displayed = sample ? [example] : leads;
  return <main id="main-content" className="hq-shell">
    <header className="hq-header"><a href="/">COAI <span>/ HQ</span></a><span>PRIVATE LEAD WORKSPACE</span>{ready && <button disabled={busy} onClick={signOut}>{sample ? "Exit sample" : "Sign out"}</button>}</header>
    {!ready ? <section className="hq-login">
      <span className="hq-eyebrow">OWNER ACCESS</span><h1>Your leads.<br />One clear next step.</h1>
      <p>Review inquiries, keep follow-up notes, and move opportunities forward.</p>
      <form onSubmit={signIn}>
        <label>Email<input name="email" type="email" autoComplete="username" required /></label>
        <label>Password<input name="password" type="password" autoComplete="current-password" required /></label>
        <button className="hq-primary" disabled={busy || checking}>{checking ? "Checking session…" : busy ? "Signing in…" : "Sign in to HQ"}</button>
      </form>
      {error && <p role="alert" className="hq-error">{error}</p>}
      <p>Access is limited to approved owner accounts. Sessions last up to one hour.</p>
      <button className="hq-text-button" onClick={() => { setSample(true); setReady(true); setError(""); setSelected(example); }}>View a fictional sample</button>
    </section> : <>
      {sample && <p className="hq-sample" role="status">SAMPLE WORKSPACE · Fictional data only. No leads are loaded, saved, emailed or contacted.</p>}
      {!sample && !captureEnabled && <p className="hq-sample" role="status">CRM capture is disabled. Forms continue through the existing email flow; new inquiries are not being added to HQ yet.</p>}
      <div className="hq-title"><div><span className="hq-eyebrow">LEAD INBOX</span><h1>Make the next move.</h1><p>Submitted inquiries only. Anonymous visits do not reveal a person’s contact details.</p></div><button disabled={busy || sample} onClick={() => setRevision(v => v + 1)}>Refresh inbox</button></div>
      <div className="hq-stats"><article><strong>{sample ? 1 : total}</strong><span>Matching inquiries</span></article><article><strong>{displayed.filter(x => x.stage === "new").length}</strong><span>New on this page</span></article><article><strong>{displayed.filter(x => x.follow_up_on && x.follow_up_on <= new Date().toLocaleDateString("en-CA") && !["won", "lost", "archived"].includes(x.stage)).length}</strong><span>Follow-ups due on this page</span></article></div>
      <div className="hq-toolbar"><form onSubmit={e => { e.preventDefault(); setQuery(search); setPage(0); }}><label className="hq-sr" htmlFor="hq-search">Search all inquiries</label><input id="hq-search" placeholder="Search name, business, email or phone" value={search} onChange={e => setSearch(e.target.value)} disabled={sample} /><button disabled={busy || sample}>Search</button></form><label>Stage<select value={stage} disabled={sample} onChange={e => { setStage(e.target.value); setPage(0); }}><option value="">All stages</option>{LEAD_STAGES.map(s => <option key={s} value={s}>{s}</option>)}</select></label></div>
      {error && <p role="alert" className="hq-error">{error}</p>}
      <div className="hq-workspace"><section className="hq-inbox" aria-label="Inquiry results">
        {busy ? <p role="status">Loading inquiries…</p> : displayed.length ? displayed.map(lead => <button key={lead.id} className={`hq-lead ${selected?.id === lead.id ? "is-selected" : ""}`} onClick={() => setSelected(lead)}><div><strong>{lead.business_name}</strong><span className="hq-stage">{lead.stage}</span></div><p>{lead.first_name} · {lead.intent}</p><small>{new Date(lead.created_at).toLocaleDateString()} · {lead.source}{lead.follow_up_on ? ` · Follow up ${lead.follow_up_on}` : ""}</small></button>) : <p>{error ? "Inquiries could not be loaded. Refresh after resolving the error." : "No matching inquiries yet. New verified form submissions appear here after CRM capture is enabled."}</p>}
        {!sample && <nav aria-label="Inquiry pages"><button disabled={busy || page === 0} onClick={() => setPage(v => v - 1)}>Previous</button><span>Page {page + 1} · 50 per page</span><button disabled={busy || (page + 1) * 50 >= total} onClick={() => setPage(v => v + 1)}>Next</button></nav>}
      </section>
      <section className="hq-detail" aria-label="Lead details">{selected ? <LeadEditor key={`${selected.id}:${selected.updated_at}`} lead={selected} sample={sample} onSaved={() => setRevision(v => v + 1)} /> : <div className="hq-empty"><h2>Select an inquiry</h2><p>Contact details, consent, notes and follow-up live here.</p></div>}</section></div>
    </>}
    {ready && <section className="hq-activity"><h2>Website activity</h2><p>{sample ? "Sample mode — no activity totals loaded." : activity ? `${activity.reduce((sum, day) => sum + Number(day.views), 0)} page views in the last 30 UTC calendar days.` : "Activity totals unavailable until storage is connected."}</p>{!sample && activity && <ul>{["/", "/demo", "/pricing", "/intake", "/contact"].map(path => <li key={path}>{path === "/" ? "Homepage" : path}: {activity.filter(row => row.page === path).reduce((sum, row) => sum + Number(row.views), 0)}</li>)}</ul>}<p>Aggregate page views only, not unique visitors. No names, contact details, query strings or browsing histories are collected by this counter. DNT and Global Privacy Control are honored. Bot traffic and repeat visits may affect totals.</p></section>}
    <footer>COAI HQ · Owner review required before outreach. SMS permission applies only to the request described in the form.</footer>
  </main>;
}

function LeadEditor({ lead, sample, onSaved }: { lead: CrmLead; sample: boolean; onSaved: () => void }) {
  const [stage, setStage] = useState(lead.stage); const [notes, setNotes] = useState(lead.notes);
  const [followUp, setFollowUp] = useState(lead.follow_up_on ?? ""); const [busy, setBusy] = useState(false); const [error, setError] = useState("");
  async function save(event: FormEvent) {
    event.preventDefault(); if (sample || busy) return; setBusy(true); setError("");
    try { await api("leads", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: lead.id, updated_at: lead.updated_at, stage, notes, follow_up_on: followUp || null }) }); onSaved(); }
    catch (e) { setError(e instanceof Error ? e.message : "Save failed."); } finally { setBusy(false); }
  }
  return <><span className="hq-eyebrow">{lead.intent} INQUIRY</span><h2>{lead.business_name}</h2><p>{lead.first_name} · {lead.industry || "Industry not provided"}</p><div className="hq-contact"><a href={`mailto:${lead.email}`}>{lead.email}</a><a href={`tel:${lead.phone.replace(/[^+\d]/g, "")}`}>{lead.phone || "No phone supplied"}</a></div><dl><dt>Website</dt><dd>{lead.business_website}</dd><dt>Received</dt><dd>{new Date(lead.created_at).toLocaleString()}</dd><dt>Source</dt><dd>{lead.source}</dd><dt>SMS consent</dt><dd>{lead.sms_consent === "yes" ? "Yes — about this request only" : "No — do not text"}</dd>{Object.entries(lead.details).map(([key, value]) => <div key={key}><dt>{key.replaceAll("_", " ")}</dt><dd>{value}</dd></div>)}</dl>
    <form onSubmit={save}><label>Pipeline stage<select value={stage} disabled={sample || busy} onChange={e => setStage(e.target.value as CrmLead["stage"])}>{LEAD_STAGES.map(s => <option key={s}>{s}</option>)}</select></label><label>Follow up on<input type="date" value={followUp} disabled={sample || busy} onChange={e => setFollowUp(e.target.value)} /></label><label>Owner notes<textarea maxLength={10000} rows={5} value={notes} disabled={sample || busy} onChange={e => setNotes(e.target.value)} /></label>{error && <p role="alert" className="hq-error">{error}</p>}<button className="hq-primary" disabled={sample || busy}>{sample ? "Sample — saving disabled" : busy ? "Saving…" : "Save lead"}</button><p className="hq-small">Saving does not send a message or schedule a reminder. Dates are an owner follow-up list.</p></form></>;
}
