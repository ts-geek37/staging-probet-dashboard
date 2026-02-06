"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

import { Card } from "@/components/ui/card";
import { AccuratePredictionItem } from "@/types/home";

interface Props {
  prediction: AccuratePredictionItem;
}

const getResultReason = (home: string, away: string) => {
  const homeScore = parseInt(home);
  const awayScore = parseInt(away);
  if (homeScore === awayScore) return "Match ended in a draw.";
  return awayScore > homeScore
    ? "Away won after full-time"
    : "Home won after full-time";
};

const AccuratePredictionCard: React.FC<Props> = ({ prediction }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/matches/${prediction.id}?tab=Predictions`);
  };

  const homeParticipant = prediction.participants.find(
    (p) => p.location === "home",
  );
  const awayParticipant = prediction.participants.find(
    (p) => p.location === "away",
  );

  const [actualHome, actualAway] = prediction.actual_score.split("-");
  return (
    <Card
      onClick={handleClick}
      className="group relative w-full flex-1 overflow-hidden border border-slate-700 hover:border-primary-neon/30 active:border-primary-neon/30 transition-all duration-300 cursor-pointer p-0 gap-0"
    >
      <div className="px-4 py-3 bg-slate-800/80 border-b border-slate-700 group-hover:bg-slate-800 active:bg-slate-800 transition-colors duration-300">
        <div className="text-xs text-slate-400 font-medium mb-1 ">
          {new Date(prediction.starting_at)
            .toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
            })
            .toUpperCase()}
        </div>
        <div className="text-sm text-white">
          {prediction?.result_info ?? ""}
        </div>
      </div>

      <div className="flex items-center justify-between md:gap-6 p-3 py-6 md:p-6">
        <div className="flex flex-col items-center gap-3 flex-1">
          <div className="relative size-16 bg-slate-800/50 rounded-lg border border-slate-700 flex items-center justify-center overflow-hidden group-hover:border-primary-neon/50     group-active:border-primary-neon/50 group-hover:bg-slate-800 group-active:bg-slate-800 transition-all duration-300">
            {homeParticipant?.image_path && (
              <Image
                src={homeParticipant.image_path}
                alt={homeParticipant.name}
                fill
                className="object-contain p-2"
              />
            )}
          </div>
          <span className="text-sm text-white font-medium text-center">
            {homeParticipant?.name}
          </span>
        </div>

        <div className="flex flex-col items-center gap-2 min-w-30">
          <span className="text-xs text-slate-400 uppercase tracking-wide ">
            Result
          </span>
          <div className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white tracking-tight group-hover:text-primary-neon group-active:text-primary-neon transition-colors duration-300">
            {actualHome}-{actualAway}
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 flex-1">
          <div className="relative size-16 bg-slate-800/50 rounded-lg border border-slate-700 flex items-center justify-center overflow-hidden group-hover:border-primary-neon/50 group-hover:bg-slate-800 transition-all duration-300">
            {awayParticipant?.image_path && (
              <Image
                src={awayParticipant.image_path}
                alt={awayParticipant.name}
                fill
                className="object-contain p-2"
              />
            )}
          </div>
          <span className="text-sm text-white font-medium text-center">
            {awayParticipant?.name}
          </span>
        </div>
      </div>
      {prediction?.prediction_sentence && (
        <div className="px-4 py-3 border-t border-slate-700 bg-slate-800/60">
          <span className="block text-sm text-white">
            {prediction.prediction_sentence}
          </span>
        </div>
      )}
    </Card>
  );
};
export default AccuratePredictionCard;
