"use client";
import AboutHero from "./AboutHero";
import OurPhilosophy from "./OurPhilosophy";

const About = () => {
  return (
    <section className="flex-1 flex flex-col gap-10 pb-12 sm:pb-20">
      <AboutHero />
      <OurPhilosophy />
    </section>
  );
};
export default About;
