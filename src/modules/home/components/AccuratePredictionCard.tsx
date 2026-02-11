"use client";

import { Trophy } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AccuratePredictionItem } from "@/types/home";

interface Props {
  prediction: AccuratePredictionItem;
}

const AccuratePredictionCard: React.FC<Props> = ({ prediction }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/matches/${prediction.id}?tab=Predictions`);
  };

  const homeParticipant = useMemo(
    () => prediction.participants.find((p) => p.location === "home"),
    [prediction.participants],
  );

  const awayParticipant = useMemo(
    () => prediction.participants.find((p) => p.location === "away"),
    [prediction.participants],
  );

  const [actualHome, actualAway] = prediction.actual_score.split("-");

  const predictedWinnerName = useMemo(() => {
    const homeProb = prediction?.home_win_probability ?? 0;
    const awayProb = prediction?.away_win_probability ?? 0;
    const drawProb = prediction?.draw_probability ?? 0;

    const maxProb = Math.max(homeProb, awayProb, drawProb);

    if (maxProb === homeProb) return homeParticipant?.name ?? "Home";
    if (maxProb === awayProb) return awayParticipant?.name ?? "Away";

    return "Draw";
  }, [
    prediction.home_win_probability,
    prediction.away_win_probability,
    prediction.draw_probability,
    homeParticipant?.name,
    awayParticipant?.name,
  ]);
  const isHomeWinner = parseInt(actualHome) > parseInt(actualAway);
  const isAwayWinner = parseInt(actualAway) > parseInt(actualHome);

  return (
    <Card
      onClick={handleClick}
      className="group relative w-full gap-2 p-6 overflow-hidden border border-primary-gray/20 bg-gradient-to-br from-card via-card to-card hover:to-primary-green/5 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-primary-green/10"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-primary-gray tracking-widest uppercase">
          {new Date(prediction.starting_at).getDate()}{" "}
          {new Date(prediction.starting_at)
            .toLocaleString("en-US", { month: "short" })
            .toUpperCase()}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between group/team">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div
              className={cn(
                "relative h-10 w-10 shrink-0 rounded-lg flex items-center justify-center p-1.5 transition-all duration-300 bg-slate-800/50 border border-primary-gray/20",
                isHomeWinner && "border-primary-green/30 bg-primary-green/10",
              )}
            >
              {homeParticipant?.image_path ? (
                <Image
                  src={homeParticipant.image_path}
                  alt={homeParticipant.name}
                  fill
                  className="object-contain p-1"
                />
              ) : (
                <span className="text-xs">H</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div
                className={cn(
                  "font-bold text-sm truncate transition-colors duration-300",
                  isHomeWinner ? "text-primary-green" : "text-primary-gray",
                )}
              >
                {homeParticipant?.name}
              </div>
            </div>
          </div>
          <div
            className={cn(
              "text-base min-w-8 text-right transition-all duration-300",
              isHomeWinner ? "text-primary-green" : "text-primary-gray",
            )}
          >
            {actualHome}
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="flex items-center justify-between group/team">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div
              className={cn(
                "relative h-10 w-10 shrink-0 rounded-lg flex items-center justify-center p-1.5 transition-all duration-300 bg-slate-800/50 border border-primary-gray/20",
                isAwayWinner && "border-primary-green/30 bg-primary-green/10",
              )}
            >
              {awayParticipant?.image_path ? (
                <Image
                  src={awayParticipant.image_path}
                  alt={awayParticipant.name}
                  fill
                  className="object-contain p-1"
                />
              ) : (
                <span className="text-xs">A</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div
                className={cn(
                  "font-bold text-sm truncate transition-colors duration-300",
                  isAwayWinner ? "text-primary-green" : "text-primary-gray",
                )}
              >
                {awayParticipant?.name}
              </div>
            </div>
          </div>
          <div
            className={cn(
              "text-base  min-w-[2rem] text-right transition-all duration-300",
              isAwayWinner ? "text-primary-green" : "text-primary-gray",
            )}
          >
            {actualAway}
          </div>
        </div>
      </div>

      <div className="relative bg-gradient-to-r from-primary-green/10 to-primary-green/5 border border-primary-green/20 rounded-xl p-3 overflow-hidden">
        <div className="relative flex items-center gap-3">
          <div className="bg-primary-green rounded-lg p-1.5 shrink-0">
            <Trophy className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] font-bold text-primary-green uppercase tracking-wider mb-0.5">
              Predicted Winner
            </div>
            <div className="font-bold text-sm text-white truncate">
              {predictedWinnerName}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
export default AccuratePredictionCard;
