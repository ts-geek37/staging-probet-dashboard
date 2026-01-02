"use client";

import React, { useState } from "react";

import { MatchesListingPresentation } from "@/modules/matches";
import { MatchListStatus } from "@/types/matches";

const MatchesPage: React.FC = () => {
  const [status, setStatus] = useState<MatchListStatus>(MatchListStatus.LIVE);

  return (
    <MatchesListingPresentation status={status} onStatusChange={setStatus} />
  );
};

export default MatchesPage;
