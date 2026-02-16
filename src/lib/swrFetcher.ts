"use client";

import { useAuth } from "@clerk/nextjs";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const API_INTERNAL_TOKEN = process.env.NEXT_PUBLIC_API_INTERNAL_TOKEN;

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

type AuthMode = "clerk" | "internal" | "none";

type AuthRoute = {
  prefix: string;
  mode: AuthMode;
};

export const AUTH_ROUTES: AuthRoute[] = [
  { prefix: "/api/v2/billing", mode: "clerk" },
  { prefix: "/api/v2/predictions/matches", mode: "clerk" },
];

export function resolveAuthMode(path: string): AuthMode {
  return AUTH_ROUTES.find((r) => path.startsWith(r.prefix))?.mode ?? "none";
}

export function useSwrFetcher() {
  const { isLoaded, isSignedIn, getToken } = useAuth();

  return async function swrFetcher<T>(url: string): Promise<T> {
    const authMode = resolveAuthMode(url);
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (authMode === "clerk") {
      if (!isSignedIn && isLoaded) {
        throw new Error("AUTH_REQUIRED");
      }

      const token = await getToken();

      if (!token) {
        throw new Error("TOKEN_UNAVAILABLE");
      }

      headers.Authorization = `Bearer ${token}`;
    } else {
      if (!API_INTERNAL_TOKEN) {
        throw new Error("INTERNAL_TOKEN_MISSING");
      }

      headers.Authorization = `Bearer ${API_INTERNAL_TOKEN}`;
    }

    const res = await fetch(`${API_BASE_URL}${url}`, {
      method: "GET",
      cache: "no-store",
      credentials: "omit",
      headers,
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    return res.json();
  };
}
