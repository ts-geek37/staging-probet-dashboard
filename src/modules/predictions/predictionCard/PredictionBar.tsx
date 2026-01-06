import { LockKeyhole } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PredictionBarProps {
  prediction: number;
  isLocked?: boolean;
  onUnlock?: () => void;
}

const PredictionBar: React.FC<PredictionBarProps> = ({
  prediction,
  isLocked = false,
  onUnlock,
}) => {
  return (
    <div className="relative space-y-1 flex-1 flex flex-col">
      {isLocked && onUnlock && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3">
          <div className="hidden md:flex items-center gap-2 border-primary-yellow border p-2 rounded-full">
            <LockKeyhole className="size-5 text-primary-yellow" />
          </div>

          <Button variant="yellow" onClick={onUnlock} className="px-8">
            Unlock VIP
          </Button>
        </div>
      )}
      <div
        className={cn("mt-auto flex flex-col gap-2", isLocked ? "blur-md" : "")}
      >
        <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-green transition-all duration-300"
            style={{ width: `${prediction}%` }}
          />
        </div>

        <div className="flex justify-between text-xs">
          <span>{prediction}%</span>
          <span>{100 - prediction}%</span>
        </div>
      </div>
    </div>
  );
};

export default PredictionBar;
