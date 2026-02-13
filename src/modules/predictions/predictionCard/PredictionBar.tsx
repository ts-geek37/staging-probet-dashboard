import { LockKeyhole } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MatchListItem } from "@/types/matches";

interface PredictionBarProps {
  prediction: {
    home: number;
    draw: number;
    away: number;
  };
  isLocked?: boolean;
  onUnlock?: () => void;
  match: MatchListItem;
}

const PredictionBar: React.FC<PredictionBarProps> = ({
  prediction,
  isLocked = false,
  onUnlock,
  match,
}) => {
  const segments = [
    {
      key: "home",
      value: prediction.home,
      label: match?.teams?.home?.name ?? "Team",
      bgColor: "bg-primary-green",
      highlightColor: "text-primary-green",
    },
    {
      key: "draw",
      value: prediction.draw,
      label: "Draw",
      bgColor: "bg-primary-gray",
      highlightColor: "text-primary-gray",
      hasBorder: true,
    },
    {
      key: "away",
      value: prediction.away,
      label: match?.teams?.away?.name ?? "Team",
      bgColor: "bg-primary-red",
      highlightColor: "text-red-400",
    },
  ];

  return (
    <div className="relative space-y-2 flex-1 flex flex-col">
      {isLocked && onUnlock && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 backdrop-blur-sm rounded-lg">
          <div className="hidden md:flex items-center gap-2 border-primary-yellow border p-2 rounded-full bg-background">
            <LockKeyhole className="size-5 text-primary-yellow" />
          </div>

          <Button
            variant="yellow"
            onClick={(e) => {
              e.stopPropagation();
              onUnlock();
            }}
            className="px-8"
          >
            Unlock VIP
          </Button>
        </div>
      )}

      <div
        className={cn(
          "border-t border-gray-800 pt-3 mx-auto size-full flex flex-col justify-center gap-2 flex-1",
          isLocked ? "blur-sm" : "",
        )}
      >
        <div className="w-full bg-muted h-2 rounded-full overflow-hidden flex">
          {segments.map((segment) => (
            <div
              key={segment.key}
              className={cn(
                "h-full transition-all duration-500 flex items-center justify-center",
                segment?.bgColor,
                segment?.value > 12 ? "px-1" : "",
                segment?.hasBorder && "border-x border-background",
              )}
              style={{ width: `${segment?.value ?? 34}%` }}
            ></div>
          ))}
        </div>
        <div className="flex justify-between text-xs sm:text-sm mt-1 gap-1">
          {segments.map((segment) => (
            <div
              key={segment.key}
              className="flex flex-col items-center text-center min-w-15 wrap-break-word"
            >
              <span
                className={`text-sm font-medium truncate line-clamp-1 ${segment.highlightColor}`}
              >
                {segment.value !== undefined ? segment.value.toFixed(0) : 0}%
              </span>

              <span
                title={segment.label}
                className={cn(
                  "text-xs sm:text-sm font-medium truncate w-full max-w-[110px]",
                  segment.highlightColor,
                )}
              >
                {segment.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PredictionBar;
