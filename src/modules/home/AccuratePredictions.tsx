"use client";

import React from "react";
import { AccuratePredictionItem } from "@/types/home";
import {
  AccuratePredictionCard,
  AccuratePredictionCardSkeleton,
} from "./components";
import { NoData } from "@/components";

interface Props {
  predictions: AccuratePredictionItem[];
  isLoading?: boolean;
}

const AccuratePredictions: React.FC<Props> = ({ predictions, isLoading }) => {
  return (
    <section className="py-10 md:py-20 text-white">
      <div className="space-y-10">
        <div className="space-y-2">
          <h1 className="text-xl sm:text-5xl font-bold">
            Accurate Predictions
          </h1>
          <p className="text-primary-gray text-sm sm:text-lg">
            Expertly analyzed match predictions with high accuracy.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AccuratePredictionCardSkeleton />
            <AccuratePredictionCardSkeleton />
            <div className="md:col-span-2 flex justify-center">
              <div className="w-full md:w-1/2">
                <AccuratePredictionCardSkeleton />
              </div>
            </div>
          </div>
        ) : !predictions?.length ? (
          <NoData message="No predictions available" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-4/5 mx-auto">
            {predictions.map((prediction, index) => {
              const isLastChild = index === predictions.length - 1;
              const isOdd = predictions.length % 2 !== 0;

              return (
                <div
                  key={prediction.id}
                  className={`${isLastChild && isOdd ? "md:col-span-2 flex justify-center" : ""}`}
                >
                  <div
                    className={`${isLastChild && isOdd ? "w-full md:w-1/2" : "w-full"}`}
                  >
                    <AccuratePredictionCard prediction={prediction} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default AccuratePredictions;
