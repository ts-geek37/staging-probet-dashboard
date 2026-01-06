import { useMemo, useState } from "react";

import { MOCK_MATCHES } from "@/mock-data/prediction";
import { PredictionCardVariant, PredictionTab } from "@/types/prediction";

const usePrediction = () => {
  const [activeTab, setActiveTab] = useState<PredictionTab>(
    PredictionTab.TODAY,
  );

  const onTabChange = (tab: PredictionTab) => {
    setActiveTab(tab);
  };

  const stats = useMemo(() => {
    return [
      {
        label: "Win Rate",
        value: "68%",
      },
      {
        label: "This week",
        value: "12/18",
      },
      {
        label: "Profit (Units)",
        value: "+24.5",
      },
      {
        label: "Streak",
        value: "5W",
      },
    ];
  }, []);

  const matches = useMemo(() => {
    const matches = MOCK_MATCHES.filter(
      (match) => match.status === activeTab,
    ).map((match, index) => ({
      match,
      // eslint-disable-next-line react-hooks/purity
      prediction: Math.floor(Math.random() * 100),
      variant: index !== 0 ? "vip" : ("prediction" as PredictionCardVariant),
    }));

    return matches;
  }, [activeTab]);

  return {
    stats,
    matches,
    activeTab,
    onTabChange,
  };
};

export default usePrediction;
