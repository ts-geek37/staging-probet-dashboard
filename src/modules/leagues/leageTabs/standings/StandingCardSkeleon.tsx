import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const StandingCardSkeleton = () => {
  return (
    <Card className="border-gray-800 h-full bg-slate-900/40">
      <CardContent className="flex-1 flex flex-col h-full px-4 gap-3 py-4">
        <div className="flex items-start justify-between">
          <Skeleton className="size-16 rounded-full bg-gray-800" />
          <Skeleton className="h-6 w-12 bg-gray-800" />
        </div>

        <div className="flex items-start justify-between gap-3">
          <Skeleton className="h-6 w-1/2 bg-gray-800" />
          <div className="flex items-baseline gap-1">
            <Skeleton className="h-6 w-8 bg-gray-800" />
            <Skeleton className="h-3 w-6 bg-gray-800" />
          </div>
        </div>
        <Skeleton className="h-10 w-full mt-auto bg-gray-800" />
      </CardContent>
    </Card>
  );
};

export default StandingCardSkeleton;
