"use client";

import { ApiResponse } from "@/api/types";
import { Ads } from "@/components";
import LeagueBanner from "@/modules/leagues/LeagueBanner";
import { PredictableMatchesResponse } from "@/types/prediction";

import PredictionListing from "./PredictionListing";

interface PredictionRepresentProps {
  initialData: ApiResponse<PredictableMatchesResponse>;
}
const PredictionRepresent: React.FC<PredictionRepresentProps> = ({
  initialData,
}) => {
  return (
    <div className="text-white w-full">
      <Ads />
      <div className="max-w-7xl grid gap-5 mx-auto px-4 lg:px-6 py-8 md:py-12">
        <div className="text-white flex flex-col sm:items-center gap-2 mb-2">
          <h1 className="text-primary-green text-2xl md:text-4xl font-bold">
            Match Predictions
          </h1>
          <p className="text-white/70 text-base md:text-lg">
            View win probabilities, draw chances, and data-driven forecasts for
            Upcoming football matches.
          </p>
        </div>
        <PredictionListing initialData={initialData} />

        <LeagueBanner banner="champions" />
      </div>
    </div>
  );
};

export default PredictionRepresent;
