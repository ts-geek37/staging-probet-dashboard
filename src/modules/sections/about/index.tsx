"use client";
import LeagueBanner from "@/modules/leagues/LeagueBanner";

import AboutEntry from "./AboutEntry";
import AboutHero from "./AboutHero";

const About = () => {
  return (
    <section className="flex-1 flex flex-col gap-10 sm:gap-16 pb-12 sm:pb-20">
      <AboutHero />
      <div className="relative mx-auto max-w-7xl w-full overflow-hidden px-4 z-10 flex flex-col gap-12 md:gap-20">
        <AboutEntry />
        <LeagueBanner banner="champions" />
      </div>
    </section>
  );
};
export default About;
