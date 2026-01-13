"use client";

import { Trophy } from "lucide-react";
import React from "react";

import { NoData, SkeletonCardLoader } from "@/components";
import { MatchDetailView, MatchListItem } from "@/types/matches";

import MatchHeadToHead from "../../components/MatchHeadtoHead";
import { useMatchDetail } from "../../hooks";

interface Props {
  match: MatchListItem;
}

const MatchHeadToHeadTab: React.FC<Props> = ({ match }) => {
  const { data, isLoading } = useMatchDetail(
    match.id,
    MatchDetailView.HEAD_TO_HEAD,
    match.teams.home.id,
    match.teams.away.id,
  );

  if (isLoading) return <SkeletonCardLoader />;
  if (!data || !data.matches || data.matches.length === 0)
    return <NoData message="No Head-to-Head data available" />;

  return (
    <div className="max-w-7xl mx-auto py-4">
      <div className="flex items-center justify-between mb-6 border-b border-primary-gray/20 pb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Trophy className="text-yellow-500 w-5 h-5" />
          Head to Head
        </h2>
        <span className="text-xs bg-primary-gray/30 px-3 py-1 rounded-full text-primary-gray">
          Last {data.matches.length} Matches
        </span>
      </div>

      <MatchHeadToHead matches={data.matches} />
    </div>
  );
};

export default MatchHeadToHeadTab;
