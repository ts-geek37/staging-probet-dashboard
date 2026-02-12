"use client";
import LeagueBanner from "@/modules/leagues/LeagueBanner";

import AboutEntry from "./AboutEntry";
import AboutHero from "./AboutHero";

const About = () => {
  return (
    <section className="flex-1 flex flex-col gap-10 sm:gap-16 pb-12 sm:pb-20">
      <AboutHero />
      <div className="relative mx-auto max-w-7xl w-full overflow-hidden z-10 flex flex-col gap-6 sm:gap-12">
        <AboutEntry />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <LeagueBanner banner="champions" />
        </div>
      </div>
    </section>
  );
};
export default About;
