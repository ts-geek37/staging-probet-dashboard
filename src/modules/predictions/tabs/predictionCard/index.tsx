"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { Card } from "@/components/ui/card";
import { PredictionCardVariant, PredictionMatchCard } from "@/types/prediction";

import PredictionBar from "./PredictionBar";
import TeamsDisplay from "./TeamsDisplay";

interface PredictionCardProps {
  match: PredictionMatchCard;
  prediction: number;
  variant: PredictionCardVariant;
}

const PredictionCard: React.FC<PredictionCardProps> = ({
  match,
  prediction,
  variant,
}) => {
  const router = useRouter();

  const handleVIPClick = () => {
    router.push("/price");
  };

  const kickoffDate = new Date(match.kickoff_time);

  const formattedDate = kickoffDate.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  const formattedTime = kickoffDate.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <Card className="text-white p-4 border-none gap-3 min-h-[175px] sm:min-h-[200px]">
      <div className="flex items-center justify-between text-xs">
        <span>{formattedDate}</span>
        <span>{formattedTime}</span>
      </div>

      {variant === "prediction" ? (
        <>
          <TeamsDisplay match={match} layout="stacked" />
          <PredictionBar prediction={prediction} />
        </>
      ) : (
        <>
          <TeamsDisplay match={match} layout="horizontal" />
          <PredictionBar
            prediction={prediction}
            isLocked
            onUnlock={handleVIPClick}
          />
        </>
      )}
    </Card>
  );
};

export default PredictionCard;
