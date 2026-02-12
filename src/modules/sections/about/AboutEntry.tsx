import React from "react";
import { Card } from "@/components/ui/card";
import { AboutFeatures, philosophyItems } from "../contansts";

const AboutEntry: React.FC = () => {
  return (
    <>
      {/* Who We Are + What We Offer */}
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl font-bold text-primary-green">Who we are</h2>

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
            We are not a bookmaker. <br />
            We do not facilitate gambling. <br />
            All predictions and insights provided on our platform are strictly
            informational and analytical.
            <br />
            <br />
            Our focus is clarity, responsibility, and structured football
            intelligence.
          </p>
        </div>

        <h2 className="text-4xl font-bold text-primary-green">What We Offer</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {AboutFeatures.map(({ description, icon: Icon, label }) => (
            <Card
              key={label}
              className="group relative overflow-hidden rounded-2xl border border-white/5
  bg-white/[0.03] backdrop-blur-md
  p-6 transition-all duration-300
  hover:-translate-y-2 hover:border-primary-green/40
  hover:shadow-[0_0_40px_rgba(34,197,94,0.15)]"
            >
              {/* Soft gradient overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500
    bg-gradient-to-br from-primary-green/10 via-transparent to-primary-green/10"
              />

              <div className="relative z-10 flex flex-col gap-4">
                {/* Icon + Title */}
                <div className="flex items-center gap-4">
                  <div
                    className="flex items-center justify-center size-12 rounded-xl
        bg-primary-green/10 text-primary-green
        ring-1 ring-primary-green/20
        group-hover:bg-primary-green group-hover:text-white transition-all duration-300"
                  >
                    <Icon className="size-6" />
                  </div>

                  <h3 className="font-semibold text-white text-lg group-hover:text-primary-green transition">
                    {label}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-primary-gray/90 leading-relaxed group-hover:text-white/80 transition text-justify">
                  {description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="max-w-7xl mx-auto grid gap-6 md:grid-cols-2 mt-16">
        {/* Mission */}
        <div className="rounded-4xl bg-gradient-to-br from-primary-green/20 via-primary-green/10 to-primary-green/20 px-6 py-6 flex flex-col gap-4">
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

        {/* Vision */}
        <div className="rounded-4xl bg-gradient-to-br from-primary-green/20 via-primary-green/10 to-primary-green/20 px-6 py-6 flex flex-col gap-4">
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

      {/* Philosophy */}
      <div className="flex flex-col gap-5 mt-16">
        <div className="text-center flex flex-col gap-3 sm:gap-6">
          <h2 className="text-3xl font-bold text-primary-green sm:text-5xl">
            Our Philosophy
          </h2>

          <p className="mx-auto max-w-2xl sm:text-lg text-primary-gray">
            <span className="font-medium text-primary-green">
              We operate on three core principles
            </span>
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3 mx-auto">
          {philosophyItems.map((item, idx) => (
            <Card
              key={idx}
              className="group relative overflow-hidden rounded-2xl border border-white/5
              bg-white/[0.03] backdrop-blur-md
              p-6 md:p-8 transition-all duration-300
              hover:-translate-y-2 hover:border-primary-green/40
              hover:shadow-[0_0_40px_rgba(34,197,94,0.15)]"
            >
              {/* Hover gradient overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500
               bg-gradient-to-br from-primary-green/10 via-transparent to-primary-green/10"
              />

              <div className="relative z-10 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div
                    className="flex items-center justify-center size-12 rounded-xl
                      bg-primary-green/10 text-primary-green
                      ring-1 ring-primary-green/20
                      group-hover:bg-primary-green group-hover:text-white
                      transition-all duration-300"
                  >
                    <item.icon className="size-6" />
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-primary-green transition">
                    {item.title}
                  </h3>
                </div>

                <p className="leading-relaxed text-primary-gray group-hover:text-white/80 transition text-justify">
                  {item.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
      {/* Compliance & Company Information */}
<div className="max-w-7xl mx-auto mt-20 grid gap-8 md:grid-cols-2">


  {/* Compliance Section */}
  <Card
    className="relative overflow-hidden rounded-2xl border border-white/5
    bg-white/[0.03] backdrop-blur-md
    p-8 transition-all duration-300"
  >
    <div className="flex flex-col gap-6">

      <h2 className="text-3xl font-bold text-primary-green">
        Compliance and Responsibility
      </h2>

      <p className="text-primary-gray sm:text-base leading-relaxed">
        ProBetPredictions operates strictly as an informational football analytics platform.
      </p>

      <ul className="list-disc list-inside text-primary-gray sm:text-base">
        <li>Do not accept bets</li>
        <li>Do not process gambling transactions</li>
        <li>Do not provide betting odds</li>
        <li>Do not advertise bookmakers</li>
      </ul>

      <p className="text-primary-gray sm:text-base">
        All content is intended for analytical and educational purposes only.
      </p>
    </div>
  </Card>

  {/* Company Information */}
  <Card
    className="relative overflow-hidden rounded-2xl border border-white/5
    bg-white/[0.03] backdrop-blur-md
    p-8 transition-all duration-300"
  >
    <div className="flex flex-col gap-4">
      <h2 className="text-3xl font-bold text-primary-green">
        Company Information
      </h2>

      <div className="text-primary-gray sm:text-base">
        <p>ProBet Analytics Ltd</p>
        <p>71 Sample Street</p>
        <p>London</p>
        <p>United Kingdom</p>
        <p>
          Email:{" "}
          <a
            href="mailto:support@probet.com"
            className="text-primary-green hover:underline"
          >
            support@probet.com
          </a>
        </p>
      </div>
    </div>
  </Card>
</div>

    </>
  );
};

export default AboutEntry;
