"use client";

import { StatCardSkeleton } from "@/components/StatCard";
import Image from "next/image";
import LeagueBanner from "../../LeagueBanner";

const StatsSkeleton = () => {
  return (
    <div className="w-full text-white flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Season Statistics</h2>
        <div className="w-48 h-10 bg-slate-800 rounded-md animate-pulse" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <StatCardSkeleton key={index} />
        ))}
      </div>

      <div className="grid md:grid-cols-[2fr_1fr] items-center gap-4">
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Scoring Statistics</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <StatCardSkeleton key={index} />
            ))}
          </div>
        </div>

        <Image
          src="/adsBg.jpg"
          alt="ads"
          width={1000}
          height={1000}
          className="w-full h-full max-h-80 object-cover row-span-2"
        />

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Discipline</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
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
};

export default StatsSkeleton
