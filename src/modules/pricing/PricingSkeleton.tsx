import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

const PricingSkeleton: React.FC = () => {
  return (
    <section className="m-auto w-full max-w-7xl px-6">
      <div className="mb-8 flex justify-center">
        <Skeleton className="h-10 w-40 rounded-full" />
      </div>

      <div className="mb-8 text-center">
        <Skeleton className="mx-auto mb-3 h-10 w-96" />
        <Skeleton className="mx-auto h-5 w-[600px]" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col rounded-xl border border-slate-800 p-6"
          >
            <Skeleton className="mb-4 h-5 w-20" />
            <Skeleton className="mb-2 h-10 w-32" />
            <Skeleton className="mb-6 h-4 w-24" />

            <div className="mb-6 flex flex-col gap-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-4 flex-1" />
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
