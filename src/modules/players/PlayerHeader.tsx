"use client";

import { PlayerOverviewResponse } from "@/types/players";

interface Props {
  player: PlayerOverviewResponse | null;
}

const PlayerHeader: React.FC<Props> = ({ player }) => {
  if (!player) return null;

  return (
    <div>
      <h1>{player.full_name}</h1>
      <p>{player.nationality}</p>
      <p>{player.position ?? "N/A"}</p>
      <p>Age: {player.age}</p>
      <p>Preferred foot: {player.preferred_foot ?? "N/A"}</p>
    </div>
  );
};

export default PlayerHeader;
