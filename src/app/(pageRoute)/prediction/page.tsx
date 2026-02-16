import { auth } from "@clerk/nextjs/server";

import { getPredictableMatches } from "@/api/predictions";
import { NoData } from "@/components";
import { PredictionRepresent } from "@/modules/predictions";
import { seo } from "@/utils/seo";

export const metadata = seo({
  title: "Match Predictions",
  description:
    "Explore expert football match predictions with detailed market insights. Analyze predictable matches, betting markets, and data-driven forecasts on ProBetTips.",
});

const PredictionPage = async () => {
  const { getToken } = await auth();
  const token = await getToken();

  const response = await getPredictableMatches(
    {
      page: 1,
      limit: 12,
    },
    token ?? undefined,
  );
  const initialData = response.data;

  if (!initialData)
    return <NoData isCenter message="No Predictable Matches Found" />;

  return <PredictionRepresent initialData={response} />;
};

export default PredictionPage;
