"use client";

import { Ads } from "@/components";
import { Card } from "@/components/ui/card";
import LeagueBanner from "@/modules/leagues/LeagueBanner";

import { usePrediction } from "./hooks";
import { PredictionTabs } from "./tabs";

const PredictionRepresent: React.FC = () => {
  const { stats } = usePrediction();
  return (
    <div className="text-white w-full">
      <Ads />
      <div className="max-w-7xl grid gap-5 mx-auto px-4 lg:px-6 py-8 md:py-12">
        <div className="flex flex-col gap-4">
          <h3 className="text-base md:text-lg font-medium text-white">
            Prediction Performance
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map(({ label, value }) => (
              <Card
                key={label}
                className="group items-center justify-center gap-1 border-transparent transition-colors hover:border-primary-green cursor-pointer p-4"
              >
                <span className="text-xl md:text-2xl font-semibold text-primary-green">
                  {value}
                </span>

                <span className="text-xs text-muted-foreground">{label}</span>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 py-4">
          <h3 className="text-xl sm:text-3xl md:text-4xl text-center font-medium text-white">
            Match Prediction
          </h3>

          <LeagueBanner banner="betting" />
        </div>

        <PredictionTabs />

        <LeagueBanner banner="champions" />
      </div>
    </div>
  );
};

export default PredictionRepresent;
