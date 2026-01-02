"use client";

import { useTeamPlayers } from "../hooks";

const TeamSquadTab = ({ teamId }: { teamId: number }) => {
  const { players, isLoading } = useTeamPlayers(teamId);

  if (isLoading) return null;

  return (
    <div>
      {players.map((player) => (
        <div key={player.id}>
          <p>{player.full_name}</p>
          <p>{player.position ?? "N/A"}</p>
          <p>{player.nationality}</p>
        </div>
      ))}
    </div>
  );
};

export default TeamSquadTab;
