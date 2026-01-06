"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const PredictionCardSkeleton = () => {
  return (
    <Card className="text-white p-4 border-none gap-3 min-h-[175px] sm:min-h-[200px] flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-24 bg-gray-800" />
        <Skeleton className="h-4 w-12 bg-gray-800" />
      </div>

      <div className="flex flex-col gap-4 py-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-1">
            <Skeleton className="size-7 rounded-full bg-gray-800" />
            <Skeleton className="h-4 flex-1 bg-gray-800" />
          </div>
          <div className="flex items-center gap-2 flex-1 justify-end">
            <Skeleton className="h-4 flex-1 bg-gray-800" />
            <Skeleton className="size-7 rounded-full bg-gray-800" />
          </div>
        </div>
      </div>

      <div className="pt-2">
        <Skeleton className="h-10 w-full rounded-lg bg-gray-800" />
      </div>
    </Card>
  );
};

export default PredictionCardSkeleton;
