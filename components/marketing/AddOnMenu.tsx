import { ADDON_CATEGORIES, CARE_PLANS, type PriceItem } from "@/lib/pricing";
import "./packages.css";

function Row({ item }: { item: PriceItem }) {
  return (
    <li className="ao-item">
      <span className="ao-name">{item.name}</span>
      <span className="ao-price">{item.price}</span>
      <p className="ao-summary">{item.summary}</p>
      {item.note ? <p className="ao-note">{item.note}</p> : null}
    </li>
  );
}

/**
 * Every individually priced add-on, grouped as on the COAI price sheet.
 * Rendered from lib/pricing.ts; contains no price literals.
 */
export function AddOnMenu() {
  return (
    <div className="ao">
      <ul className="ao-jump" aria-label="Jump to a category">
        {ADDON_CATEGORIES.map((category) => (
          <li key={category.id}>
            <a href={`#addons-${category.id}`}>{category.title}</a>
          </li>
        ))}
        <li>
          <a href="#addons-care">Website care</a>
        </li>
      </ul>
      {ADDON_CATEGORIES.map((category) => (
        <section className="ao-category" key={category.id} id={`addons-${category.id}`} aria-labelledby={`ao-${category.id}`}>
          <h3 id={`ao-${category.id}`}>{category.title}</h3>
          <p className="ao-blurb">{category.blurb}</p>
          <ul className="ao-list">
            {category.items.map((item) => (
              <Row item={item} key={item.id} />
            ))}
          </ul>
        </section>
      ))}
      <section className="ao-category" id="addons-care" aria-labelledby="ao-care">
        <h3 id="ao-care">Website care plans</h3>
        <p className="ao-blurb">
          Keep the site healthy after launch. The site stays yours either way.
        </p>
        <ul className="ao-list">
          {CARE_PLANS.map((item) => (
            <Row item={item} key={item.id} />
          ))}
        </ul>
      </section>
    </div>
  );
}
