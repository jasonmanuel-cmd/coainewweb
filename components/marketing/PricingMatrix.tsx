"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown, X } from "lucide-react";
import { Reveal } from "@/components/revamp/Reveal";
import { DELIVERY_TIMELINE, OFFERS } from "@/lib/site";
import "./pricing-matrix.css";

/**
 * Offer comparison matrix for the pricing page.
 *
 * Adapted from the 21st.dev "Dark Matrix Pricing Table" (arihantcodes): plan
 * columns with per-offer CTAs, sectioned feature groups, dashed dividers,
 * check/cross values, a featured flagship column, and a mobile offer picker —
 * re-skinned to COAI doctrine. Every number still comes from OFFERS in
 * lib/site.ts; the included/excluded lists are passed in from the pricing
 * page's single source of truth.
 */

type MatrixValue = boolean | string;

interface MatrixRow {
  label: string;
  values: MatrixValue[];
}

interface MatrixGroup {
  label: string;
  rows: MatrixRow[];
}

interface MatrixPlan {
  id: string;
  name: string;
  stage: string;
  price: string;
  priceNote: string;
  cta: { label: string; href: string };
  featured?: boolean;
}

interface PricingMatrixProps {
  /** What the flagship build installs — from the pricing page source of truth. */
  included: readonly string[];
  /** What is deliberately excluded from every offer. */
  notIncluded: readonly string[];
}

function MatrixValueCell({ value }: { value: MatrixValue }) {
  if (value === true) {
    return (
      <>
        <Check aria-hidden="true" strokeWidth={2.4} className="pm-icon pm-icon--pass" />
        <span className="pm-sr-only">Included</span>
      </>
    );
  }
  if (value === false) {
    return (
      <>
        <X aria-hidden="true" strokeWidth={2} className="pm-icon pm-icon--fail" />
        <span className="pm-sr-only">Not included</span>
      </>
    );
  }
  return <span className="pm-value-text">{value}</span>;
}

export function PricingMatrix({ included, notIncluded }: PricingMatrixProps) {
  /* Three offer columns need ~760px. Under that, the matrix renders the
     selected offer's column against the row labels instead of showing one
     and a half columns behind a horizontal scroll. Defaults to the flagship. */
  const [shownPlan, setShownPlan] = useState(1);

  const plans: MatrixPlan[] = [
    {
      id: "scorecard",
      name: OFFERS.scorecard.name,
      stage: OFFERS.scorecard.stage,
      price: OFFERS.scorecard.price,
      priceNote: OFFERS.scorecard.alt,
      cta: { label: "Get my leak score", href: "/intake" }
    },
    {
      id: "tradecall",
      name: OFFERS.tradecall.name,
      stage: OFFERS.tradecall.stage,
      price: `${OFFERS.tradecall.price} flat`,
      priceNote: OFFERS.tradecall.terms,
      cta: { label: "Book your build", href: "/intake" },
      featured: true
    },
    {
      id: "continuity",
      name: OFFERS.continuity.name,
      stage: OFFERS.continuity.stage,
      price: `${OFFERS.continuity.price}/${OFFERS.continuity.period}`,
      priceNote: OFFERS.continuity.terms,
      cta: { label: "Ask about continuity", href: "/contact" }
    }
  ];

  const groups: MatrixGroup[] = [
    {
      label: "Pricing and terms",
      rows: [
        {
          label: "Price",
          values: [
            OFFERS.scorecard.price,
            `${OFFERS.tradecall.price} flat`,
            `${OFFERS.continuity.price}/${OFFERS.continuity.period}`
          ]
        },
        {
          label: "Payment",
          values: [OFFERS.scorecard.alt, OFFERS.tradecall.terms, OFFERS.continuity.terms]
        },
        {
          label: "Turnaround",
          values: [OFFERS.scorecard.turnaround, DELIVERY_TIMELINE, "Begins after the included optimization period"]
        },
        { label: "Bilingual build (EN/ES)", values: ["Not applicable", OFFERS.tradecall.bilingual, false] },
        { label: "Contract lock-in", values: ["None", "None", "None"] }
      ]
    },
    {
      label: "What the build installs",
      rows: included.map((item) => ({ label: item, values: [false, true, "Monitored"] as MatrixValue[] }))
    },
    {
      label: "Deliberately not included — in any offer",
      rows: notIncluded.map((item) => ({ label: item, values: [false, false, false] as MatrixValue[] }))
    }
  ];

  const cellClass = (featured: boolean | undefined, shown: boolean) =>
    [featured ? "is-featured-col" : "", shown ? "" : "is-optional"].filter(Boolean).join(" ");

  return (
    <Reveal className="pm">
      <div className="pm-picker">
        <label htmlFor="pm-offer-select">
          <span className="pm-picker__label">Offer</span>
          <span className="pm-picker__control">
            <select
              id="pm-offer-select"
              value={shownPlan}
              onChange={(event) => setShownPlan(Number(event.target.value))}
            >
              {plans.map((plan, index) => (
                <option key={plan.id} value={index}>
                  {plan.name}
                </option>
              ))}
            </select>
            <ChevronDown aria-hidden="true" className="pm-picker__chevron" />
          </span>
        </label>
      </div>
      <div className="pm-scroll">
        <table className="pm-table">
          <caption className="pm-sr-only">
            The three COAI offers compared: the Job-Call Leak Scorecard, the TradeCall Revenue Infrastructure Build,
            and Revenue Continuity.
          </caption>
          <thead>
            <tr>
              <th scope="col" className="pm-corner">
                <span className="pm-corner__label">Compare</span>
              </th>
              {plans.map((plan, index) => (
                <th
                  key={plan.id}
                  scope="col"
                  className={["pm-plan", plan.featured ? "is-featured" : "", index === shownPlan ? "" : "is-optional"]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <span className="pm-plan__stage">{plan.stage}</span>
                  <span className="pm-plan__name">{plan.name}</span>
                  <span className="pm-plan__price">{plan.price}</span>
                  <span className="pm-plan__note">{plan.priceNote}</span>
                  <Link
                    href={plan.cta.href}
                    className={plan.featured ? "pm-plan__cta pm-plan__cta--primary" : "pm-plan__cta"}
                  >
                    {plan.cta.label} <ArrowRight aria-hidden="true" />
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          {groups.map((group) => (
            <tbody key={group.label}>
              <tr>
                <th scope="colgroup" colSpan={plans.length + 1} className="pm-group">
                  {group.label}
                </th>
              </tr>
              {group.rows.map((row) => (
                <tr key={row.label}>
                  <th scope="row" className="pm-row-label">
                    {row.label}
                  </th>
                  {row.values.map((value, index) => (
                    <td
                      key={plans[index]?.id ?? index}
                      className={["pm-value", cellClass(plans[index]?.featured, index === shownPlan)]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      <MatrixValueCell value={value} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
    </Reveal>
  );
}
