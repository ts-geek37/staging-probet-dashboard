import React from "react";
import AboutHero from "@/modules/sections/AboutHero";
import OurPhilosophy from "@/modules/sections/OurPhilosophy";
import { seo } from "@/utils/seo";

export const metadata = seo({
  title: "About Us – Pro Bet | Football Insights & Analytics",
  description:
    "Pro Bet is a modern football insights and analytics platform built for fans who love data, statistics, and informed match analysis. Learn about our philosophy and mission.",
});

const AboutPage: React.FC = () => {
  return (
    <main className="flex-1 flex flex-col">
      <AboutHero />
      <OurPhilosophy />
    </main>
  );
};

export default AboutPage;
