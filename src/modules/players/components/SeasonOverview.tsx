"use client";

import Image from "next/image";
import React from "react";

import { Card, CardContent } from "@/components/ui/card";

interface SeasonOverviewProps {
  season: {
    id: number;
    name: string;
  };

  team: {
    id: number;
    name: string;
    logo: string | null;
  } | null;

  jersey_number: number | null;

  position: {
    id: number | null;
    name: string | null;
  };
}

const SeasonOverview: React.FC<SeasonOverviewProps> = ({
  season,
  team,
  jersey_number,
  position,
}) => {
  return (
    <Card className="rounded-xl border border-primary-gray/20 bg-[#14181F]">
      <CardContent className="p-6">
        <div className="flex items-center gap-6">
          {/* Team Logo */}
          {team?.logo && (
            <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-[#181d25] p-3">
              <Image
                src={team.logo}
                alt={team.name}
                width={64}
                height={64}
                className="h-full w-full object-contain"
              />
            </div>
          )}

          <div className="flex-1 space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Season</p>
              <p className="text-xl font-semibold text-white">{season.name}</p>
            </div>

            <div className="flex gap-6">
              {team && (
                <div>
                  <p className="text-sm text-muted-foreground">Team</p>
                  <p className="font-medium text-white">{team.name}</p>
                </div>
              )}

              {position?.name && (
                <div>
                  <p className="text-sm text-muted-foreground">Position</p>
                  <p className="font-medium text-white">{position.name}</p>
                </div>
              )}

              {jersey_number != null && (
                <div>
                  <p className="text-sm text-muted-foreground">Jersey</p>
                  <p className="font-medium text-white">#{jersey_number}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SeasonOverview;
