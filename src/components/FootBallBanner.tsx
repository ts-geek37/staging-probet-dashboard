"use client";

import Image from "next/image";
import React from "react";

import { cn } from "@/lib/utils";

type BannerVariant = "left" | "right";

interface FootballBannerProps {
  children?: React.ReactNode;
  className?: string;
  variant?: BannerVariant;
}

const FootballBanner: React.FC<FootballBannerProps> = ({
  children,
  className,
  variant = "right",
}) => {
  return (
    <section
      className={cn("relative w-full overflow-hidden min-h-120", className)}
    >
      <div className="absolute inset-0 bg-primary-bg" />
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary-neon opacity-30 blur-[160px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-green opacity-20 blur-[160px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary-neon opacity-20 blur-[160px]" />

      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/BGSquare.png"
          alt="BGSquare Image"
          fill
          priority
          className="object-cover md:object-contain"
        />
        <Image
          src="/BGShine.png"
          alt="BGShine Image"
          fill
          priority
          className="object-cover md:object-contain"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-primary-bg via-transparent to-primary-bg opacity-90" />

      <div className="hidden xl:block absolute bottom-0 right-0 w-[500px] h-[400px] pointer-events-none">
        {variant === "right" && (
          <Image
            src="/FootBallsRight.png"
            alt="Decoration"
            fill
            className="object-contain opacity-30"
          />
        )}
      </div>

      <div className="hidden xl:block absolute bottom-0 left-0 w-[500px] h-[400px] pointer-events-none">
        {variant === "left" && (
          <Image
            src="/FootBallsLeft.png"
            alt="Decoration"
            fill
            className="object-contain opacity-30"
          />
        )}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {children}
      </div>
    </section>
  );
};

export default FootballBanner;
