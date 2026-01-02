"use client";

import { usePlayerStats } from "../hooks";

interface Props {
  playerId: number;
}

const PlayerStatsTab = ({ playerId }: Props) => {
  const { stats, isLoading } = usePlayerStats(playerId);

  if (isLoading || !stats) return null;

  return (
    <div>
      <div>
        <p>Apps: {stats.career_totals.appearances}</p>
        <p>Goals: {stats.career_totals.goals}</p>
        <p>Assists: {stats.career_totals.assists}</p>
        <p>Yellow cards: {stats.career_totals.yellow_cards}</p>
        <p>Red cards: {stats.career_totals.red_cards}</p>
      </div>

      <div>
        {stats.seasons.map((season) => (
          <div key={`${season.season}-${season.competition}`}>
            <p>{season.season}</p>
            <p>{season.competition}</p>
            <p>Apps: {season.appearances}</p>
            <p>Goals: {season.goals}</p>
            <p>Assists: {season.assists}</p>
            <p>Minutes: {season.minutes}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerStatsTab;
