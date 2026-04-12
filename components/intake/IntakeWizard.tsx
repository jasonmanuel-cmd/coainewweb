"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { FORMSPREE_ENDPOINT } from "@/lib/forms";
import { normalizeWebsiteUrl } from "@/lib/utils/normalize-website-url";

/** When we cannot run PageSpeed, derive transparent estimates from the user’s own answers (not random placeholders). */
function schemaEstimateFromPresence(website: string): number {
  const map: Record<string, number> = {
    "No website": 22,
    "Wix / Squarespace / GoDaddy": 46,
    "WordPress site": 58,
    "Custom / unknown": 52
  };
  return map[website] ?? 48;
}

function seoEstimateFromPresence(website: string): number {
  const map: Record<string, number> = {
    "No website": 38,
    "Wix / Squarespace / GoDaddy": 62,
    "WordPress site": 68,
    "Custom / unknown": 64
  };
  return map[website] ?? 60;
}

function perfEstimateFromPresence(website: string): number {
  const map: Record<string, number> = {
    "No website": 32,
    "Wix / Squarespace / GoDaddy": 64,
    "WordPress site": 70,
    "Custom / unknown": 66
  };
  return map[website] ?? 62;
}

type IntakeWizardProps = {
  packageInterest?: string;
};

export function IntakeWizard({ packageInterest }: IntakeWizardProps) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    industry: "",
    website: "",
    calls: 5,
    ticket: 1200,
    close: 30
  });
  /** Optional URL from step 4 — used for a live PageSpeed pull on the report screen. */
  const [submittedSiteUrl, setSubmittedSiteUrl] = useState("");
  const [liveScores, setLiveScores] = useState<{ performance: number; seo: number } | null>(null);
  const [scoreLoading, setScoreLoading] = useState(false);
  const [liveScoresFailed, setLiveScoresFailed] = useState(false);

  const leak = Math.round(data.calls * 30.4 * (data.close / 100) * data.ticket);

  const schemaScore = schemaEstimateFromPresence(data.website);
  const perfScore = liveScores?.performance ?? perfEstimateFromPresence(data.website);
  const seoScore = liveScores?.seo ?? seoEstimateFromPresence(data.website);

  const goStep = useCallback((n: number) => {
    setStep(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const selectChoice = useCallback((key: "industry" | "website", val: string) => {
    setData((d) => ({ ...d, [key]: val }));
  }, []);

  const onRangeCalls = useCallback((v: number) => {
    setData((d) => ({ ...d, calls: v }));
  }, []);
  const onRangeTicket = useCallback((v: number) => {
    setData((d) => ({ ...d, ticket: v }));
  }, []);
  const onRangeClose = useCallback((v: number) => {
    setData((d) => ({ ...d, close: v }));
  }, []);

  async function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!data.industry || !data.website) return;
    const form = e.currentTarget;
    const siteRaw = (form.querySelector("#website_url") as HTMLInputElement | null)?.value?.trim() ?? "";
    setSubmittedSiteUrl(siteRaw);
    const fd = new FormData(form);
    fd.set("revenue_leak", `$${leak.toLocaleString()}`);
    try {
      await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" }
      });
    } catch {
      /* Formspree may still receive; continue UX */
    }
    goStep(5);
  }

  useEffect(() => {
    if (step !== 5) {
      setLiveScores(null);
      setLiveScoresFailed(false);
      setScoreLoading(false);
      return;
    }
    if (!submittedSiteUrl.trim()) {
      setLiveScores(null);
      setLiveScoresFailed(false);
      setScoreLoading(false);
      return;
    }
    let cancelled = false;
    let target: string;
    try {
      target = normalizeWebsiteUrl(submittedSiteUrl);
    } catch {
      setLiveScoresFailed(true);
      setLiveScores(null);
      setScoreLoading(false);
      return;
    }
    setScoreLoading(true);
    setLiveScoresFailed(false);
    setLiveScores(null);
    (async () => {
      try {
        const res = await fetch(`/api/lighthouse?url=${encodeURIComponent(target)}`);
        const json = (await res.json()) as { performance?: number; seo?: number; error?: string };
        if (cancelled) return;
        if (!res.ok || json.error) {
          setLiveScoresFailed(true);
          setLiveScores(null);
          return;
        }
        setLiveScores({
          performance: json.performance ?? 0,
          seo: json.seo ?? 0
        });
      } catch {
        if (!cancelled) {
          setLiveScoresFailed(true);
          setLiveScores(null);
        }
      } finally {
        if (!cancelled) setScoreLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [step, submittedSiteUrl]);

  function continueFromStep1() {
    if (!data.industry) return;
    goStep(2);
  }

  function continueFromStep3() {
    if (!data.website) return;
    goStep(4);
  }

  return (
    <>
      <div className="m-intake-grid-bg" aria-hidden />
      <div className="m-intake-wrap">
        <div className="m-step-counter">
          <div className="m-step-dots" aria-hidden>
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`m-step-dot ${step === i ? "m-active" : ""} ${step > i ? "m-done" : ""}`}
              />
            ))}
          </div>
          <span>Step {step} of 5</span>
        </div>

        {step === 1 ? (
          <div className="m-step-panel">
            <div className="m-step-label">Step 01</div>
            <h1 className="m-step-title">What kind of business do you run?</h1>
            <p className="m-step-sub">
              Select the category that fits best. This determines which visibility benchmarks we run against your
              current presence.
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
                  onClick={() => selectChoice("industry", value)}
                >
                  <div className="m-c-title">{title}</div>
                  <div className="m-c-sub">{sub}</div>
                </button>
              ))}
            </div>
            <div className="m-step-nav">
              <button type="button" className="m-btn-next" onClick={continueFromStep1}>
                Continue →
              </button>
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="m-step-panel">
            <div className="m-step-label">Step 02</div>
            <h2 className="m-step-title">Tell us about your call volume.</h2>
            <p className="m-step-sub">
              This calculates your estimated monthly revenue leak from missed calls.{" "}
              <strong>Most businesses are shocked by this number.</strong>
            </p>
            <div className="m-slider-group">
              <div className="m-slider-label">
                <span>Missed calls per day</span>
                <strong>{data.calls}</strong>
              </div>
              <input
                type="range"
                min={1}
                max={30}
                step={1}
                value={data.calls}
                onChange={(e) => onRangeCalls(Number(e.target.value))}
              />
            </div>
            <div className="m-slider-group">
              <div className="m-slider-label">
                <span>Average job / ticket value</span>
                <strong>${data.ticket.toLocaleString()}</strong>
              </div>
              <input
                type="range"
                min={100}
                max={10000}
                step={50}
                value={data.ticket}
                onChange={(e) => onRangeTicket(Number(e.target.value))}
              />
            </div>
            <div className="m-slider-group">
              <div className="m-slider-label">
                <span>Your closing rate</span>
                <strong>{data.close}%</strong>
              </div>
              <input
                type="range"
                min={5}
                max={80}
                step={1}
                value={data.close}
                onChange={(e) => onRangeClose(Number(e.target.value))}
              />
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
            <h2 className="m-step-title">What does your current digital presence look like?</h2>
            <p className="m-step-sub">
              Honest answers get the most accurate diagnostic. No judgment — most operators in the 661 are starting
              from a similar baseline.
            </p>
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
                  onClick={() => selectChoice("website", value)}
                >
                  <div className="m-c-title">{title}</div>
                  <div className="m-c-sub">{sub}</div>
                </button>
              ))}
            </div>
            <div className="m-step-nav">
              <button type="button" className="m-btn-back" onClick={() => goStep(2)}>
                ← Back
              </button>
              <button type="button" className="m-btn-next" onClick={continueFromStep3}>
                Continue →
              </button>
            </div>
          </div>
        ) : null}

        {step === 4 ? (
          <div className="m-step-panel">
            <div className="m-step-label">Step 04</div>
            <h2 className="m-step-title">Where do we send your results?</h2>
            <p className="m-step-sub">
              Your diagnostic report + a prioritized fix list + revenue leak estimate goes to your email.{" "}
              <strong>Jason reviews every submission personally.</strong>
            </p>
            <form action={FORMSPREE_ENDPOINT} method="POST" onSubmit={onFormSubmit} className="m-intake-form">
              <input type="hidden" name="form_type" value="diagnostic_intake" />
              {packageInterest ? <input type="hidden" name="package_interest" value={packageInterest} /> : null}
              <input type="hidden" name="industry" value={data.industry} />
              <input type="hidden" name="website_type" value={data.website} />
              <input type="hidden" name="missed_calls" value={String(data.calls)} />
              <input type="hidden" name="ticket_value" value={String(data.ticket)} />
              <input type="hidden" name="closing_rate" value={`${data.close}%`} />
              <input type="hidden" name="revenue_leak" value={`$${leak.toLocaleString()}`} />
              <div className="m-field-row">
                <div className="m-field">
                  <label htmlFor="first_name">First Name</label>
                  <input id="first_name" name="first_name" placeholder="First name" required autoComplete="given-name" />
                </div>
                <div className="m-field">
                  <label htmlFor="last_name">Last Name</label>
                  <input id="last_name" name="last_name" placeholder="Last name" required autoComplete="family-name" />
                </div>
              </div>
              <div className="m-field">
                <label htmlFor="business_name">Business Name</label>
                <input id="business_name" name="business_name" placeholder="Your business name" required />
              </div>
              <div className="m-field">
                <label htmlFor="website_url">Your Website (if you have one)</label>
                <input id="website_url" name="website_url" type="url" placeholder="https://yourbusiness.com" />
              </div>
              <div className="m-field-row">
                <div className="m-field">
                  <label htmlFor="phone">Phone</label>
                  <input id="phone" name="phone" type="tel" placeholder="(661) 000-0000" required autoComplete="tel" />
                </div>
                <div className="m-field">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" placeholder="you@business.com" required autoComplete="email" />
                </div>
              </div>
              <div className="m-step-nav">
                <button type="button" className="m-btn-back" onClick={() => goStep(3)}>
                  ← Back
                </button>
                <button type="submit" className="m-btn-next">
                  Generate My Results →
                </button>
              </div>
            </form>
          </div>
        ) : null}

        {step === 5 ? (
          <div className="m-step-panel">
            <div className="m-step-label">Your Diagnostic Report</div>
            <h2 className="m-step-title">
              Here&apos;s your <span className="m-text-green">baseline.</span>
            </h2>
            <p className="m-step-sub">
              Revenue leak below is calculated from <strong>your sliders</strong>. Scores show a{" "}
              <strong>live Google mobile test</strong> when you entered a website URL; otherwise they are{" "}
              <strong>estimates from your answers</strong> — not made-up “perfect” numbers.
            </p>

            <p className="m-step-sub" style={{ fontSize: "0.85rem", opacity: 0.85 }}>
              {submittedSiteUrl && !scoreLoading ? (
                liveScores ? (
                  <>
                    Performance &amp; SEO scores: <strong>PageSpeed Insights</strong> (mobile) for{" "}
                    <strong>{submittedSiteUrl}</strong>. Schema signal is inferred from your presence choice (not a live
                    crawl).
                  </>
                ) : (
                  <>
                    Couldn&apos;t run a live Google test for that URL{liveScoresFailed ? " — showing estimates only." : "."}
                  </>
                )
              ) : !submittedSiteUrl ? (
                <>No URL provided — performance and SEO below are <strong>estimated from your presence selection</strong>.</>
              ) : (
                <>Running live Google mobile test…</>
              )}
            </p>

            <div className="m-result-scores">
              <div className="m-score-card">
                <div
                  className={`m-score-num ${
                    perfScore >= 90 ? "m-score-green" : perfScore >= 50 ? "m-score-amber" : "m-score-red"
                  }`}
                >
                  {scoreLoading && submittedSiteUrl ? "…" : perfScore}
                </div>
                <div className="m-score-lbl">Performance {liveScores ? "(live)" : "(est.)"}</div>
              </div>
              <div className="m-score-card">
                <div
                  className={`m-score-num ${
                    schemaScore >= 90 ? "m-score-green" : schemaScore >= 50 ? "m-score-amber" : "m-score-red"
                  }`}
                >
                  {schemaScore}
                </div>
                <div className="m-score-lbl">Schema signal (est.)</div>
              </div>
              <div className="m-score-card">
                <div
                  className={`m-score-num ${
                    seoScore >= 90 ? "m-score-green" : seoScore >= 50 ? "m-score-amber" : "m-score-red"
                  }`}
                >
                  {scoreLoading && submittedSiteUrl ? "…" : seoScore}
                </div>
                <div className="m-score-lbl">SEO / AEO {liveScores ? "(live)" : "(est.)"}</div>
              </div>
            </div>

            <div className="m-result-revenue">
              <div className="m-r-label">Estimated Monthly Revenue Leak</div>
              <div className="m-r-num">${leak.toLocaleString()}</div>
              <div className="m-r-sub">Per month in recoverable missed-call revenue</div>
            </div>

            <div className="m-priority-head">PRIORITY FIX LIST</div>
            <ul className="m-priority-list">
              {data.website === "No website" ? (
                <li>
                  <span className="m-p-num">P1</span>
                  <div className="m-p-text">
                    No owned web property
                    <span>You&apos;re dependent on social and referrals — search and AI can&apos;t map a canonical entity to you.</span>
                  </div>
                </li>
              ) : (
                <li>
                  <span className="m-p-num">P1</span>
                  <div className="m-p-text">
                    Structured data &amp; entity clarity
                    <span>
                      {data.website === "WordPress site"
                        ? "WordPress often ships with generic or partial schema — AI surfaces need explicit LocalBusiness / Service JSON-LD aligned with NAP."
                        : "Rented builders and thin templates often ship without complete JSON-LD — AI-generated answers skip you."}
                    </span>
                  </div>
                </li>
              )}
              <li>
                <span className="m-p-num">P2</span>
                <div className="m-p-text">
                  Missed call recovery not active
                  <span>Every unanswered call after hours is a lead going to your competitor</span>
                </div>
              </li>
              <li>
                <span className="m-p-num">P3</span>
                <div className="m-p-text">
                  Mobile conversion path has friction
                  <span>Visitors on mobile (the majority) are dropping before they contact you</span>
                </div>
              </li>
            </ul>

            <div className="m-next-box">
              <strong>What happens next:</strong> Jason reviews your submission personally and sends a full written
              diagnosis within one business day. If you want to talk through it live, schedule a 30-minute call — no
              pitch, just data.
            </div>

            <div className="m-step-nav m-step-nav-results">
              <Link href="/contact?from=diagnostic&intent=packages" className="m-btn-next m-btn-link">
                View packages &amp; contact →
              </Link>
              <Link href="/contact?from=diagnostic&intent=jason" className="m-btn-back m-btn-link">
                Talk to Jason
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
