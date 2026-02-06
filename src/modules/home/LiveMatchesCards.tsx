"use client";

import Link from "next/link";
import React, { useMemo } from "react";

import { DataError, MatchCard, NoData, SkeletonCardLoader } from "@/components";
import { cn } from "@/lib/utils";
import { MatchListItem } from "@/types/home";

import { useGeneralLiveMatches } from "../ws/hooks";
import { LiveMatchesScopeProps } from "../ws/types";

interface Props {
  initialMatches: MatchListItem[];
  scopeInfo: LiveMatchesScopeProps;
  className?: string;
  title?: string;
  description?: string;
  href?: string;
  limit?: number;
}

const LiveMatchCards: React.FC<Props> = ({
  initialMatches,
  scopeInfo,
  title = "Today's Matches",
  description = "Live and upcoming fixtures",
  className,
  href,
  limit,
}) => {
  const { data, loading, error } = useGeneralLiveMatches(
    initialMatches,
    scopeInfo,
  );

  const sortedData = useMemo(() => {
    if (!data) return [];
    const priority: Record<string, number> = {
      LIVE: 1,
      UPCOMING: 2,
      PROBLEM: 2,
      FINISHED: 3,
      FT: 3,
    };

    return [...data].sort((a, b) => {
      const priorityA = priority[a.status] || 99;
      const priorityB = priority[b.status] || 99;
      return priorityA - priorityB;
    });
  }, [data]);

  const displayLink = href && sortedData.length > (limit ?? 0);
  const matches = limit ? sortedData.slice(0, limit) : sortedData;

  return (
    <section className={cn("text-white", className)}>
      <div className="space-y-6">
        <div className="flex items-end justify-between gap-6">
          <div className="space-y-2">
            {title && (
              <h1 className="text-xl sm:text-5xl font-bold capitalize">
                {title}
              </h1>
            )}
            {description && (
              <div className="text-xs sm:text-base">{description}</div>
            )}
          </div>
          {displayLink && (
            <Link href={href} className="text-primary-gray hover:text-white">
              View all
            </Link>
          )}
        </div>

        {loading ? (
          <SkeletonCardLoader />
        ) : error ? (
          <DataError />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data && data.length > 0 ? (
              matches.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  href={`/matches/${match.id}`}
                />
              ))
            ) : (
              <NoData message="No matches found" />
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default LiveMatchCards;
