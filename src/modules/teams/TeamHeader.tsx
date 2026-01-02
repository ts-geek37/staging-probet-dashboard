"use client";

import { TeamBase } from "@/types/teams";

interface Props {
  team: TeamBase | null;
}

const TeamHeader = ({ team }: Props) => {
  if (!team) return null;

  return (
    <div>
      <h1>{team.name}</h1>
      Season: 2025/26 Stadium: Emirates Stadium Founded: 1886
      OverviewMatchesSquadStats Played: 15 Won: 10 Drawn: 3 Lost: 2 Goals
      scored: 32 Goals conceded: 14 Clean sheets: 6 Goal difference: 18
      <p>{team.country}</p>
      <p>{team.league.name}</p>
      <p>Season: {team.league.season}</p>
      <p>Stadium: {team.stadium.name ?? "N/A"}</p>
      <p>Founded: {team.founded ?? "N/A"}</p>
    </div>
  );
};

export default TeamHeader;
