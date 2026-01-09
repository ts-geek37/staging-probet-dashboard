import { TrendingUp, ShieldCheck, Zap } from "lucide-react";
import Image from "next/image";
import React from "react";

const AboutHero: React.FC = () => {
  return (
    <section className="relative flex min-h-[60vh] w-full flex-col items-center justify-center overflow-hidden bg-primary-bg px-4 py-20 text-center">
      <div className="absolute inset-0 sm:hidden">
        <div className="h-80 w-80 rounded-full bg-primary-green opacity-30 blur-[120px]" />
      </div>
      <div className="absolute top-0 left-1/2 hidden h-72 w-160 -translate-x-1/2 rounded-b-full bg-primary-green opacity-30 blur-[100px] sm:block" />

      <div className="absolute inset-0 pointer-events-none opacity-50">
        <Image
          src="/BGSquare.png"
          alt="Background Pattern"
          fill
          priority
          className="object-cover md:object-contain"
        />
      </div>

      <div className="relative z-10 flex max-w-4xl flex-col items-center gap-6 sm:gap-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary-green/30 bg-primary-green/10 px-4 py-1.5 text-sm font-medium text-primary-green">
          <Zap className="h-4 w-4" />
          <span>About Pro Bet</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold text-white md:text-7xl lg:text-8xl">
          Modern <span className="text-primary-green">Football</span> <br />
          Insights Platform
        </h1>

        <p className="max-w-2xl text-base font-medium text-[#FEF9E7] opacity-80 md:text-xl leading-relaxed">
          Pro Bet is a modern football insights and analytics platform built for
          fans who love data, statistics, and informed match analysis.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 w-full max-w-5xl">
          {[
            { label: "Live Scores", icon: Zap },
            { label: "Match Insights", icon: TrendingUp },
            { label: "Global Coverage", icon: ShieldCheck },
            { label: "Data Driven", icon: TrendingUp },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/5 p-4 backdrop-blur-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-green/20 text-primary-green">
                <item.icon className="h-5 w-5" />
              </div>
              <span className="font-semibold text-white">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
