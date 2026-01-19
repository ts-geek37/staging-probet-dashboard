"use client";

import {
  Globe,
  Globe2,
  Landmark,
  Mountain,
  Snowflake,
  Sun,
  Trees,
  Waves,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { ApiResponse } from "@/api/types";
import { SearchBar } from "@/components";
import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Continent, LeaguesListResponse } from "@/types/leagues";

import { useLeagues } from "../hooks";
import EmptyLeagues from "./EmptyLeagues";
import LeagueCard from "./LeagueCard";
import LeagueCardSkeleton from "./LeagueCardSkeleton";

interface Props {
  initialLeagues: ApiResponse<LeaguesListResponse>;
}

const PAGE_SIZE = 12;
export const CONTINENT_ICON_MAP: Record<
  Continent,
  React.ComponentType<{ className?: string }>
> = {
  [Continent.EUROPE]: Landmark,
  [Continent.ASIA]: Sun,
  [Continent.AFRICA]: Trees,
  [Continent.NORTH_AMERICA]: Mountain,
  [Continent.SOUTH_AMERICA]: Waves,
  [Continent.OCEANIA]: Globe2,
  [Continent.ANTARCTICA]: Snowflake,
};

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
    {
      value: "All",
      label: "All Continents",
      icon: Globe,
    },
    ...Object.values(Continent).map((continent) => ({
      value: continent,
      label: continent,
      icon: CONTINENT_ICON_MAP[continent],
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

      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="flex-1 w-full">
          <SearchBar
            value={search}
            onSearchChange={handleSearchChange}
            placeholder="Search leagues or countries"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {options.map((option) => {
          const Icon = option.icon;
          const isActive = continent === option.value;
          return (
            <Button
              key={option.value}
              variant={isActive ? "green" : "default"}
              onClick={() => handleContinentChange(option.value)}
              className={cn(
                "flex items-center gap-2.5 rounded-full transition-all duration-300 border-none text-sm font-semibold whitespace-nowrap",
                isActive ? "text-white" : "text-gray-200",
              )}
            >
              <Icon
                className={cn(
                  "size-4.5",
                  isActive ? "text-primary-green" : "text-primary-green/80",
                )}
              />
              {option.label}
            </Button>
          );
        })}
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
