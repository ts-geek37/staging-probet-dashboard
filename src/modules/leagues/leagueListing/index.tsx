"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { ApiResponse } from "@/api/types";
import { SearchBar, SelectField } from "@/components";
import Pagination from "@/components/Pagination";
import { Continent, LeaguesListResponse } from "@/types/leagues";

import { useLeagues } from "../hooks";
import EmptyLeagues from "./EmptyLeagues";
import LeagueCard from "./LeagueCard";
import LeagueCardSkeleton from "./LeagueCardSkeleton";

interface Props {
  initialLeagues: ApiResponse<LeaguesListResponse>;
}

const PAGE_SIZE = 12;

const LeagueListing: React.FC<Props> = ({ initialLeagues }) => {
  const [search, setSearch] = useState<string>("");
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [continent, setContinent] = useState<Continent | "All">("All");

  const { leagues, pagination, isLoading } = useLeagues({
    page,
    limit: PAGE_SIZE,
    search,
    continent: continent === "All" ? undefined : continent,
    initialData: initialLeagues,
  });
  const options = [
    { value: "All", label: "All Continents" },
    ...Object.values(Continent).map((c) => ({
      value: c,
      label: c,
    })),
  ];

  const handleSearchChange = (value: string) => {
    setPage(1);
    setSearch(value);
  };

  const handleContinentChange = (value: string) => {
    setPage(1);
    setContinent(value as Continent);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="text-white flex flex-col gap-2">
        <h1 className="text-4xl font-bold mb-2">
          {continent !== "All" ? continent : "Global"} Leagues
        </h1>
        <p>
          Explore standings, matches, and statistics for top{" "}
          {continent !== "All" ? continent : "Global"} football leagues.
        </p>
      </div>

      <div className="flex max-sm:flex-row-reverse gap-4 sm:items-center">
        <div className="sm:flex-1 sm:w-full">
          <SearchBar
            value={search}
            onSearchChange={handleSearchChange}
            placeholder="Search leagues or countries"
            isMobileAbsolute
          />
        </div>
        <SelectField
          options={options}
          onChange={(value) => handleContinentChange(value as string)}
          value={continent ?? "All"}
        />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: PAGE_SIZE }).map((_, index) => (
            <LeagueCardSkeleton key={index} />
          ))}
        </div>
      ) : leagues?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {leagues.map((league) => (
            <LeagueCard
              key={league.id}
              league={league}
              onClick={() => router.push(`/leagues/${league.id}`)}
            />
          ))}
        </div>
      ) : (
        <EmptyLeagues searchQuery={search} />
      )}

      <Pagination
        mode="total"
        currentPage={page}
        totalPages={pagination?.totalPages ?? 0}
        onPageChange={setPage}
      />
    </div>
  );
};

export default LeagueListing;
