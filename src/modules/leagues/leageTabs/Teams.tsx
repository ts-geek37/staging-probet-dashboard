import React from "react";

import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { useLeagueTeams } from "../hooks";
import LeagueBanner from "../LeagueBanner";
import { Card } from "@/components/ui/card";

interface Props {
  id: number;
}

const Teams: React.FC<Props> = ({ id }) => {
  const { teams, isLoading } = useLeagueTeams(id);
  return (
    <div className="flex-1 text-white flex flex-col gap-12">
      <div className="space-y-4 text-white">
        <h2 className="text-xl font-semibold">Teams</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-10">
          {isLoading
            ? Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-3 rounded-lg bg-[#1a1a1a] p-6"
                >
                  <Skeleton className="h-16 w-16 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))
            : teams.map((team, index) => (
                <Card
                  key={index}
                  className="group flex flex-col items-center gap-3 rounded-lg bg-slate-800 hover:border-primary-green border border p-6"
                >
                  <div className="relative h-16 w-16">
                    <Image
                      src={team.logo}
                      alt={team.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-sm font-medium text-white group-hover:text-primary-green">
                    {team.name}
                  </span>
                </Card>
              ))}
        </div>
      </div>
      <LeagueBanner banner="champions" />
    </div>
  );
};

export default Teams;
