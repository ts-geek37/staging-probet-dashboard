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
  leagueName?: string;
  leagueLogo?: string;
}

const LiveMatchCard: React.FC<MatchProps> = ({
  teamA,
  teamB,
  scoreA,
  scoreB,
  teamALogo,
  teamBLogo,
  leagueName,
  leagueLogo,
}) => {
  return (
    <Card className="bg-[#0b1619] border border-[#16A085] rounded-none w-full sm:w-80 lg:w-102 overflow-hidden">
      <CardContent className=" space-y-6">
        <div className="flex justify-between items-center">
          {leagueName && leagueLogo && (
            <div className="flex items-center gap-2 text-base text-white">
              <div className="w-5 h-5 relative">
                <Image
                  src={leagueLogo}
                  alt={leagueName}
                  fill
                  className="object-contain"
                />
              </div>
              <span>{leagueName}</span>
            </div>
          )}
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
      </CardContent>
    </Card>
  );
};

export default LiveMatchCard;
