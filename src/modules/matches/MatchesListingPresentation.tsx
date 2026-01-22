"use client";

import Image from "next/image";
import React from "react";

import { SearchBar, SkeletonCardLoader } from "@/components";

import { LeagueSelectDropdown } from "./components";
import { League } from "./components/LeagueSelectDropdown";
import { useMatchFilters } from "./hooks";
import MatchStatusTabs from "./tabs/MatchStatusTabs";

const MatchesListingPresentation: React.FC = () => {
  const {
    status,
    selectedLeague,
    selectedLeagueId,
    leagues,
    isLeaguesLoading,
    search,
    leagueSearch,
    setLeagueSearch,
    handleStatusChange,
    handleLeagueChange,
    handleSearchChange,
    teamId,
  } = useMatchFilters();

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
              placeholder="Search by Team Name"
            />
          </div>

          <div className="w-full md:w-auto">
            <LeagueSelectDropdown
              leagues={leagues.filter((l) => l.logo !== null) as League[]}
              isLoading={isLeaguesLoading}
              selectedLeague={selectedLeague}
              leagueSearch={leagueSearch}
              onLeagueSearchChange={setLeagueSearch}
              onSelectLeague={handleLeagueChange}
            />
          </div>
        </div>

        <MatchStatusTabs
          activeStatus={status}
          onChange={handleStatusChange}
          search={search}
          leagueId={selectedLeagueId}
          teamId={teamId}
        />
      </div>
    </section>
  );
};

export default MatchesListingPresentation;
