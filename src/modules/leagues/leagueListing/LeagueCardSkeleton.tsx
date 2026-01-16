import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const LeagueCardSkeleton: React.FC = () => {
  return (
    <Card className="relative h-[140px] w-full overflow-hidden border-none bg-[#0a0e17] rounded-xl p-4 flex flex-col justify-between">
      <Skeleton className="size-8 rounded-full bg-slate-800/50" />

      <div className="space-y-2">
        <Skeleton className="h-6 w-3/4 bg-slate-800/50" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-3 w-5 rounded-[2px] bg-slate-800/50" />
          <Skeleton className="h-3 w-20 bg-slate-800/50" />
        </div>
      </div>
    </Card>
  );
};

export default LeagueCardSkeleton;
