"use client";

import { Card } from "@/components/ui/card";
import { AccuratePredictionItem } from "@/types/home";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  prediction: AccuratePredictionItem;
}

const AccuratePredictionCard: React.FC<Props> = ({ prediction }) => {
  const homeParticipant = prediction.participants.find(
    (p) => p.location === "home",
  );
  const awayParticipant = prediction.participants.find(
    (p) => p.location === "away",
  );

  const router = useRouter();
  const handleClick = () => {
    router.push(`/matches/${prediction.id}?tab=Predictions`);
  };

  const [actualHome, actualAway] = prediction.actual_score.split("-");
  const teams = [
    { participant: homeParticipant, score: actualHome },
    { participant: awayParticipant, score: actualAway },
  ];

  return (
    <Card
      onClick={handleClick}
      className="group relative overflow-hidden border border-white/10 p-6 h-full backdrop-blur-xl hover:border-primary-neon/30 group-active:border-primary-neon transition-all duration-300 cursor-pointer gap-1"
    >
      <div className="flex items-start justify-start text-xs text-primary-gray group-hover:text-primary-neon group-active:text-primary-neon font-medium mb-4">
        {new Date(prediction.starting_at)
          .toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
          .toUpperCase()}
      </div>

      <div className="space-y-3 pb-3 border-b border-gray-600 mb-4">
        {teams.map((team, index) => (
          <div key={index} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 bg-white/5 rounded-full p-1.5 border border-white/10 shrink-0">
                {team.participant?.image_path && (
                  <Image
                    src={team.participant.image_path}
                    alt={team.participant.name}
                    fill
                    className="object-contain p-1.5 group-hover:scale-110 group-active:scale-110 transition-all duration-300"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-white group-hover:text-primary-neon group-active:text-primary-neon transition-colors">
                  {team.participant?.name}
                </span>
                <span className="text-xs text-primary-gray uppercase">
                  {team?.participant?.location}
                </span>
              </div>
            </div>
            <span className="text-xl font-bold text-white group-hover:text-primary-neon group-active:text-primary-neon transition-colors">{team.score}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-primary-gray group-hover:text-primary-neon group-active:text-primary-neon">
        <span className="text-sm">Predicted</span>
        <span className="text-xl font-bold">
          {prediction?.predicted_score || "--"}
        </span>
      </div>
    </Card>
  );
};

export default AccuratePredictionCard;
