"use client";

import React from "react";
import { motion } from "framer-motion";
import { Inbox, LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface NoDataProps {
  message?: string;
  title?: string;
  icon?: LucideIcon;
  isCenter?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const NoData: React.FC<NoDataProps> = ({
  message,
  title,
  icon: Icon = Inbox,
  isCenter = false,
  className = "",
  children,
}) => {
  const displayTitle =
    title = message || "Data not found" ;
  const Content = (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.5,
        type: "spring",
        stiffness: 120,
        damping: 20,
      }}
      className={cn(
        "relative w-full flex flex-col items-center justify-center p-5 sm:p-10  text-center overflow-hidden rounded-2xl",
        "bg-linear-to-br from-[#14181F] via-primary-green/5 to-primary-neon/5",
        "border border-primary-gray/20",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      <div className="relative mb-4 sm:mb-8">
        <div className="relative p-3 bg-[#1A1F29] rounded-2xl">
          <Icon className="w-6 sm:w-12 h-6 sm:h-12 text-primary-green" strokeWidth={1.5} />
        </div>
      </div>

      <div className="space-y-3 max-w-md mx-auto relative z-10">
        <h3 className="text-base sm:text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-primary-green via-primary-neon to-primary-green animate-shine tracking-tight">
          {displayTitle}
        </h3>
      </div>

      {children && <div className="mt-8 relative z-10">{children}</div>}
    </motion.div>
  );

  if (isCenter) {
    return (
      <div className="w-full flex-1 max-w-7xl px-4 mx-auto flex items-center justify-center py-10">
        {Content}
      </div>
    );
  }

  return Content;
};

export default NoData;
