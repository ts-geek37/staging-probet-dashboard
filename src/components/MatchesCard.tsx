"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

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
import { formatDate } from "@/utils";
import formatLocalTime from "@/utils/formatLocalTime";

interface MatchCardProps {
  match: MatchListItem | PlayerMatch;
  href?: string;
}

const StatusBadge: React.FC<{ status: MatchStatus | PlayerStatus }> = ({
  status,
}) => {
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
}) => (
  <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden shrink-0">
    <Image
      src={src || "/no-image.png"}
      alt={alt}
      width={20}
      height={20}
      className="object-contain w-6 h-6"
    />
  </div>
);

const TeamRow: React.FC<{
  team: MatchTeam;
  value: string | number;
}> = ({ team, value }) => (
  <div className="flex items-center justify-between gap-3">
    <Link
      href={`/teams/${team.id}`}
      onClick={(e) => e.stopPropagation()}
      className="flex items-center gap-3 min-w-0 flex-1 hover:underline"
    >
      <TeamLogo src={team.logo ?? null} alt={team.name} />
      <span className="truncate text-sm font-medium text-white">
        {team.name}
      </span>
    </Link>
    <span className="text-base font-medium text-primary-gray">{value}</span>
  </div>
);

const MatchCard: React.FC<MatchCardProps> = ({ match, href }) => {
  const { kickoff_time, league, score, status, teams, live_period } = match;
  const router = useRouter();

  const isLive = status === "LIVE";
  const isUpcoming = status === "UPCOMING";

  // Convert kickoff time to local time
  const localKickoffTime = formatLocalTime(kickoff_time);

  const homeScore = score?.home ?? 0;
  const awayScore = score?.away ?? 0;

  const getValue = (isHome: boolean) =>
    isUpcoming ? "-" : isHome ? homeScore : awayScore;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => href && router.push(href)}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <Card className="cursor-pointer h-full border border-primary-gray/20 py-3 gap-2 transition-all duration-300">
        <CardHeader className="pb-2 pt-3 px-4">
          <div className="flex items-center justify-between gap-2">
            <div
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/leagues/${league.id}`);
              }}
              role="button"
              className="flex items-center gap-2.5 flex-1 cursor-pointer hover:opacity-80 active:opacity-70"
            >
              <Image
                src={league.logo || "/no-image.png"}
                alt={league.name}
                width={25}
                height={25}
                className="object-contain w-6 h-6"
              />
              <span className="text-sm sm:text-base font-medium truncate text-white">
                {league.name}
              </span>
            </div>
            <StatusBadge status={status} />
          </div>
        </CardHeader>

        <CardContent className="pt-1 pb-3 px-4">
          <TeamRow team={teams.home} value={getValue(true)} />
          <TeamRow team={teams.away} value={getValue(false)} />

          <div className="mt-3 pt-3 border-t border-primary-gray/20 flex justify-between items-center">
            {isLive ? (
              live_period ? (
                <>
                  <span className="text-base text-primary-green font-medium">
                    {live_period.description} {live_period.minutes}
                    {"'"}
                    {live_period.timeAdded ? `+${live_period.timeAdded}'` : ""}
                  </span>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-primary-gray">
                      {localKickoffTime}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <span className="text-base text-primary-green font-medium">
                    HALF TIME
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-primary-gray">
                      {localKickoffTime}
                    </span>
                  </div>
                </>
              )
            ) : (
              <>
                <span className="text-sm text-primary-gray font-medium">
                  {formatDate(kickoff_time)}
                </span>
                <span className="text-sm text-primary-gray font-medium">
                  {formatLocalTime(kickoff_time)}
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
