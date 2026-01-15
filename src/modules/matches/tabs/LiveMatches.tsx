"use client";

import React, { useState } from "react";

import {
  DataError,
  MatchCard,
  NoData,
  Pagination,
  SkeletonCardLoader,
} from "@/components";
import LeagueBanner from "@/modules/leagues/LeagueBanner";
import { MatchListStatus } from "@/types/matches";

import useMatches from "../hooks/useMatches";

interface Props {
  search?: string;
}

const LiveMatches: React.FC<Props> = ({ search }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 6;

  const { matches, isLoading, error, total_pages } = useMatches({
    tab: MatchListStatus.LIVE,
    page: currentPage,
    limit,
    q: search,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) return <SkeletonCardLoader />;

  if (!matches.length) return <NoData message="No matches found" />;

  if (error) return <DataError />;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map((match) => (
          <MatchCard
            key={match.id}
            match={match}
            href={`/matches/${match.id}`}
          />
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <Pagination
          mode="total"
          currentPage={currentPage}
          totalPages={total_pages}
          onPageChange={handlePageChange}
        />
      </div>

      <div className="pt-15">
        <LeagueBanner banner="champions" />
      </div>
    </>
  );
};

export default LiveMatches;
