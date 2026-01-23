"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { Card } from "@/components/ui/card";
import { MatchListItem } from "@/types/matches";
import { PredictionCardVariant } from "@/types/prediction";

import PredictionBar from "./PredictionBar";
import TeamsDisplay from "./TeamsDisplay";

interface PredictionCardProps {
  match: MatchListItem;
  variant: PredictionCardVariant;
}

const PredictionCard: React.FC<PredictionCardProps> = ({ match, variant }) => {
  const router = useRouter();

  const handleVIPClick = () => {
    router.push("/price");
  };

  const kickoffDate = match?.kickoff_time ? new Date(match.kickoff_time) : null;

  const formattedDate = kickoffDate
    ? kickoffDate.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      })
    : "Date TBD";

  const formattedTime = kickoffDate
    ? kickoffDate.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    : "--:--";

  const prediction =
    variant === "prediction"
      ? (match?.prediction ?? { home: 0, draw: 0, away: 0 })
      : { home: 10, draw: 10, away: 10 };

  return (
    <Card
      onClick={() => router.push(`/matches/${match.id}?tab=Predictions`)}
      className="text-white p-4 border-none gap-3 min-h-[175px] sm:min-h-[200px]"
    >
      <div className="flex items-center pb-2 justify-between text-xs sm:text-sm">
        <span>{formattedDate}</span>
        <span>{formattedTime}</span>
      </div>

      <div className="flex flex-col gap-2">
        {variant === "prediction" ? (
          <TeamsDisplay match={match} layout="stacked" />
        ) : (
          <TeamsDisplay match={match} layout="horizontal" />
        )}
      </div>

      <PredictionBar
        prediction={prediction}
        isLocked={variant !== "prediction"}
        onUnlock={handleVIPClick}
      />
    </Card>
  );
};

export default PredictionCard;
