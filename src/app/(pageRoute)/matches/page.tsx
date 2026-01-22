import { Metadata } from "next";
import { Suspense } from "react";

import { MatchesListingPresentation } from "@/modules/matches";
import { seo } from "@/utils/seo";
import { SkeletonCardLoader } from "@/components";

export const metadata: Metadata = seo({
  title: "Matches",
  description:
    "View live, upcoming, and finished football matches with real-time scores, fixtures, and match details across global leagues on ProBetPredictions.",
});

const MatchesPage = () => {
  return (
    <Suspense fallback={<SkeletonCardLoader />}>
      <MatchesListingPresentation />
    </Suspense>
  );
};

export default MatchesPage;
