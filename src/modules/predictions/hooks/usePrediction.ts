import { useEffect, useMemo, useState } from "react";

import { MOCK_MATCHES } from "@/mock-data/prediction";
import {
  PredictionCardVariant,
  PredictionMatchCard,
  PredictionTab,
} from "@/types/prediction";

const usePrediction = () => {
  const [activeTab, setActiveTab] = useState<PredictionTab>(
    PredictionTab.TODAY,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [matches, setMatches] = useState<
    | {
        match: PredictionMatchCard;
        prediction: number;
        variant: PredictionCardVariant;
      }[]
    | null
  >(null);

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

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true);

    const timeout = setTimeout(() => {
      const nextMatches = MOCK_MATCHES.filter(
        (match) => match.status === activeTab,
      ).map((match, index) => ({
        match,
        prediction: Math.floor(Math.random() * 100),
        variant: index !== 0 ? "vip" : ("prediction" as PredictionCardVariant),
      }));

      setMatches(nextMatches);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timeout);
  }, [activeTab]);

  return {
    stats,
    matches,
    activeTab,
    onTabChange,
    isLoading,
    error: null,
  };
};

export default usePrediction;
