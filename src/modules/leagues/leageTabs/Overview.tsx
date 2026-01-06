import Image from "next/image";
import React from "react";

import { ApiResponse } from "@/api/types";
import MatchListing from "@/components/MatchListing";
import { LeagueResponse } from "@/types/leagues";

import { overviewStats } from "../constant";
import { useLeagueOverview } from "../hooks";
import LeagueBanner from "../LeagueBanner";

interface Props {
  initialLeagues: ApiResponse<LeagueResponse>;
}

const Overview: React.FC<Props> = ({ initialLeagues }) => {
  const { overview, league, recentMatches } = useLeagueOverview(
    initialLeagues?.data?.league?.id ?? 0,
    initialLeagues,
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl text-white font-semibold">
              About {league?.name}
            </h2>
            <p className="text-gray-400 leading-relaxed">
              {overview?.description}
            </p>
          </div>

          <div className="grid grid-cols-2 xl:grid-cols-4 justify-center items-center gap-2 sm:gap-4">
            {overviewStats.map(({ key, label, format }) => {
              const value = overview?.[key];
              const finalValue = format ? Number(value).toFixed(2) : value;
              return (
                <div
                  key={key}
                  className="bg-slate-800 text-center border border-gray-800 rounded-lg p-3 sm:p-6"
                >
                  <div className="text-3xl font-bold text-primary-green mb-2">
                    {finalValue ?? 0}
                  </div>
                  <div className="text-sm text-gray-400">{label}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="md:col-span-1">
          <h3 className="text-lg text-white font-semibold mb-4">
            Top {overview?.top_teams?.length} Teams
          </h3>
          <div className="flex flex-col gap-2">
            {overview?.top_teams.map((team) => (
              <div
                key={team.id}
                className=" bg-slate-800 border border-gray-800 rounded-lg flex items-center justify-between p-3"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={team.logo}
                    alt={team.name}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <span className="text-white">{team.name}</span>
                </div>
                <span className="text-primary-green bg-primary-green/10 px-4 py-1 rounded-full text-sm font-semibold">
                  {team.points}pts
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <LeagueBanner banner="betting" />
      {!!recentMatches && (
        <MatchListing
          title="Recent Matches"
          matches={recentMatches}
          mode="upcoming"
        />
      )}
    </div>
  );
};

export default Overview;
