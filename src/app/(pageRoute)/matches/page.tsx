"use client";

import { MatchesListingPresentation } from "@/modules/matches";
import { MatchListStatus } from "@/types/matches";
import React, { useState } from "react";

const MatchesPage: React.FC = () => {
  const [status, setStatus] = useState<MatchListStatus>(MatchListStatus.LIVE);

  return (
    <MatchesListingPresentation status={status} onStatusChange={setStatus} />
  );
};

export default MatchesPage;
