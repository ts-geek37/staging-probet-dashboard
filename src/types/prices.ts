export type BillingCycle = "monthly" | "quarterly" | "semi_annual" | "yearly";

export type Plan = {
  durationMonths: number;
  product: string;
  billingCycle: BillingCycle;
  currency: string;
  amount: number;
  label: string;
};

export type PlanWithFeatures = Plan & { features: string[] };
