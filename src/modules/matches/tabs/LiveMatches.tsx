"use client";

import Link from "next/link";
import React, { useState } from "react";

import { DataError, NoData, SkeletonCardLoader } from "@/components";
import LeagueBanner from "@/modules/leagues/LeagueBanner";
import { MatchStatus } from "@/types/matches";

import useMatches from "../hooks/useMatches";
import { MatchCard, Pagination } from "@/components";

interface Props {
  search?: string;
}

const LiveMatches: React.FC<Props> = ({ search }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 20;

  const { matches, totalPages, isLoading , error} = useMatches({
    tab: "live" as MatchStatus,
    page: currentPage,
    limit,
    q: search,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) return <SkeletonCardLoader />;

  if (!matches.length)
    return <NoData message="No matches found" />;

  if(error)
    return <DataError />

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

      {/* {totalPages > 0 && (
        <div className="mt-6 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )} */}

      <div className="pt-15">
        <LeagueBanner banner="champions" />
      </div>
    </>
  );
};

export default LiveMatches;
