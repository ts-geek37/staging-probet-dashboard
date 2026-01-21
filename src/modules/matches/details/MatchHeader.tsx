"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { MatchListItem } from "@/types/matches";

import useGeneralLiveMatches from "../../ws/hooks/useGeneralLiveMatches";

interface Props {
  match: MatchListItem;
}

const MatchHeader: React.FC<Props> = ({ match }) => {
  const router = useRouter();
  const { data: liveMatches } = useGeneralLiveMatches();

  const liveMatch = useMemo(
    () => liveMatches.find((m) => m.id === match.id),
    [liveMatches, match.id],
  );

  const currentMatch = liveMatch ?? match;

  const { league, teams, score, status } = currentMatch;

  const getMatchTime = () => {
    if (status !== "LIVE") return status;

    const period = currentMatch.live_period;
    if (!period || !period.hasTimer) return "LIVE";

    if (period.timeAdded && period.timeAdded > 0) {
      return `${period.minutes}+${period.timeAdded}'`;
    }
    return `${period.minutes}'`;
  };

  const handleClick = (e: React.MouseEvent, path: string) => {
    e.stopPropagation();
    router.push(path);
  };

  return (
    <Card className="w-full mx-auto border-primary-gray/20 text-white overflow-hidden">
      <CardContent className="flex flex-col items-center justify-center px-2 sm:px-6">
        <div
          role="button"
          tabIndex={0}
          onClick={(e) => handleClick(e, `/leagues/${league.id}`)}
          className="flex items-center gap-2 mb-2 sm:mb-6 cursor-pointer"
        >
          <Image
            src={league.logo || "/no-image.png"}
            alt={league.name}
            width={40}
            height={40}
            className="object-contain w-6 h-6 sm:w-10 sm:h-10"
          />
          <p className="text-xs sm:text-sm font-medium uppercase">
            {league.name}
          </p>
        </div>

        <div className="flex items-center justify-center w-full max-w-2xl">
          <div
            role="button"
            tabIndex={0}
            onClick={(e) => handleClick(e, `/teams/${teams.home.id}`)}
            className="flex flex-col items-center flex-1 cursor-pointer"
          >
            <Image
              src={teams.home.logo || "/no-image.png"}
              alt={teams.home.name}
              width={80}
              height={80}
              className="object-contain w-12 h-12 sm:w-20 sm:h-20 mb-2"
            />
            <span className="text-xs sm:text-lg font-bold text-center">
              {teams.home.name}
            </span>
          </div>

          <div className="flex flex-col items-center mx-4 sm:mx-12">
            <div className="text-lg sm:text-2xl md:text-4xl font-bold tracking-tighter mb-1">
              {status === "UPCOMING" ? "VS" : `${score?.home ?? 0} - ${score?.away ?? 0}`}
            </div>
            <p className="text-xs sm:text-sm font-semibold text-primary-gray capitalize">
              {getMatchTime()}
            </p>
          </div>
          <div
            role="button"
            tabIndex={0}
            onClick={(e) => handleClick(e, `/teams/${teams.away.id}`)}
            className="flex flex-col items-center flex-1 cursor-pointer"
          >
            <Image
              src={teams.away.logo || "/no-image.png"}
              alt={teams.away.name}
              width={80}
              height={80}
              className="object-contain w-12 h-12 sm:w-20 sm:h-20 mb-2"
            />
            <span className="text-xs sm:text-lg font-bold text-center truncate">
              {teams.away.name}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MatchHeader;
