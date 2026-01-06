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

      <div className="grid gap-8 md:gap-12 lg:gap-16 md:grid-cols-[2fr_1fr]">
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Scoring Statistics</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="bg-slate-800 p-4 border-none flex justify-between items-center">
              <span className="text-gray-400">Home Goals %</span>
              <span className="text-xl font-bold text-primary-green">
                {stats?.scoring?.home_goals_percentage ?? 0}%
              </span>
            </Card>
            <Card className="bg-slate-800 p-4 border-none flex justify-between items-center">
              <span className="text-gray-400">Away Goals %</span>
              <span className="text-xl font-bold text-primary-green">
                {stats?.scoring?.away_goals_percentage ?? 0}%
              </span>
            </Card>
            <Card className="bg-slate-800 p-4 border-none flex justify-between items-center">
              <span className="text-gray-400">Over 2.5 %</span>
              <span className="text-xl font-bold text-primary-green">
                {stats?.scoring?.over_25_percentage ?? 0}%
              </span>
            </Card>
            <Card className="bg-slate-800 p-4 border-none flex justify-between items-center">
              <span className="text-gray-400">Under 2.5 %</span>
              <span className="text-xl font-bold text-primary-green">
                {stats?.scoring?.under_25_percentage ?? 0}%
              </span>
            </Card>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Discipline</h3>
          <div className="grid grid-cols-1 gap-4">
            <Card className="bg-slate-800 p-4 border-none flex justify-between items-center">
              <span className="text-gray-400">Avg Yellow Cards</span>
              <span className="text-xl font-bold text-yellow-500">
                {stats?.discipline?.average_yellow_cards ?? 0}
              </span>
            </Card>
            <Card className="bg-slate-800 p-4 border-none flex justify-between items-center">
              <span className="text-gray-400">Avg Red Cards</span>
              <span className="text-xl font-bold text-red-500">
                {stats?.discipline?.average_red_cards ?? 0}
              </span>
            </Card>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <LeagueBanner banner="betting" />
      </div>
    </div>
  );
};

export default Stats;
