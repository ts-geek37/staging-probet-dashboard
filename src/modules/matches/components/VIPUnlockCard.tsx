"use client";

import { Lock, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

const VIPUnlockCard: React.FC = () => {
  const router = useRouter();

  const handleUnlockClick = () => {
    router.push("/pricing");
  };

  return (
    <Card className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-2xl shadow-2xl">
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-yellow-500/10 rounded-full blur-[80px] pointer-events-none" />
      <CardHeader className="relative flex flex-col items-center pt-10 pb-2">
        <div className="relative mb-4">
          <div className="relative flex items-center justify-center w-16 h-16 rounded-xl bg-zinc-900 border border-yellow-500/20 ">
            <Lock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-white text-center">
          Unlock VIP Predictions
        </h2>
      </CardHeader>

      <CardContent className="text-center pb-6">
        <p className="text-primary-gray text-sm leading-relaxed balance">
          Explore expert football match predictions with detailed market
          insights. Analyze predictable matches, betting markets, and
          data-driven forecasts.
        </p>
      </CardContent>

      <CardFooter className="flex flex-col gap-4 pb-8">
        <Button
          size="lg"
          variant="outline"
          className="group relative overflow-hidden"
          onClick={handleUnlockClick}
        >
          <span className="flex items-center justify-center gap-2">
            Unlock VIP Access
            <ChevronRight className="w-4 h-4" />
          </span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VIPUnlockCard;
