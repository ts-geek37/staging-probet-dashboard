import About from "@/modules/sections/about";
import { seo } from "@/utils/seo";
import React from "react";

export const metadata = seo({
  title: "About Us – Pro Bet | Football Insights & Analytics",
  description:
    "Pro Bet is a modern football insights and analytics platform built for fans who love data, statistics, and informed match analysis. Learn about our philosophy and mission.",
});

const AboutPage: React.FC = () => {
  return <About />;
};

export default AboutPage;
