"use client";

import { usePlayerMatches } from "../hooks";

interface Props {
  playerId: number;
}

const PlayerMatchesTab: React.FC<Props> = ({ playerId }) => {
  const { matches, isLoading } = usePlayerMatches(playerId);

  if (isLoading) return null;

  return (
    <div>
      {matches.map((match) => (
        <div key={match.match_id}>
          <p>{match.competition}</p>
          <p>Opponent: {match.opponent}</p>
          <p>Minutes: {match.minutes_played ?? "N/A"}</p>
          <p>Goals: {match.goals ?? 0}</p>
          <p>Assists: {match.assists ?? 0}</p>
        </div>
      ))}
    </div>
  );
};

export default PlayerMatchesTab;
