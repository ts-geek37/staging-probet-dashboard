"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

const BillingSuccessPage: React.FC = () => {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-primary-green/20 bg-primary-green/5 p-8 text-center shadow-lg">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-green/15">
          <svg
            className="h-6 w-6 text-primary-green"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-semibold text-primary-green">
          Payment successful
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Your VIP access will be activated shortly.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <Link href="/prediction">
            <Button variant="green" className="w-full text-white">
              Explore Predictions
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default BillingSuccessPage;
