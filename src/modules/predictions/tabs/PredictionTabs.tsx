import { NoData, TabList } from "@/components";
import { PredictionTab } from "@/types/prediction";

import { usePrediction } from "../hooks";
import PredictionCard from "../predictionCard";

export const MatchDayTabs = [
  { value: PredictionTab.TODAY, label: "Today" },
  { value: PredictionTab.TOMORROW, label: "Tomorrow" },
  { value: PredictionTab.NEXT, label: "Next" },
];

const PredictionTabs = () => {
  const { activeTab, onTabChange, matches } = usePrediction();

  return (
    <TabList
      tabs={MatchDayTabs}
      activeTab={activeTab}
      onTabChange={onTabChange}
      renderContent={
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {matches.length > 0 ? (
            matches?.map((match, index) => (
              <PredictionCard key={index} {...match} />
            ))
          ) : (
            <NoData message="No predictions found" />
          )}
        </div>
      }
    />
  );
};
export default PredictionTabs;
