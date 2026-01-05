"use client";

import React from "react";

import { NoData, SkeletonCardLoader } from "@/components";
import { Card, CardContent } from "@/components/ui/card";
import { MatchDetailView } from "@/types/matches";

import StatRow from "../../components/StatRow";
import { useMatchDetail } from "../../hooks";

interface Props {
  matchId: number;
}

interface MatchStatsResponse {
  statistics: Record<string, number>[];
}

const MatchStatsTab: React.FC<Props> = ({ matchId }) => {
  const { data, isLoading } = useMatchDetail(matchId, MatchDetailView.STATS);

  if (isLoading) return <SkeletonCardLoader />;
  if (!data) return <NoData message="Stats data not available" />;

  const statsData = data as MatchStatsResponse;

  if (!statsData.statistics || statsData.statistics.length < 2)
    return <NoData message="Stats not available" />;

  const homeTeam = statsData.statistics[0] ?? {};
  const awayTeam = statsData.statistics[1] ?? {};

  const statKeys = Object.keys(homeTeam).filter(
    (key) => key !== "team_id" && typeof homeTeam[key] === "number",
  );

  if (statKeys.length === 0)
    return <NoData message="No statistics available" />;

  return (
    <Card className="bg-[#14181F]  border border-primary-gray/20 rounded-xl text-white w-full">
      <CardContent className="flex flex-col items-center w-full">
        <h3 className="text-sm font-bold mb-6 text-white">Match Statistics</h3>

        <div className="w-full space-y-4 max-w-3xl">
          {statKeys.map((key) => (
            <StatRow
              key={key}
              label={key.replace(/_/g, " ")}
              home={homeTeam[key] ?? 0}
              away={awayTeam[key] ?? 0}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MatchStatsTab;
