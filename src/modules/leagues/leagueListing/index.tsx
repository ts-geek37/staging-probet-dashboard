"use client";

import { useState } from "react";

import { ApiResponse } from "@/api/types";
import { SearchBar } from "@/components";
import Pagination from "@/components/Pagination";
import { LeagueListResponse } from "@/types/leagues";

import { useLeagues } from "../hooks";
import LeagueCard from "./LeagueCard";
import LeagueCardSkeleton from "./LeagueCardSkeleton";
import { useRouter } from "next/navigation";

interface Props {
  initialLeagues: ApiResponse<LeagueListResponse>;
}

const PAGE_SIZE = 8;

const LeagueListing: React.FC<Props> = ({ initialLeagues }) => {
  const [search, setSearch] = useState<string>("");
  const router = useRouter();
  const [page, setPage] = useState(1);

  const { leagues, pagination, isLoading } = useLeagues({
    page,
    limit: PAGE_SIZE,
    search,
    initialData: initialLeagues,
  });

  const handleSearchChange = (value: string) => {
    setPage(1);
    setSearch(value);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="text-white flex flex-col gap-2">
        <h1 className="text-4xl font-bold mb-2">Leagues</h1>
        <p>Explore leagues from across the world.</p>
      </div>

      <SearchBar
        value={search}
        onSearchChange={handleSearchChange}
        placeholder="Search leagues or countries"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: PAGE_SIZE }).map((_, index) => (
              <LeagueCardSkeleton key={index} />
            ))
          : leagues.map((league) => (
              <LeagueCard
                key={league.id}
                league={league}
                onClick={()=> router.push(`/leagues/${league.id}`)}
              />
            ))}
      </div>

      {pagination && pagination.totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={pagination.totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default LeagueListing;
