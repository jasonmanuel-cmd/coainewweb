"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown, X } from "lucide-react";
import { Reveal } from "@/components/revamp/Reveal";
import { BUILD_INCLUDED, MATRIX_GROUPS, NOT_INCLUDED, PACKAGES } from "@/lib/pricing";
import { DELIVERY_TIMELINE, OFFERS } from "@/lib/site";
import "./pricing-matrix.css";

/**
 * Package comparison matrix for the pricing page: the base website build and
 * the three packages side by side.
 *
 * Adapted from the 21st.dev "Dark Matrix Pricing Table" (arihantcodes): plan
 * columns with per-offer CTAs, sectioned feature groups, dashed dividers,
 * check/cross values, a featured flagship column, and a mobile offer picker —
 * re-skinned to COAI doctrine. Every number and list comes from lib/site.ts
 * (OFFERS) and lib/pricing.ts; nothing here is a price literal.
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

export function PricingMatrix() {
  /* Four columns need ~900px. Under that, the matrix renders the selected
     offer's column against the row labels instead of showing one and a half
     columns behind a horizontal scroll. Defaults to the most popular package. */
  const [shownPlan, setShownPlan] = useState(2);

  const plans: MatrixPlan[] = [
    {
      id: "website",
      name: OFFERS.website.name,
      stage: OFFERS.website.stage,
      price: `${OFFERS.website.price} flat`,
      priceNote: OFFERS.website.terms,
      cta: { label: "Discuss my website", href: "/intake?pkg=website" }
    },
    ...PACKAGES.map((pkg) => ({
      id: `package-${pkg.id}`,
      name: pkg.name,
      stage: pkg.stage,
      price: pkg.total,
      priceNote: pkg.totalNote,
      cta: { label: `Discuss ${pkg.name}`, href: `/intake?pkg=${pkg.id}` },
      featured: pkg.id === "2"
    }))
  ];

  const groups: MatrixGroup[] = [
    {
      label: "Pricing and terms",
      rows: [
        { label: "Price (website included)", values: [`${OFFERS.website.price} flat`, ...PACKAGES.map((pkg) => pkg.total)] },
        { label: "Monthly", values: ["Optional care plan", ...PACKAGES.map((pkg) => pkg.recurring)] },
        {
          label: "Payment",
          values: [OFFERS.website.terms, ...PACKAGES.map(() => "Milestones set in the written scope")]
        },
        {
          label: "Turnaround",
          values: [DELIVERY_TIMELINE, ...PACKAGES.map(() => "Quoted in the written scope")]
        },
        { label: "Contract lock-in", values: ["None", "None", "None", "None"] }
      ]
    },
    {
      label: "The website (every offer)",
      rows: BUILD_INCLUDED.map((item) => ({ label: item, values: [true, true, true, true] as MatrixValue[] }))
    },
    ...MATRIX_GROUPS.map((group) => ({
      label: group.label,
      rows: group.items.map((item) => ({
        label: item,
        values: [false, group.from <= 1, group.from <= 2, group.from <= 3] as MatrixValue[]
      }))
    })),
    {
      label: "Deliberately not included — in any offer",
      rows: NOT_INCLUDED.map((item) => ({ label: item, values: [false, false, false, false] as MatrixValue[] }))
    }
  ];

  const cellClass = (featured: boolean | undefined, shown: boolean) =>
    [featured ? "is-featured-col" : "", shown ? "" : "is-optional"].filter(Boolean).join(" ");

  return (
    <Reveal className="pm">
      <div className="pm-picker">
        <label htmlFor="pm-offer-select">
          <span className="pm-picker__label">Package</span>
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
            The COAI website build and the three packages compared: Digital Foundation, Lead Machine, and Customer
            Lifecycle.
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
