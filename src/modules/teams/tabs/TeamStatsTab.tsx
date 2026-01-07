"use client";

import { ChevronDown } from "lucide-react";
import React, { useState, useEffect } from "react";

import { DataError, NoData, SkeletonCardLoader } from "@/components";

import { StatsGrid } from "../components";
import { useTeamStats } from "../hooks";

interface Props {
  teamId: number;
}

const TeamStatsTab: React.FC<Props> = ({ teamId }) => {
  const [currentSeasonId, setCurrentSeasonId] = useState<number>();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { team, seasons, selectedSeason, stats, isLoading, error } =
    useTeamStats(teamId, currentSeasonId);

  useEffect(() => {
    if (!currentSeasonId && seasons.length) {
      setTimeout(() => {
        setCurrentSeasonId(seasons[0].season.id);
      }, 0);
    }
  }, [seasons, currentSeasonId]);

  if (isLoading) return <SkeletonCardLoader />;
  if (error) return <DataError />;
  if (!stats) return <NoData message="Team stats not available" />;

  const generalStats = [
    { label: "Played", value: stats.wins + stats.draws + stats.losses },
    { label: "Won", value: stats.wins, color: "text-primary-green" },
    { label: "Drawn", value: stats.draws, color: "text-primary-yellow" },
    { label: "Lost", value: stats.losses, color: "text-primary-red" },
  ];

  const goalsStats = [
    { label: "Goals For", value: stats.goals_for },
    { label: "Goals Against", value: stats.goals_against },
    { label: "Minutes Played", value: stats.minutes_played.toLocaleString() },
  ];

  const performanceStats = [
    { label: "Clean Sheets", value: stats.clean_sheets },
    { label: "Yellow Cards", value: stats.yellow_cards },
    { label: "Red Cards", value: stats.red_cards },
    { label: "Shots", value: stats.shots },
  ];

  return (
    <div className="flex flex-col gap-6">
      {team && selectedSeason && (
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-base sm:text-xl text-white">
            Season: {selectedSeason.name}
          </h2>

          {seasons.length > 1 && (
            <div className="relative inline-block text-left">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
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
                  {seasons.map((s) => (
                    <div
                      key={s.season.id}
                      className="cursor-pointer px-4 py-2 hover:bg-primary-green/40 transition rounded-lg"
                      onClick={() => {
                        setCurrentSeasonId(s.season.id);
                        setDropdownOpen(false);
                      }}
                    >
                      {s.season.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <StatsGrid
        stats={generalStats}
        columns="grid-cols-2 sm:grid-cols-4"
        title="Overview"
        variant="nested"
      />
      <StatsGrid
        stats={goalsStats}
        columns="grid-cols-2 sm:grid-cols-3"
        title="Goals & Playtime"
        variant="nested"
      />
      <StatsGrid
        stats={performanceStats}
        columns="grid-cols-2 sm:grid-cols-4"
        title="Performance"
        variant="nested"
      />
    </div>
  );
};

export default TeamStatsTab;
