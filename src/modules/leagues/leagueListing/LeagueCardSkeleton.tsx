import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const LeagueCardSkeleton: React.FC = () => {
  return (
    <Card className="group bg-slate-900 border-gray-200 transition-colors">
      <CardContent className="flex flex-col gap-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-full" />

            <div className="space-y-1.5">
              <Skeleton className="h-4 w-36" />
              <div className="flex items-center gap-1.5">
                <Skeleton className="h-3 w-4 rounded-sm" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          </div>

          <Skeleton className="w-5 h-5 rounded" />
        </div>

        <Skeleton className="h-3 w-24 self-end" />
      </CardContent>
    </Card>
  );
};

export default LeagueCardSkeleton;
