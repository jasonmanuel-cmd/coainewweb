"use client";

import { useMemo, useState } from "react";

export function GrowthCalculator() {
  const [missedCalls, setMissedCalls] = useState(6);
  const [closeRate, setCloseRate] = useState(25);
  const [avgTicket, setAvgTicket] = useState(1200);

  const monthlyLeak = useMemo(() => {
    return missedCalls * 30.4 * (closeRate / 100) * avgTicket;
  }, [missedCalls, closeRate, avgTicket]);

  const formatted = useMemo(
    () =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
      }).format(monthlyLeak),
    [monthlyLeak]
  );

  return (
    <section className="panel" id="calculator">
      <h2 className="mono">Growth Recovery Calculator</h2>
      <p className="mono">Formula: (Missed Calls Per Day x 30.4) x Closing Rate x Average Ticket</p>
      <div className="grid">
        <label>
          <span className="field-label mono">Missed Calls Per Day</span>
          <input
            type="number"
            min={0}
            value={missedCalls}
            onChange={(e) => setMissedCalls(Number(e.target.value) || 0)}
          />
        </label>
        <label>
          <span className="field-label mono">Closing Rate (%)</span>
          <input
            type="number"
            min={0}
            max={100}
            value={closeRate}
            onChange={(e) => setCloseRate(Number(e.target.value) || 0)}
          />
        </label>
        <label>
          <span className="field-label mono">Average Ticket ($)</span>
          <input
            type="number"
            min={0}
            value={avgTicket}
            onChange={(e) => setAvgTicket(Number(e.target.value) || 0)}
          />
        </label>
      </div>
      <div className="panel" style={{ marginTop: "0.9rem" }}>
        <p className="mono" style={{ margin: 0 }}>Projected Monthly Leak</p>
        <p className="mono" style={{ fontSize: "2rem", margin: "0.25rem 0 0", color: "var(--accent-signal)" }}>
          {formatted}
        </p>
      </div>
    </section>
  );
}

