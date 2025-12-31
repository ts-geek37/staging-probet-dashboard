import Image from "next/image";
import React from "react";

import { Card, CardContent } from "@/components/ui/card";

export interface UpcomingMatchProps {
  date: string;
  time: string;
  teamA: string;
  teamB: string;
  scoreA: number;
  scoreB: number;
  teamALogo?: string;
  teamBLogo?: string;
}

const UpcomingMatchCard: React.FC<UpcomingMatchProps> = ({
  date,
  time,
  teamA,
  teamB,
  scoreA,
  scoreB,
  teamALogo,
  teamBLogo,
}) => {
  return (
    <Card className="bg-[#12151C] border border-[#16A085] rounded-none w-full sm:w-90">
      <CardContent className="px-5 space-y-6">
        <div className="flex justify-between items-center text-xs font-semibold text-white">
          <span className="text-white text-lg">{date}</span>
          <span className="text-white text-lg">{time}</span>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 relative">
                {teamALogo && (
                  <Image
                    src={teamALogo}
                    alt={teamA}
                    fill
                    style={{ objectFit: "contain" }}
                    className="absolute"
                  />
                )}
              </div>
              <span className="text-gray-400 text-sm">{teamA}</span>
            </div>
            <span className="text-white text-lg">{scoreA}</span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 relative">
                {teamBLogo && (
                  <Image
                    src={teamBLogo}
                    alt={teamB}
                    fill
                    style={{ objectFit: "contain" }}
                    className="absolute"
                  />
                )}
              </div>
              <span className="text-gray-400 text-sm">{teamB}</span>
            </div>
            <span className="text-white text-lg">{scoreB}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingMatchCard;
