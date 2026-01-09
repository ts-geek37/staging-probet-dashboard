import { HomeResponse } from "@/types/home";

import { serverFetch } from "./http";
import { ApiResponse } from "./types";

export const getHome = (): Promise<ApiResponse<HomeResponse>> =>
  serverFetch<HomeResponse>("/api/v2/home");
