type RedScreenReportProps = {
  issueCount: number;
  recommendations: string[];
};

export function RedScreenReport({ issueCount, recommendations }: RedScreenReportProps) {
  return (
    <section className="panel" style={{ borderColor: "#4b1f1f" }}>
      <h3>RedScreen Summary</h3>
      <p>{issueCount} structural violations detected.</p>
      <ul>
        {recommendations.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
