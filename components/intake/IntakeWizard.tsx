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
  { value: "Trades & Contractors", title: "Trades & Contractors", sub: "HVAC, plumbing, electrical, construction" },
  { value: "Food & Beverage", title: "Food & Beverage", sub: "Restaurant, food truck, catering" },
  { value: "Financial Services", title: "Financial Services", sub: "Credit, tax, consulting, insurance" },
  { value: "Retail & E-Commerce", title: "Retail & E-Commerce", sub: "Products, apparel, online store" },
  { value: "Professional Services", title: "Professional Services", sub: "Photography, consulting, creative" },
  { value: "Other", title: "Other", sub: "Tell us below" }
];

const WEBSITE_OPTIONS = [
  { value: "No website", title: "No website", sub: "Running on social media or referrals only" },
  { value: "Rented platform", title: "Wix / Squarespace / GoDaddy", sub: "Rented platform you don't truly own" },
  { value: "WordPress", title: "WordPress site", sub: "Self-managed or agency-built" },
  { value: "Custom / not sure", title: "Custom / not sure", sub: "Someone built it, not sure of the stack" }
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

  const step1Complete = Boolean(data.industry && data.website);

  return (
    <>
      <div className="m-intake-grid-bg" aria-hidden />
      <div className="m-intake-wrap">
        {/* Urgency banner */}
        <div className="m-urgency-banner">
          <span className="m-urgency-text">
            {OFFERS.scorecard.name} — {OFFERS.scorecard.turnaround}
          </span>
          <span className="m-urgency-sub">
            Free for qualified owner-operators. Otherwise a $350 Structural Audit, credited to the build.
          </span>
        </div>

        {/* Trust header */}
        <div className="m-trusted-by">
          <a
            href={GOOGLE_BUSINESS_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="m-trusted-link"
          >
            Read our reviews on Google
          </a>
        </div>

        {/* Progress indicator - 3 step */}
        <div className="m-step-counter">
          <div className="m-step-tracker">
            {[1, 2, 3].map((i) => (
              <div key={i} className="m-step-tracker-item">
                <div className={`m-step-circle ${step >= i ? "m-step-circle--active" : ""}`}>
                  {step > i ? "✓" : i}
                </div>
                <span className={`m-step-tracker-label ${step >= i ? "m-step-tracker-label--active" : ""}`}>
                  {i === 1 ? "Your Setup" : i === 2 ? "Your Baseline" : "Your Report"}
                </span>
                {i < 3 && (
                  <div className={`m-step-tracker-line ${step > i ? "m-step-tracker-line--active" : ""}`} />
                )}
              </div>
            ))}
          </div>
          <span className="m-step-counter-detail">
            {step === 1 ? "Step 1 of 3 — 60 seconds" : step === 2 ? "Step 2 of 3 — 30 seconds" : "Step 3 of 3 — Quick form"}
          </span>
        </div>

        {step === 1 ? (
          <div className="m-step-panel">
            <div className="m-step-label">Quick Snapshot</div>
            <h1 className="m-step-title">Tell us about your business</h1>
            <p className="m-step-sub">
              Finish this in about <strong>60 seconds</strong>. No spam, no pressure &mdash; just a real baseline of where you&rsquo;re leaking revenue.
            </p>

            <div className="m-intake-field-group">
              <label className="m-field-label">What type of business?</label>
              <div className="m-choice-grid">
                {INDUSTRY_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setField("industry", opt.value)}
                    className={`m-choice-card ${data.industry === opt.value ? "m-selected" : ""}`}
                  >
                    <span className="m-c-title">{opt.title}</span>
                    <span className="m-c-sub">{opt.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="m-intake-field-group">
              <label className="m-field-label">Current website setup?</label>
              <div className="m-choice-grid">
                {WEBSITE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setField("website", opt.value)}
                    className={`m-choice-card ${data.website === opt.value ? "m-selected" : ""}`}
                  >
                    <span className="m-c-title">{opt.title}</span>
                    <span className="m-c-sub">{opt.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="m-btn-next m-btn-next--block"
              disabled={!step1Complete}
              onClick={() => goStep(2)}
            >
              See Your Revenue Leak →
            </button>

            {/* Trust bar */}
            <div className="m-trust-bar">
              <span>🔒 No spam ever</span>
              <span>⚡ 60 seconds</span>
              <span>📋 Real data, not guesswork</span>
            </div>

            {/* Alternative CTA */}
            <div className="m-alt-cta">
              <div className="m-alt-cta-label">Prefer to talk to a human?</div>
              <a href={`tel:${CONTACT.phoneE164}`} className="m-phone-cta">
                {CONTACT.phoneDisplay}
              </a>
              <div className="m-alt-cta-sub">
                &ldquo;Jason helped me build a website... also created a phone AI system to help direct callers.&rdquo;
              </div>
              <div className="m-alt-cta-author">— Christopher Moore, Google Review ★★★★★</div>
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

            <div className="m-result-revenue">
              <div className="m-r-label">Estimated Monthly Revenue Leak</div>
              <div className="m-r-num">${leak.toLocaleString()}</div>
              <div className="m-r-sub">Based on your own inputs (not hardcoded defaults)</div>
            </div>

            <div className="m-step-nav">
              <button type="button" className="m-btn-back" onClick={() => goStep(1)}>
                ← Back
              </button>
              <button
                type="button"
                className="m-btn-next m-btn-next--block"
                onClick={() => goStep(3)}
              >
                See Your Full Plan →
              </button>
            </div>

            <div className="m-leak-disclaimer">
              These are <strong className="m-leak-strong">your inputs, not industry facts</strong>. The figure is revenue at risk under your own assumptions — not a loss we have measured or a result we promise.
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
            <div className="m-intake-urgency">
              🎯 <strong>Limited availability:</strong> Accepting 3 new clients this month
            </div>

            <form onSubmit={onFormSubmit} className="m-intake-form">
              <input type="hidden" name="form_type" value="diagnostic_intake" />
              <div className="m-sr-only-field" aria-hidden>
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
                <p className="m-field-hint">No site yet? Enter <strong>none</strong> (lowercase).</p>
              </div>

              <SmsConsentField idPrefix="intake" />

              <TurnstileField
                className="m-field"
                onToken={setTurnstileToken}
                onExpire={() => setTurnstileToken("")}
              />
              {siteKey && !turnstileToken ? (
                <p className="m-field-hint m-field-hint--error">Complete the verification above to submit.</p>
              ) : null}
              {submitError ? (
                <p className="m-field-hint m-field-hint--error">{submitError}</p>
              ) : null}

              <div className="m-intake-footer-note">
                <span>🔒 Your data stays yours — never shared or sold</span>
              </div>

              <div className="m-step-nav">
                <button type="button" className="m-btn-back" onClick={() => goStep(2)} disabled={submitting}>
                  ← Back
                </button>
                <button
                  type="submit"
                  className="m-btn-next m-btn-next--block"
                  disabled={submitting || (Boolean(siteKey) && !turnstileToken)}
                >
                  {submitting ? "Submitting..." : "Get My Free Baseline Report →"}
                </button>
              </div>
            </form>

            <div className="m-trust-bar m-trust-bar--footer">
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
