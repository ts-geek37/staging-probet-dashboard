"use client";

import {
  Trophy,
  Activity,
  ShieldCheck,
  Ruler,
  Weight,
  Footprints,
  ArrowRightLeft,
  Star
} from "lucide-react";
import Image from "next/image";
import React from "react";

import { ApiResponse } from "@/api/types";
import { NoData, SkeletonCardLoader } from "@/components";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayerProfileResponse } from "@/types/players";

import { PlayerHeroSection } from "../components";
import { usePlayerOverview } from "../hooks";

interface Props {
  initialData: ApiResponse<PlayerProfileResponse>;
}

const PlayerOverviewTab: React.FC<Props> = ({ initialData }) => {
  const {
    player,
    personalInfoRows,
    physicalRows,
    careerRows,
    teams,
    trophies,
    isLoading,
  } = usePlayerOverview(initialData.data?.id ?? 0, initialData);

  if (isLoading) return <SkeletonCardLoader />;
  if (!player) return <NoData message="Player data not available" />;

  const cardStyles = "bg-[#12151C] border-white/5 rounded-sm shadow-none overflow-hidden";
  const labelStyles = "text-[10px] uppercase text-zinc-500 font-bold tracking-widest";

  const getPhysicalIcon = (label: string) => {
    const l = label.toLowerCase();
    if (l.includes("height")) return <Ruler size={16} className="text-primary-green" />;
    if (l.includes("weight")) return <Weight size={16} className="text-primary-green" />;
    if (l.includes("foot")) return <Footprints size={16} className="text-primary-green" />;
    return <Activity size={16} className="text-primary-green" />;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      <PlayerHeroSection player={player} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 px-2">
        <div className="lg:col-span-8 space-y-6">
          <Card className={cardStyles}>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-[0.2em] text-primary-green flex items-center gap-2">
                <ArrowRightLeft size={16} strokeWidth={2.5} /> Career Snapshot
              </CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary-green/5 blur-[80px] rounded-full pointer-events-none" />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4 mb-10">
                {careerRows.map((row) => (
                  <div key={row.label} className="relative z-10">
                    <p className={labelStyles}>{row.label}</p>
                    <p className="text-sm sm:text-xl font-semibold text-white tracking-tight">{row.value}</p>
                  </div>
                ))}
              </div>
              <div className="pt-6 border-t border-white/5">
                <p className={`${labelStyles} mb-4`}>Team History</p>
                <div className="flex flex-wrap gap-2">
                  {teams.map((team) => (
                    <div key={team.id} className="flex items-center gap-2.5 bg-white/3 border border-white/5 px-3 py-1.5 rounded-sm hover:bg-white/8 transition-colors">
                      <div className="relative w-5 h-5">
                        <Image src={team.logo || "/no-image.png"} alt="" fill className="object-contain" />
                      </div>
                      <span className="text-xs font-medium text-zinc-300">{team.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className={cardStyles}>
              <CardHeader>
                <CardTitle className="text-xs font-bold uppercase tracking-[0.2em] text-primary-yellow flex items-center gap-2">
                  <Trophy size={16} className="text-yellow-500" /> Honours
                </CardTitle>
              </CardHeader>
              <CardContent>
                {trophies.length > 0 ? (
                  <div className="space-y-4">
                    {trophies.map((trophy) => (
                      <div key={trophy.id} className="flex items-center gap-4 group">
                        <div className="p-2 bg-yellow-500/5 rounded-sm">
                          <Trophy size={14} className="text-yellow-600" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-zinc-100 text-sm font-bold leading-none mb-1">{trophy.name}</span>
                          <span className="text-[10px] text-zinc-500 uppercase font-medium">{trophy.team?.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-zinc-600 italic text-center py-4">No professional titles recorded</p>
                )}
              </CardContent>
            </Card>

            <Card className={`${cardStyles} relative overflow-hidden flex flex-col`}>
              <CardHeader>
                <CardTitle className="text-xs font-bold uppercase tracking-[0.2em] text-primary-green">Player Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 relative z-10">

                <div className="flex justify-between items-start">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${player.is_active ? "bg-primary-green animate-pulse" : "bg-red-500"}`} />
                      <span className="text-4xl font-black text-white uppercase tracking-tighter">
                        {player.is_active ? "Active" : "Inactive"}
                      </span>
                    </div>
                    {player.is_captain && (
                      <div className="flex items-center gap-1.5 text-primary-yellow">
                        <Star size={12} fill="currentColor" />
                        <span className="text-[10px] font-bold uppercase tracking-wider"> Captain</span>
                      </div>
                    )}
                  </div>
                </div>

                <ShieldCheck className="absolute -bottom-10 -right-10 text-white/[0.02]" size={180} />
              </CardContent>
            </Card>
          </div>
        </div>
        <aside className="lg:col-span-4 space-y-6">
          <Card className={cardStyles}>
            <CardHeader>
              <CardTitle className="text-xs font-bold uppercase tracking-[0.2em] text-primary-green">Biometrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="divide-y divide-white/3">
                {personalInfoRows.map((row) => (
                  <div key={row.label} className="flex items-center justify-between py-3">
                    <span className="text-zinc-500 text-sm">{row.label}</span>
                    <span className="text-zinc-200 font-semibold text-sm">{row.value}</span>
                  </div>
                ))}
              </div>

              <div className="bg-black/30 rounded-sm border border-white/3">
                {physicalRows.map((row) => (
                  <div key={row.label} className="flex items-center gap-4 p-4 border-b border-white/3 last:border-0 hover:bg-white/2 transition-colors">
                    <div className="w-10 h-10 rounded-sm bg-primary-green/5 flex items-center justify-center shrink-0 border border-primary-green/10">
                      {getPhysicalIcon(row.label)}
                    </div>
                    <div className="flex flex-col">
                      <span className={labelStyles}>{row.label}</span>
                      <span className="text-white font-bold text-base tracking-tight">{row.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
};

export default PlayerOverviewTab;
