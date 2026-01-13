import React from "react";

import { Badge } from "@/components/ui/badge";
import { MatchTimeState } from "@/modules/leagues/hooks/useMatchTimer";

interface TimeUnit {
  label: string;
  value: string;
}

interface MatchStatusDisplayProps {
  BadgeText?: string;
  teamAScore?: number;
  teamBScore?: number;
  matchState: MatchTimeState;
  timeUnits: TimeUnit[];
}

const MatchStatus: React.FC<MatchStatusDisplayProps> = ({
  BadgeText,
  teamAScore,
  teamBScore,
  matchState,
  timeUnits,
}) => {
  switch (true) {
    case Boolean(BadgeText):
      return (
        <Badge className="bg-primary-neon/20 px-3 py-2 text-sm text-primary-neon hover:bg-primary-neon/20">
          {BadgeText}
        </Badge>
      );

    case teamAScore !== undefined && teamBScore !== undefined:
      return (
        <span className="text-white font-semibold">
          {teamAScore} - {teamBScore}
        </span>
      );

    case matchState === "WITHIN_12_HOURS":
      return (
        <div className="flex items-center gap-3">
          {timeUnits.map(({ label, value }, index) => (
            <React.Fragment key={label}>
              <div className="flex flex-col items-center">
                <span className="text-lg font-bold text-white">{value}</span>
                <span className="text-xs text-gray-500">{label}</span>
              </div>

              {index < timeUnits.length - 1 && (
                <span className="text-lg font-bold text-white">:</span>
              )}
            </React.Fragment>
          ))}
        </div>
      );

    case matchState === "UPCOMING":
      return (
        <Badge className="bg-primary-neon/20 px-3 py-2 text-sm text-primary-neon hover:bg-primary-neon/20">
          Upcoming
        </Badge>
      );

    default:
      return (
        <span className="text-white font-semibold">
          {teamAScore} - {teamBScore}
        </span>
      );
  }
};

export default MatchStatus;
