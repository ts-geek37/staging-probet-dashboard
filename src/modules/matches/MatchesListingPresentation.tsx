  "use client";

  import Image from "next/image";
  import React, { useState } from "react";
  import { useSearchParams } from "next/navigation";

  import { SearchBar } from "@/components";
  import { MatchListStatus } from "@/types/matches";
  import { useLeagues } from "@/modules/leagues/hooks/useLeagues";
  import { LeagueSelectDropdown } from "./components";

  import MatchStatusTabs from "./tabs/MatchStatusTabs";

  const MatchesListingPresentation: React.FC = () => {
    const searchParams = useSearchParams();

    const statusFromQuery = searchParams.get("status") as MatchListStatus | null;

    const [status, setStatus] = useState<MatchListStatus>(
      statusFromQuery && Object.values(MatchListStatus).includes(statusFromQuery)
        ? statusFromQuery
        : MatchListStatus.LIVE
    );

    const teamIdFromQuery = searchParams.get("teamId");
const teamId = teamIdFromQuery ? Number(teamIdFromQuery) : undefined;


    const [search, setSearch] = useState("");
    const [leagueSearch, setLeagueSearch] = useState("");
    const [selectedLeague, setSelectedLeague] = useState<{
      id: number;
      name: string;
      logo: string;
    } | null>(null);

    const handleSearchChange = (value: string) => {
      setSearch(value);
    };

    const { leagues, isLoading } = useLeagues({
      search: leagueSearch,
      fetchAll: true,
    });

    return (
      <section className="pb-10 md:pb-20 text-white space-y-10">
        <Image
          src="/adsBg.jpg"
          alt="Promotion Banner"
          width={1920}
          height={360}
          className="w-full h-20 object-cover"
          priority
        />

        <div className="max-w-7xl mx-auto px-4 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-5xl font-bold">Match Center</h1>
              <p className="text-sm sm:text-base text-white">
                Live scores and upcoming fixtures
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 w-full">
            <div className="w-full md:flex-1">
              <SearchBar
                value={search}
                onSearchChange={handleSearchChange}
                placeholder="Search teams or leagues"
              />
            </div>
            <div className="w-full md:w-auto">
              <LeagueSelectDropdown
                leagues={leagues.filter((l) => l.logo !== null) as any[]}
                isLoading={isLoading}
                selectedLeague={selectedLeague}
                leagueSearch={leagueSearch}
                onLeagueSearchChange={setLeagueSearch}
                onSelectLeague={(league) => {
                  if (league) {
                    setSelectedLeague({
                      id:
                        typeof league.id === "string"
                          ? parseInt(league.id, 10)
                          : league.id,
                      name: league.name,
                      logo: league.logo,
                    });
                  }
                }}
              />
            </div>
          </div>
          <MatchStatusTabs
            activeStatus={status}
            onChange={setStatus}
            search={search}
            leagueId={selectedLeague?.id}
            teamId={teamId}
          />
        </div>
      </section>
    );
  };

  export default MatchesListingPresentation;
