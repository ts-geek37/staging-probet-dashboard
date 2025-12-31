import Image from "next/image";
import React from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export interface MatchProps {
  teamA: string;
  teamB: string;
  scoreA: number;
  scoreB: number;
  teamALogo?: string;
  teamBLogo?: string;
  livePercentageA: number;
  livePercentageB: number;
}

const LiveMatchCard: React.FC<MatchProps> = ({
  teamA,
  teamB,
  scoreA,
  scoreB,
  teamALogo,
  teamBLogo,
  livePercentageA,
  livePercentageB,
}) => {
  return (
    <Card className="bg-[#0b1619] border border-[#16A085] rounded-none w-full sm:w-90 lg:w-110 overflow-hidden">
      <CardContent className="p-4 space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-white text-lg font-bold">Live Match</h3>
          <Badge variant="live">Live</Badge>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              {teamALogo && (
                <div className="w-7 h-7 relative">
                  <Image
                    src={teamALogo}
                    alt={teamA}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              <span className="text-[#94a3b8]">{teamA}</span>
            </div>
            <span className="text-primary-lightgreen text-xl font-bold">
              {scoreA}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              {teamBLogo && (
                <div className="w-7 h-7 relative">
                  <Image
                    src={teamBLogo}
                    alt={teamB}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              <span className="text-[#94a3b8]">{teamB}</span>
            </div>
            <span className="text-primary-lightgreen text-xl font-bold">
              {scoreB}
            </span>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="relative w-full h-1 bg-[#1e293b] rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-lightgreen transition-all duration-500"
              style={{ width: `${livePercentageA}%` }}
            />
          </div>

          <div className="flex justify-between text-[11px] text-[#94a3b8] font-medium">
            <span>{livePercentageA}%</span>
            <span>{livePercentageB}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveMatchCard;
