export type BillingCycle = "monthly" | "quarterly" | "semi_annual" | "yearly";

export type Plan = {
  durationMonths: number;
  product: string;
  billingCycle: BillingCycle;
  eurPrices: number;
  usdPrices: number;
  label: string;
};

export type PlanWithFeatures = Plan & { features: string[] };
