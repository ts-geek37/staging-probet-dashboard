import Link from "next/link";
import React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const VipBanner: React.FC = () => {
  return (
    <section>
      <div className="relative mx-auto flex max-sm:flex-col min-h-35 p-3 max-w-7xl items-center justify-between overflow-hidden bg-linear-to-r from-[#0b1c1a] via-[#0f2f2a] to-[#0b1c1a] px-6 md:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.25),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(234,179,8,0.2),transparent_45%)]" />

        <div className="relative z-10 flex max-w-xl flex-col gap-3">
          <Badge
            variant="upcoming"
            className="hidden sm:block w-fit bg-primary-neon px-3 py-1 text-sm font-semibold text-black"
          >
            VIP Membership
          </Badge>

          <h2 className="text-base sm:text-2xl font-bold leading-tight text-white md:text-4xl">
            Unlock Premium Predictions
          </h2>

          <p className="text-xs sm:text-sm text-yellow-100 md:text-base">
            Exclusive insights, advanced stats, and expert tips designed for
            serious players.
          </p>
        </div>

        <div className="relative z-10 max-sm:w-full">
          <Link href="/pricing" className="w-full">
            <Button
              variant="secondary"
              className="rounded-xl sm:rounded-full max-sm:w-full px-6 py-5 text-sm font-semibold md:text-base"
            >
              View Plans
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default VipBanner;
