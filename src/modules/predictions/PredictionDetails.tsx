import React from "react";

import { ApiResponse } from "@/api/types";
import { FixturePredictionsResponse } from "@/types/prediction";

interface Props {
  initialPrediction: ApiResponse<FixturePredictionsResponse>;
}

export const PredictionDetails: React.FC<Props> = ({ initialPrediction }) => {
  const { data } = initialPrediction;

  return (
    <section className="flex-1 max-w-7xl mx-auto text-white py-16 space-y-4">
      <h1 className="text-lg font-semibold">Match Predictions</h1>

      <div className="text-sm text-muted-foreground">
        {data?.markets?.length} Markets Available
      </div>
    </section>
  );
};

export default PredictionDetails;
