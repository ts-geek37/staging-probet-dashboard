import Image from "next/image";
import React from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { LeagueSummary } from "@/types/home";

interface Props {
  leagues: LeagueSummary[];
}

const TopLeaguesList: React.FC<Props> = ({ leagues }) => {
  if (!leagues.length) return null;

  return (
    <div className="space-y-3">
      {leagues.map((league) => {
        return (
          <Card
            key={league.id}
            className="overflow-hidden bg-[#12151C] border-none rounded-none py-4 mb-2"
          >
            <CardContent className="flex items-center justify-between px-5 ">
              <div className="flex items-center gap-4">
                <div className="relative w-7 h-7">
                  <Image
                    src={league.logo}
                    alt={league.name}
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="space-y-1">
                  <p className="font-medium text-white">{league.name}</p>

                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>🇬🇧</span>
                    <span>{league.country}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge className="bg-[#0f2f2a] text-primary-green py-1 font-normal text-xs lg:text-sm px-2 lg:px-4 rounded-sm">
                  10 matches
                </Badge>

                <span className="text-gray-400 text-lg">›</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default TopLeaguesList;
