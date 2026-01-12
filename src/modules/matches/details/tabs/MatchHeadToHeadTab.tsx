"use client";

import { Trophy } from "lucide-react";
import React from "react";

import { NoData, SkeletonCardLoader } from "@/components";
import { MatchEventsResponse, MatchDetailView } from "@/types/matches";

import MatchHeadToHead from "../../components/MatchHeadtoHead";

interface Props {
  matchId: number;
}

const MatchHeadToHeadTab: React.FC<Props> = ({ matchId }) => {
  return (
    <div className="max-w-7xl mx-auto py-4">
      <div className="flex items-center justify-between mb-6 border-b border-primary-gray/20 pb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Trophy className="text-yellow-500 w-5 h-5" />
          Head to Head
        </h2>
        <span className="text-xs bg-primary-gray/30 px-3 py-1 rounded-full text-primary-gray">
          Last 3 Matches
        </span>
      </div>

      <MatchHeadToHead />
    </div>
  );
};

export default MatchHeadToHeadTab;
