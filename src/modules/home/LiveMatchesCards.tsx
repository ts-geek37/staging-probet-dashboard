"use client";

import Link from "next/link";

import { MatchCard, NoData } from "@/components";
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
}

const LiveMatchCards: React.FC<Props> = ({
  initialMatches,
  scopeInfo,
  title = "Today's Matches",
  description = "Live and upcoming fixtures",
  className,
  href,
}) => {
  const { data, loading, error, connected } = useGeneralLiveMatches(
    initialMatches,
    scopeInfo,
  );

  return (
    <section className={cn("text-white", className)}>
      <div className="space-y-10">
        <div className="flex items-end justify-between gap-6">
          <div className="space-y-2">
            {title && (
              <h1 className="text-xl sm:text-5xl font-bold capitalize">
                {title}
              </h1>
            )}

            <div className="flex items-center gap-2 text-xs sm:text-base">
              {description && <span>{description}</span>}
              {!connected && (
                <span className="text-yellow-400 text-xs">Reconnecting…</span>
              )}
            </div>
          </div>
          {href && (
            <Link href={href} className="text-primary-gray hover:text-white">
              View all
            </Link>
          )}
        </div>

        {error && (
          <div className="text-red-400 text-sm">
            Failed to load live updates
          </div>
        )}

        {loading && data.length === 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-32 rounded-xl bg-[#111] animate-pulse"
              />
            ))}
          </div>
        )}

        {!loading && data.length === 0 ? (
          <NoData message="No matches found" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                href={`/matches/${match.id}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LiveMatchCards;
