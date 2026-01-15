import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export type MatchMode = "recent" | "upcoming";

interface MatchCardSkeletonProps {
  mode: MatchMode;
  className?: string;
}

const MatchCardSkeleton: React.FC<MatchCardSkeletonProps> = ({
  mode,
  className,
}) => {
  if (mode === "upcoming") {
    return (
      <Card
        className={cn(
          "border border-primary-green/40 rounded-none w-full",
          className,
        )}
      >
        <CardContent className="px-5 space-y-6">
          <div className="flex justify-between">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-20" />
          </div>

          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-4 w-32" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "flex rounded-none items-center justify-between gap-6 px-6 py-4 border-primary-neon/20",
        className,
      )}
    >
      <div className="flex flex-col gap-4 w-full">
        <div className="flex justify-between items-center">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-8 w-24 rounded-md" />
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>

          <Skeleton className="h-6 w-10 mx-auto" />

          <div className="flex items-center justify-end gap-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MatchCardSkeleton;
