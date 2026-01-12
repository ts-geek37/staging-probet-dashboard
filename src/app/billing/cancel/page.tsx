"use client";

import Link from "next/link";

const BillingCancelPage = () => {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-amber-500/20 bg-amber-500/5 p-8 text-center shadow-lg">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/15">
          <svg
            className="h-6 w-6 text-amber-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-semibold text-amber-400">
          Payment cancelled
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          You were not charged. You can try again anytime.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            Return to pricing
          </Link>

          <Link
            href="/support"
            className="text-sm text-slate-400 hover:text-slate-300"
          >
            Contact support
          </Link>
        </div>
      </div>
    </main>
  );
};

export default BillingCancelPage;
