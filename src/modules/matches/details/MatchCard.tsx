import React from "react";
import { MatchCard as Match } from "@/types/matches";

interface Props {
  match: Match;
}

const MatchCard: React.FC<Props> = ({ match }) => {
  return (
    <div>
      <p>{match.league.name}</p>

      <strong>
        {match.home_team.name} vs {match.away_team.name}
      </strong>

      <div>
        {match.home_team.score ?? "-"} :{match.away_team.score ?? "-"}
      </div>

      <p>{match.status}</p>
    </div>
  );
};

export default MatchCard;
