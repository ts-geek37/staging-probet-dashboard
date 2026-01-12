import Banner from "@/components/Banner";
import { ShieldCheck, TrendingUp, Zap } from "lucide-react";

const features = [
  { label: "Live Scores", icon: Zap },
  { label: "Match Insights", icon: TrendingUp },
  { label: "Global Coverage", icon: ShieldCheck },
  { label: "Data Driven", icon: TrendingUp },
];

const AboutBanner: React.FC = () => {
  return (
    <Banner
      title={
        <>
          Modern <span className="text-primary-green">Football</span> <br />
          Insights Platform
        </>
      }
      description="ProBetTips is a modern football insights and analytics platform built for fans who love data, statistics, and informed match analysis."
      accentColor="green"
      className="max-sm:py-12"
    >
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
    </Banner>
  );
};

export default AboutBanner;
