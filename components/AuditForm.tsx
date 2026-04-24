"use client";

import { useState } from "react";
import { useEffect } from "react";
import { TurnstileField } from "@/components/security/TurnstileField";
import { trackEvent } from "@/lib/analytics/client";

type Result = {
  id?: string;
  performanceScore: number;
  schemaScore: number;
  issueCount: number;
  recommendations: string[];
};

type AuditFormProps = {
  /** Stacked single-column + compact styling for marketing hero */
  variant?: "default" | "landing";
};

export function AuditForm({ variant = "default" }: AuditFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [startedAt, setStartedAt] = useState(0);
  const [hoveringCta, setHoveringCta] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    setStartedAt(Date.now());
  }, []);

  async function onSubmit(formData: FormData) {
    if (siteKey && !turnstileToken) {
      setError("Complete the verification step.");
      return;
    }
    setLoading(true);
    setError(null);
    trackEvent("diagnostic_submit_started");
    try {
      const payload = Object.fromEntries(formData.entries());
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, turnstileToken })
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

  const isLanding = variant === "landing";

  return (
    <section className={isLanding ? "panel audit-form-panel lp-landing-audit" : "panel audit-form-panel"}>
      <form action={onSubmit} className="audit-form">
        <div className="audit-form-fields">
          <div className="audit-field">
            <label className={isLanding ? "mono field-label" : "mono field-label"} htmlFor="url-input">
              Website URL
            </label>
            <input
              id="url-input"
              type="url"
              name="url"
              placeholder={isLanding ? "Your website URL (e.g. myshop.com)" : "https://yourdomain.com"}
              autoComplete="url"
              inputMode="url"
              required
            />
          </div>
          <div className="audit-field">
            <label className="mono field-label" htmlFor="company-input">
              Business Name (Optional)
            </label>
            <input
              id="company-input"
              type="text"
              name="companyName"
              placeholder={isLanding ? "Business name (optional)" : "Company / DBA"}
              autoComplete="organization"
            />
          </div>
          <div className="audit-field">
            <label className="mono field-label" htmlFor="phone-input">
              Phone Number
            </label>
            <input
              id="phone-input"
              type="tel"
              name="phone"
              placeholder={isLanding ? "Phone number" : "(661) 610-9198"}
              autoComplete="tel"
              inputMode="tel"
              required
            />
          </div>
          <div className="audit-field">
            <label className="mono field-label" htmlFor="email-input">
              Email
            </label>
            <input
              id="email-input"
              type="email"
              name="email"
              placeholder={isLanding ? "Email for results" : "you@company.com"}
              autoComplete="email"
              inputMode="email"
              required
            />
          </div>
        </div>
        <input type="text" name="website" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
        <input type="hidden" name="startedAt" value={String(startedAt)} />
        <TurnstileField
          onToken={(t) => {
            setTurnstileToken(t);
            setError(null);
          }}
          onExpire={() => setTurnstileToken("")}
        />
        <div className="audit-form-actions">
          <button
            disabled={loading}
            className="btn btn-primary audit-form-submit"
            type="submit"
            onMouseEnter={() => setHoveringCta(true)}
            onMouseLeave={() => setHoveringCta(false)}
          >
            {loading
              ? "Running structural audit..."
              : isLanding
                ? "Run RedScreen Audit →"
                : "Run RedScreen Audit"}
          </button>
        </div>
      </form>
      {!isLanding ? (
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
      ) : error ? (
        <p className="status-alert" style={{ fontSize: 13, marginTop: 8 }}>
          {error}
        </p>
      ) : null}
      {isLanding ? (
        <p className="muted" style={{ marginTop: 12, fontSize: 13, lineHeight: 1.45 }}>
          This runs real Google Lighthouse data through our RedScreen pipeline. Drop your URL and we&apos;ll expose where
          speed, schema, and AEO signals are bleeding revenue.
        </p>
      ) : null}
      {result && !isLanding ? (
        <div className="panel" style={{ marginTop: 12 }}>
          <h3>Audit Complete</h3>
          <p>Performance: {result.performanceScore} | Schema: {result.schemaScore}</p>
          <p>Issues detected: {result.issueCount}</p>
          {result.id ? (
            <p className="muted">Reference ID: {result.id} — we&apos;ll follow up with your full breakdown.</p>
          ) : (
            <p className="muted">We&apos;ll follow up with your full breakdown.</p>
          )}
        </div>
      ) : null}
    </section>
  );
}
