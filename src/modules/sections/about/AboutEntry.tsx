import React from "react";

import { Card } from "@/components/ui/card";

import { AboutFeatures, philosophyItems } from "../contansts";

const AboutEntry: React.FC = () => {
  return (
    <>
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold text-primary-green">
            What is PROBETTIPS
          </h2>

          <p className="text-muted-foreground text-lg leading-relaxed">
            PROBETTIPS is a modern football insights and analytics platform
            designed for casual fans and serious analysts alike. We provide live
            scores, fixtures, standings, and in-depth team and player insights
            with a clean, easy-to-use interface offering global football
            coverage.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {AboutFeatures.map(({ description, icon: Icon, label }) => {
            return (
              <Card
                key={label}
                className="group justify-center rounded-lg md:aspect-4/3 border-gray-700 gap-1 p-6 hover:border-primary-green/50 transition"
              >
                <Icon className="size-8 md:size-10 text-primary-green group-hover:scale-110 transition" />
                <h3 className="font-semibold text-white text-lg md:text-xl group-hover:text-primary-green transition  ">
                  {label}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground group-hover:text-white/80">
                  {description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="max-w-4xl mx-auto rounded-4xl border-noe bg-gradient-to-br from-primary-green/30 via-primary-green/10 to-primary-green/30 px-6 py-8 sm:py-12 flex flex-col gap-3 md:gap-6">
        <h3 className="text-2xl font-bold text-primary-green md:text-4xl">
          Our Mission
        </h3>

        <p className="text-gray-400 leading-relaxed sm:text-lg md:text-xl">
          Our mission is to make football analysis simple, accessible, and
          enjoyable for everyone, from casual fans to serious analysts. We
          believe football fans deserve transparent and reliable data without
          pressure, hype, or misleading claims.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <div className="text-center flex flex-col gap-3 sm:gap-6">
          <h2 className="text-3xl font-bold text-primary-green sm:text-5xl">
            Our Philosophy
          </h2>

          <p className="mx-auto max-w-2xl sm:text-lg text-gray-400">
            <span className="font-medium text-primary-green">
              ProBetTips is NOT a betting platform.
            </span>{" "}
            We do not promote, encourage, or support any form of gambling or
            betting. All predictions and insights are provided strictly for
            analysis and educational purposes only.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 sm:w-3/4 mx-auto">
          {philosophyItems.map((item, idx) => (
            <Card
              key={idx}
              className="group relative rounded-3xl border border-white/5 bg-white/5 p-6 md:p-8 transition-all hover:border-primary-green/30 gap-3"
            >
              <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-primary-green/10 text-primary-green ring-1 ring-primary-green/20 transition-colors group-hover:bg-primary-green group-hover:text-white">
                <item.icon className="size-7" />
              </div>

              <h3 className="text-xl font-bold text-white">{item.title}</h3>

              <p className="leading-relaxed text-gray-400">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default AboutEntry;
