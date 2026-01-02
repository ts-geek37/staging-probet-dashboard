"use client";

import { useTeamMatches } from "../hooks";

const TeamMatchesTab = ({ teamId }: { teamId: number }) => {
  const { matches, isLoading } = useTeamMatches(teamId);

  if (isLoading) return null;

  return (
    <div>
      {matches.map((match) => (
        <div key={match.match_id}>
          <p>{match.competition}</p>
          <p>{match.opponent}</p>
          <p>{match.score ?? "TBD"}</p>
        </div>
      ))}
    </div>
  );
};

export default TeamMatchesTab;
