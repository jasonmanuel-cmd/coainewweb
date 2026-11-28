"use client";

import { useState } from "react";
import { calculateOpportunity, type OpportunityInputs } from "@/lib/opportunity-calculator";

const initial: OpportunityInputs = {
  missedCalls: 20,
  recoverablePercent: 30,
  closingPercent: 25,
  averageValue: 500,
  contributionMarginPercent: 40,
  monthlyServiceFee: 297
};

const fields: { key: keyof OpportunityInputs; label: string; unit: string; max: number }[] = [
  { key: "missedCalls", label: "Missed calls per month", unit: "calls", max: 10000 },
  { key: "recoverablePercent", label: "Estimated recoverable share", unit: "%", max: 100 },
  { key: "closingPercent", label: "Estimated closing rate", unit: "%", max: 100 },
  { key: "averageValue", label: "Average customer transaction", unit: "$", max: 1000000 },
  { key: "contributionMarginPercent", label: "Contribution margin", unit: "%", max: 100 },
  { key: "monthlyServiceFee", label: "Monthly COAI service fee", unit: "$", max: 1000000 }
];

const dollars = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const count = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });

export function OpportunityCalculator() {
  const [inputs, setInputs] = useState(initial);
  const result = calculateOpportunity(inputs);

  return <div className="coai-calculator">
    <div className="coai-calculator-fields">
      {fields.map(({ key, label, unit, max }) => <label key={key}>
        <span>{label}</span>
        <span className="coai-calculator-input"><input type="number" min="0" max={max} step={key === "missedCalls" ? "1" : "any"} inputMode="decimal" value={inputs[key]} onChange={(event) => {
          const parsed = Number(event.target.value);
          setInputs((current) => ({ ...current, [key]: Number.isFinite(parsed) ? Math.min(max, Math.max(0, parsed)) : 0 }));
        }} aria-describedby="estimate-note" /><small>{unit}</small></span>
      </label>)}
    </div>
    <div className="coai-calculator-results" aria-live="polite" aria-atomic="true">
      <p><span>Recovered contacts</span><strong>{count.format(result.recoveredContacts)}</strong></p>
      <p><span>Estimated customers</span><strong>{count.format(result.estimatedCustomers)}</strong></p>
      <p><span>Gross revenue</span><strong>{dollars.format(result.grossRevenue)}</strong></p>
      <p><span>Contribution before fee</span><strong>{dollars.format(result.contributionBeforeFee)}</strong></p>
      <p className="coai-calculator-total"><span>Contribution after service fee</span><strong>{dollars.format(result.contributionAfterFee)}</strong></p>
    </div>
    <p id="estimate-note" className="coai-calculator-note">Illustrative monthly estimates based only on the values you enter. Recovered contacts and customers are expected values, not whole bookings. Actual results, costs, and profit will vary; this is not a guarantee or a claim that COAI caused the outcome. Contribution excludes implementation fees, taxes, and other operating costs.</p>
  </div>;
}
