import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

const PricingSkeleton: React.FC = () => {
  return (
    <section className="m-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-15">
      <div className="mb-4 flex justify-center">
        <Skeleton className="h-7 w-36 rounded-full" />
      </div>

      <div className="mb-8 text-center">
        <Skeleton className="mx-auto mb-3 h-9 w-[80%] max-w-lg" />
        <Skeleton className="mx-auto mb-2 h-4 w-[90%] max-w-2xl" />
        <Skeleton className="mx-auto mb-6 h-4 w-[70%] max-w-xl" />

        <div className="flex justify-center">
          <div className="inline-flex h-10 w-52 items-center rounded-full bg-slate-800/50 p-1 ring-1 ring-white/10">
            <Skeleton className="h-8 w-1/2 rounded-full" />
            <Skeleton className="ml-1 h-8 w-1/2 rounded-full" />
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col rounded-xl border border-white/10 bg-slate-900/40 p-6"
          >
            <Skeleton className="mb-3 h-5 w-20 rounded-md" />

            <div className="mb-5 flex items-end gap-2">
              <Skeleton className="h-11 w-28 rounded-md" />
              <Skeleton className="h-5 w-14 rounded-md" />
            </div>

            <div className="mb-6 space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-full rounded-md" />
                </div>
              ))}
            </div>

            <Skeleton className="mt-auto h-11 w-full rounded-lg" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingSkeleton;
