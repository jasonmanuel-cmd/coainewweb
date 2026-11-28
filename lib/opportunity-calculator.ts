export type OpportunityInputs = {
  missedCalls: number;
  recoverablePercent: number;
  closingPercent: number;
  averageValue: number;
  contributionMarginPercent: number;
  monthlyServiceFee: number;
};

const nonnegative = (value: number) => Number.isFinite(value) ? Math.max(0, value) : 0;
const percent = (value: number) => Math.min(100, nonnegative(value)) / 100;

/** Illustrative arithmetic only. It is not a forecast or attribution model. */
export function calculateOpportunity(input: OpportunityInputs) {
  const recoveredContacts = nonnegative(input.missedCalls) * percent(input.recoverablePercent);
  const estimatedCustomers = recoveredContacts * percent(input.closingPercent);
  const grossRevenue = estimatedCustomers * nonnegative(input.averageValue);
  const contributionBeforeFee = grossRevenue * percent(input.contributionMarginPercent);
  const contributionAfterFee = contributionBeforeFee - nonnegative(input.monthlyServiceFee);
  return { recoveredContacts, estimatedCustomers, grossRevenue, contributionBeforeFee, contributionAfterFee };
}
