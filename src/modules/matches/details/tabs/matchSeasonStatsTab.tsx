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
          <span className="text-sm sm:text-lg font-black text-white text-center">
            {home.name}
          </span>
        </div>

        <div className="flex flex-col items-center gap-1 px-4">
          <span className="text-lg sm:text-xl md:text-2xl font-black text-primary-gray italic">
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
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/5 rounded-2xl p-3 border border-primary-gray/20 shadow-xl">
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
          <span className="text-sm sm:text-lg font-black text-white text-center">
            {away.name}
          </span>
        </div>
      </div>

      {statSections.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-6 gap-y-8">
          <Accordion
            type="single"
            className="contents"
            collapsible
            defaultValue={statSections[0].title}
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
      ) : (
        <NoData message="Season statistics not available" />
      )}
      {quickStatCards.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-4">
            <div className="h-8 w-1 bg-primary-green rounded-full shadow-[0_0_8px_rgba(0,197,158,0.5)]" />
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight my-4">
                Quick Stats
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
            {quickStatCards.map((card) => (
              <Card
                key={card.label}
                className="relative flex flex-col items-center gap-2 border-white/5 bg-white/3 p-5 transition-all hover:bg-white/6 hover:border-white/10"
              >
                <div className="absolute top-2 right-2 opacity-10 scale-125">
                  {card.icon}
                </div>

                <div className="p-2 bg-white/5 rounded-xl mb-1">
                  {card.icon}
                </div>

                <span className="text-[10px] font-bold uppercase text-white/40 tracking-wider text-center">
                  {card.label}
                </span>

                <div className="mt-1 flex w-full items-center justify-between gap-2">
                  <span className="text-lg sm:text-xl font-black text-primary-green">
                    {card.homeValue}
                  </span>

                  <div className="h-px flex-1 bg-white/10" />

                  <span className="text-lg sm:text-xl font-black text-white">
                    {card.awayValue}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchSeasonStatsTab;
