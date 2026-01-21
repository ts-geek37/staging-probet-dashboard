"use client";

import Image from "next/image";
import React from "react";

import { SelectField } from "@/components/form";
import { Card, CardContent } from "@/components/ui/card";

interface SeasonOverviewProps {
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
  selectedSeasonId: number;
  OnSeasonChange: (seasonId: number) => void;
  seasonOptions: { value: number; label: string }[];
}

const SeasonOverview: React.FC<SeasonOverviewProps> = ({
  team,
  jersey_number,
  position,
  selectedSeasonId,
  OnSeasonChange,
  seasonOptions,
}) => {
  return (
    <Card className="rounded-xl border py-0 border-primary-gray/20">
      <CardContent className="py-4 flex max-mobile:flex-col gap-4 sm:items-center justify-between">
        <div className="flex items-center gap-4">
          {team?.logo && (
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg p-2">
              <Image
                src={team.logo}
                alt={team.name}
                width={64}
                height={64}
                className="h-full w-full object-contain"
              />
            </div>
          )}

          <div className="space-y-1">
            {team && (
              <p className="text-base font-semibold leading-none text-white">
                {team.name}
                <span className="inline-flex  ml-2 items-center rounded-md border border-primary-gray/30 px-2 py-0.5 text-xs font-medium text-white">
                  #{jersey_number}
                </span>
              </p>
            )}

            {position?.name && (
              <p className="text-sm text-primary-gray">{position.name}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <SelectField
            options={seasonOptions}
            value={selectedSeasonId}
            onChange={(str) => OnSeasonChange(Number(str))}
            className="w-"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SeasonOverview;
