import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface BannerProps {
  title: string | React.ReactNode;
  description: string;
  children?: React.ReactNode;
  accentColor?: "neon" | "green";
  className?: string;
}

const Banner: React.FC<BannerProps> = ({
  title,
  description,
  children,
  accentColor = "neon",
  className,
}) => {
  const bgColor =
    accentColor === "neon" ? "bg-primary-neon" : "bg-primary-green";
  const opacitySecondary = accentColor === "neon" ? "opacity-20" : "opacity-30";

  return (
    <section
      className={cn(
        "relative flex w-full min-h-120 flex-col items-center justify-center overflow-hidden bg-primary-bg px-4 text-center",
        className,
      )}
    >
      <div className="absolute inset-0 sm:hidden">
        <div
          className={cn(
            "h-80 w-80 rounded-full blur-[120px] opacity-30",
            bgColor,
          )}
        />
      </div>

      <div
        className={cn(
          "absolute top-0 left-1/2 h-72 w-160 opacity-30 -translate-x-1/2 rounded-b-full blur-[100px] hidden sm:block",
          bgColor,
        )}
      />

      <div
        className={cn(
          "absolute -bottom-20 -left-20 hidden size-96 rounded-full blur-[120px] sm:block",
          bgColor,
          opacitySecondary,
        )}
      />
      <div className="absolute -bottom-20 -right-20 hidden h-96 w-96 rounded-full bg-primary-green opacity-25 blur-[120px] sm:block" />

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

      <div className="relative z-10 flex max-w-4xl flex-col items-center gap-6 sm:gap-8">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white">
          {title}
        </h1>

        <p className="max-w-xl text-sm sm:text-base md:text-lg font-medium text-neutral-50 opacity-90">
          {description}
        </p>

        {children}
      </div>
    </section>
  );
};

export default Banner;
