"use client";

import { useTeamStats } from "../hooks";

const TeamStatsTab = ({ teamId }: { teamId: number }) => {
  const { stats, isLoading } = useTeamStats(teamId);

  if (isLoading || !stats) return null;

  return (
    <div>
      <p>Matches played: {stats.stats.matches_played}</p>
      <p>Wins: {stats.stats.wins}</p>
      <p>Draws: {stats.stats.draws}</p>
      <p>Losses: {stats.stats.losses}</p>
      <p>Goals scored: {stats.stats.goals_scored}</p>
      <p>Goals conceded: {stats.stats.goals_conceded}</p>
      <p>Clean sheets: {stats.stats.clean_sheets}</p>
    </div>
  );
};

export default TeamStatsTab;
