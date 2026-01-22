"use client";

import { BillingCycle } from "@/types/prices";

import { useCheckout } from "./hooks";

type Props = {
  billingCycle: BillingCycle;
};

const UpgradeCTA = ({ billingCycle }: Props) => {
  const { checkout, loading, error } = useCheckout();

  return (
    <div className="mt-6">
      <button
        onClick={() => checkout(billingCycle)}
        disabled={loading}
        className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-950"
      >
        {loading ? "Redirecting…" : "Upgrade to VIP"}
      </button>

      {error && (
        <p className="mt-3 text-center text-sm text-red-400">
          Unable to start checkout. Please try again.
        </p>
      )}
    </div>
  );
};

export default UpgradeCTA;
