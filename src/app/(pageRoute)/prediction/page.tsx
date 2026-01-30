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
  const response = await getPredictableMatches({
    page: 1,
    limit: 12,
  });
  const initialData = response.data;

  if (!initialData)
    return <NoData isCenter message="No Predictable Matches Found" />;

  return <PredictionRepresent initialData={response} />;
};

export default PredictionPage;
