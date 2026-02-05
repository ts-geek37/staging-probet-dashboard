"use client";

import { FC } from "react";

import { NoData, SkeletonCardLoader } from "@/components";
import { Card, CardContent } from "@/components/ui/card";
import { MatchDetailView } from "@/types/matches";

import { StatsRow } from "../../components";
import useMatchDetail from "../../hooks/useMatchDetail";

interface Props {
  matchId: number;
}

const MatchStatsTab: FC<Props> = ({ matchId }) => {
  const { data, isLoading } = useMatchDetail(matchId, MatchDetailView.STATS);

  if (isLoading) return <SkeletonCardLoader />;
  if (!data || data.teams.length < 2)
    return <NoData message="Stats not available" />;

  const [homeTeam, awayTeam] = data.teams;

  const statKeys = Object.keys(homeTeam.statistics).filter(
    (key) =>
      homeTeam.statistics[key] !== null && awayTeam.statistics[key] !== null,
  );

  if (statKeys.length === 0)
    return <NoData message="No statistics available" />;

  return (
    <Card className="border border-primary-gray/20 rounded-xl text-white max-w-4xl mx-auto">
      <CardContent className="flex flex-col items-center w-full">
        <h3 className="text-base font-bold mb-4 text-white">
          Match Statistics
        </h3>

        <div className="flex justify-between w-full max-w-3xl sm:mb-4">
          <div className="text-right text-sm sm:text-base font-medium text-primary-green">
            {awayTeam.team.name}
          </div>
          <div className="text-left text-sm sm:text-base font-medium text-primary-red">
            {homeTeam.team.name}
          </div>
        </div>

        <div className="w-full max-w-3xl">
          {statKeys.map((key) => (
            <StatsRow
              key={key}
              label={key.replace(/_/g, " ")}
              away={awayTeam.statistics[key] ?? 0}
              home={homeTeam.statistics[key] ?? 0}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MatchStatsTab;
