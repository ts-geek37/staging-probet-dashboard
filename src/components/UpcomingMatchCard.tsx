import Image from "next/image";
import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface UpcomingMatchProps {
  date: string;
  time: string;
  teamA: string;
  teamB: string;
  teamALogo?: string;
  teamBLogo?: string;
  className?: string;
  onClick?: () => void;
}

const UpcomingMatchCard: React.FC<UpcomingMatchProps> = ({
  date,
  time,
  teamA,
  teamB,
  teamALogo,
  teamBLogo,
  className,
  onClick,
}) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return (
    <Card
      onClick={onClick}
      className={cn(
        "bg-[#12151C] border border-primary-green rounded-none w-full",
        className,
      )}
    >
      <CardContent className="px-5 space-y-6">
        <div className="flex justify-between items-center text-xs font-semibold text-white">
          <span className="text-white text-lg">{formattedDate}</span>
          <span className="text-white text-lg">{time}</span>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              {teamALogo && (
                <div className="w-6 h-6 relative">
                  <Image
                    src={teamALogo}
                    alt={teamA}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
              )}
              <span className="text-gray-400 text-sm">{teamA}</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              {teamBLogo && (
                <div className="w-6 h-6 relative">
                  <Image
                    src={teamBLogo}
                    alt={teamB}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
              )}
              <span className="text-gray-400 text-sm">{teamB}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingMatchCard;
