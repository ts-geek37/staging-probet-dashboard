"use client";

import React from "react";

import { motion } from "framer-motion";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MatchListItem, MatchListStatus, MatchStatus } from "@/types/matches";
import { formatDate, formatUtcTime } from "@/utils";
import Link from "next/link";

interface MatchCardProps {
  match: MatchListItem;
  href?: string;
  onClick?: () => void;
}

const StatusBadge: React.FC<{ status: MatchStatus }> = ({ status }) => {
  const variantMap: Record<MatchStatus, MatchListStatus> = {
    LIVE: MatchListStatus.LIVE,
    UPCOMING: MatchListStatus.UPCOMING,
    FT: MatchListStatus.FINISHED,
  };

  const labelMap: Record<MatchStatus, string> = {
    LIVE: "LIVE",
    UPCOMING: "UPCOMING",
    FT: "FINISHED",
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
  team: { name: string; logo: string | null };
  value: string | number;
}> = ({ team, value = false }) => (
  <div className="flex items-center justify-between gap-3">
    <div className="flex items-center gap-3 min-w-0 flex-1">
      <TeamLogo src={team.logo} alt={team.name} />
      <span className="truncate text-sm font-medium text-white">
        {team.name}
      </span>
    </div>
    <span className="text-base font-semibold text-white">
      {value}
    </span>
  </div>
);

const MatchCard: React.FC<MatchCardProps> = ({ match, href, onClick }) => {
  const { kickoff_time, league, score, season, status, teams } = match;

  const kickoffDate = new Date(kickoff_time);
  const formattedDate = formatDate(kickoffDate);
  const formattedTime = formatUtcTime(kickoff_time);

  const isUpcoming = status === "UPCOMING";

  const homeScore = score?.home ?? 0;
  const awayScore = score?.away ?? 0;

  const getValue = (isHome: boolean) =>
    isUpcoming ? formattedTime : isHome ? homeScore : awayScore;

  const content = (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <Card className="cursor-pointer h-full border border-primary-gray/20 bg-[#14181F] py-3 gap-2 transition-all duration-300">
        <CardHeader className="pb-2 pt-3 px-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 flex-1">
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

          <div className="mt-3 pt-3 border-t border-primary-gray/20 flex justify-between">
            <span className="text-xs text-white">
              {formattedDate} • {formattedTime}
            </span>
            {season?.name && (
              <span className="text-xs text-white truncate ml-2">
                {season.name}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  if (href) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className="block rounded-lg focus-visible:ring-2 focus-visible:ring-ring"
      >
        {content}
      </Link>
    );
  }

  return content;
};

export default MatchCard;
