/**
 * Revenue at risk from missed calls, expressed as a range.
 *
 * missed calls/week -> month (x4) -> share that go unanswered too long (40%)
 * -> share that would have booked (25%) -> average job value.
 *
 * Low and high are 40% either side of the base. This is deliberately NOT a
 * single dramatic number: it is the visitor's own inputs under stated
 * assumptions, and it is revenue at risk rather than revenue lost.
 *
 * If these constants change, update the disclaimer rendered beside the
 * calculator in components/revamp/LandingHome.tsx to match.
 */
const UNANSWERED_RATE = 0.4;
const WOULD_HAVE_BOOKED_RATE = 0.25;
const WEEKS_PER_MONTH = 4;
const BAND_SPREAD = 0.4;

export type RiskBand = {
  low: number;
  base: number;
  high: number;
};

export function revenueAtRisk(missedPerWeek: number, jobValue: number): RiskBand {
  const calls = Math.max(0, missedPerWeek);
  const value = Math.max(0, jobValue);
  const base = calls * WEEKS_PER_MONTH * UNANSWERED_RATE * WOULD_HAVE_BOOKED_RATE * value;
  return {
    low: Math.round(base * (1 - BAND_SPREAD)),
    base: Math.round(base),
    high: Math.round(base * (1 + BAND_SPREAD))
  };
}
