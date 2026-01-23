"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const AccuratePredictionCardSkeleton: React.FC = () => {
  return (
    <Card className="relative overflow-hidden border border-white/10 bg-[#0E1320]/60 backdrop-blur-xl p-6 h-full space-y-8">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-32 bg-white/5" />
        <Skeleton className="h-4 w-20 bg-white/5" />
      </div>

      <div className="grid grid-cols-3 items-center gap-4">
        <div className="flex flex-col items-center gap-3">
          <Skeleton className="h-16 w-16 rounded-full bg-white/5" />
          <Skeleton className="h-4 w-20 bg-white/5" />
        </div>
        <div className="flex flex-col items-center">
          <Skeleton className="h-3 w-8 bg-white/5" />
        </div>
        <div className="flex flex-col items-center gap-3">
          <Skeleton className="h-16 w-16 rounded-full bg-white/5" />
          <Skeleton className="h-4 w-20 bg-white/5" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-20 rounded-xl bg-white/5" />
        <Skeleton className="h-20 rounded-xl bg-white/5" />
      </div>

      <div className="pt-4 border-t border-white/5 flex justify-center">
        <Skeleton className="h-3 w-3/4 bg-white/5" />
      </div>
    </Card>
  );
};

export default AccuratePredictionCardSkeleton;
