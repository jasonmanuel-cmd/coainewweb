"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { TurnstileField } from "@/components/security/TurnstileField";
import { FORMSPREE_ENDPOINT } from "@/lib/forms";
import { CONTACT } from "@/lib/site";

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

function toSmsPhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return null;
}

function newSessionId() {
  return `intk-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function IntakeWizard({ packageInterest }: IntakeWizardProps) {
  const router = useRouter();
  const [sessionId, setSessionId] = useState(newSessionId);
  const [step, setStep] = useState(1);
  const [recoveredSession, setRecoveredSession] = useState(false);
  const [submitting, setSubmitting] = useState(false);
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
    setSubmitting(true);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const firstName = String(fd.get("first_name") || "").trim();
    const phoneRaw = String(fd.get("phone") || "").trim();

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

    try {
      await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" }
      });
    } catch {
      // Continue UX path; Formspree may still capture via fallback infra
    }

    const smsTo = toSmsPhone(phoneRaw);
    if (smsTo) {
      void fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: smsTo,
          leadId: sessionId,
          turnstileToken,
          body: `Got it${firstName ? `, ${firstName}` : ""} — Jason from COAI will follow up within 2 hours. Questions? Reply here or call ${CONTACT.phoneDisplay}.`
        })
      }).catch(() => {
        // Non-blocking by design
      });
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
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "1rem", fontSize: "12px", color: "var(--m-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          <span style={{ color: "var(--m-green)", fontSize: "14px" }}>★★★★★</span>
          5.0 stars on Google · 8 local reviews
        </div>
        <div className="m-step-counter">
          <div className="m-step-dots" aria-hidden>
            {[1, 2, 3].map((i) => (
              <div key={i} className={`m-step-dot ${step === i ? "m-active" : ""} ${step > i ? "m-done" : ""}`} />
            ))}
          </div>
          <span>Step {step} of 3</span>
        </div>

        {step === 1 ? (
          <div className="m-step-panel">
            <div className="m-step-label">Step 01</div>
            <h1 className="m-step-title">Business Snapshot</h1>
            <p className="m-step-sub">
              Finish this in about <strong>90 seconds</strong>. No spam, no pressure — just a real baseline. Pick your category and current website setup.
            </p>
            <div className="m-choice-grid">
              {(
                [
                  ["Trades & Contractors", "Trades & Contractors", "HVAC, plumbing, electrical, construction"],
                  ["Food & Beverage", "Food & Beverage", "Restaurant, food truck, catering"],
                  ["Financial Services", "Financial Services", "Credit, tax, consulting, insurance"],
                  ["Retail & E-Commerce", "Retail & E-Commerce", "Products, apparel, online store"],
                  ["Professional Services", "Professional Services", "Photography, consulting, creative"],
                  ["Other", "Other", "Tell us below"]
                ] as const
              ).map(([value, title, sub]) => (
                <button
                  key={value}
                  type="button"
                  className={`m-choice-card ${data.industry === value ? "m-selected" : ""}`}
                  onClick={() => setField("industry", value)}
                >
                  <div className="m-c-title">{title}</div>
                  <div className="m-c-sub">{sub}</div>
                </button>
              ))}
            </div>

            <div className="m-priority-head" style={{ marginTop: "1.25rem" }}>Current web setup</div>
            <div className="m-choice-grid">
              {(
                [
                  ["No website", "No website", "Running on social media or referrals only"],
                  ["Wix / Squarespace / GoDaddy", "Rented platform", "Wix, Squarespace, GoDaddy, etc."],
                  ["WordPress site", "WordPress", "Self-managed or agency-built"],
                  ["Custom / unknown", "Custom / not sure", "Someone built it, not sure of the stack"]
                ] as const
              ).map(([value, title, sub]) => (
                <button
                  key={value}
                  type="button"
                  className={`m-choice-card ${data.website === value ? "m-selected" : ""}`}
                  onClick={() => setField("website", value)}
                >
                  <div className="m-c-title">{title}</div>
                  <div className="m-c-sub">{sub}</div>
                </button>
              ))}
            </div>

            <div style={{ marginTop: "1.5rem", fontSize: "12px", color: "var(--m-muted)", textAlign: "center" }}>
              <strong>Up Next:</strong> Step 2: Revenue Leak Calculator → Step 3: Contact Details
            </div>

            <div className="m-step-nav" style={{ marginTop: "1rem" }}>
              <button
                type="button"
                className="m-btn-next"
                disabled={!data.industry || !data.website}
                onClick={() => goStep(2)}
              >
                Continue →
              </button>
            </div>

            <div style={{ marginTop: "2rem", padding: "1.25rem", border: "1px solid var(--m-border)", borderRadius: "6px", background: "rgba(0, 0, 0, 0.2)" }}>
              <div style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "0.5rem" }}>
                Prefer to talk now? <a href={`tel:${CONTACT.phoneE164}`} style={{ color: "var(--m-green)", textDecoration: "none" }}>Call {CONTACT.phoneDisplay}</a>
              </div>
              <div style={{ fontSize: "13px", fontStyle: "italic", color: "var(--m-muted)", marginBottom: "0.5rem" }}>
                &ldquo;Jason helped me build a website for my business... also created a phone AI system for me to help direct callers...&rdquo;
              </div>
              <div style={{ fontSize: "11px", color: "var(--m-green)" }}>— Christopher Moore, Google Review</div>
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="m-step-panel">
            <div className="m-step-label">Step 02</div>
            <h2 className="m-step-title">Revenue Leak Inputs</h2>
            <p className="m-step-sub">
              Quick slider pass. This turns operational leakage into a monthly dollar estimate you can act on.
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

            <div className="m-step-nav">
              <button type="button" className="m-btn-back" onClick={() => goStep(1)}>
                ← Back
              </button>
              <button type="button" className="m-btn-next" onClick={() => goStep(3)}>
                Continue →
              </button>
            </div>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="m-step-panel">
            <div className="m-step-label">Step 03</div>
            <h2 className="m-step-title">Where should we send your baseline?</h2>
            <p className="m-step-sub">
              Submit and you&apos;ll get immediate confirmation. <strong>Jason follows up within 2 hours</strong> during
              business windows.
            </p>

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

              <TurnstileField
                className="m-field"
                onToken={setTurnstileToken}
                onExpire={() => setTurnstileToken("")}
              />
              {siteKey && !turnstileToken ? (
                <p className="m-step-sub" style={{ color: "var(--accent, #c45)" }}>
                  Complete the verification above to submit.
                </p>
              ) : null}

              <div className="m-step-nav">
                <button type="button" className="m-btn-back" onClick={() => goStep(2)} disabled={submitting}>
                  ← Back
                </button>
                <button
                  type="submit"
                  className="m-btn-next"
                  disabled={submitting || (Boolean(siteKey) && !turnstileToken)}
                >
                  {submitting ? "Submitting..." : "Submit & Get My Baseline →"}
                </button>
              </div>
            </form>
          </div>
        ) : null}
      </div>
    </>
  );
}
