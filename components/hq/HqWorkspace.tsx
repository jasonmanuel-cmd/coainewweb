"use client";

import { useEffect, useLayoutEffect, useRef, useState, type FormEvent, type RefObject } from "react";
import { LEAD_STAGES, type CrmLead } from "@/lib/crm/types";
import { FOLLOW_UP_QUEUES, followUpLabel, inFollowUpQueue, utcToday } from "@/lib/crm/follow-up";
import { NotificationJournal } from "./NotificationJournal";


async function api(path: string, init?: RequestInit) {
  const response = await fetch(`/api/hq/${path}`, { ...init, cache: "no-store", signal: AbortSignal.timeout(15000) });
  const body = await response.json();
  if (!response.ok) throw new Error(body.error || "HQ is unavailable. Please try again.");
  return body;
}

export function HqWorkspace() {
  const leaveEditor = useRef<() => boolean>(() => true);
  const [ready, setReady] = useState(false); const [checking, setChecking] = useState(true);
  const [busy, setBusy] = useState(false);
  const [captureEnabled, setCaptureEnabled] = useState(false);
  const [error, setError] = useState(""); const [leads, setLeads] = useState<CrmLead[]>([]);
  const [selected, setSelected] = useState<CrmLead | null>(null); const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0); const [stage, setStage] = useState(""); const [search, setSearch] = useState("");
  const [queue, setQueue] = useState("all");
  const [query, setQuery] = useState(""); const [revision, setRevision] = useState(0);
  const [activity, setActivity] = useState<Array<{ day: string; page: string; views: number }> | null>(null);

  useEffect(() => { let active = true;
    api("session").then(body => { if (active) { setReady(true); setCaptureEnabled(body.capture_enabled === true); } }).catch(() => {}).finally(() => { if (active) setChecking(false); });
    return () => { active = false; };
  }, []);
  useEffect(() => {
    if (!ready) return;
    let active = true; setBusy(true); setError(""); setLeads([]); setSelected(null);
    api(`leads?${new URLSearchParams({ page: String(page), stage, q: query, queue })}`)
      .then(body => { if (active) { setLeads(body.leads); setTotal(body.total); } })
      .catch(e => { if (active) setError(e.message); }).finally(() => { if (active) setBusy(false); });
    return () => { active = false; };
  }, [ready, page, stage, query, queue, revision]);
  useEffect(() => {
    if (!ready) return;
    let active = true;
    api("activity").then(body => { if (active) setActivity(body.days); }).catch(() => { if (active) setActivity(null); });
    return () => { active = false; };
  }, [ready, revision]);

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = event.currentTarget; const values = new FormData(form); setBusy(true); setError("");
    try { const body = await api("session", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: values.get("password") }) }); form.reset(); setCaptureEnabled(body.capture_enabled === true); setReady(true); }
    catch (e) { setError(e instanceof Error ? e.message : "Sign-in failed."); } finally { setBusy(false); }
  }
  async function signOut() {
    if (!leaveEditor.current()) return;
    setBusy(true); setError("");
    try { await api("session", { method: "DELETE" }); setReady(false); setLeads([]); setSelected(null); setTotal(0); }
    catch { setError("Sign-out could not finish. Please try again."); } finally { setBusy(false); }
  }
  const displayed = leads;
  return <main id="main-content" className="hq-shell">
    <header className="hq-header"><a href="/" onClick={e => { if (!leaveEditor.current()) e.preventDefault(); }}>COAI <span>/ HQ</span></a><span>PRIVATE LEAD WORKSPACE</span>{ready && <button disabled={busy} onClick={signOut}>Sign out</button>}</header>
    {!ready ? <section className="hq-login">
      <span className="hq-eyebrow">OWNER ACCESS</span><h1>Your leads.<br />One clear next step.</h1>
      <p>Review inquiries, keep follow-up notes, and move opportunities forward.</p>
      <form onSubmit={signIn}>
        <label>Password<input name="password" type="password" autoComplete="current-password" required /></label>
        <button className="hq-primary" disabled={busy || checking}>{checking ? "Checking session…" : busy ? "Signing in…" : "Sign in to HQ"}</button>
      </form>
      {error && <p role="alert" className="hq-error">{error}</p>}
      <p>Access is limited to approved owner accounts. Sessions last up to one hour.</p>
    </section> : <>
      {!captureEnabled && <p className="hq-sample" role="status">CRM capture is disabled. Forms continue through the existing email flow; new inquiries are not being added to HQ yet.</p>}
      <div className="hq-title"><div><span className="hq-eyebrow">LEAD INBOX</span><h1>Make the next move.</h1><p>Submitted inquiries only. Anonymous visits do not reveal a person’s contact details.</p></div><button disabled={busy} onClick={() => { if (leaveEditor.current()) setRevision(v => v + 1); }}>Refresh inbox</button></div>
      <div className="hq-stats"><article><strong>{total}</strong><span>Matching inquiries</span></article><article><strong>{displayed.filter(x => x.stage === "new").length}</strong><span>New on this page</span></article><article><strong>{displayed.filter(x => inFollowUpQueue(x, "due", utcToday())).length}</strong><span>Follow-ups due on this page (UTC)</span></article></div>
      <label>Follow-up queue<select aria-label="Follow-up queue" value={queue} disabled={busy} onChange={e => { if (e.target.value !== queue && leaveEditor.current()) { setQueue(e.target.value); setPage(0); } }}>{FOLLOW_UP_QUEUES.map(value => <option key={value} value={value}>{({all: "All inquiries", due: "Due today + overdue", overdue: "Overdue", upcoming: "Upcoming", unscheduled: "Open without a date", closed: "Closed opportunities"})[value]}</option>)}</select></label>
      <p className="hq-small">Queue filters cover all matching inquiries. Dates use UTC; closed opportunities are excluded from open follow-up queues.</p>
      <div className="hq-toolbar"><form onSubmit={e => { e.preventDefault(); if ((query !== search || page !== 0) && leaveEditor.current()) { setQuery(search); setPage(0); } }}><label className="hq-sr" htmlFor="hq-search">Search all inquiries</label><input id="hq-search" placeholder="Search name, business, email or phone" value={search} onChange={e => setSearch(e.target.value)}  /><button disabled={busy}>Search</button></form><label>Stage<select value={stage} disabled={busy} onChange={e => { if (e.target.value !== stage && leaveEditor.current()) { setStage(e.target.value); setPage(0); } }}><option value="">All stages</option>{LEAD_STAGES.map(s => <option key={s} value={s}>{s}</option>)}</select></label></div>
      {error && <p role="alert" className="hq-error">{error}</p>}
      <div className="hq-workspace"><section className="hq-inbox" aria-label="Inquiry results">
        {busy ? <p role="status">Loading inquiries…</p> : displayed.length ? displayed.map(lead => <button key={lead.id} className={`hq-lead ${selected?.id === lead.id ? "is-selected" : ""}`} onClick={() => { if (selected?.id !== lead.id && leaveEditor.current()) setSelected(lead); }}><div><strong>{lead.business_name}</strong><span className="hq-stage">{lead.stage}</span></div><p>{lead.first_name} · {lead.intent}</p><small>{new Date(lead.created_at).toLocaleDateString()} · {lead.source} {followUpLabel(lead, utcToday())}</small></button>) : <p>{error ? "Inquiries could not be loaded. Refresh after resolving the error." : "No matching inquiries yet. New verified form submissions appear here after CRM capture is enabled."}</p>}
        {<nav aria-label="Inquiry pages"><button disabled={busy || page === 0} onClick={() => { if (leaveEditor.current()) setPage(v => v - 1); }}>Previous</button><span>Page {page + 1} · 50 per page</span><button disabled={busy || (page + 1) * 50 >= total} onClick={() => { if (leaveEditor.current()) setPage(v => v + 1); }}>Next</button></nav>}
      </section>
      <section className="hq-detail" aria-label="Lead details">{selected ? <LeadEditor key={`${selected.id}:${selected.updated_at}`} lead={selected} locked={busy} leaveEditor={leaveEditor} onSaved={() => setRevision(v => v + 1)} /> : <div className="hq-empty"><h2>Select an inquiry</h2><p>Contact details, consent, notes and follow-up live here.</p></div>}</section></div>
    </>}
    {ready && <section className="hq-activity"><h2>Website activity</h2><p>{activity ? `${activity.reduce((sum, day) => sum + Number(day.views), 0)} page views in the last 30 UTC calendar days.` : "Activity totals unavailable until storage is connected."}</p>{activity && <ul>{["/", "/demo", "/pricing", "/intake", "/contact"].map(path => <li key={path}>{path === "/" ? "Homepage" : path}: {activity.filter(row => row.page === path).reduce((sum, row) => sum + Number(row.views), 0)}</li>)}</ul>}<p>Aggregate page views only, not unique visitors. No names, contact details, query strings or browsing histories are collected by this counter. DNT and Global Privacy Control are honored. Bot traffic and repeat visits may affect totals.</p></section>}
    {ready && <NotificationJournal revision={revision} />}
    <footer>COAI HQ · Owner review required before outreach. SMS permission applies only to the request described in the form.</footer>
  </main>;
}

