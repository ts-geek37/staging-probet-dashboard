import React from "react";
import { MatchCard as Match } from "@/types/matches";
import MatchListItem from "./MatchListItem";

interface Props {
  matches: Match[];
  isLoading: boolean;
}

const MatchesListing: React.FC<Props> = ({ matches, isLoading }) => {
  if (isLoading) return <p>Loading matches…</p>;
  if (!matches.length) return <p>No matches found</p>;

  return (
    <div>
      {matches.map((match) => (
        <MatchListItem key={match.id} match={match} />
      ))}
    </div>
  );
};

export default MatchesListing;
