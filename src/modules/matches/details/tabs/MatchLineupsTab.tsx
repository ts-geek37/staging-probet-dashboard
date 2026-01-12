"use client";

import { Users, List, ArrowRight, Shuffle } from "lucide-react";
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

  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
      {teams.slice(0, 2).map((team, teamIndex) => (
        <div key={team.team.id} className="space-y-3 sm:space-y-4">
          <div className="relative overflow-hidden rounded-lg sm:rounded-xl border border-primary-gray/20 p-3 sm:p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="mb-1 text-base sm:text-xl font-bold text-white">
                  {team.team.name}
                </h3>

                {team.formation && (
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-md sm:rounded-lg border border-white/20 bg-white/10 px-2 sm:px-3 py-0.5 sm:py-1">
                    <List className="h-3 w-3 sm:h-4 sm:w-4 text-white/70" />
                    <span className="text-xs sm:text-sm font-semibold text-white/90">
                      {team.formation}
                    </span>
                  </div>
                )}
              </div>

              <div
                className={`flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full text-sm sm:text-base font-bold ${teamIndex === 0 ? "bg-primary-green text-black" : "bg-primary-red text-white"}`}
              >
                {team.starting_xi.length}
              </div>
            </div>
          </div>

          <Card className="overflow-hidden border border-primary-gray/20">
            <CardHeader
              className={`bg-gradient-to-r px-3 sm:px-5 py-3 sm:py-4 ${teamIndex === 0 ? "from-primary-green/10 to-primary-green/5" : "from-primary-red/10 to-primary-red/5"}`}
            >
              <div className="flex items-center justify-between">
                <CardTitle
                  className={`flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold uppercase tracking-wide ${teamIndex === 0 ? "text-primary-green" : "text-primary-red"}`}
                >
                  <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="hidden sm:inline">Starting XI</span>
                  <span className="sm:hidden">Starting</span>
                </CardTitle>
                <span className="text-[10px] sm:text-xs font-medium text-white/50">
                  {team.starting_xi.length} Players
                </span>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <div className="custom-scrollbar max-h-[280px] sm:max-h-[320px] overflow-y-auto">
                <div className="divide-y divide-white/5">
                  {team.starting_xi.map((player) => (
                    <div
                      key={player.id}
                      onClick={() => router.push(`/players/${player.id}`)}
                      className={`group flex cursor-pointer items-center gap-2 sm:gap-4 border-l-2 border-transparent px-3 sm:px-5 py-2.5 sm:py-3.5 transition-all hover:bg-gradient-to-r ${teamIndex === 0 ? "from-primary-green/10 to-primary-green/5 hover:border-primary-green/50" : "from-primary-red/10 to-primary-red/5 hover:border-primary-red/50"}`}
                    >
                      <div
                        className={`flex h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0 items-center justify-center rounded-md sm:rounded-lg text-sm sm:text-base font-bold transition-transform group-hover:scale-110 ${teamIndex === 0 ? "bg-primary-green text-black" : "bg-primary-red text-white"}`}
                      >
                        {player.number ?? "-"}
                      </div>

                      <p className="flex-1 truncate text-sm sm:text-base font-semibold text-white">
                        {player.name}
                      </p>

                      <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-white/20 transition-all group-hover:translate-x-1 group-hover:text-white/60" />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {team.substitutes.length > 0 && (
            <Card className="overflow-hidden border border-primary-gray/20">
              <CardHeader className="border-b border-white/10 bg-gradient-to-r from-white/5 to-white/[0.02] px-3 sm:px-5 py-3 sm:py-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold uppercase tracking-wide text-white/70">
                    <Shuffle className="h-4 w-4 sm:h-5 sm:w-5" />
                    Substitutes
                  </CardTitle>
                  <span className="text-[10px] sm:text-xs font-medium text-white/40">
                    {team.substitutes.length} Players
                  </span>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                <div className="custom-scrollbar max-h-[240px] sm:max-h-[280px] overflow-y-auto">
                  <div className="divide-y divide-white/5">
                    {team.substitutes.map((player) => (
                      <div
                        key={player.id}
                        onClick={() => router.push(`/players/${player.id}`)}
                        className="group flex cursor-pointer items-center gap-2 sm:gap-4 border-l-2 border-transparent px-3 sm:px-5 py-2 sm:py-3 transition-all hover:border-white/30 hover:bg-white/5"
                      >
                        <div className="flex h-7 w-7 sm:h-9 sm:w-9 flex-shrink-0 items-center justify-center rounded-md sm:rounded-lg bg-white/10 text-xs sm:text-sm font-bold text-white/80 transition-all group-hover:scale-105 group-hover:bg-white/20">
                          {player.number ?? "-"}
                        </div>

                        <p className="flex-1 truncate text-xs sm:text-sm font-medium text-white/70 group-hover:text-white">
                          {player.name}
                        </p>

                        <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 text-white/15 transition-all group-hover:translate-x-1 group-hover:text-white/50" />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      ))}
    </div>
  );
};

export default MatchLineupsTab;
