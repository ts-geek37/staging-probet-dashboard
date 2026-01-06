"use client";

import { useTeamStats } from "../hooks";
import StatsGrid from "../StatsGrid";

const TeamStatsTab = ({ teamId }: { teamId: number }) => {
  const { overviewStats, goalStats, performanceStats } = useTeamStats(teamId);

  return (
    <div className="flex flex-col gap-4">
      <StatsGrid stats={overviewStats} />

      <StatsGrid
        title="Goals"
        stats={goalStats}
        columns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        variant="nested"
        isLastCentered
      />

      <StatsGrid
        title="Performance"
        stats={performanceStats}
        variant="nested"
      />
    </div>
  );
};

export default TeamStatsTab;
