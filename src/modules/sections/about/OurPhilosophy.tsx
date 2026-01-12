import { ShieldAlert, BookOpen, BarChart3, Users } from "lucide-react";
import React from "react";

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
    <section className="relative w-full bg-primary-bg py-24 px-4 overflow-hidden">
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-primary-green/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-5xl mb-6">
            Our Philosophy
          </h2>
          <div className="mx-auto h-1 w-20 bg-primary-green rounded-full" />

          <div className="mt-10 inline-block rounded-2xl border border-red-500/20 bg-red-500/10 px-6 py-4 text-red-400">
            <p className="flex items-center gap-3 font-semibold">
              <ShieldAlert className="h-5 w-5" />
              Pro Bet is NOT a betting platform.
            </p>
          </div>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-gray-400">
            We do not promote, encourage, or support any form of gambling or
            betting. Our predictions and insights are designed purely for
            analysis and education.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {philosophyItems.map((item, idx) => (
            <div
              key={idx}
              className="group relative rounded-3xl border border-white/5 bg-white/5 p-8 transition-all hover:bg-white/10 hover:border-primary-green/30"
            >
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-green/10 text-primary-green ring-1 ring-primary-green/20 group-hover:bg-primary-green group-hover:text-black transition-colors">
                <item.icon className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-white">
                {item.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 rounded-[40px] bg-gradient-to-r from-primary-green/20 to-transparent p-1">
          <div className="rounded-[39px] bg-primary-bg p-10 md:p-16 text-center">
            <h3 className="text-2xl font-bold text-white md:text-4xl mb-6">
              Our Mission
            </h3>
            <p className="mx-auto max-w-3xl text-lg text-gray-400 leading-relaxed md:text-xl">
              Our mission is to make football analysis simple, accessible, and
              enjoyable for everyone — from casual fans to serious analysts. We
              believe football fans deserve transparent and reliable data
              without pressure, hype, or misleading claims.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurPhilosophy;
