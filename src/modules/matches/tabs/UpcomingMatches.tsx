"use client";

import Image from "next/image";
import React, { useState } from "react";

import {
  DataError,
  NoData,
  Pagination,
  SkeletonCardLoader,
} from "@/components";
import MatchCard from "@/components/MatchesCard";
import { MatchListStatus } from "@/types/matches";

import useMatches from "../hooks/useMatches";

interface Props {
  search?: string;
}

const UpcomingMatches: React.FC<Props & { leagueId?: number; teamId?: number }> = ({
  search,
  leagueId,
  teamId,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { matches, isLoading, error, has_more } = useMatches({
    tab: MatchListStatus.UPCOMING,
    page: currentPage,
    limit: 10,
    q: search,
    leagueId,
    leagueId,
    teamId,
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
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {matches.slice(0, 2).map((match) => (
          <MatchCard
            key={match.id}
            match={match}
            href={`/matches/${match.id}`}
          />
        ))}

        <div className="order-last xl:order-0 md:col-span-2 xl:col-span-1 xl:col-start-3 xl:row-start-1 xl:row-span-2">
          <div className="sticky top-4">
            <Image
              src="/adsBg.jpg"
              alt="Promotion Banner"
              width={500}
              height={600}
              className="w-full h-60 md:h-80 xl:h-120 object-cover rounded-xl"
              priority
            />
          </div>
        </div>

        {matches.slice(2).map((match) => (
          <MatchCard
            key={match.id}
            match={match}
            href={`/matches/${match.id}`}
          />
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Pagination
          mode="hasNext"
          currentPage={currentPage}
          hasNext={has_more}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default UpcomingMatches;
