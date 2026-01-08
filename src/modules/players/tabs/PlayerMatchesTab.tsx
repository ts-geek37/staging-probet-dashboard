"use client";

import React from "react";

import { NoData, SkeletonCardLoader } from "@/components";
import Pagination from "@/components/Pagination";

import { PlayerMatchCard } from "../components";
import { usePlayerMatches } from "../hooks";

interface Props {
  playerId: number;
}

const PlayerMatchesTab: React.FC<Props> = ({ playerId }) => {
  const { matches, pagination, page, setPage, isLoading } =
    usePlayerMatches(playerId);

  if (isLoading) return <SkeletonCardLoader />;

  if (!matches || matches.length === 0)
    return <NoData message="No matches history" />;

  return (
    <div className="flex flex-col gap-4 ">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {matches.map((match) => (
          <PlayerMatchCard key={match.id} match={match} />
        ))}
      </div>
      <Pagination
        currentPage={page}
        onPageChange={setPage}
        totalPages={pagination?.total_pages || 1}
      />
    </div>
  );
};

export default PlayerMatchesTab;
