import { ShieldCheck, TrendingUp, Zap } from "lucide-react";
import Image from "next/image";
import React from "react";

const features = [
  { label: "Live Scores", icon: Zap },
  { label: "Match Insights", icon: TrendingUp },
  { label: "Global Coverage", icon: ShieldCheck },
  { label: "Data Driven", icon: TrendingUp },
];

const AboutHero: React.FC = () => {
  return (
    <section className="relative flex min-h-135 sm:min-h-120 w-full flex-col items-center justify-center overflow-hidden bg-primary-bg px-4 text-center">
      <div className="absolute inset-0 top-5 sm:hidden">
        <div className="h-80 w-80 rounded-full bg-primary-green opacity-30 blur-[120px]" />
      </div>

      <div className="absolute max-sm:hidden top-20 sm:top-0 left-1/2 h-72 w-160 -translate-x-1/2 rounded-b-full bg-primary-green opacity-30 blur-[100px]" />

      <div className="absolute inset-0 pointer-events-none opacity-50">
        <Image
          src="/BGSquare.png"
          alt="Background Pattern"
          fill
          priority
          className="object-cover md:object-contain"
        />
        <Image
          src="/BGShine.png"
          alt="Background Shine"
          fill
          priority
          className="object-cover md:object-contain"
        />
      </div>

      <div className="relative z-10 flex max-w-4xl flex-col items-center gap-6 sm:gap-8">
        <h1 className="text-3xl sm:text-6xl font-bold text-white md:text-7xl">
          Modern <span className="text-primary-green">Football</span> <br />
          Insights Platform
        </h1>

        <p className="max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed font-medium text-gray-200 opacity-90">
          ProBetTips is a modern football insights and analytics platform built
          fans who love data, statistics, and informed match analysis.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 w-full max-w-5xl">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="group flex items-center gap-3 rounded-2xl border border-white/5 bg-white/5 p-2 sm:p-4 backdrop-blur-sm transition-all hover:border-white/15 hover:shadow-lg hover:shadow-primary-green/20"
            >
              <div className="flex size-8 sm:size-10 items-center justify-center rounded-xl bg-primary-green/20 text-primary-green/80 group-hover:text-primary-green transition-colors group-hover:bg-primary-green/30">
                <item.icon className="size-4 sm:size-5 transition-colors" />
              </div>

              <span className="text-sm sm:text-base font-semibold text-white/80 transition-colors group-hover:text-white">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
