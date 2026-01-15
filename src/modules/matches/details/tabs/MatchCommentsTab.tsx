"use client";

import { AlertCircle, Goal, MessageSquare } from "lucide-react";
import React from "react";

import { NoData, SkeletonCardLoader } from "@/components";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
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
    if (a.order !== b.order) return b.order - a.order;
    if (a.minute !== b.minute) return b.minute - a.minute;
    return (b.extra_minute ?? 0) - (a.extra_minute ?? 0);
  });

  return (
    <div className="max-w-7xl mx-auto py-4">
      <div className="flex max-sm:flex-col sm:items-center justify-between mb-6 px-2">
        <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary-green" />
          Match Commentary
        </h3>
        <span className="text-sm text-white bg-[#14181F] px-3 py-1 rounded-xl">
          {comments.length} Comments
        </span>
      </div>

      <Card className="border p-0 rounded-none">
        <CardContent className="p-0">
          {sortedComments.map((comment, index) => (
            <div
              key={comment.id}
              className={cn(
                "flex items-start gap-4 p-4 min-h-12",
                index !== sortedComments.length - 1 &&
                  "border-b border-slate-700/50",
                comment.is_goal && "border-l-2 border-l-primary-green",
                !comment.is_goal &&
                  comment.is_important &&
                  "border-l-2 border-l-primary-yellow",
                !comment.is_goal &&
                  !comment.is_important &&
                  "border-l-2 border-l-gray-600",
              )}
            >
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-full w-14 rounded">
                  <span className="font-bold text-white text-base">
                    {comment.minute}
                    {comment.extra_minute && (
                      <span className="text-primary-green">
                        +{comment.extra_minute}
                      </span>
                    )}
                    <span className="text-xs ml-0.5 opacity-60">&apos;</span>
                  </span>
                </div>
              </div>

              <div className="flex-1 h-full flex justify-between items-center min-w-0">
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                  {comment.comment}
                </p>

                {(comment.is_goal || comment.is_important) && (
                  <div className="flex gap-2">
                    {comment.is_goal && (
                      <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-primary-green/20 border border-primary-green/30">
                        <Goal className="w-3 h-3 text-emerald-400" />
                        <span className="text-xs font-semibold text-emerald-400">
                          GOAL
                        </span>
                      </div>
                    )}
                    {comment.is_important && !comment.is_goal && (
                      <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-amber-500/20 border border-amber-500/30">
                        <AlertCircle className="w-3 h-3 text-amber-400" />
                        <span className="text-xs font-semibold text-amber-400">
                          HIGHLIGHT
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default MatchCommentsTab;
