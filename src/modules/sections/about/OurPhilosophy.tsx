import { BarChart3, BookOpen, ShieldAlert, Users } from "lucide-react";
import React from "react";

import { Card } from "@/components/ui/card";

const OurPhilosophy: React.FC = () => {
  const philosophyItems = [
    {
      title: "Football Analysis",
      description: "Deep dive into match dynamics and team performance trends.",
      icon: BarChart3,
    },
    {
      title: "Match Understanding",
      description: "Comprehensive breakdowns of tactics and key match moments.",
      icon: BookOpen,
    },
    {
      title: "Statistical Comparison",
      description:
        "Data-driven head-to-head analysis between teams and players.",
      icon: Users,
    },
    {
      title: "Educational Purposes",
      description:
        "Informational content designed to enhance your football knowledge.",
      icon: ShieldAlert,
    },
  ];

  return (
    <section className="relative w-full bg-primary-bg overflow-hidden px-4">
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-primary-green/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl flex flex-col gap-12 md:gap-20">
        <div className="rounded-[40px] border border-primary-green/30 bg-primary-bg px-6 py-8 sm:py-12 text-center flex flex-col gap-3 md:gap-6">
          <h3 className="text-2xl font-bold text-primary-green md:text-4xl">
            Our Mission
          </h3>

          <p className="mx-auto max-w-3xl text-gray-400 leading-relaxed sm:text-lg md:text-xl">
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

            <p className="mx-auto max-w-2xl text-lg text-gray-400">
              <span className="font-semibold text-primary-green/70">
                ProBetTips is NOT a betting platform.
              </span>{" "}
              We do not promote, encourage, or support any form of gambling or
              betting. All predictions and insights are provided strictly for
              analysis and educational purposes only.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {philosophyItems.map((item, idx) => (
              <Card
                key={idx}
                className="group relative rounded-3xl border border-white/5 bg-white/5 p-6 md:p-8 transition-all hover:border-primary-green/30 hover:bg-white/10 gap-3 md:gap-6"
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-green/10 text-primary-green ring-1 ring-primary-green/20 transition-colors group-hover:bg-primary-green group-hover:text-black">
                  <item.icon className="h-7 w-7" />
                </div>

                <h3 className="text-xl font-bold text-white">{item.title}</h3>

                <p className="leading-relaxed text-gray-400">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurPhilosophy;
