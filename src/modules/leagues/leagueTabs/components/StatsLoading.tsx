"use client";
import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

const StatsLoading: React.FC = () => {
  return (
    <div className="flex flex-col gap-8">
      {[1, 2].map((i) => (
        <div
          key={i}
          className="flex flex-col overflow-hidden rounded-2xl border border-primary-gray/20"
        >
          <div className="border-b border-primary-gray/20 px-5 py-4 bg-white/5">
            <Skeleton className="h-6 w-48 bg-white/10" />
          </div>

          <div className="p-5">
            <div className="space-y-4">
              <div className="flex items-center gap-4 pb-3 border-b border-primary-gray/20">
                <Skeleton className="h-4 w-8 bg-white/10" />
                <Skeleton className="h-4 w-32 bg-white/10" />
                <Skeleton className="h-4 w-32 bg-white/10" />
                <Skeleton className="h-4 w-16 ml-auto bg-white/10" />
              </div>

              {[1, 2, 3, 4, 5].map((row) => (
                <div key={row} className="flex items-center gap-4">
                  <Skeleton className="h-4 w-8 bg-white/10" />
                  <div className="flex items-center gap-3">
                    <Skeleton className="size-7 rounded-full bg-white/10" />
                    <Skeleton className="h-4 w-24 bg-white/10" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="size-7 rounded-full bg-white/10" />
                    <Skeleton className="h-4 w-24 bg-white/10" />
                  </div>
                  <Skeleton className="h-4 w-8 ml-auto bg-white/10" />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default StatsLoading;
