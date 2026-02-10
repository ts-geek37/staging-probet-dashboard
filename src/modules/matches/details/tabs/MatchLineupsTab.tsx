"use client";

import { Shuffle, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

import { NoData, SkeletonCardLoader } from "@/components";
import { cn } from "@/lib/utils";
import { MatchDetailView, MatchLineupsResponse } from "@/types/matches";

import { PlayerListCard } from "../../components";
import { useMatchDetail } from "../../hooks";

interface Props {
  matchId: number;
}

const MatchLineupsTab: React.FC<Props> = ({ matchId }) => {
  const router = useRouter();
  const { data, isLoading } = useMatchDetail(matchId, MatchDetailView.LINEUPS);
  const { data: overviewData } = useMatchDetail(
    matchId,
    MatchDetailView.OVERVIEW,
  );

  const homeTeamId = overviewData?.teams?.home?.id ?? -1;

  if (isLoading) return <SkeletonCardLoader />;
  if (!data) return <NoData message="Lineups not available" />;

  const { teams } = data as MatchLineupsResponse;
  if (!teams || teams.length < 2) {
    return <NoData message="Lineups not available" />;
  }

  // Sort teams so Home team (matching homeTeamId) is first
  const sortedTeams = [...teams].sort((a, b) => {
    if (a.team.id === homeTeamId) return -1;
    if (b.team.id === homeTeamId) return 1;
    return 0;
  });

  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
      {sortedTeams.slice(0, 2).map((team) => {
        const isHome = team.team.id === homeTeamId;

        return (
          <div key={team.team.id} className="space-y-4">
            <div className="rounded-xl border border-primary-gray/20 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">
                  {team.team.name}
                </h3>

                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full text-white font-bold",
                    isHome ? "bg-primary-green" : "bg-primary-red",
                  )}
                >
                  {team.starting_xi.length}
                </div>
              </div>
            </div>

            <PlayerListCard
              title="Starting XI"
              icon={Users}
              players={team.starting_xi}
              onPlayerClick={(id) => router.push(`/players/${id}`)}
              maxHeightClassName="max-h-[320px]"
              headerClassName={cn(
                "bg-gradient-to-r",
                isHome
                  ? "from-primary-green/10 to-primary-green/5"
                  : "from-primary-red/10 to-primary-red/5",
              )}
              itemClassName={cn(
                isHome
                  ? "hover:bg-primary-green/10"
                  : "hover:bg-primary-red/10",
              )}
              numberClassName={cn(
                "text-white font-bold",
                isHome ? "bg-primary-green" : "bg-primary-red",
              )}
            />

            <PlayerListCard
              title="Substitutes"
              icon={Shuffle}
              players={team.substitutes}
              onPlayerClick={(id) => router.push(`/players/${id}`)}
              headerClassName="bg-gradient-to-r from-white/5 to-white/[0.02] px-5 py-4"
              itemClassName="py-2 hover:bg-white/5"
              numberClassName="bg-white/10 text-white/80"
            />
          </div>
        );
      })}
    </div>
  );
};

export default MatchLineupsTab;
