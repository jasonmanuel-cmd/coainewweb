type CaseStudyCardProps = {
  title: string;
  summary: string;
  proofPoints: string[];
  /** e.g. "April 2026" — freshness signal for readers and audits */
  updatedAt?: string;
};

export function CaseStudyCard({ title, summary, proofPoints, updatedAt }: CaseStudyCardProps) {
  return (
    <article className="panel">
      <h3>{title}</h3>
      {updatedAt ? (
        <p className="muted" style={{ marginTop: 0 }}>
          Last updated {updatedAt}
        </p>
      ) : null}
      <p>{summary}</p>
      <ul>
        {proofPoints.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </article>
  );
}
