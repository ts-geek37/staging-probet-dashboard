import { LivePeriod } from "@/types/matches";

export const formatLiveMatchTime = (
  period: LivePeriod | null | undefined,
): string | null => {
  if (!period || !period.ticking) return null;

  if (typeof period.minutes !== "number") {
    return "LIVE";
  }

  if (typeof period.timeAdded === "number") {
    return `${period.minutes}+${period.timeAdded}'`;
  }
  
  return `${period.minutes}'`;
};
