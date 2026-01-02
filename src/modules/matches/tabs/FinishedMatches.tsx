"use client";

import Image from "next/image";
import React from "react";

import { MatchListStatus } from "@/types/matches";

import FinishedMatchCard from "../components/FinishedMatchCard";
import useMatches from "../hooks/useMatches";

const FinishedMatches: React.FC = () => {
  const { matches } = useMatches({
    status: MatchListStatus.FINISHED,
    page: 1,
    limit: 6,
  });

  if (!matches?.length) {
    return (
      <div className="text-sm text-[#6e7681]">No finished matches found</div>
    );
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-6 items-start">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {matches.map((match) => (
          <FinishedMatchCard key={match.id} match={match} />
        ))}
      </div>

      <div className="overflow-hidden">
        <Image
          src="/adsBg.jpg"
          alt="Promotion Banner"
          width={400}
          height={650}
          className="w-full h-90 object-cover"
          priority
        />
      </div>
    </div>
  );
};

export default FinishedMatches;
