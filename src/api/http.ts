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
    const res = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      cache: "no-store",
      headers: {
        ...(API_TOKEN ? { Authorization: `Bearer ${API_TOKEN}` } : {}),
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
