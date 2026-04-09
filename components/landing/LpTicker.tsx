const ITEMS = [
  "GEO",
  "AEO",
  "SEO",
  "SCHEMA",
  "VISIBILITY AUDIT",
  "SOVEREIGN INFRASTRUCTURE",
  "661 LOCAL AUTHORITY",
  "MISSED CALL RECOVERY"
];

function TickerSequence({ seq }: { seq: string }) {
  return (
    <>
      {ITEMS.map((t, i) => (
        <span key={`${seq}-${i}`}>
          <span>{t}</span>
          <span className="lp-ticker-dot">●</span>
        </span>
      ))}
    </>
  );
}

export function LpTicker() {
  return (
    <div className="lp-ticker-wrap">
      <div className="lp-ticker-track" aria-hidden="true">
        <TickerSequence seq="a" />
        <TickerSequence seq="b" />
      </div>
    </div>
  );
}
