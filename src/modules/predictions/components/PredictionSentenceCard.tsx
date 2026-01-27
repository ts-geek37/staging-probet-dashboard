import React from "react";

import usePredictionSentence from "@/modules/predictions/hooks/usePredictionSentence";

interface Props {
  fixtureId: number;
  homeTeam: string;
  awayTeam: string;
}

const PredictionSentenceCard: React.FC<Props> = ({
  fixtureId,
  homeTeam,
  awayTeam,
}) => {
  const { prediction, isLoading, error } = usePredictionSentence({
    fixtureId,
    homeTeam,
    awayTeam,
  });

  if (isLoading) {
    return <div className="text-sm text-gray-400">Loading prediction...</div>;
  }

  if (error || !prediction) {
    return (
      <div className="text-sm text-gray-400">Prediction not available</div>
    );
  }

  return (
    <div className="rounded-lg border p-4 space-y-2">
      <p className="text-sm leading-relaxed">{prediction.sentence}</p>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>
          Main pick:{" "}
          <strong className="uppercase">{prediction.mainPick}</strong>
        </span>

        <span>
          Confidence: <strong>{prediction.confidence}%</strong>
        </span>
      </div>

      {prediction.supportingMarkets.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {prediction.supportingMarkets.map((market) => (
            <span
              key={market}
              className="rounded-full bg-gray-100 px-2 py-0.5 text-xs"
            >
              {market}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default PredictionSentenceCard;
