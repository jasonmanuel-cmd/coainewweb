type ScoreCardProps = {
  label: string;
  value: number;
};

export function ScoreCard({ label, value }: ScoreCardProps) {
  const percent = Math.round(value * 100);
  return (
    <article className="panel">
      <h3 className="mono" style={{ letterSpacing: "0.08em", textTransform: "uppercase", fontSize: "0.82rem" }}>{label}</h3>
      <p className="mono" style={{ fontSize: 44, margin: 0 }}>{percent}</p>
    </article>
  );
}
