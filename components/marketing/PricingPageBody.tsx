import Link from "next/link";

export function PricingPageBody() {
  return (
    <>
      <div className="m-page-hero">
        <div className="m-grid-bg" aria-hidden />
        <div className="m-page-hero-inner">
          <div className="m-section-label">Pricing</div>
          <h1 className="m-page-h1">
            Fixed price. <span className="m-text-green">Full ownership.</span>
            <br />
            No surprises.
          </h1>
          <p className="m-hero-sub">
            Every package is scoped before work starts. You know exactly what you&apos;re getting, what it costs, and
            what you own at the end. No retainers. No mystery.
          </p>
        </div>
      </div>

      <section className="m-marketing-section">
        <div className="m-container-wide">
          <div className="m-section-label">Package Ladder</div>
          <div className="m-pricing-grid">
            <div className="m-pkg" id="package-1">
              <div className="m-pkg-top-bar m-bar-1" />
              <div className="m-pkg-head">
                <div className="m-pkg-tier">Package 01</div>
                <div className="m-pkg-name">Signal Foundation</div>
                <div className="m-pkg-tagline">
                  The core website operating layer. Turns silent traffic into clear local buying signals. The right
                  starting point for most service businesses.
                </div>
                <div className="m-pkg-price">
                  <span className="m-amount">$1,200</span>
                  <span className="m-suffix">starting price</span>
                </div>
              </div>
              <div className="m-pkg-body">
                <ul className="m-pkg-features">
                  <li className="m-included">
                    <span className="m-feat-icon">→</span>
                    <span>
                      <strong>Conversion-first message hierarchy</strong> — copy structured to move visitors to action
                    </span>
                  </li>
                  <li className="m-included">
                    <span className="m-feat-icon">→</span>
                    <span>
                      <strong>Mobile speed & trust architecture</strong> — sub-3s load on 4G
                    </span>
                  </li>
                  <li className="m-included">
                    <span className="m-feat-icon">→</span>
                    <span>
                      <strong>GEO / SEO / AEO visibility framework</strong> — built for AI and search from day one
                    </span>
                  </li>
                  <li className="m-included">
                    <span className="m-feat-icon">→</span>
                    <span>
                      <strong>Lead capture & call-route hardening</strong> — forms, click-to-call, intake flows
                    </span>
                  </li>
                  <li className="m-included">
                    <span className="m-feat-icon">→</span>
                    <span>
                      <strong>Google Business Profile alignment</strong> — entity schema synced
                    </span>
                  </li>
                  <li className="m-included">
                    <span className="m-feat-icon">→</span>
                    <span>
                      <strong>Full code handoff</strong> — you own everything
                    </span>
                  </li>
                </ul>
                <div className="m-pkg-divider" />
                <div className="m-pkg-meta">TIMELINE: 2–3 weeks · PAGES: Up to 6</div>
              </div>
              <div className="m-pkg-foot">
                <Link href="/contact?package=1&from=pricing" className="m-pkg-cta">
                  Start With Package 1 →
                </Link>
              </div>
            </div>

            <div className="m-pkg m-pkg-featured" id="package-2">
              <div className="m-pkg-top-bar m-bar-2" />
              <div className="m-pkg-badge">Most Popular</div>
              <div className="m-pkg-head">
                <div className="m-pkg-tier">Package 02</div>
                <div className="m-pkg-name">Commerce Engine</div>
                <div className="m-pkg-tagline">
                  Everything in Signal Foundation plus transaction-grade backend logic. Your site sells, processes, and
                  manages orders without you touching it.
                </div>
                <div className="m-pkg-price">
                  <span className="m-amount">$1,600</span>
                  <span className="m-suffix">starting price</span>
                </div>
              </div>
              <div className="m-pkg-body">
                <ul className="m-pkg-features">
                  <li className="m-included">
                    <span className="m-feat-icon">→</span>
                    <span>
                      <strong>Everything in Signal Foundation</strong>
                    </span>
                  </li>
                  <li className="m-included">
                    <span className="m-feat-icon">→</span>
                    <span>
                      <strong>Store backend & catalog logic</strong> — sovereign, no Shopify dependency
                    </span>
                  </li>
                  <li className="m-included">
                    <span className="m-feat-icon">→</span>
                    <span>
                      <strong>Up to 50 products</strong> fully configured and live
                    </span>
                  </li>
                  <li className="m-included">
                    <span className="m-feat-icon">→</span>
                    <span>
                      <strong>Checkout, tax & order-flow QA</strong> — tested across devices
                    </span>
                  </li>
                  <li className="m-included">
                    <span className="m-feat-icon">→</span>
                    <span>
                      <strong>Admin dashboard</strong> — manage inventory and orders yourself
                    </span>
                  </li>
                  <li className="m-included">
                    <span className="m-feat-icon">→</span>
                    <span>
                      <strong>Payment gateway integration</strong> — Stripe or equivalent
                    </span>
                  </li>
                </ul>
                <div className="m-pkg-divider" />
                <div className="m-pkg-meta">TIMELINE: 3–4 weeks · PRODUCTS: Up to 50</div>
              </div>
              <div className="m-pkg-foot">
                <Link href="/contact?package=2&from=pricing" className="m-pkg-cta">
                  Start With Package 2 →
                </Link>
              </div>
            </div>

            <div className="m-pkg" id="package-3">
              <div className="m-pkg-top-bar m-bar-3" />
              <div className="m-pkg-head">
                <div className="m-pkg-tier">Package 03</div>
                <div className="m-pkg-name">Sentinel Automation</div>
                <div className="m-pkg-tagline">
                  Signal Foundation plus full AI automation layer. Cipher intercepts missed demand 24/7. Your best leads
                  never go unanswered again.
                </div>
                <div className="m-pkg-price">
                  <span className="m-amount">$2,000</span>
                  <span className="m-suffix">starting price</span>
                </div>
              </div>
              <div className="m-pkg-body">
                <ul className="m-pkg-features">
                  <li className="m-included">
                    <span className="m-feat-icon">→</span>
                    <span>
                      <strong>Everything in Signal Foundation</strong>
                    </span>
                  </li>
                  <li className="m-included">
                    <span className="m-feat-icon">→</span>
                    <span>
                      <strong>Cipher AI receptionist deployment</strong> — tuned to your business voice
                    </span>
                  </li>
                  <li className="m-included">
                    <span className="m-feat-icon">→</span>
                    <span>
                      <strong>Missed-call text-back</strong> — responds in under 30 seconds
                    </span>
                  </li>
                  <li className="m-included">
                    <span className="m-feat-icon">→</span>
                    <span>
                      <strong>Lead qualification logic</strong> — filters intent before it reaches you
                    </span>
                  </li>
                  <li className="m-included">
                    <span className="m-feat-icon">→</span>
                    <span>
                      <strong>Booking automation & callback routing</strong>
                    </span>
                  </li>
                  <li className="m-included">
                    <span className="m-feat-icon">→</span>
                    <span>
                      <strong>Workflow reporting dashboard</strong>
                    </span>
                  </li>
                </ul>
                <div className="m-pkg-divider" />
                <div className="m-pkg-meta">TIMELINE: 3–4 weeks · UPTIME: 24/7</div>
              </div>
              <div className="m-pkg-foot">
                <Link href="/contact?package=3&from=pricing" className="m-pkg-cta">
                  Start With Package 3 →
                </Link>
              </div>
            </div>
          </div>

          <div className="m-compare-block">
            <div className="m-section-label">Feature Comparison</div>
            <div className="m-compare-wrap">
              <table className="m-compare-table">
                <thead>
                  <tr>
                    <th style={{ width: "40%" }}>Feature</th>
                    <th>
                      Signal
                      <br />
                      $1,200
                    </th>
                    <th className="m-th-featured">
                      Commerce
                      <br />
                      $1,600
                    </th>
                    <th>
                      Sentinel
                      <br />
                      $2,000
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Conversion-first layout", "yes", "yes", "yes"],
                    ["Mobile speed optimization", "yes", "yes", "yes"],
                    ["GEO / AEO / SEO framework", "yes", "yes", "yes"],
                    ["Lead capture & call routing", "yes", "yes", "yes"],
                    ["Schema markup", "yes", "yes", "yes"],
                    ["Full code ownership", "yes", "yes", "yes"],
                    ["E-commerce store backend", "no", "yes", "no"],
                    ["Product catalog (up to 50)", "no", "yes", "no"],
                    ["Checkout & payment integration", "no", "yes", "no"],
                    ["Admin dashboard", "no", "yes", "no"],
                    ["Cipher AI receptionist", "no", "no", "yes"],
                    ["Missed-call text-back", "no", "no", "yes"],
                    ["Lead qualification logic", "no", "no", "yes"],
                    ["Booking automation", "no", "no", "yes"],
                    ["Pages included", "Up to 6", "Up to 8", "Up to 6"],
                    ["Build timeline", "2–3 wks", "3–4 wks", "3–4 wks"]
                  ].map(([label, a, b, c]) => (
                    <tr key={String(label)}>
                      <td className="m-feature-name">{label}</td>
                      <td className={a === "yes" ? "m-yes" : a === "no" ? "m-no" : "m-val"}>
                        {a === "yes" ? "✓" : a === "no" ? "—" : a}
                      </td>
                      <td className={b === "yes" ? "m-yes" : b === "no" ? "m-no" : "m-val"}>
                        {b === "yes" ? "✓" : b === "no" ? "—" : b}
                      </td>
                      <td className={c === "yes" ? "m-yes" : c === "no" ? "m-no" : "m-val"}>
                        {c === "yes" ? "✓" : c === "no" ? "—" : c}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="m-addons-block">
            <div className="m-section-label">Add-On Services</div>
            <h2 className="m-h2-marketing">
              Expand any package with <span className="m-text-green">targeted add-ons.</span>
            </h2>
            <div className="m-addons-grid">
              {[
                [
                  "Bilingual Build (EN/ES)",
                  "Full Spanish translation with proper hreflang markup. Essential for Kern County businesses targeting the 50%+ Spanish-speaking local market.",
                  "+$400"
                ],
                [
                  "Additional Pages",
                  "Extra service pages, landing pages, or location pages beyond the package limit. Each fully schema-optimized and conversion-ready.",
                  "+$150 / page"
                ],
                [
                  "Google Business Profile Overhaul",
                  "Complete GBP audit, entity alignment, photo optimization, Q&A seeding, and category correction. Standalone or bundled with any package.",
                  "+$300"
                ],
                [
                  "Commerce + Sentinel Bundle",
                  "E-commerce store backend AND full AI automation stack. The complete sovereign operating system. Best value for high-volume businesses.",
                  "$2,800 bundle"
                ],
                [
                  "Ongoing Support Retainer",
                  "Monthly content updates, performance monitoring, schema maintenance, and priority access to COAI for questions and changes. Optional — never required.",
                  "$197 / month"
                ],
                [
                  "Structural Audit (Standalone)",
                  "Full performance, schema, AEO, and GBP audit with a prioritized fix list. Ideal if you already have a site but don't know why it isn't performing.",
                  "$350 standalone"
                ]
              ].map(([name, desc, price]) => (
                <div key={name} className="m-addon-card">
                  <div className="m-addon-name">{name}</div>
                  <div className="m-addon-desc">{desc}</div>
                  <div className="m-addon-price">{price}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="m-guarantee-box">
            <div className="m-g-icon">◈</div>
            <div>
              <div className="m-g-title">The Scope Guarantee</div>
              <p className="m-g-text">
                Every project is scoped in writing before work begins. If COAI misses a deliverable that was in the
                scope document, we fix it at no additional cost. No scope creep charges. No &quot;that wasn&apos;t
                included&quot; conversations after you&apos;ve paid. The proposal is the contract — and we honor it.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="m-bottom-cta">
        <div className="m-section-label">Not Sure Which Package</div>
        <h2 className="m-bottom-cta-h2">
          Run the diagnostic first.
          <br />
          <span className="m-text-green">It clarifies everything.</span>
        </h2>
        <p>
          30 minutes with Jason surfaces exactly what your business needs and what it doesn&apos;t. Most clients know
          which package fits before the call ends.
        </p>
        <div className="m-cta-row">
          <Link href="/intake" className="m-btn-primary-marketing">
            Run My Free Diagnostic →
          </Link>
          <Link href="/faq" className="m-btn-ghost-marketing">
            Read the FAQ
          </Link>
        </div>
      </div>
    </>
  );
}
