"use client";

import { useAuth } from "@clerk/nextjs";
import useSWRMutation from "swr/mutation";

import { BillingCycle } from "@/types/prices";

type CheckoutArgs = {
  billingCycle: BillingCycle;
};

type CheckoutResponse = {
  checkout_url: string;
};

export const AUTH_REQUIRED = "AUTH_REQUIRED";
export const TOKEN_UNAVAILABLE = "TOKEN_UNAVAILABLE";

const checkoutFetcher = async (
  url: string,
  {
    arg,
  }: {
    arg: CheckoutArgs & { token: string };
  },
): Promise<CheckoutResponse> => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${arg.token}`,
    },
    body: JSON.stringify({
      billing_cycle: arg.billingCycle,
    }),
  });

  if (!res.ok) {
    throw new Error(`CHECKOUT_FAILED_${res.status}`);
  }

  const json = await res.json();

  if (!json?.data?.checkout_url) {
    throw new Error("INVALID_CHECKOUT_RESPONSE");
  }

  return json.data;
};

const useCheckout = () => {
  const { isSignedIn, getToken } = useAuth();

  const { trigger, isMutating, error } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v2/billing/checkout-session`,
    checkoutFetcher,
  );

  const checkout = async (billingCycle: BillingCycle) => {
    try {
      if (!isSignedIn) {
        throw new Error(AUTH_REQUIRED);
      }

      const token = await getToken();
      if (!token) {
        throw new Error(TOKEN_UNAVAILABLE);
      }

      const data = await trigger({
        billingCycle,
        token,
      });

      window.location.assign(data.checkout_url);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    checkout,
    loading: isMutating,
    error,
    disabled: !isSignedIn || isMutating,
  };
};

export default useCheckout;
