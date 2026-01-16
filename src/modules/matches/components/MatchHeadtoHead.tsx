"use client";

import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MatchListItem } from "@/types/matches";

interface Props {
  matches: MatchListItem[];
}

const MatchHeadToHead: React.FC<Props> = ({ matches }) => {
  const router = useRouter();
  const onClick = (matchId: number) => {
    router.push(`/matches/${matchId}`);
  };
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
      {matches.map((match, idx) => {
        const homeLogo = match.teams.home.logo;
        const awayLogo = match.teams.away.logo;
        const dateStr = new Date(match.kickoff_time).toLocaleDateString(
          "en-US",
          {
            month: "short",
            day: "2-digit",
            year: "numeric",
          },
        );

        return (
          <Card
            key={match.id || idx}
            onClick={() => onClick(match.id)}
            className="text-white border p-0 gap-0 border-primary-gray/20 rounded-xl overflow-hidden w-full"
          >
            <div className="flex flex-wrap justify-between items-center gap-2 px-3 sm:px-4 py-2 bg-gray-950 text-[10px] sm:text-xs text-primary-gray">
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/leagues/${match.league.id}`);
                }}
                role="button"
                tabIndex={0}
                className="cursor-pointer"
              >
                {match.league.name}{" "}
                {match.season?.name ? `• ${match.season.name}` : ""}
              </span>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {dateStr}
              </div>
            </div>
            <div className="p-3 sm:p-4 flex flex-row items-center justify-between gap-4">
              <div className="flex-1 flex flex-col items-center text-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-gray/10 rounded-full flex items-center justify-center mb-1 sm:mb-2 border border-primary-gray/20 overflow-hidden">
                  {homeLogo ? (
                    <Image
                      src={homeLogo}
                      alt={match.teams.home.name}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  ) : (
                    <span className="text-[10px] font-bold">
                      {match.teams.home.name.substring(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/teams/${match.teams.home.id}`);
                  }}
                  className="cursor-pointer"
                  role="button"
                  tabIndex={0}
                >
                  {match.teams.home.name}
                </span>
              </div>
              <div className="flex flex-col items-center gap-y-2">
                <div className="text-sm sm:text-xl md:text-2xl font-black bg-primary-gray/10 px-3 sm:px-4 py-1 rounded-lg border border-primary-gray/20">
                  {match.score?.home ?? 0} - {match.score?.away ?? 0}
                </div>
                <Badge
                  variant="finished"
                  className="text-xs sm:text-sm py-1 capitalize"
                >
                  {match.status.toLowerCase()}
                </Badge>
              </div>

              <div className="flex-1 flex flex-col items-center text-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-gray/10 rounded-full flex items-center justify-center mb-1 sm:mb-2 border border-primary-gray/20 overflow-hidden">
                  {awayLogo ? (
                    <Image
                      src={awayLogo}
                      alt={match.teams.away.name}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  ) : (
                    <span className="text-[10px] font-bold">
                      {match.teams.away.name.substring(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/teams/${match.teams.away.id}`);
                  }}
                  role="button"
                  tabIndex={0}
                  className="cursor-pointer"
                >
                  {match.teams.away.name}
                </span>
              </div>
            </div>
            {match.venue?.name && (
              <div className="px-3 sm:px-4 py-2 border-t border-primary-gray/20 flex items-center gap-1 text-[10px] sm:text-xs text-primary-gray">
                <MapPin className="w-3 h-3" />
                {match.venue?.name}
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
};

export default MatchHeadToHead;
