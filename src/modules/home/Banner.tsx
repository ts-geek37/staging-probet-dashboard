import { Crown, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";

const Banner: React.FC = () => {
  return (
    <section className="relative flex min-h-120 w-full flex-col items-center justify-center overflow-hidden bg-primary-bg px-4 mb-10 md:mb-15 text-center">
      <div className="absolute inset-0 sm:hidden">
        <div className="h-80 w-80 rounded-full bg-primary-neon opacity-40 blur-[120px]" />
      </div>

      <div className="absolute top-0 left-1/2 hidden h-72 w-160 -translate-x-1/2 rounded-b-full bg-primary-neon opacity-40 blur-[100px] sm:block" />
      <div className="absolute -bottom-20 -left-20 hidden h-96 w-96 rounded-full bg-primary-neon opacity-20 blur-[120px] sm:block" />
      <div className="absolute -bottom-20 -right-20 hidden h-96 w-96 rounded-full bg-primary-green opacity-25 blur-[120px] sm:block" />

      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/BGSquare.png"
          alt="BGSquare Image"
          fill
          priority
          className="object-cover md:object-contain "
        />
        <Image
          src="/BGShine.png"
          alt="BGShine Image"
          fill
          priority
          className="object-cover md:object-contain"
        />
      </div>

      <div className="relative z-10 flex max-w-4xl flex-col items-center gap-6 sm:gap-8">
        <h1 className="text-4xl sm:text-7xl font-bold  text-white md:text-7xl">
          Live Scores & <br />
          Match Predictions
        </h1>

        <p className="max-w-xl text-sm font-medium text-[#FEF9E7] opacity-90 md:text-lg">
          Real-time football scores, comprehensive match statistics, and
          data-driven predictions across Europe’s top leagues.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6">
          <Link href="/prediction">
            <Button
              variant="secondary"
              className="h-14 w-60 rounded-xl text-base sm:text-xl font-medium shadow-[0_0_24px] shadow-primary-neon/50"
            >
              <TrendingUp className="mr-3 h-6 w-6" />
              View Predictions
            </Button>
          </Link>

          <Link href="/price">
            <Button
              variant="outline"
              className="h-14 w-60 rounded-xl text-base sm:text-xl font-medium"
            >
              <Crown className="mr-3 h-6 w-6" />
              Become VIP
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;
