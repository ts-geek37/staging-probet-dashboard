import Link from "next/link";
import React from "react";

import UpcomingMatchCard from "@/components/UpcomingMatchCard";
import { upcomingMatchCardsMock } from "@/mock-data/mock";

const UpcomingMatchCards: React.FC = () => {
  return (
    <section className="px-4 sm:px-6 py-10 md:py-20 text-white">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-5xl font-bold">Upcoming Matches</h1>
          </div>

          <Link
            href="/matches"
            className="text-gray-500 hover:text-white transition-colors"
          >
            View all
          </Link>
        </div>

        <div className="flex flex-wrap gap-6 justify-center items-center md:justify-start md:items-start">
          {upcomingMatchCardsMock.map((match, index) => (
            <UpcomingMatchCard key={index} {...match} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingMatchCards;
