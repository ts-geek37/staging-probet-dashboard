"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MatchDetailView } from "@/types/matches";
import { useMatchDetail } from "../../hooks";

interface Props {
  matchId: number;
}

const StatRow = ({ label, home, away }: { label: string; home: number; away: number }) => {
  const total = home + away;
  const homeWidth = total > 0 ? (home / total) * 100 : 0;
  const awayWidth = total > 0 ? (away / total) * 100 : 0;

  return (
    <div className="flex items-center justify-between w-full gap-4 py-2">
      {/* Home Value & Bar (Grows from center to left) */}
      <div className="flex items-center flex-1 gap-4">
        <span className="text-sm font-bold w-6">{home}</span>
        <div className="relative h-1.5 w-full bg-[#1A1D23] rounded-full overflow-hidden">
          <div className="flex justify-end h-full w-full">
            <div
              className="h-full bg-primary-green "
              style={{ width: `${homeWidth}%` }}
            />
          </div>
        </div>
      </div>

      {/* Statistic Label */}
      <span className="text-[11px] uppercase font-semibold text-[#4B5563] w-28 text-center shrink-0 tracking-wider">
        {label}
      </span>

      {/* Away Bar & Value (Grows from center to right) */}
      <div className="flex items-center flex-1 gap-4">
        <div className="relative h-1.5 w-full bg-[#1A1D23] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#EF4444] rounded-full transition-all duration-700"
            style={{ width: `${awayWidth}%` }}
          />
        </div>
        <span className="text-sm font-bold w-6 text-right">{away}</span>
      </div>
    </div>
  );
};

const MatchStatsTab: React.FC<Props> = ({ matchId }) => {
  const { data, isLoading, error } = useMatchDetail(matchId, MatchDetailView.STATS);

  if (isLoading) return <p className="text-center py-10 text-gray-400">Loading stats…</p>;
  if (error || !data || !("statistics" in data)) return <p className="text-center py-10 text-gray-400">No stats available</p>;

  // Map the array data: index 0 is Home, index 1 is Away
  const statsArray = data.statistics as any[];
  const homeTeam = statsArray[0] || {};
  const awayTeam = statsArray[1] || {};

  // Define the rows to display based on your JSON keys
  const displayStats = [
    { label: "Possession", home: homeTeam.possession, away: awayTeam.possession },
    { label: "Shots on Target", home: homeTeam.shots_on_target, away: awayTeam.shots_on_target },
    // Add other fields here as they appear in your API (e.g., homeTeam.shots, homeTeam.corners)
  ];

  return (
    <Card className="bg-[#0B0E14] border border-[#1A1D23] rounded-xl text-white">
      <CardContent className="flex flex-col items-center py-8 px-6">
        <h3 className="text-sm font-bold mb-10 text-gray-100 uppercase tracking-widest">
          Match Statistics
        </h3>

        <div className="w-full space-y-4 max-w-3xl">
          {displayStats.map((stat, index) => (
            <StatRow
              key={index}
              label={stat.label}
              home={stat.home || 0}
              away={stat.away || 0}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MatchStatsTab;
