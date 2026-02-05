"use server";
import { auth } from "@clerk/nextjs/server";

import { ApiResponse } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const API_TOKEN = process.env.NEXT_PUBLIC_API_INTERNAL_TOKEN;
if (!API_BASE_URL) {
  throw new Error("API_BASE_URL is not defined");
}

export async function serverFetch<T>(
  path: string,
  options?: RequestInit,
): Promise<ApiResponse<T>> {
  try {
    const { getToken } = await auth();
    const userToken = await getToken();
    const token = userToken || API_TOKEN;
    const res = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      cache: "no-store",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options?.headers ?? {}),
      },
    });

    if (!res.ok) {
      return {
        success: false,
        data: null,
        error: `HTTP ${res.status}`,
      };
    }

    return res.json();
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "Network error",
    };
  }
}
