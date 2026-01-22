import { BillingCycle, Plan } from "@/types/prices";

import { serverFetch } from "./http";
import { ApiResponse } from "./types";

export const getPlans = (): Promise<ApiResponse<Plan[]>> => {
  return serverFetch<Plan[]>("/api/v2/prices");
};

export const getPlan = (plan: BillingCycle): Promise<ApiResponse<Plan>> => {
  const query = new URLSearchParams({
    plan: String(plan),
  });
  return serverFetch<Plan>(`/api/v2/prices/plan?${query.toString()}`);
};
