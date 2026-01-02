"use client";

import { MatchListStatus } from "@/types/matches";
import React, { useState } from "react";
import { useMatches } from "./hooks";
import { MatchesListing } from "./listing";
import { MatchStatusTabs } from "./listing/tabs";

interface Props {
  status: MatchListStatus;
  onStatusChange: (s: MatchListStatus) => void;
}

const MatchesListingPresentation: React.FC<Props> = ({
  status,
  onStatusChange,
}) => {
  const [page, setPage] = useState(1);

  const { matches, pagination, isLoading } = useMatches({
    status,
    page,
    limit: 20,
  });

  return (
    <section>
      <h1>Match Center</h1>

      <MatchStatusTabs activeStatus={status} onChange={onStatusChange} />

      <MatchesListing matches={matches} isLoading={isLoading} />

      {pagination?.has_next && (
        <button onClick={() => setPage((p) => p + 1)}>Load more</button>
      )}
    </section>
  );
};

export default MatchesListingPresentation;
