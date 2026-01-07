import Image from "next/image";
import React from "react";

import { SelectField } from "@/components/form";
import { StatCard, StatCardSkeleton } from "@/components/StatCard";

import { useLeagueStats } from "../hooks";
import LeagueBanner from "../LeagueBanner";

interface Props {
  id: number;
}

const Stats: React.FC<Props> = ({ id }) => {
  const {
    isLoading,
    isEmpty,
    hasNoStats,
    statsConfig,
    scoringStats,
    disciplineStats,
    seasonOptions,
    selectedSeasonId,
    setSelectedSeasonId,
  } = useLeagueStats(id);

  if (isLoading) {
    return (
      <div className="w-full text-white flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] items-center gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Season Statistics</h2>
              <div className="w-48 h-10 bg-slate-800 rounded-md animate-pulse" />
            </div>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <StatCardSkeleton key={index} />
              ))}
            </div>
          </div>
          <Image
            src="/adsBg.jpg"
            alt="ads"
            width={1000}
            height={1000}
            className="w-full h-full max-h-80 object-cover"
          />
        </div>

        <div className="grid md:grid-cols-[2fr_1fr] gap-4">
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">Scoring Statistics</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <StatCardSkeleton key={index} />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">Discipline</h3>
            <div className="grid grid-cols-1 gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <StatCardSkeleton key={index} />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <LeagueBanner banner="betting" />
        </div>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="w-full text-white flex items-center justify-center py-12">
        <p className="text-gray-400 text-lg">No season data available</p>
      </div>
    );
  }

  if (hasNoStats) {
    return (
      <div className="w-full text-white flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Season Statistics</h2>
          <SelectField
            value={selectedSeasonId?.toString()}
            options={seasonOptions}
            onChange={(value) => setSelectedSeasonId(Number(value))}
          />
        </div>
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-400 text-lg">
            No statistics available for this season
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full text-white flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Season Statistics</h2>
        <SelectField
          value={selectedSeasonId?.toString()}
          options={seasonOptions}
          onChange={(value) => setSelectedSeasonId(Number(value))}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statsConfig.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid md:grid-cols-[2fr_1fr] items-center gap-4">
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Scoring Statistics</h3>
          {scoringStats.length === 0 ? (
            <p className="text-gray-400 text-sm">
              No scoring statistics available
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {scoringStats.map((stat) => (
                <StatCard key={stat.label} {...stat} />
              ))}
            </div>
          )}
        </div>

        <Image
          src="/adsBg.jpg"
          alt="ads"
          width={1000}
          height={1000}
          className="w-full h-full max-h-80 object-cover row-span-2 "
        />

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Discipline</h3>
          {disciplineStats.length === 0 ? (
            <p className="text-gray-400 text-sm">
              No discipline statistics available
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {disciplineStats.map((stat) => (
                <StatCard key={stat.label} {...stat} />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <LeagueBanner banner="betting" />
      </div>
    </div>
  );
};

export default Stats;
