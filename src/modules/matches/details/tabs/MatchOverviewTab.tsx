"use client";

import React from "react";

import { NoData, SkeletonCardLoader } from "@/components";
import { MatchDetailView, MatchOverviewResponse } from "@/types/matches";

import MatchPrediction from "../../components/MatchPrediction";
import { useMatchDetail } from "../../hooks";

interface Props {
  matchId: number;
}

const MatchOverviewTab: React.FC<Props> = ({ matchId }) => {
  const { data, isLoading } = useMatchDetail(matchId, MatchDetailView.OVERVIEW);

  if (isLoading) return <SkeletonCardLoader />;
  if (!data) return <NoData message="Match data not available" />;

  const { league, status, kickoff_time } = data as MatchOverviewResponse;
  const kickoffDate = new Date(kickoff_time).toLocaleString();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white items-stretch">
      <div className="bg-[#14181F] border border-primary-gray/20 rounded-xl p-4 h-full">
        <p className="text-sm font-semibold mb-6">Match Info</p>
        <div className="space-y-4 text-sm">
          <div className="flex justify-between">
            <span className=" text-primary-gray">Competition</span>
            <span>{league.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-primary-gray">Date</span>
            <span>{kickoffDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-primary-gray">Status</span>
            <span>{status}</span>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-start h-full">
        <div className="w-full h-full">
          <MatchPrediction home={0.45} draw={0.25} away={0.3} />
        </div>
      </div>
    </div>
  );
};

export default MatchOverviewTab;
