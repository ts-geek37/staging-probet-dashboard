"use client";

import React, { useState } from "react";

import { MatchListStatus } from "@/types/matches";

import { useMatches } from "./hooks";
import { MatchesListing } from "./listing";
import { MatchStatusTabs } from "./listing/tabs";

const MatchesListingPresentation: React.FC = () => {
  const [status, setStatus] = useState<MatchListStatus>(MatchListStatus.LIVE);
  const [page, setPage] = useState(1);

  const { matches, pagination, isLoading } = useMatches({
    status,
    page,
    limit: 20,
  });

  return (
    <section>
      <h1>Match Center</h1>

      <MatchStatusTabs activeStatus={status} onChange={setStatus} />

      <MatchesListing matches={matches} isLoading={isLoading} />

      {pagination?.has_next && (
        <button onClick={() => setPage((p) => p + 1)}>Load more</button>
      )}
    </section>
  );
};

export default MatchesListingPresentation;
