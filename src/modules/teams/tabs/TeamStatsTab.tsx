"use client";

import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

import { DataError, NoData, SkeletonCardLoader } from "@/components";

import { StatsGrid } from "../components";
import { useTeamStats } from "../hooks";

interface Props {
  teamId: number;
}

const TeamStatsTab: React.FC<Props> = ({ teamId }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const {
    team,
    seasonOptions,
    setSeasonId,
    currentSeason,
    overviewStats,
    attackingStats,
    defensiveStats,
    disciplineStats,

    isLoading,
    error,
  } = useTeamStats(teamId);

  if (isLoading) return <SkeletonCardLoader />;
  if (error) return <DataError />;
  if (!currentSeason) return <NoData message="Team stats not available" />;

  const selectedSeason = currentSeason.season;

  return (
    <div className="flex flex-col gap-6">
      {team && selectedSeason && (
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-base sm:text-xl text-white">
            Season: {selectedSeason.name}
          </h2>

          {seasonOptions.length > 1 && (
            <div className="relative inline-block text-left">
              <button
                onClick={() => setDropdownOpen((p) => !p)}
                className="flex items-center justify-between w-30 sm:w-44 bg-primary-green/80 text-white font-semibold py-1 px-4 rounded-xl hover:bg-primary-green transition"
              >
                {selectedSeason.name}
                <ChevronDown
                  className={`ml-2 h-4 w-4 transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 rounded-xl bg-primary-gray/20 backdrop-blur-md shadow-xl z-50 border border-white/10">
                  {seasonOptions.map((s) => (
                    <div
                      key={s.value}
                      className="cursor-pointer px-4 py-2 hover:bg-primary-green/40 transition rounded-lg"
                      onClick={() => {
                        setSeasonId(s.value);
                        setDropdownOpen(false);
                      }}
                    >
                      {s.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
      {!!overviewStats.length && (
        <StatsGrid
          stats={overviewStats}
          columns="grid-cols-2 sm:grid-cols-4"
          title="Overview"
          variant="nested"
        />
      )}

      {!!attackingStats.length && (
        <StatsGrid
          stats={attackingStats}
          columns="grid-cols-2 sm:grid-cols-3"
          title="Attacking"
          variant="nested"
        />
      )}

      {!!defensiveStats.length && (
        <StatsGrid
          stats={defensiveStats}
          columns="grid-cols-2 sm:grid-cols-3"
          title="Defensive"
          variant="nested"
        />
      )}

      {!!disciplineStats.length && (
        <StatsGrid
          stats={disciplineStats}
          columns="grid-cols-2 sm:grid-cols-4"
          title="Discipline"
          variant="nested"
        />
      )}
    </div>
  );
};

export default TeamStatsTab;
