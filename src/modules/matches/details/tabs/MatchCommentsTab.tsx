"use client";

import { AlertCircle, Goal, MessageSquare } from "lucide-react";
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
            className={`overflow-hidden border-primary-gray/20 bg-primary-gray/5 transition-all hover:bg-primary-gray/10 p-0 ${
              comment.is_goal
                ? "border-l-4 border-l-primary-green bg-primary-green/5"
                : comment.is_important
                  ? "border-l-4 border-l-primary-yellow bg-primary-yellow/5"
                  : ""
            }`}
          >
            <CardContent className="p-2 px-3 flex gap-4 items-center">
              <div className="flex flex-col items-center gap-2 shrink-0 pt-1">
                <div className="flex flex-col items-center justify-center h-10 w-15 ">
                  <span className="font-bold text-white sm:text-lg">
                    {comment.minute}
                    {comment.extra_minute && (
                      <span className="font-medium text-primary-green ml-1">
                        +{comment.extra_minute}
                      </span>
                    )}
                  </span>
                </div>
              </div>

              <div className="flex-1 flex gap-1">
                <p className="sm:text-lg text-white/90 leading-relaxed font-medium">
                  {comment.comment}
                </p>
                {comment.is_goal && (
                  <div className="px-2 flex gap-1 rounded-full bg-primary-green/20 items-center justify-center">
                    <Goal className="w-3.5 h-3.5 text-primary-green" />
                    <span className="text-xs font-bold text-white/50 uppercase tracking-wider">
                      Goal
                    </span>
                  </div>
                )}
                {comment.is_important && !comment.is_goal && (
                  <div className="px-2 flex gap-1 rounded-full bg-primary-yellow/20 items-center justify-center">
                    <AlertCircle className="w-3.5 h-3.5 text-primary-yellow" />
                    <span className="text-xs font-bold text-white/50 uppercase tracking-wider">
                      Highlight
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MatchCommentsTab;
