import { Metadata } from "next";
import { Suspense } from "react";

import { SkeletonCardLoader } from "@/components";
import { MatchesListingPresentation } from "@/modules/matches";
import { seo } from "@/utils/seo";

export const metadata: Metadata = seo({
  title: "Matches",
  description:
    "View live, upcoming, and finished football matches with real-time scores, fixtures, and match details across global leagues on ProBetPredictions.",
});

const MatchesPage = () => {
  return (
    <Suspense >
      <MatchesListingPresentation />
    </Suspense>
  );
};

export default MatchesPage;
