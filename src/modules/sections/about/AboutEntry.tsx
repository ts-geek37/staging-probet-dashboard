import React from "react";
import { Card } from "@/components/ui/card";
import { AboutFeatures, philosophyItems } from "../contansts";
import { ChevronRight, Globe, Mail, ShieldAlert } from "lucide-react";

const AboutEntry: React.FC = () => {
  const renderDescription = (description: string) => {
    if (!description.includes("•")) {
      return (
        <p className="text-sm sm:text-base text-primary-gray leading-relaxed text-left">
          {description}
        </p>
      );
    }

    const parts = description.split("•");
    const intro = parts[0];
    const items = parts.slice(1);

    return (
      <div className="text-base text-primary-gray leading-relaxed text-left space-y-3">
        {intro && <p>{intro}</p>}
        <ul className="list-disc pl-5 space-y-2">
          {items.map((item, index) => (
            <li key={index}>{item.trim()}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-15 sm:gap-24 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <h2 className="text-5xl font-bold text-primary-green">Who we are</h2>

          <p className="text-primary-gray text-sm sm:text-lg">
            ProBetPredictions is a global football analytics and insights
            platform created for fans who want more than just final scores.
            <br />
            <br />
            We bring together live match updates, league standings, team
            performance data, structured match insights, and informational
            predictions into one clean and professional environment.
            <br />
            <br />
            We are not a bookmaker.
            <br />
            We do not facilitate gambling.
            <br />
            All predictions and insights provided on our platform are strictly
            informational and analytical.
            <br />
            <br />
            Our focus is clarity, responsibility, and structured football
            intelligence.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto grid gap-6 md:grid-cols-2">
        <div className="rounded-4xl bg-linear-to-br from-primary-green/10 to-primary-neon/5 px-4 sm:px-6 py-6 flex flex-col gap-4">
          <h3 className="text-2xl font-bold text-primary-green md:text-4xl">
            Our Mission
          </h3>

          <p className="text-primary-gray sm:text-base leading-relaxed">
            Football is powered by data. Every match, every goal, every
            statistic tells a story. Our mission is to:
          </p>

          <ul className="list-disc list-inside text-primary-gray sm:text-base">
            <li>Make football data easier to understand</li>
            <li>Present insights in a clean and organized format</li>
            <li>
              Provide structured match predictions based on performance
              indicators
            </li>
            <li>Maintain a responsible and non-promotional environment</li>
            <li>Support smarter football analysis for fans worldwide</li>
          </ul>

          <p className="text-primary-gray sm:text-base">
            We believe football insights should inform, not influence.
          </p>
        </div>

        <div className="rounded-4xl bg-linear-to-br from-primary-green/10 to-primary-neon/5 px-4 sm:px-6 py-6 flex flex-col gap-4">
          <h3 className="text-2xl font-bold text-primary-green md:text-4xl">
            Our Vision
          </h3>

          <p className="text-primary-gray sm:text-base leading-relaxed">
            We aim to become a trusted global destination for football insights
            by:
          </p>

          <ul className="list-disc list-inside text-primary-gray sm:text-base">
            <li>Expanding league coverage</li>
            <li>Refining predictive accuracy</li>
            <li>Enhancing user experience</li>
            <li>Maintaining a clean, responsible platform</li>
          </ul>

          <p className="text-primary-gray sm:text-base">
            Football is passion. Insight adds perspective.
          </p>
        </div>
      </div>

      <section className="max-w-7xl mx-auto ">
        <h2 className="text-3xl sm:text-5xl font-bold text-primary-green mb-6 sm:mb-12 uppercase tracking-tight">
          What We Offer
        </h2>

        <div className="flex flex-col gap-8">
          {AboutFeatures.map(({ description, icon: Icon, label }) => (
            <div
              key={label}
              className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-4 md:gap-12 group"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1 text-primary-green group-hover:scale-110 transition-transform duration-300">
                  <Icon className="size-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-base sm:text-xl font-bold text-white leading-tight ">
                  {label}
                </h3>
              </div>
              <div className="md:border-l border-white/10 pl-0 md:pl-12 text-sm">
                {renderDescription(description)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-2">
          <Card className="relative overflow-hidden rounded-3xl border border-primary-green/20 bg-gradient-to-br from-primary-green/5 to-transparent p-4 sm:p-10">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-full bg-primary-green/10 text-primary-green">
                <ShieldAlert className="size-6" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-primary-green">
                Compliance & Responsibility
              </h2>
            </div>

            <div className="space-y-6 text-primary-gray/90">
              <p className="font-medium text-white">
                ProBetPredictions operates strictly as an informational football
                analytics platform.
              </p>

              <ul className="grid gap-3 sm:grid-cols-2">
                {[
                  "Do not accept bets",
                  "Do not process transactions",
                  "Do not provide odds",
                  "Do not advertise bookmakers",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <span className="size-1.5 rounded-full bg-primary-green" />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="text-sm opacity-60">
                All content is intended for analytical and educational purposes
                only.
              </p>
            </div>
          </Card>
           <Card className="relative overflow-hidden rounded-3xl border border-primary-green/20 bg-gradient-to-br from-primary-green/5 to-transparent p-4 sm:p-10">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-full bg-primary-green/10 text-primary-green">
                <Globe className="size-6" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-primary-green">
                Company Information
              </h2>
            </div>

            <div className="space-y-4 text-primary-gray">
              <div>
                <p className="text-lg font-semibold text-white">
                  ProBet Analytics Ltd
                </p>
                <p>71 Sample Street</p>
                <p>London, United Kingdom</p>
              </div>

              <div className="pt-6">
                <a
                  href="mailto:support@probet.com"
                  className="group inline-flex items-center gap-3 rounded-lg bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  <Mail className="size-4 text-primary-green" />
                  <span>support@probet.com</span>
                  <ChevronRight className="ml-auto size-4 opacity-50 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default AboutEntry;
