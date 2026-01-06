import Image from "next/image";
import React from "react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { useLeagueStats } from "../hooks";
import LeagueBanner from "../LeagueBanner";

interface Props {
  id: number;
}

const Stats: React.FC<Props> = ({ id }) => {
  const { stats, isLoading, statsConfig } = useLeagueStats(id);

  return (
    <div className="w-full text-white flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] items-center gap-8">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Season Statistics</h2>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {isLoading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <Card
                    key={index}
                    className="flex flex-col items-center justify-center gap-2 rounded-lg border-none bg-slate-800 px-6 py-4"
                  >
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-4 w-24" />
                  </Card>
                ))
              : statsConfig.map((stat) => (
                  <Card
                    key={stat.label}
                    className="flex flex-col items-center justify-center gap-2 rounded-lg border-none bg-slate-800 px-6 py-4"
                  >
                    <span className={`text-3xl font-bold text-primary-green`}>
                      {stat.value ?? 0}
                    </span>
                    <span className="text-sm text-gray-400">{stat.label}</span>
                  </Card>
                ))}
          </div>
        </div>
        <Image
          src="/adsBg.jpg"
          alt="ads"
          width={1000}
          height={1000}
          className="w-full h-full max-h-80 object-cover"
        />
      </div>

      <div className="grid gap-8 md:gap-12 lg:gap-16 md:grid-cols-[2fr_3fr]">
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Top Scorers</h3>
          <div className="flex flex-col gap-4">
            {isLoading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg bg-slate-800 px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <div className="flex flex-col gap-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                    </div>
                    <Skeleton className="h-6 w-10 rounded-full" />
                  </div>
                ))
              : stats?.top_scorers.map((scorer, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg bg-slate-800 px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        src={scorer.team_logo_url}
                        alt={scorer.team}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <div className="flex flex-col">
                        <span className="text-lg font-medium text-white">
                          {scorer.name}
                        </span>
                        <span className="text-xs text-gray-400">
                          {scorer.team}
                        </span>
                      </div>
                    </div>
                    <Badge className="bg-primary-green/20 px-3 py-1 text-sm font-semibold text-primary-green hover:bg-primary-green/20">
                      {scorer.goals}
                    </Badge>
                  </div>
                ))}
          </div>
        </div>

        <div className="space-y-4">
          <LeagueBanner banner="betting" />
        </div>
      </div>
    </div>
  );
};

export default Stats;
