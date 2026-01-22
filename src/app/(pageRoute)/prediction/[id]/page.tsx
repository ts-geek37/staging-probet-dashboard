import { Metadata } from "next";

import { getFixturePredictions } from "@/api/predictions";
import { NoData } from "@/components";
import { PredictionDetails } from "@/modules/predictions";
import { seo } from "@/utils/seo";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { id } = await params;
  const fixtureId = Number(id);

  if (Number.isNaN(fixtureId)) {
    return seo({
      title: "Match Prediction",
      description:
        "View detailed football match predictions, betting markets, and expert insights on ProBetTips.",
    });
  }

  const response = await getFixturePredictions(fixtureId);
  const prediction = response?.data;

  if (!prediction) {
    return seo({
      title: "Match Prediction",
      description:
        "This football match is currently not predictable. Explore other match predictions and betting insights on ProBetTips.",
    });
  }

  return seo({
    title: "Match Prediction",
    description:
      "Explore detailed football match predictions, available betting markets, and data-driven insights on ProBetTips.",
  });
};

const PredictionPage: React.FC<Props> = async ({ params }) => {
  const { id } = await params;
  const fixtureId = Number(id);

  if (Number.isNaN(fixtureId)) {
    return <NoData isCenter message="Invalid Match" />;
  }

  const response = await getFixturePredictions(fixtureId);
  const prediction = response.data;

  if (!prediction || !prediction.predictable) {
    return (
      <NoData isCenter message="Predictions Not Available for This Match" />
    );
  }

  return <PredictionDetails initialPrediction={response} />;
};

export default PredictionPage;
