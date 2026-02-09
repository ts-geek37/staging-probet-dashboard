"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  MatchListItem,
  MatchListStatus,
  MatchStatus,
  MatchTeam,
} from "@/types/matches";
import {
  MatchListItem as PlayerMatch,
  MatchStatus as PlayerStatus,
} from "@/types/players";
import { convertToLocalTime } from "@/utils/convertTime";
import { getCountdownData } from "@/utils/formatCountdown";
import { cn } from "@/lib/utils";

interface MatchCardProps {
  match: MatchListItem | PlayerMatch;
  href?: string;
}

const StatusBadge: React.FC<{
  status: MatchStatus | PlayerStatus;
  countdown: string | null;
}> = ({ status, countdown }) => {
  if ((status === "UPCOMING" || status === "PROBLEM") && countdown) {
    return (
      <Badge
        variant="outline"
        className="bg-primary-yellow/10 border-primary-yellow/20 text-primary-yellow font-bold animate-pulse px-3 py-2 text-sm font-mono"
      >
        <span className="mr-1.5 flex h-1.5 w-1.5 rounded-full bg-primary-yellow" />
        {countdown}
      </Badge>
    );
  }

  const variantMap: Record<MatchStatus | PlayerStatus, MatchListStatus> = {
    LIVE: MatchListStatus.LIVE,
    UPCOMING: MatchListStatus.UPCOMING,
    FINISHED: MatchListStatus.FINISHED,
    PROBLEM: MatchListStatus.UPCOMING,
    FT: MatchListStatus.FINISHED,
  };

  const labelMap: Record<MatchStatus | PlayerStatus, string> = {
    LIVE: "LIVE",
    UPCOMING: "UPCOMING",
    FINISHED: "FINISHED",
    PROBLEM: "Problem",
    FT: "FT",
  };

  return <Badge variant={variantMap[status]}>{labelMap[status]}</Badge>;
};

const TeamLogo: React.FC<{ src: string | null; alt: string }> = ({
  src,
  alt,
}) => {
  const [error, setError] = useState(false);

  return (
    <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden shrink-0">
      <Image
        src={error || !src ? "/no-image.png" : src}
        alt={alt}
        width={20}
        height={20}
        unoptimized
        onError={() => setError(true)}
        className="object-contain w-6 h-6"
      />
    </div>
  );
};

const TeamRow: React.FC<{
  team: MatchTeam;
  value: string | number;
  isWinner?: boolean;
}> = ({ team, value, isWinner }) => (
  <div className="flex items-center justify-between gap-3">
    <div className="flex items-center gap-3 min-w-0 flex-1">
      <TeamLogo src={team.logo ?? null} alt={team.name} />

      <Link
        href={`/teams/${team.id}`}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "truncate text-sm font-medium hover:underline",
          isWinner ? "text-primary-green" : "text-white"
        )}
      >
        {team.name}
      </Link>
    </div>

    <span
      className={cn(
        "text-base font-medium",
        isWinner ? "text-primary-green" : "text-primary-gray"
      )}
    >
      {value}
    </span>
  </div>
);

const MatchCard: React.FC<MatchCardProps> = ({ match, href }) => {
  const { kickoff_time, league, score, status, teams, live_period } = match;
  const router = useRouter();

  const [countdown, setCountdown] = useState<string | null>(null);
  const [leagueLogoError, setLeagueLogoError] = useState(false);

  const isLive = status === "LIVE";
  const isUpcoming = status === "UPCOMING" || status === "PROBLEM";
  const isFinished = status === "FINISHED" ;

  const localTime = convertToLocalTime(kickoff_time);

  const homeScore = score?.home ?? 0;
  const awayScore = score?.away ?? 0;

  const homeWon = isFinished && homeScore > awayScore;
  const awayWon = isFinished && awayScore > homeScore;

  const getValue = (isHome: boolean) =>
    isUpcoming ? "" : isHome ? homeScore : awayScore;

  useEffect(() => {
    if (!isUpcoming) return;

    const updateTimer = () => {
      const timeData = getCountdownData(kickoff_time);
      if (!timeData) return setCountdown(null);

      if (timeData.isStartingSoon) setCountdown("STARTING SOON");
      else if (timeData.totalMs < 900000) setCountdown(timeData.formatted);
      else setCountdown(null);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [kickoff_time, isUpcoming]);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => href && router.push(href)}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <Card className="cursor-pointer h-full border border-primary-gray/20 py-3 gap-2">
        <CardHeader className="pb-2 pt-3 px-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 flex-1 min-w-0">
              <Image
                src={
                  leagueLogoError || !league?.logo
                    ? "/no-image.png"
                    : league.logo
                }
                alt={league.name}
                width={25}
                height={25}
                unoptimized
                onError={() => setLeagueLogoError(true)}
                className="object-contain w-6 h-6"
              />

              <Link
                href={`/leagues/${league.id}`}
                onClick={(e) => e.stopPropagation()}
                className="text-sm sm:text-base font-medium text-white line-clamp-1 hover:opacity-80"
              >
                {league.name}
              </Link>
            </div>

            <StatusBadge status={status} countdown={countdown} />
          </div>
        </CardHeader>

        <CardContent className="pt-1 pb-3 px-4 space-y-1">
          <TeamRow
            team={teams.home}
            value={getValue(true)}
            isWinner={homeWon}
          />

          <TeamRow
            team={teams.away}
            value={getValue(false)}
            isWinner={awayWon}
          />

          <div className="mt-3 pt-3 border-t border-primary-gray/20 flex justify-between items-center">
            {isLive ? (
              <span className="text-base text-primary-green font-medium">
                {live_period?.description ?? "LIVE"}{" "}
                {live_period?.minutes}
                {"'"}
                {live_period?.timeAdded
                  ? `+${live_period.timeAdded}'`
                  : ""}
              </span>
            ) : (
              <>
                <span className="text-sm text-primary-gray font-medium">
                  {localTime.date}
                </span>
                <span className="text-sm text-primary-gray font-medium">
                  {localTime.time}
                </span>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MatchCard;
