"use client";

import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

const PricingSkeleton: React.FC = () => {
  return (
    <section className="mx-auto max-w-6xl px-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col rounded-xl border border-slate-800 p-6"
          >
            <Skeleton className="h-5 w-24" />

            <Skeleton className="mt-3 h-8 w-32" />

            <Skeleton className="mt-2 h-3 w-28" />

            <div className="mt-6 flex flex-col gap-2">
              {Array.from({ length: 4 }).map((_, j) => (
                <Skeleton key={j} className="h-4 w-full" />
              ))}
            </div>

            <Skeleton className="mt-auto h-10 w-full" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingSkeleton;
