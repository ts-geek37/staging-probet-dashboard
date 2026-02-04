import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

const PricingSkeleton: React.FC = () => {
  return (
    <section className="m-auto w-full max-w-7xl px-6 xl:px-0 py-16 md:py-20">
      <div className="mb-4 flex justify-center">
        <Skeleton className="h-7 w-32 rounded-full" />
      </div>

      <div className="mb-8 text-center">
        <Skeleton className="mx-auto mb-3 h-10 w-3/4 max-w-md" />
        <Skeleton className="mx-auto h-5 w-full max-w-xl" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col rounded-md border border-primary-green/10 bg-primary-green/5 p-6"
          >
            <Skeleton className="mb-4 h-5 w-20" />

            <div className="mb-6 flex items-baseline gap-2">
              <Skeleton className="h-12 w-24" />
              <Skeleton className="h-5 w-12" />
            </div>

            <div className="mb-8 flex flex-col gap-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-5 w-5 shrink-0 rounded-full" />
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
