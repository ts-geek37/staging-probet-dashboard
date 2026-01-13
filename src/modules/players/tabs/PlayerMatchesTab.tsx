"use client";

import React from "react";

import { NoData, SkeletonCardLoader, MatchCard } from "@/components";
import Pagination from "@/components/Pagination";

import { usePlayerMatches } from "../hooks";
import { MatchListItem } from "@/types/players";

interface Props {
  playerId: number;
}

const PlayerMatchesTab: React.FC<Props> = ({ playerId }) => {
  const { matches, pagination, page, setPage, isLoading } =
    usePlayerMatches(playerId);

  if (isLoading) return <SkeletonCardLoader />;

  const renderMatches = (matches: MatchListItem[], emptyMessage: string) =>
    !matches.length ? (
      <NoData message={emptyMessage} />
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map((match) => (
          <MatchCard
            key={match.id}
            match={match}
            href={`/matches/${match.id}`}
          />
        ))}
      </div>
    );

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-semibold mb-4 text-white">Match History</h2>

        {renderMatches(matches ?? [], "No matches history")}
      </section>

      {pagination && pagination.total_pages > 1 && (
        <Pagination
          mode="total"
          currentPage={page}
          onPageChange={setPage}
          totalPages={pagination.total_pages}
        />
      )}
    </div>
  );
};

export default PlayerMatchesTab;
