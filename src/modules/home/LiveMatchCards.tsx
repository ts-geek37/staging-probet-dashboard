import Link from "next/link";
import React from "react";

import LiveMatchCard from "@/components/LiveMatchCard";
import { liveMatchCardsMock } from "@/mock-data/mock";

const LiveMatchCards: React.FC = () => {
  return (
    <section className="px-4 sm:px-6 py-10 md:py-20 text-white">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-5xl font-bold">
              Today&apos;s Matches
            </h1>
            <p className="text-sm sm:text-base">Live and upcoming fixtures</p>
          </div>

          <Link href="/matches" className="text-gray-500 hover:text-white">
            View all
          </Link>
        </div>

        <div className="flex flex-wrap gap-6 justify-center items-center md:justify-start md:items-start">
          {liveMatchCardsMock.map((match, index) => (
            <LiveMatchCard key={index} {...match} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveMatchCards;
