"use client";

import { MessageSquare, AlertCircle, Goal, Info } from "lucide-react";
import React from "react";

import { NoData, SkeletonCardLoader } from "@/components";
import { Card, CardContent } from "@/components/ui/card";
import { MatchDetailView, SportMonksFixtureComment } from "@/types/matches";

import { useMatchDetail } from "../../hooks";

interface Props {
  matchId: number;
}

const MatchCommentsTab: React.FC<Props> = ({ matchId }) => {
  const { data, isLoading } = useMatchDetail(matchId, MatchDetailView.COMMENTS);
  const comments = data as SportMonksFixtureComment[];

  if (isLoading) return <SkeletonCardLoader />;

  if (!comments || comments.length === 0) {
    return <NoData message="No commentary available for this match" />;
  }

  // Sort by minute descending
  const sortedComments = [...comments].sort((a, b) => {
    if (a.minute !== b.minute) return b.minute - a.minute;
    return (b.extra_minute ?? 0) - (a.extra_minute ?? 0);
  });

  return (
    <div className="max-w-7xl mx-auto py-4">
      <div className="flex items-center justify-between mb-6 px-2">
        <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary-green" />
          Live Commentary
        </h3>
        <span className="text-sm text-white bg-[#14181F] px-3 py-1 rounded-xl">
          {comments.length} Comments
        </span>
      </div>

      <div className="space-y-4">
        {sortedComments.map((comment) => (
          <Card
            key={comment.id}
            className={`overflow-hidden border-primary-gray/20 bg-primary-gray/5 transition-all hover:bg-primary-gray/10 ${
              comment.is_important || comment.is_goal
                ? "border-l-4 border-l-primary-green bg-primary-green/5"
                : ""
            }`}
          >
            <CardContent className="p-4 sm:p-5">
              <div className="flex gap-4">
                <div className="flex flex-col items-center gap-2 shrink-0 pt-1">
                  <div className="flex flex-col items-center justify-center h-10 w-10 rounded-lg bg-[#14181F] border border-primary-gray/20">
                    <span className="text-sm font-bold text-white">
                      {comment.minute}
                    </span>
                    {comment.extra_minute && (
                      <span className="text-[10px] font-medium text-primary-green -mt-1">
                        +{comment.extra_minute}
                      </span>
                    )}
                  </div>
                  {comment.is_goal && (
                    <div className="h-6 w-6 rounded-full bg-primary-green/20 flex items-center justify-center">
                      <Goal className="w-3.5 h-3.5 text-primary-green" />
                    </div>
                  )}
                  {comment.is_important && !comment.is_goal && (
                    <div className="h-6 w-6 rounded-full bg-yellow-500/20 flex items-center justify-center">
                      <AlertCircle className="w-3.5 h-3.5 text-yellow-500" />
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-2">
                  <p className="text-sm sm:text-base text-white/90 leading-relaxed font-medium">
                    {comment.comment}
                  </p>
                  {(comment.is_goal || comment.is_important) && (
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/5 border border-white/10">
                      <Info className="w-3 h-3 text-white/50" />
                      <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider">
                        {comment.is_goal ? "Goal" : "Highlight"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MatchCommentsTab;
