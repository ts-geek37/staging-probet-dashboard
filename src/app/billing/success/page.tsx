"use client";

import Link from "next/link";

const BillingSuccessPage = () => {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center shadow-lg">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15">
          <svg
            className="h-6 w-6 text-emerald-500"
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

        <h1 className="text-2xl font-semibold text-emerald-400">
          Payment successful
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Your VIP access will be activated shortly.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            Go to home page
          </Link>

          <Link
            href="/support"
            className="text-sm text-slate-400 hover:text-slate-300"
          >
            Need help?
          </Link>
        </div>
      </div>
    </main>
  );
};

export default BillingSuccessPage;
