"use client";

import React from "react";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const AccuratePredictionCardSkeleton: React.FC = () => {
  return (
    <Card className="relative overflow-hidden border border-slate-700 p-0 gap-0">
      <div className="px-3 py-2 sm:px-4 sm:py-3 bg-slate-800/80 border-b border-slate-700 space-y-2">
        <Skeleton className="h-3 w-12 sm:w-14 bg-white/5" />
        <Skeleton className="h-4 w-40 sm:w-48 bg-white/5" />
      </div>

      <div className="flex items-center justify-between gap-2 sm:gap-6 px-3 py-5 sm:p-6">
        <div className="flex flex-col items-center gap-2 sm:gap-3 flex-1">
          <Skeleton className="h-12 w-12 sm:h-16 sm:w-16 rounded-lg bg-white/5" />
          <Skeleton className="h-3 w-16 sm:h-4 sm:w-20 bg-white/5" />
        </div>

        <div className="flex flex-col items-center gap-2 min-w-[80px] sm:min-w-[120px]">
          <Skeleton className="h-3 w-8 sm:w-10 bg-white/5" />
          <Skeleton className="h-8 w-14 sm:h-12 sm:w-20 bg-white/5" />
          <div className="flex flex-col items-center gap-1 pt-2">
            <Skeleton className="h-3 w-12 sm:w-16 bg-white/5" />
            <Skeleton className="h-4 w-10 sm:h-5 sm:w-12 bg-white/5" />
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 sm:gap-3 flex-1">
          <Skeleton className="h-12 w-12 sm:h-16 sm:w-16 rounded-lg bg-white/5" />
          <Skeleton className="h-3 w-16 sm:h-4 sm:w-20 bg-white/5" />
        </div>
      </div>
    </Card>
  );
};

export default AccuratePredictionCardSkeleton;
