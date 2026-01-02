import React from "react";

import { MatchesListingPresentation } from "@/modules/matches";
import { Metadata } from "next";
import { seo } from "@/utils/seo";

export const metadata: Metadata = seo({
  title: "Matches",
  description:
    "View live, upcoming, and finished football matches with real-time scores, fixtures, and match details across global leagues on ProBets.",
});

const MatchesPage: React.FC = () => {
  return <MatchesListingPresentation />;
};

export default MatchesPage;
