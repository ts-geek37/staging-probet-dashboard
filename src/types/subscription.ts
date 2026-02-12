import { BillingCycle } from "./prices";

export type Subscription = {
  is_vip: boolean;
  status: string | null;
  currency: string | null;
  billing_cycle: BillingCycle | null;
  current_period_end: string | null;
};
