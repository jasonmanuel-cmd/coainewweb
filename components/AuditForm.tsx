"use client";

import { useState } from "react";
import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics/client";

type Result = {
  id?: string;
  performanceScore: number;
  schemaScore: number;
  issueCount: number;
  recommendations: string[];
};

export function AuditForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [startedAt, setStartedAt] = useState(0);
  const [hoveringCta, setHoveringCta] = useState(false);

  useEffect(() => {
    setStartedAt(Date.now());
  }, []);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    trackEvent("diagnostic_submit_started");
    try {
      const payload = Object.fromEntries(formData.entries());
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        const errJson = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(errJson?.error || "Audit pipeline failed.");
      }
      const data = (await response.json()) as Result;
      setResult(data);
      trackEvent("diagnostic_submit_success", {
        performance: data.performanceScore,
        schema: data.schemaScore,
        issues: data.issueCount
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
      trackEvent("diagnostic_submit_error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="panel">
      <form action={onSubmit} className="grid">
        <div>
          <label className="mono field-label" htmlFor="url-input">Website URL</label>
          <input id="url-input" type="url" name="url" placeholder="https://yourdomain.com" required />
        </div>
        <div>
          <label className="mono field-label" htmlFor="company-input">Business Name (Optional)</label>
          <input id="company-input" type="text" name="companyName" placeholder="Company / DBA" />
        </div>
        <div>
          <label className="mono field-label" htmlFor="phone-input">Phone Number</label>
          <input id="phone-input" type="tel" name="phone" placeholder="(661) 610-9198" required />
        </div>
        <div>
          <label className="mono field-label" htmlFor="email-input">Email</label>
          <input id="email-input" type="email" name="email" placeholder="you@company.com" required />
        </div>
        <input type="text" name="website" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
        <input type="hidden" name="startedAt" value={String(startedAt)} />
        <button
          disabled={loading}
          className="btn btn-primary"
          type="submit"
          onMouseEnter={() => setHoveringCta(true)}
          onMouseLeave={() => setHoveringCta(false)}
        >
          {loading ? "Running structural audit..." : "Run RedScreen Audit"}
        </button>
      </form>
      <div className="status-terminal">
        <div className="status-label">System Status</div>
        <p className="mono" style={{ margin: "0.35rem 0 0", color: "#9ea39f" }}>
          {"> env::prod-sim  queue::ready  latency_target::<3s"}
        </p>
        {error ? (
          <p className="status-alert" style={{ margin: "0.35rem 0 0" }}>{`ALERT: ${error}`}</p>
        ) : hoveringCta ? (
          <p className="mono" style={{ margin: "0.35rem 0 0", color: "var(--accent)" }}>
            {"> redscreen::arming extraction protocol..."}
          </p>
        ) : (
          <p className="mono" style={{ margin: "0.35rem 0 0", color: "#9ea39f" }}>
            {"> standby::awaiting target URL..."}
          </p>
        )}
      </div>
      {result ? (
        <div className="panel" style={{ marginTop: 12 }}>
          <h3>Audit Complete</h3>
          <p>Performance: {result.performanceScore} | Schema: {result.schemaScore}</p>
          <p>Issues detected: {result.issueCount}</p>
          <p className="muted">Share report: /report/{result.id}</p>
        </div>
      ) : null}
    </section>
  );
}
