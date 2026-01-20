"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

import { NoData, SkeletonCardLoader } from "@/components";
import { Accordion } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { MatchListItem } from "@/types/matches";

import { StatSection } from "../../components";
import { useMatchSeasonStat } from "../../hooks";

interface Props {
  match: MatchListItem;
}

const MatchSeasonStatsTab: React.FC<Props> = ({ match }) => {
  const router = useRouter();
  const seasonId = match.season?.id;

  const { stats, statSections, isLoading, quickStatCards } = useMatchSeasonStat(
    match.id,
    seasonId,
  );

  if (isLoading) return <SkeletonCardLoader />;
  if (!seasonId || !stats)
    return <NoData message="Season statistics not available" />;

  const home = stats.home;
  const away = stats.away;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between px-0">
        <div
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/teams/${home.id}`);
          }}
          role="button"
          tabIndex={0}
          className="flex flex-col items-center gap-3 flex-1 cursor-pointer"
        >
          <div className="size-16 sm:size-20 bg-white/5 rounded-2xl p-3 border border-white/10 shadow-xl">
            {home.logo && (
              <Image
                src={home.logo}
                alt={home.name}
                width={80}
                height={80}
                className="object-contain w-full h-full"
              />
            )}
          </div>
          <span className="text-sm sm:text-lg font-black text-white text-center line-clamp-1">
            {home.name}
          </span>
        </div>

        <div className="flex flex-col items-center gap-1 px-4">
          <span className="text-lg sm:text-xl md:text-2xl font-black text-white/20 italic">
            VS
          </span>
          <span className="text-xs md:text-sm font-bold text-white/40 uppercase text-center max-w-25">
            {match.season?.name}
          </span>
        </div>

        <div
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/teams/${away.id}`);
          }}
          role="button"
          tabIndex={0}
          className="flex flex-col items-center gap-3 flex-1 cursor-pointer"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/5 rounded-2xl p-3 border border-white/10 shadow-xl">
            {away.logo && (
              <Image
                src={away.logo}
                alt={away.name}
                width={80}
                height={80}
                className="object-contain w-full h-full"
              />
            )}
          </div>
          <span className="text-sm sm:text-lg font-black text-white text-center line-clamp-1">
            {away.name}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2">
        <Accordion
          type="multiple"
          className="contents"
          defaultValue={statSections.map((section) => section.title)}
        >
          {statSections.map((section) => (
            <StatSection
              key={section.title}
              title={section.title}
              icon={section.icon}
              rows={section.rows}
              className={section.className}
            />
          ))}
        </Accordion>
      </div>

      <div className="grid grid-cols-1 gap-6 px-4 sm:grid-cols-3">
        {quickStatCards.map((card) => (
          <Card
            key={card.label}
            className="flex flex-col items-center gap-2 border-primary-gray/20 bg-primary-gray/5 p-4"
          >
            {card.icon}

            <span className="text-[10px] font-bold uppercase text-white/40">
              {card.label}
            </span>

            <div className="mt-2 flex w-full items-baseline justify-between">
              <span className="text-xl font-black text-white">
                {card.homeValue}
              </span>

              <span className="text-xs font-bold text-white/20">vs</span>

              <span className="text-xl font-black text-white">
                {card.awayValue}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MatchSeasonStatsTab;
