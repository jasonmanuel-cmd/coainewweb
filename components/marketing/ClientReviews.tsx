import { CLIENT_REVIEWS } from "@/lib/schema";
import "./client-reviews.css";

/**
 * Visible client reviews. Renders the same CLIENT_REVIEWS list the structured data
 * uses, so what Google reads is exactly what a visitor can read on the page.
 */
export function ClientReviews() {
  return (
    <section className="cr-section cinematic-section" aria-labelledby="client-reviews-title">
      <div className="cinematic-container">
        <span className="section-index">[ CLIENT WORDS ]</span>
        <h2 id="client-reviews-title">What clients say about working with COAI.</h2>
        <ul className="cr-grid">
          {CLIENT_REVIEWS.map((review) => (
            <li key={review.author} className="cr-card">
              <blockquote>
                <p>&ldquo;{review.body}&rdquo;</p>
                <footer>{review.author}</footer>
              </blockquote>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
