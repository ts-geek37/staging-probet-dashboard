"use client";

import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MatchDetailView, MatchLineupsResponse } from "@/types/matches";

import { useMatchDetail } from "../../hooks";
import { NoData, SkeletonCardLoader } from "@/components";

interface Props {
  matchId: number;
}

const MatchLineupsTab: React.FC<Props> = ({ matchId }) => {
  const { data, isLoading } = useMatchDetail(matchId, MatchDetailView.LINEUPS);

  if (isLoading) return <SkeletonCardLoader/>;
  if (!data) return <NoData message="Lineups not available" />;

  const { lineups, home_team, away_team } = data as MatchLineupsResponse;

  const homeLineups = lineups.filter((l) => l.team_id === home_team.id);
  const awayLineups = lineups.filter((l) => l.team_id === away_team.id);

  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
      <Card className="bg-[#14181F] border-primary-gray/20 shadow-lg gap-3">
        <CardHeader className="px-3 sm:px-6">
          <CardTitle className="text-sm font-semibold text-white">
            {home_team.name}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3 px-3 sm:px-6">
          {homeLineups.map((lineup, idx) =>
            lineup.starting_xi.map((player, index) => (
              <div
                key={`${lineup.team_id}-${player.id}-${index}-${idx}`}
                className="flex items-center gap-3 rounded-lg bg-[#232529] px-2 py-2"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-green text-xs ">
                  {index + 1}
                </span>
                <p className="text-sm text-white">{player.name}</p>
              </div>
            )),
          )}
        </CardContent>
      </Card>
      <Card className="bg-[#14181F] border-primary-gray/20 shadow-lg gap-3">
        <CardHeader className="px-3 sm:px-6">
          <CardTitle className="text-sm font-semibold text-white">
            {away_team.name}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3 px-3 sm:px-6">
          {awayLineups.map((lineup, idx) =>
            lineup.starting_xi.map((player, index) => (
              <div
                key={`${lineup.team_id}-${player.id}-${index}-${idx}`}
                className="flex items-center gap-3 rounded-lg bg-[#232529] px-3 py-2"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-red text-xs font-semibold text-white">
                  {index + 1}
                </span>
                <p className="text-sm text-white">{player.name}</p>
              </div>
            )),
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MatchLineupsTab;
