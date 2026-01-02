import React from "react";
import { MatchOverviewResponse } from "@/types/matches";

interface Props {
  match: MatchOverviewResponse;
}

const MatchHeader: React.FC<Props> = ({ match }) => {
  return (
    <header>
      <h1>
        {match.home_team.name} vs {match.away_team.name}
      </h1>

      <p>
        {match.score.home} - {match.score.away}
      </p>

      <p>{match.league.name}</p>

      <p>{new Date(match.kickoff_time).toLocaleString()}</p>

      {match.venue && <p>Venue: {match.venue}</p>}
      {match.referee && <p>Referee: {match.referee}</p>}
    </header>
  );
};

export default MatchHeader;
