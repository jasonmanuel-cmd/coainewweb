"use client";

import { useState } from "react";
import { Button, Card, Input } from "@/components/ui";
import "./xray.css";

type XrayResult = {
  performance: number | null;
  seo: number | null;
  accessibility: number | null;
  bestPractices: number | null;
  error?: string;
};

const EMPTY: XrayResult = {
  performance: null,
  seo: null,
  accessibility: null,
  bestPractices: null
};

/** Lighthouse's own thresholds. Pass at 90, caution at 50, fail below. */
function scoreState(score: number | null): "pass" | "caution" | "fail" | "unknown" {
  if (score === null) return "unknown";
  if (score >= 90) return "pass";
  if (score >= 50) return "caution";
  return "fail";
}

/**
 * Live Google Lighthouse scan of any URL. This is the one place on the site
 * where we publish a performance number, and it is measured on demand rather
 * than asserted in copy.
 */
export function WebsiteXray() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<XrayResult | null>(null);

  const run = async () => {
    const target = url.trim();
    if (!target) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(
        `/api/lighthouse?url=${encodeURIComponent(target)}&strategy=mobile`
      );
      const data = await res.json();
      setResult(res.ok ? data : { ...EMPTY, error: data.error || "Scan failed" });
    } catch {
      setResult({ ...EMPTY, error: "Network error. Try again." });
    } finally {
      setLoading(false);
    }
  };

  const metrics: ReadonlyArray<[string, number | null]> = result
    ? [
        ["Performance", result.performance],
        ["SEO", result.seo],
        ["Accessibility", result.accessibility],
        ["Best practices", result.bestPractices]
      ]
    : [];

  return (
    <Card>
      <h3 className="xray__title">Website X-ray</h3>
      <p className="xray__lede">
        Run Google Lighthouse against your site right now, on mobile. Four measured scores, no
        interpretation from us.
      </p>
      <form
        className="xray__form"
        onSubmit={(e) => {
          e.preventDefault();
          run();
        }}
      >
        <Input
          label="Your website"
          type="url"
          placeholder="yourwebsite.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={loading}
        />
        <Button type="submit" variant="primary" disabled={loading || !url.trim()}>
          {loading ? "Scanning…" : "Run the scan"}
        </Button>
      </form>

      <div aria-live="polite">
        {loading && <p className="xray__status">Running Google Lighthouse…</p>}

        {result?.error && !loading && <p className="xray__error">{result.error}</p>}

        {result && !result.error && !loading && (
          <>
            <div className="xray__grid">
              {metrics.map(([label, score]) => (
                <div key={label} className={`xray__metric xray__metric--${scoreState(score)}`}>
                  <div className="xray__metric-label">{label}</div>
                  <div className="xray__metric-score">{score ?? "—"}</div>
                </div>
              ))}
            </div>
            <p className="xray__status">
              Scores out of 100, measured by Google Lighthouse on a simulated mobile connection. A
              single run varies — treat these as a signal, not a verdict.
            </p>
          </>
        )}
      </div>
    </Card>
  );
}
