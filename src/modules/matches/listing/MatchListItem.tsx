import React from "react";
import Link from "next/link";
import { MatchCard } from "@/types/matches";

interface Props {
  match: MatchCard;
}

const MatchListItem: React.FC<Props> = ({ match }) => {
  return (
    <Link href={`/matches/${match.id}`}>
      <div>
        <p>{match.league.name}</p>

        <strong>
          {match.home_team.name} vs {match.away_team.name}
        </strong>

        <div>
          {match.home_team.score ?? "-"} :{match.away_team.score ?? "-"}
        </div>

        <small>{match.status}</small>
      </div>
    </Link>
  );
};

export default MatchListItem;
