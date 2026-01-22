import { useState } from "react";

import { ApiResponse } from "@/api/types";
import { NoData, Pagination } from "@/components";
import { PredictableMatchesResponse } from "@/types/prediction";

import { usePrediction } from "./hooks";
import PredictionCard from "./predictionCard";
import PredictionCardSkeleton from "./predictionCard/PredictionCardSkeleton";

const PAGE_SIZE = 12;
interface Props {
  initialData: ApiResponse<PredictableMatchesResponse>;
}
const PredictionListing: React.FC<Props> = ({ initialData }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const { matchCards, isLoading, has_more } = usePrediction({
    page: currentPage,
    limit: PAGE_SIZE,
    initialData,
  });
  return (
    <>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, index) => (
            <PredictionCardSkeleton key={index} />
          ))}
        </div>
      ) : !matchCards || matchCards?.length === 0 ? (
        <NoData message="No predictions found" />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {matchCards.map((match, index) => (
              <PredictionCard key={index} {...match} />
            ))}
          </div>
          <Pagination
            mode="hasNext"
            currentPage={currentPage}
            hasNext={has_more}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </>
  );
};
export default PredictionListing;
