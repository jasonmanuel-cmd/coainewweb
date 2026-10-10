"use client";

import { useState } from "react";
import { revenueAtRisk } from "@/lib/revenue-at-risk";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

function toCount(raw: string): number {
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

export function RevenueCalculator() {
  const [missedCalls, setMissedCalls] = useState("6");
  const [jobValue, setJobValue] = useState("450");
  const risk = revenueAtRisk(toCount(missedCalls), toCount(jobValue));

  return (
    <div className="signal-calc">
      <div className="signal-calc__controls">
        <label>
          <span>Missed qualified calls / week</span>
          <input
            type="number"
            min={0}
            inputMode="numeric"
            value={missedCalls}
            onChange={(event) => setMissedCalls(event.target.value)}
          />
        </label>
        <label>
          <span>Average booked job value</span>
          <input
            type="number"
            min={0}
            step={50}
            inputMode="numeric"
            value={jobValue}
            onChange={(event) => setJobValue(event.target.value)}
          />
        </label>
      </div>
      <div className="signal-calc__output" aria-live="polite">
        <div>
          <span>Conservative</span>
          <strong>{currency.format(risk.low)}<small>/mo</small></strong>
        </div>
        <div className="is-primary">
          <span>Base case</span>
          <strong>{currency.format(risk.base)}<small>/mo</small></strong>
        </div>
        <div>
          <span>Upper range</span>
          <strong>{currency.format(risk.high)}<small>/mo</small></strong>
        </div>
      </div>
      <p className="signal-calc__note">
        Uses your inputs. Base assumes 40% of missed calls receive a late or absent response and 25% of those
        would have booked. This is revenue at risk—not a guaranteed loss or earnings projection.
      </p>
    </div>
  );
}
