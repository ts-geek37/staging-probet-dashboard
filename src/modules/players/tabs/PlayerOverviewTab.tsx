"use client";

import { Calendar, Footprints, Ruler, Scale } from "lucide-react";
import Image from "next/image";
import React from "react";

import { ApiResponse } from "@/api/types";
import { PlayerOverviewResponse } from "@/types/players";

import { OverviewCard } from "../components";
import { usePlayerOverview } from "../hooks";

interface Props {
  initialData: ApiResponse<PlayerOverviewResponse>;
}

const PlayerOverviewTab: React.FC<Props> = ({ initialData }) => {
  const { player, isLoading } = usePlayerOverview(
    initialData.data?.id ?? 0,
    initialData,
  );

  if (isLoading || !player) return null;

  return (
    <div className="grid grid-cols-1 gap-6 py-6 lg:grid-cols-2">
      <OverviewCard title="Personal Information">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Full Name</span>
          <span className="text-white">{player.full_name}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Nationality</span>
          <span className="flex items-center gap-2 text-white">
            🇧🇪 {player.nationality}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Date of Birth</span>
          <span className="text-white">{player.date_of_birth}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-muted-foreground">
            <Calendar size={14} />
            Age
          </span>
          <span className="text-white">{player.age} years</span>
        </div>
      </OverviewCard>

      <OverviewCard title="Physical">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-muted-foreground">
            <Ruler size={14} />
            Height
          </span>
          <span className="text-white">{player.height} cm</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-muted-foreground">
            <Scale size={14} />
            Weight
          </span>
          <span className="text-white">{player.weight} kg</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-muted-foreground">
            <Footprints size={14} />
            Preferred Foot
          </span>
          <span className="text-white">{player.preferred_foot}</span>
        </div>
      </OverviewCard>

      <OverviewCard title="Current Team">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5">
            <Image
              src="/football.png"
              alt={player.team.name}
              width={36}
              height={36}
              className="h-9 w-9 object-contain"
            />
          </div>

          <div>
            <p className="font-medium text-white">{player.team.name}</p>
            <p className="text-muted-foreground">🇪🇸 Spain</p>
          </div>
        </div>
      </OverviewCard>

      <OverviewCard title="Contract">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Market Value</span>
          <span className="text-white">{player.market_value ?? "N/A"}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Contract Until</span>
          <span className="text-white">
            {player.contract_end_year ?? "N/A"}
          </span>
        </div>
      </OverviewCard>
    </div>
  );
};

export default PlayerOverviewTab;
