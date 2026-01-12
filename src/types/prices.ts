export type BillingCycle = "monthly" | "quarterly" | "semi_annual" | "yearly";

export type Plan = {
  product: string;
  billingCycle: BillingCycle;
  currency: string;
  amount: number;
  label: string;
};
