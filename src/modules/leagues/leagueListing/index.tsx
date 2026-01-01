"use client";

import { useState } from "react";

import { ApiResponse } from "@/api/types";
import { SearchBar } from "@/components";
import Pagination from "@/components/Pagination";
import { LeagueListResponse } from "@/types/leagues";

import { useLeagues } from "../hooks";
import LeagueCard from "./LeagueCard";
import LeagueCardSkeleton from "./LeagueCardSkeleton";

interface Props {
  initialLeagues: ApiResponse<LeagueListResponse>;
}

const LeagueListing: React.FC<Props> = ({ initialLeagues }) => {
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);

  const { leagues, isLoading } = useLeagues(page, 8, initialLeagues, search);

  const handleLeagueClick = (leagueId: number) => {
    console.log(`Navigate to /leagues/${leagueId}`);
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="text-white flex flex-col gap-2">
        <h1 className="text-4xl font-bold mb-2">European Leagues</h1>
        <p>
          Explore standings, matches, and statistics for top European football
          leagues.
        </p>
      </div>

      <SearchBar
        onSearchChange={(value) => setSearch(value)}
        placeholder="Search leagues or countries"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <LeagueCardSkeleton key={index} />
            ))
          : leagues.map((league) => (
              <LeagueCard
                key={league.id}
                league={league}
                onClick={() => handleLeagueClick(league.id)}
              />
            ))}
      </div>
      <Pagination
        currentPage={page}
        totalPages={Math.ceil(
          (initialLeagues?.data?.pagination?.total ?? 0) / 8,
        )}
        onPageChange={setPage}
      />
    </div>
  );
};

export default LeagueListing;
