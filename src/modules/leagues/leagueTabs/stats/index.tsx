import Image from "next/image";
import React from "react";

import { NoData } from "@/components";
import { SelectField } from "@/components/form";
import { StatCard } from "@/components/StatCard";

import StatsSkeleton from "./StatsSkeleton";
import { useLeagueStats } from "../../hooks";
import LeagueBanner from "../../LeagueBanner";

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
    return <StatsSkeleton />;
  }

  if (isEmpty) {
    return <NoData message="No season data available" />;
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
        <NoData message="No statistics available for this season" />
      </div>
    );
  }

  return (
    <div className="w-full text-white flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <div className="flex max-[420px]:flex-col gap-2 items-start sm:items-center justify-between">
          <h2 className="text-xl font-semibold">Season Statistics</h2>
          <SelectField
            value={selectedSeasonId?.toString()}
            options={seasonOptions}
            onChange={(value) => setSelectedSeasonId(Number(value))}
            className="self-end"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {statsConfig.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-[2fr_1fr] items-center gap-4">
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Scoring Statistics</h3>
          {scoringStats.length === 0 ? (
            <p className="text-primary-gray text-sm">
              No scoring statistics available
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
          className="w-full max-md:order-1 h-full md:max-lg:max-h-80 object-cover row-span-2 "
        />

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Discipline</h3>
          {disciplineStats.length === 0 ? (
            <p className="text-primary-gray text-sm">
              No discipline statistics available
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
