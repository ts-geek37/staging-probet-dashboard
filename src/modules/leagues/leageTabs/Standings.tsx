import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { useLeagueStandings } from "../hooks";
import LeagueBanner from "../LeagueBanner";

interface Props {
  id: number;
}

const Standings: React.FC<Props> = ({ id }) => {
  const { standings } = useLeagueStandings(id);
  const router = useRouter();

  return (
    <div className="flex-1 text-white flex flex-col gap-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {standings?.map((row) => (
          <Card
            key={row?.team?.id}
            className={cn(
              "border-gray-800 h-full hover:border-primary-green transition-all group",
            )}
          >
            <CardContent className="flex-1 flex flex-col h-full px-4 gap-3">
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
        ))}
      </div>

      <LeagueBanner banner="champions" />
    </div>
  );
};

export default Standings;
