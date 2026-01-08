"use client";

import Image from "next/image";
import React, { useState } from "react";

import {
  DataError,
  NoData,
  Pagination,
  SkeletonCardLoader,
} from "@/components";
import { MatchStatus } from "@/types/matches";

import useMatches from "../hooks/useMatches";
import MatchCard from "@/components/MatchesCard";

interface Props {
  search?: string;
}

const FinishedMatches: React.FC<Props> = ({ search }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { matches, isLoading, error, totalPages } = useMatches({
    tab: "finished" as MatchStatus,
    page: 1,
    limit: 4,
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
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-6 items-start">
        <div className="flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {matches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                href={`/matches/${match.id}`}
              />
            ))}
          </div>
            <div className="mt-5 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
        </div>
        <div className="overflow-hidden">
          <Image
            src="/adsBg.jpg"
            alt="Promotion Banner"
            width={400}
            height={650}
            className="w-full h-110 object-cover"
            priority
          />
        </div>
      </div>

      <div className="overflow-hidden"></div>
    </>
  );
};

export default FinishedMatches;
