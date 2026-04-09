"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export function LpRoiBlock() {
  const [calls, setCalls] = useState(5);
  const [ticket, setTicket] = useState(1200);
  const [closePct, setClosePct] = useState(30);

  const monthly = useMemo(
    () => Math.round(calls * 30.4 * (closePct / 100) * ticket),
    [calls, ticket, closePct]
  );

  const formatted = useMemo(
    () =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
      }).format(monthly),
    [monthly]
  );

  return (
    <div className="lp-roi-inner">
      <div className="lp-roi-grid">
        <div className="lp-roi-controls">
          <div className="lp-slider-group">
            <label>
              Missed Calls Per Day <span>{calls}</span>
            </label>
            <input
              type="range"
              min={1}
              max={30}
              step={1}
              value={calls}
              onChange={(e) => setCalls(Number(e.target.value))}
            />
          </div>
          <div className="lp-slider-group">
            <label>
              Average Ticket Value <span>${ticket.toLocaleString()}</span>
            </label>
            <input
              type="range"
              min={100}
              max={10000}
              step={50}
              value={ticket}
              onChange={(e) => setTicket(Number(e.target.value))}
            />
          </div>
          <div className="lp-slider-group">
            <label>
              Your Closing Rate <span>{closePct}%</span>
            </label>
            <input
              type="range"
              min={5}
              max={80}
              step={1}
              value={closePct}
              onChange={(e) => setClosePct(Number(e.target.value))}
            />
          </div>
          <div className="lp-roi-formula">
            (Missed Calls × 30.4) × Closing Rate × Avg Ticket = Monthly Leak
          </div>
        </div>
        <div className="lp-roi-result">
          <div className="lp-roi-kicker">Estimated Monthly Revenue Leak</div>
          <div className="lp-roi-result-num">{formatted}</div>
          <div className="lp-roi-result-label">Per Month Recoverable</div>
          <Link href="/intake" className="lp-btn-primary" style={{ marginTop: "1.5rem", fontSize: 12, padding: "12px 20px" }}>
            Lock In This Recovery →
          </Link>
        </div>
      </div>
    </div>
  );
}
