import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { LeagueStanding } from "@/types/leagues";

interface StandingCardProps {
  row: LeagueStanding;
}

export const StandingCard: React.FC<StandingCardProps> = ({ row }) => {
  const router = useRouter();

  return (
    <Card
      key={row?.team?.id}
      className={cn(
        "border-gray-800 h-full hover:border-primary-green transition-all group bg-slate-900/40",
      )}
    >
      <CardContent className="flex-1 flex flex-col h-full px-4 gap-3 py-4">
        <div className="flex items-start justify-between">
          <div className="relative size-16">
            <Image
              src={row?.team?.logo || "/no-image.png"}
              alt={row?.team?.name}
              fill
              className="object-contain rounded-full"
            />
          </div>

          <Badge
            variant="secondary"
            className="text-sm font-medium bg-slate-800 text-gray-300 group-hover:bg-primary-green group-hover:text-white transition-colors"
          >
            #{row?.position}
          </Badge>
        </div>

        <div className="flex items-start justify-between gap-3">
          <h3 className="sm:text-lg font-medium text-white leading-tight line-clamp-2 group-hover:text-primary-green transition-colors">
            {row?.team?.name}
          </h3>

          <div className="flex items-baseline gap-1 shrink-0">
            <span className="text-xl font-bold text-primary-green">
              {row?.points}
            </span>
            <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
              pts
            </span>
          </div>
        </div>
        <Button
          variant="green"
          className="mt-auto"
          onClick={() => router.push(`/teams/${row?.team?.id}`)}
        >
          View
        </Button>
      </CardContent>
    </Card>
  );
};