function LeadEditor({ lead, onSaved, leaveEditor, locked }: { lead: CrmLead; locked: boolean; onSaved: () => void; leaveEditor: RefObject<() => boolean> }) {
  const [stage, setStage] = useState(lead.stage); const [notes, setNotes] = useState(lead.notes);
  const [followUp, setFollowUp] = useState(lead.follow_up_on ?? ""); const [busy, setBusy] = useState(false); const [error, setError] = useState("");
  const [completionPending, setCompletionPending] = useState(false);
  const saving = useRef(false);
  const saved = useRef(false);
  const dirty = stage !== lead.stage || notes !== lead.notes || followUp !== (lead.follow_up_on ?? "") || completionPending;
  useLayoutEffect(() => {
    leaveEditor.current = () => {
      if (saving.current) { setError("Please wait for this lead to finish saving before leaving."); return false; }
      return !dirty || saved.current || window.confirm("Discard unsaved lead changes? Notes, stage, follow-up date and completion changes will be lost.");
    };
    return () => { leaveEditor.current = () => true; };
  }, [dirty, leaveEditor]);
  useEffect(() => {
    if (!dirty && !busy) return;
    function warnBeforeUnload(event: BeforeUnloadEvent) {
      if (saved.current) return;
      event.preventDefault(); event.returnValue = "";
    }
    window.addEventListener("beforeunload", warnBeforeUnload);
    return () => window.removeEventListener("beforeunload", warnBeforeUnload);
  }, [dirty, busy]);
  function completeFollowUp() {
    const entry = "[" + utcToday() + " UTC] Completed follow-up scheduled for " + followUp + ".";
    if (notes.length + entry.length + 1 > 10000) { setError("Make room in owner notes before recording completion."); return; }
    setNotes(value => [value, entry].filter(Boolean).join("\n")); setFollowUp(""); setCompletionPending(true); setError("");
  }
  async function save(event: FormEvent) {
    event.preventDefault(); if (saving.current || locked) return; saving.current = true; setBusy(true); setError("");
    try { await api("leads", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: lead.id, updated_at: lead.updated_at, stage, notes, follow_up_on: followUp || null }) }); saved.current = true; onSaved(); }
    catch (e) { setError(e instanceof Error ? e.message : "Save failed."); } finally { saving.current = false; setBusy(false); }
  }
  return <><span className="hq-eyebrow">{lead.intent} INQUIRY</span><h2>{lead.business_name}</h2><p>{lead.first_name} · {lead.industry || "Industry not provided"}</p><div className="hq-contact"><a href={`mailto:${lead.email}`}>{lead.email}</a><a href={`tel:${lead.phone.replace(/[^+\d]/g, "")}`}>{lead.phone || "No phone supplied"}</a></div><dl><dt>Website</dt><dd>{lead.business_website}</dd><dt>Received</dt><dd>{new Date(lead.created_at).toLocaleString()}</dd><dt>Source</dt><dd>{lead.source}</dd><dt>SMS consent</dt><dd>{lead.sms_consent === "yes" ? "Yes — about this request only" : "No — do not text"}</dd>{Object.entries(lead.details).map(([key, value]) => <div key={key}><dt>{key.replaceAll("_", " ")}</dt><dd>{value}</dd></div>)}</dl>
    <form onSubmit={save}>{dirty && <p role="status">Unsaved changes. Save lead to keep your edits.</p>}<label>Pipeline stage<select value={stage} disabled={busy || locked} onChange={e => setStage(e.target.value as CrmLead["stage"])}>{LEAD_STAGES.map(s => <option key={s}>{s}</option>)}</select></label><label>Follow up on (UTC)<input type="date" value={followUp} disabled={busy || locked} onChange={e => setFollowUp(e.target.value)} /></label><button type="button" disabled={busy || locked || !followUp || completionPending} onClick={completeFollowUp}>Record follow-up completion</button>{completionPending && <p role="status">Completion added to notes. Set another date if needed, then Save lead to retain it.</p>}<label>Owner notes<textarea maxLength={10000} rows={5} value={notes} disabled={busy || locked} onChange={e => setNotes(e.target.value)} /></label>{error && <p role="alert" className="hq-error">{error}</p>}<button className="hq-primary" disabled={busy || locked}>{busy ? "Saving…" : "Save lead"}</button><p className="hq-small">Saving does not send a message or schedule a reminder. Dates are an owner follow-up list. Campaign details are browser-supplied context, not verified identity or additional consent.</p></form></>;
}
