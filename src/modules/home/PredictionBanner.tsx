import { Crown } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { StatCard } from "./components";

const PredictionBanner: React.FC = () => {
  return (
    <section className="relative py-5 sm:py-10 text-white overflow-hidden">
      <div className="">
        <div className="relative overflow-hidden rounded-2xl border border-[#01E1FA]/20 bg-primary-bg">
          <div className="absolute inset-0 pointer-events-none">
            <div className="hidden sm:block absolute -bottom-28 -left-28 h-80 w-105 rounded-full bg-primary-neon opacity-20 blur-[140px]" />
            <div className="hidden sm:block absolute -right-20 h-130 w-130 rounded-full bg-primary-green opacity-30 blur-[160px]" />
            <div className="sm:hidden absolute  h-80 w-80 rounded-full bg-primary-neon opacity-30 blur-[160px]" />
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 p-3 sm:p-12">
            <div className="space-y-6 text-center flex flex-col items-center justify-center sm:text-left sm:items-start sm:justify-start">
              <Badge className="w-fit bg-primary-yellow/20 text-primary-yellow border border-none px-4 py-3 flex items-center gap-2 justify-center text-base sm:justify-start">
                <Crown size={16} />
                VIP Membership
              </Badge>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                Unlock Full Predictions
              </h2>

              <p className="max-w-xl text-sm sm:text-base text-[#FEF9E7]">
                Get detailed match analysis, confidence ratings, suggested
                picks, and expert insights. Data-driven predictions to help you
                stay informed.
              </p>

              <div className="flex items-center gap-4 justify-center sm:justify-start">
                <Link href="/pricing">
                  <Button
                    variant="outline"
                    className="bg-primary-yellow/20 border-primary-yellow/70 rounded-2xl flex items-center gap-2 text-base px-6 py-3 w-50 h-13"
                  >
                    <Crown size={16} />
                    Become VIP
                  </Button>
                </Link>
              </div>

              <p className="text-sm text-[#FEF9E7]">
                * Predictions are for informational purposes only
              </p>
            </div>
            <div className="hidden sm:grid grid-cols-2 gap-4 self-center">
              <StatCard
                value="200"
                suffix="+"
                label="Daily Predictions"
                color="cyan"
                isAnimated
              />
              <StatCard
                value="50"
                suffix="+"
                label="Leagues Covered"
                color="green"
                isAnimated
              />
              <StatCard value="24/7" label="Daily Predictions" color="yellow" />
              <StatCard value="API" label="Leagues Covered" color="white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PredictionBanner;
