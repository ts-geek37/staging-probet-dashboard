import { useState } from "react";

import { NoData } from "@/components";
import { PredictionTab } from "@/types/prediction";

import { usePrediction } from "../hooks";
import PredictionCard from "../predictionCard";
import PredictionCardSkeleton from "../predictionCard/PredictionCardSkeleton";

export const MatchDayTabs = [
  { value: PredictionTab.TODAY, label: "Today" },
  { value: PredictionTab.TOMORROW, label: "Tomorrow" },
  { value: PredictionTab.NEXT, label: "Next" },
];
const PAGE_SIZE = 12;
const PredictionTabs = () => {
  const [page, setPage] = useState(1);

  const { matches, isLoading, error } = usePrediction({
    page,
    limit: PAGE_SIZE,
  });
  return (
    <>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <PredictionCardSkeleton key={index} />
          ))}
        </div>
      ) : !matches || matches?.length === 0 ? (
        <NoData message="No predictions found" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {matches.map((match, index) => (
            <PredictionCard key={index} match={match} variant="prediction" />
          ))}
        </div>
      )}
    </>
  );
};
export default PredictionTabs;
