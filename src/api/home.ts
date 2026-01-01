import { HomeResponse } from "@/types/home";

import { serverFetch } from "./http";
import { ApiResponse } from "./types";

export function getHome(): Promise<ApiResponse<HomeResponse>> {
  return serverFetch<HomeResponse>("/api/home");
}
