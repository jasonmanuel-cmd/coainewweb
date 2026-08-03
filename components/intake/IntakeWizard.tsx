"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SmsConsentField } from "@/components/forms/SmsConsentField";
import { TurnstileField } from "@/components/security/TurnstileField";
import { CONTACT, GOOGLE_BUSINESS_PROFILE_URL, OFFERS } from "@/lib/site";

type IntakeWizardProps = {
  packageInterest?: string;
};

type IntakeData = {
  industry: string;
  website: string;
  calls: number;
  ticket: number;
  close: number;
};

type DraftPayload = {
  sessionId: string;
  data: IntakeData;
  step: number;
  updatedAt: number;
};

const STORAGE_KEY = "coai-intake-draft-v1";

function newSessionId() {
  return `intk-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

const INDUSTRY_OPTIONS = [
  { value: "Trades & Contractors", icon: "", title: "Trades & Contractors", sub: "HVAC, plumbing, electrical, construction" },
  { value: "Food & Beverage", icon: "", title: "Food & Beverage", sub: "Restaurant, food truck, catering" },
  { value: "Financial Services", icon: "", title: "Financial Services", sub: "Credit, tax, consulting, insurance" },
  { value: "Retail & E-Commerce", icon: "", title: "Retail & E-Commerce", sub: "Products, apparel, online store" },
  { value: "Professional Services", icon: "", title: "Professional Services", sub: "Photography, consulting, creative" },
  { value: "Other", icon: "", title: "Other", sub: "Tell us below" },
];

const WEBSITE_OPTIONS = [
  { value: "No website", icon: "", title: "No website", sub: "Running on social media or referrals only" },
  { value: "Rented platform", icon: "", title: "Wix / Squarespace / GoDaddy", sub: "Rented platform you don't truly own" },
  { value: "WordPress", icon: "", title: "WordPress site", sub: "Self-managed or agency-built" },
  { value: "Custom / not sure", icon: "", title: "Custom / not sure", sub: "Someone built it, not sure of the stack" },
];

export function IntakeWizard({ packageInterest }: IntakeWizardProps) {
  const router = useRouter();
  const [sessionId, setSessionId] = useState(newSessionId);
  const [step, setStep] = useState(1);
  const [recoveredSession, setRecoveredSession] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const [data, setData] = useState<IntakeData>({
    industry: "",
    website: "",
    calls: 0,
    ticket: 0,
    close: 0
  });

  const leak = useMemo(() => Math.round(data.calls * 30.4 * (data.close / 100) * data.ticket), [data]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as DraftPayload;
      if (!parsed?.sessionId || !parsed?.data) return;
      setSessionId(parsed.sessionId);
      setData(parsed.data);
      if (parsed.step >= 1 && parsed.step <= 3) {
        setStep(parsed.step);
      }
      setRecoveredSession(true);
    } catch {
      // Ignore malformed local drafts
    }
  }, []);

  useEffect(() => {
    const draft: DraftPayload = { sessionId, data, step, updatedAt: Date.now() };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    } catch {
      // Ignore storage quota / privacy mode errors
    }
  }, [sessionId, data, step]);

  const setField = useCallback(<K extends keyof IntakeData>(key: K, value: IntakeData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const goStep = useCallback((n: number) => {
    setStep(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  async function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!data.industry || !data.website || submitting) return;
    if (siteKey && !turnstileToken) {
      return;
    }
    setSubmitError(null);
    setSubmitting(true);

    const form = e.currentTarget;
    const fd = new FormData(form);

    fd.set("form_type", "diagnostic_intake");
    if (packageInterest) fd.set("package_interest", packageInterest);
    fd.set("industry", data.industry);
    fd.set("website_type", data.website);
    fd.set("missed_calls", String(data.calls));
    fd.set("ticket_value", String(data.ticket));
    fd.set("closing_rate", `${data.close}%`);
    fd.set("revenue_leak", `$${leak.toLocaleString()}`);
    fd.set("intake_session_id", sessionId);
    fd.set("intake_started_step", "1");
    fd.set("intake_completed_step", "3");
    fd.set("intake_recovery_tag", recoveredSession ? "recovered_returning_visitor" : "first_session");
    fd.set("intake_abandonment_signal", recoveredSession ? "prior_abandon_detected" : "none_detected");

    const payload = Object.fromEntries(fd.entries());

    try {
      const r = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...payload, turnstileToken })
      });
      if (!r.ok) {
        const j = (await r.json().catch(() => null)) as { error?: string } | null;
        setSubmitError(j?.error || "Could not submit. Please try again or call us.");
        setSubmitting(false);
        return;
      }
    } catch {
      setSubmitError("Network error. Please try again or call us.");
      setSubmitting(false);
      return;
    }

    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }

    router.push(`/intake/confirmation?session=${encodeURIComponent(sessionId)}`);
  }

  return (
    <>
      <div className="m-intake-grid-bg" aria-hidden />
      <div className="m-intake-wrap">
        {/* Urgency banner */}
        <div style={{
          background: "rgba(232, 160, 32, 0.1)",
          border: "1px solid rgba(232, 160, 32, 0.25)",
          borderRadius: "2px",
          padding: "10px 16px",
          marginBottom: "1.25rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          fontSize: "13px",
          flexWrap: "wrap"
        }}>
          <span style={{ color: "var(--amber-light)", fontWeight: 600 }}>
            {OFFERS.scorecard.name} — {OFFERS.scorecard.turnaround}
          </span>
          <span style={{ color: "var(--cream-dim)", fontSize: "12px" }}>
            Free for qualified owner-operators. Otherwise a $350 Structural Audit, credited to the build.
          </span>
        </div>

        {/* Trust header */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          marginBottom: "1rem",
          fontSize: "12px",
          color: "var(--cream-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.05em"
        }}>
          <a
            href={GOOGLE_BUSINESS_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--amber)", textDecoration: "underline" }}
          >
            Read our reviews on Google
          </a>
        </div>

        {/* Progress indicator - 2 step */}
        <div className="m-step-counter" style={{ marginBottom: "1.5rem" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            marginBottom: "8px"
          }}>
            {[1, 2].map((i) => (
              <div key={i} style={{
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}>
                <div style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "13px",
                  fontWeight: 700,
                  background: step >= i ? "var(--amber)" : "rgba(255,255,255,0.08)",
                  color: step >= i ? "var(--navy)" : "var(--cream-dim)",
                  transition: "all 0.3s ease"
                }}>
                  {step > i ? "✓" : i}
                </div>
                <span style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: step >= i ? "var(--cream)" : "var(--cream-dim)"
                }}>
                  {i === 1 ? "Your Setup" : "Your Baseline"}
                </span>
                {i < 2 && (
                  <div style={{
                    width: "24px",
                    height: "2px",
                    background: step > i ? "var(--amber)" : "rgba(255,255,255,0.1)",
                    borderRadius: "1px"
                  }} />
                )}
              </div>
            ))}
          </div>
          <span style={{ fontSize: "12px", color: "var(--cream-dim)" }}>
            {step === 1 ? "Step 1 of 2 — 60 seconds" : "Step 2 of 2 — 30 seconds"}
          </span>
        </div>

        {step === 1 ? (
          <div className="m-step-panel">
            <div className="m-step-label">Quick Snapshot</div>
            <h1 className="m-step-title">Tell us about your business</h1>
            <p className="m-step-sub">
              Finish this in about <strong>60 seconds</strong>. No spam, no pressure &mdash; just a real baseline of where you&rsquo;re leaking revenue.
            </p>

            <div style={{ marginBottom: "1.25rem" }}>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--cream)", marginBottom: "10px" }}>
                What type of business?
              </div>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: "8px"
              }}>
                {INDUSTRY_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setField("industry", opt.value)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "6px",
                      padding: "14px 10px",
                      borderRadius: "2px",
                      border: data.industry === opt.value ? "2px solid var(--amber)" : "1px solid var(--navy-border)",
                      background: data.industry === opt.value ? "rgba(232,160,32,0.1)" : "rgba(17,29,53,0.5)",
                      color: data.industry === opt.value ? "var(--cream)" : "var(--cream-dim)",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      fontFamily: "inherit",
                      fontSize: "13px",
                      textAlign: "center"
                    }}
                  >
                    <span style={{ fontSize: "24px" }}>{opt.icon}</span>
                    <span style={{ fontWeight: 600 }}>{opt.title}</span>
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--cream)", marginBottom: "10px" }}>
                Current website setup?
              </div>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: "8px"
              }}>
                {WEBSITE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setField("website", opt.value)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "6px",
                      padding: "14px 10px",
                      borderRadius: "2px",
                      border: data.website === opt.value ? "2px solid var(--amber)" : "1px solid var(--navy-border)",
                      background: data.website === opt.value ? "rgba(232,160,32,0.1)" : "rgba(17,29,53,0.5)",
                      color: data.website === opt.value ? "var(--cream)" : "var(--cream-dim)",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      fontFamily: "inherit",
                      fontSize: "13px",
                      textAlign: "center"
                    }}
                  >
                    <span style={{ fontSize: "24px" }}>{opt.icon}</span>
                    <span style={{ fontWeight: 600 }}>{opt.title}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="m-btn-next"
              disabled={!data.industry || !data.website}
              onClick={() => goStep(2)}
              style={{
                width: "100%",
                padding: "14px",
                fontSize: "15px",
                fontWeight: 700,
                borderRadius: "2px",
                border: "none",
                background: !data.industry || !data.website ? "rgba(255,255,255,0.08)" : "var(--amber)",
                color: !data.industry || !data.website ? "var(--cream-dim)" : "var(--navy)",
                cursor: !data.industry || !data.website ? "not-allowed" : "pointer",
                transition: "all 0.2s ease",
                marginTop: "0.5rem",
                fontFamily: "inherit"
              }}
            >
              See Your Revenue Leak →
            </button>

            {/* Trust bar */}
            <div style={{
              marginTop: "1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
              flexWrap: "wrap",
              fontSize: "12px",
              color: "var(--cream-dim)"
            }}>
              <span>🔒 No spam ever</span>
              <span>⚡ 60 seconds</span>
              <span>📋 Real data, not guesswork</span>
            </div>

            {/* Alternative CTA */}
            <div style={{
              marginTop: "1.5rem",
              padding: "1.25rem",
              border: "1px solid var(--navy-border)",
              borderRadius: "2px",
              background: "rgba(0, 0, 0, 0.2)",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "0.5rem", color: "var(--cream)" }}>
                Prefer to talk to a human?
              </div>
              <a
                href={`tel:${CONTACT.phoneE164}`}
                style={{
                  display: "inline-block",
                  color: "var(--amber)",
                  fontWeight: 700,
                  fontSize: "18px",
                  textDecoration: "none",
                  padding: "10px 24px",
                  border: "1px solid rgba(232,160,32,0.3)",
                  borderRadius: "2px",
                  background: "rgba(232,160,32,0.08)",
                  marginBottom: "10px"
                }}
              >
                {CONTACT.phoneDisplay}
              </a>
              <div style={{ fontSize: "12px", fontStyle: "italic", color: "var(--cream-muted)" }}>
                &ldquo;Jason helped me build a website... also created a phone AI system to help direct callers.&rdquo;
              </div>
              <div style={{ fontSize: "11px", color: "var(--amber)", marginTop: "4px" }}>
                — Christopher Moore, Google Review ★★★★★
              </div>
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="m-step-panel">
            <div className="m-step-label">Revenue Analysis</div>
            <h2 className="m-step-title">What are missed calls costing you?</h2>
            <p className="m-step-sub">
              Quick sliders &mdash; estimates are fine. We&rsquo;ll turn this into a real dollar number you can act on.
            </p>

            <div className="m-slider-group">
              <div className="m-slider-label">
                <span>Missed calls per day</span>
                <strong>{data.calls}</strong>
              </div>
              <input type="range" min={0} max={30} step={1} value={data.calls} onChange={(e) => setField("calls", Number(e.target.value))} />
            </div>

            <div className="m-slider-group">
              <div className="m-slider-label">
                <span>Average job / ticket value</span>
                <strong>${data.ticket.toLocaleString()}</strong>
              </div>
              <input type="range" min={0} max={10000} step={50} value={data.ticket} onChange={(e) => setField("ticket", Number(e.target.value))} />
            </div>

            <div className="m-slider-group">
              <div className="m-slider-label">
                <span>Your closing rate</span>
                <strong>{data.close}%</strong>
              </div>
              <input type="range" min={0} max={80} step={1} value={data.close} onChange={(e) => setField("close", Number(e.target.value))} />
            </div>

            <div className="m-result-revenue" style={{ marginTop: "1.5rem" }}>
              <div className="m-r-label">Estimated Monthly Revenue Leak</div>
              <div className="m-r-num">${leak.toLocaleString()}</div>
              <div className="m-r-sub">Based on your own inputs (not hardcoded defaults)</div>
            </div>

            <div className="m-step-nav" style={{ marginTop: "1.5rem" }}>
              <button type="button" className="m-btn-back" onClick={() => goStep(1)}>
                ← Back
              </button>
              <button
                type="button"
                className="m-btn-next"
                onClick={() => goStep(3)}
                style={{
                  padding: "12px 28px",
                  fontSize: "14px",
                  fontWeight: 700,
                  borderRadius: "2px",
                  border: "none",
                  background: "var(--amber)",
                  color: "var(--navy)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  fontFamily: "inherit"
                }}
              >
                See Your Full Plan →
              </button>
            </div>

            <div style={{
              marginTop: "1.25rem",
              padding: "10px 14px",
              background: "rgba(29, 158, 117, 0.1)",
              border: "1px solid rgba(29, 158, 117, 0.2)",
              borderRadius: "2px",
              fontSize: "12px",
              color: "var(--cream-muted)",
              textAlign: "center"
            }}>
              These are <strong style={{ color: "var(--amber)" }}>your inputs, not industry facts</strong>. The figure is revenue at risk under your own assumptions — not a loss we have measured or a result we promise.
            </div>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="m-step-panel">
            <div className="m-step-label">Claim Your Free Audit</div>
            <h2 className="m-step-title">Where should we send your baseline report?</h2>
            <p className="m-step-sub">
              Submit and you&rsquo;ll get immediate confirmation. <strong>Jason follows up within 2 hours</strong> during business windows &mdash; usually faster.
            </p>

            {/* Urgency banner */}
            <div style={{
              padding: "10px 14px",
              background: "rgba(232, 160, 32, 0.08)",
              border: "1px solid rgba(232, 160, 32, 0.15)",
              borderRadius: "2px",
              fontSize: "12px",
              color: "var(--amber-light)",
              textAlign: "center",
              marginBottom: "1.25rem"
            }}>
              🎯 <strong>Limited availability:</strong> Accepting 3 new clients this month
            </div>

            <form onSubmit={onFormSubmit} className="m-intake-form">
              <input type="hidden" name="form_type" value="diagnostic_intake" />
              <div
                aria-hidden="true"
                style={{ position: "absolute", left: "-10000px", top: "auto", width: 1, height: 1, overflow: "hidden" }}
              >
                <label htmlFor="intake-company">Company</label>
                <input id="intake-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="m-field">
                <label htmlFor="intake-first-name">First Name</label>
                <input
                  id="intake-first-name"
                  name="first_name"
                  placeholder="First name"
                  required
                  autoComplete="given-name"
                />
              </div>

              <div className="m-field">
                <label htmlFor="intake-business-name">Business Name</label>
                <input id="intake-business-name" name="business_name" placeholder="Your business name" required />
              </div>

              <div className="m-field-row">
                <div className="m-field">
                  <label htmlFor="intake-phone">Phone</label>
                  <input id="intake-phone" name="phone" type="tel" placeholder="(661) 000-0000" required autoComplete="tel" />
                </div>
                <div className="m-field">
                  <label htmlFor="intake-email">Email</label>
                  <input id="intake-email" name="email" type="email" placeholder="you@business.com" required autoComplete="email" />
                </div>
              </div>

              <div className="m-field">
                <label htmlFor="intake-web">Business Website</label>
                <input
                  id="intake-web"
                  name="business_website"
                  type="text"
                  inputMode="url"
                  placeholder="https://yourbusiness.com"
                  required
                  autoComplete="url"
                />
                <p className="m-step-sub" style={{ marginTop: "0.35rem" }}>
                  No site yet? Enter <strong>none</strong> (lowercase).
                </p>
              </div>

              <SmsConsentField idPrefix="intake" />

              <TurnstileField
                className="m-field"
                onToken={setTurnstileToken}
                onExpire={() => setTurnstileToken("")}
              />
              {siteKey && !turnstileToken ? (
                <p className="m-step-sub" style={{ color: "var(--amber-light)" }}>
                  Complete the verification above to submit.
                </p>
              ) : null}
              {submitError ? (
                <p className="m-step-sub" style={{ color: "var(--danger)" }}>
                  {submitError}
                </p>
              ) : null}

              <div style={{ marginTop: "1rem", fontSize: "12px", color: "var(--cream-dim)", textAlign: "center", lineHeight: 1.8 }}>
                <span>🔒 Your data stays yours — never shared or sold</span>
              </div>

              <div className="m-step-nav" style={{ marginTop: "1rem" }}>
                <button type="button" className="m-btn-back" onClick={() => goStep(2)} disabled={submitting}>
                  ← Back
                </button>
                <button
                  type="submit"
                  className="m-btn-next"
                  disabled={submitting || (Boolean(siteKey) && !turnstileToken)}
                  style={{
                    padding: "14px 32px",
                    fontSize: "15px",
                    fontWeight: 700,
                    borderRadius: "2px",
                    border: "none",
                    background: submitting || (Boolean(siteKey) && !turnstileToken) ? "rgba(255,255,255,0.08)" : "var(--amber)",
                    color: submitting || (Boolean(siteKey) && !turnstileToken) ? "var(--cream-dim)" : "var(--navy)",
                    cursor: submitting || (Boolean(siteKey) && !turnstileToken) ? "not-allowed" : "pointer",
                    transition: "all 0.2s ease",
                    fontFamily: "inherit",
                    flex: 1
                  }}
                >
                  {submitting ? "Submitting..." : "Get My Free Baseline Report →"}
                </button>
              </div>
            </form>

            <div style={{
              marginTop: "1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
              flexWrap: "wrap",
              fontSize: "12px",
              color: "var(--cream-dim)"
            }}>
              <span>👍 No contracts to sign</span>
              <span>📞 Jason calls you personally</span>
              <span>📊 Real data, real recommendations</span>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
