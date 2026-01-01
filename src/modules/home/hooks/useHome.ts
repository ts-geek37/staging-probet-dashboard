"use client";

import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import { HomeResponse } from "@/types/home";

export const useHome = (initialData?: ApiResponse<HomeResponse>) => {
  const response = useSWR<ApiResponse<HomeResponse>>("/api/home", {
    fallbackData: initialData,
    revalidateOnMount: false,
  });

  return {
    data: response.data?.data,
    isLoading: !response.data && !response.error,
    error: response.error,
  };
};
