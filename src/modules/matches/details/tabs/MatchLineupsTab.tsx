"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { NoData, SkeletonCardLoader } from "@/components";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MatchDetailView, MatchLineupsResponse } from "@/types/matches";

import { useMatchDetail } from "../../hooks";

interface Props {
  matchId: number;
}

const MatchLineupsTab: React.FC<Props> = ({ matchId }) => {
  const router = useRouter();
  const { data, isLoading } = useMatchDetail(matchId, MatchDetailView.LINEUPS);

  if (isLoading) return <SkeletonCardLoader />;
  if (!data) return <NoData message="Lineups not available" />;

  const { teams } = data as MatchLineupsResponse;
  if (!teams || teams.length < 2) {
    return <NoData message="Lineups not available" />;
  }

  const badgeColors = [
    "bg-primary-green text-black",
    "bg-primary-red text-white",
  ];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {teams.slice(0, 2).map((team, teamIndex) => (
        <div key={team.team.id} className="space-y-3">
          <h3 className="px-1 text-sm font-semibold text-white">
            {team.team.name}
            {team.formation && (
              <span className="ml-2 text-xs text-gray-400">
                ({team.formation})
              </span>
            )}
          </h3>

          <Card className=" border-primary-gray/20 shadow-lg">
            <CardHeader className="px-3 sm:px-6">
              <CardTitle className="text-xs font-semibold text-gray-300">
                Starting XI
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-2 px-3 sm:px-6">
              {team.starting_xi.map((player) => (
                <div
                  key={player.id}
                  onClick={() => router.push(`/players/${player.id}`)}
                  className="flex cursor-pointer items-center gap-3 rounded-lg bg-[#232529] px-3 py-2 transition hover:bg-[#2d3035]"
                >
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${badgeColors[teamIndex]}`}
                  >
                    {player.number ?? "-"}
                  </span>
                  <p className="text-sm text-white">{player.name}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {team.substitutes.length > 0 && (
            <Card className="border-primary-gray/20 shadow-lg">
              <CardHeader className="px-3 sm:px-6">
                <CardTitle className="text-xs font-semibold text-gray-300">
                  Substitutes
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-2 px-3 sm:px-6">
                {team.substitutes.map((player) => (
                  <div
                    key={player.id}
                    onClick={() => router.push(`/players/${player.id}`)}
                    className="flex cursor-pointer items-center gap-3 rounded-lg bg-[#232529] px-3 py-2 transition hover:bg-[#2d3035]"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white">
                      {player.number ?? "-"}
                    </span>
                    <p className="text-sm text-white">{player.name}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      ))}
    </div>
  );
};

export default MatchLineupsTab;
