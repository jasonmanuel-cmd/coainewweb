import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { PACKAGES } from "@/lib/pricing";
import "./packages.css";

/**
 * The three COAI packages, rendered from PACKAGES in lib/pricing.ts.
 * Used on the home, services, website-design and pricing pages so the numbers
 * can never disagree. Styling uses the global design tokens only.
 */
export function PackageCards({ headingId = "packages-title", compact = false }: { headingId?: string; compact?: boolean }) {
  return (
    <div className="pk-grid" role="list" aria-labelledby={headingId}>
      {PACKAGES.map((pkg) => {
        const featured = pkg.id === "2";
        const visible = compact ? pkg.adds.slice(0, 5) : pkg.adds;
        const hidden = pkg.adds.length - visible.length;
        return (
          <article
            key={pkg.id}
            role="listitem"
            className={featured ? "pk-card is-featured" : "pk-card"}
            aria-labelledby={`pk-${pkg.id}-name`}
          >
            {featured ? <span className="pk-badge">Most popular</span> : null}
            <span className="pk-stage">{pkg.stage}</span>
            <h3 className="pk-name" id={`pk-${pkg.id}-name`}>{pkg.name}</h3>
            <p className="pk-tagline">{pkg.tagline}</p>

            <div className="pk-price">
              <strong>{pkg.total}</strong>
              <span>{pkg.totalNote}</span>
            </div>
            <p className="pk-breakdown">{pkg.breakdown}</p>

            <ul className="pk-list">
              {pkg.inherits ? (
                <li className="pk-inherits">
                  <Check aria-hidden="true" /> <span><strong>{pkg.inherits}</strong>, plus:</span>
                </li>
              ) : (
                <li className="pk-inherits">
                  <Check aria-hidden="true" /> <span><strong>Custom Website Build</strong>, plus:</span>
                </li>
              )}
              {visible.map((name) => (
                <li key={name}>
                  <Check aria-hidden="true" /> {name}
                </li>
              ))}
              {hidden > 0 ? <li className="pk-more">+ {hidden} more included</li> : null}
            </ul>

            <div className="pk-recurring">
              <span>Monthly</span>
              <strong>{pkg.recurring}</strong>
              <small>{pkg.recurringNote}</small>
            </div>

            <Link
              href={`/intake?pkg=${pkg.id}`}
              className={featured ? "pk-cta pk-cta--primary" : "pk-cta"}
              aria-label={`Discuss the ${pkg.name} package`}
            >
              Discuss {pkg.name} <ArrowRight aria-hidden="true" />
            </Link>
          </article>
        );
      })}
    </div>
  );
}
