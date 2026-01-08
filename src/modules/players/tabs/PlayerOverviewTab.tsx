"use client";

import Image from "next/image";
import React from "react";

import { ApiResponse } from "@/api/types";
import { PlayerProfileResponse } from "@/types/players";

import { OverviewCard } from "../components";
import { usePlayerOverview } from "../hooks";

interface Props {
  initialData: ApiResponse<PlayerProfileResponse>;
}

const PlayerOverviewTab: React.FC<Props> = ({ initialData }) => {
  const { player, personalInfoRows, physicalRows, isLoading } =
    usePlayerOverview(initialData.data?.id ?? 0, initialData);

  if (isLoading || !player) return null;

  return (
    <div className="grid grid-cols-1 gap-6 py-6 lg:grid-cols-2">
      <OverviewCard title="Personal Information">
        {personalInfoRows
          .filter((row) => !!row.value)
          .map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-muted-foreground">
                {Icon && <Icon size={14} />}
                {label}
              </span>
              <span className="text-white">{value}</span>
            </div>
          ))}
      </OverviewCard>

      <OverviewCard title="Physical">
        {physicalRows
          .filter((row) => !!row.value)
          .map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-muted-foreground">
                {Icon && <Icon size={14} />}
                {label}
              </span>
              <span className="text-white">{value}</span>
            </div>
          ))}
      </OverviewCard>

      <OverviewCard title="Teams">
        {player.teams?.length ? (
          player.teams.slice(0, 3).map((team) => (
            <div key={team?.id} className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5">
                <Image
                  src={team.logo || "/football.png"}
                  alt={team.name}
                  width={36}
                  height={36}
                  className="h-9 w-9 object-contain"
                />
              </div>

              <p className="font-medium text-white">{team.name}</p>
            </div>
          ))
        ) : (
          <span className="text-muted-foreground text-sm italic">
            No team information available
          </span>
        )}
      </OverviewCard>
    </div>
  );
};

export default PlayerOverviewTab;
