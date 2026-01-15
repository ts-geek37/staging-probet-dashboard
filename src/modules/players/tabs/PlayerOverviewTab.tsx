"use client";

import {
  Briefcase,
  Globe,
  History,
  Info,
  LucideIcon,
  MapPin,
  Shield,
  Trophy,
  User,
} from "lucide-react";
import Image from "next/image";
import React, { ElementType } from "react";

import { ApiResponse } from "@/api/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PlayerProfileResponse } from "@/types/players";
import { NoData, SkeletonCardLoader } from "@/components";

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
    statusRows,
    teams,
    trophies,
    isLoading,
  } = usePlayerOverview(initialData.data?.id ?? 0, initialData);

  if (isLoading) return <SkeletonCardLoader />;
  if (!player) return <NoData message="Player data not available" />;

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl border border-primary-gray/20 p-6 bg-[#12151C]">
        <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
          <div className="relative h-48 w-48 shrink-0 overflow bg-primary-gray rounded-xl shadow-inner">
            <Image
              src={player?.photo || "/no-image.png"}
              alt={player?.name || ""}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="flex-1 text-center md:text-left space-y-4">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <h1 className="text-4xl font-extrabold text-white tracking-tight">
                  {player.name}
                </h1>
                {player.is_captain && (
                  <span className="bg-amber-500 text-black text-[10px] font-black px-2 py-0.5 rounded shadow-sm uppercase">
                    Captain
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2 text-primary-gray">
                <span className="flex items-center gap-1.5 text-base font-medium">
                  <Shield size={16} className="text-primary-gray" />{" "}
                  {player.position.detailed || player.position.name}
                </span>
                <span className="flex items-center gap-1.5 text-base font-medium">
                  <MapPin size={16} className="text-primary-gray" />{" "}
                  {player.birthplace.city}, {player.birthplace.country}
                </span>
                <span className="flex items-center gap-1.5 font-mono text-primary-yellow font-bold bg-primary-yellow/10 px-2 rounded text-base">
                  #{player.shirt_number}
                </span>
              </div>
            </div>

            {player.market_value && (
              <Badge
                variant="green"
                className="py-2 px-4 border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="mb-1">Live Market Value</span>
                    <span className="">
                      €{player.market_value.toLocaleString()}
                    </span>
                  </div>
                </div>
              </Badge>
            )}
          </div>

          {player.current_team && (
            <div className="flex flex-col items-center gap-3 bg-white/5 p-6 rounded-3xl border border-white/5 backdrop-blur-md">
              <Image
                src={player.current_team.logo || ""}
                alt="Team logo"
                width={64}
                height={64}
                className="object-contain"
              />
              <p className="text-sm font-black text-primary-gray uppercase tracking-[0.2em]">
                {player.current_team.name}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-2">
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle className="text-base font-bold uppercase text-primary-green flex items-center gap-2">
              <User size={18} /> Biometrics & Origins
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {personalInfoRows.map((row) => (
              <DetailRow key={row.label} {...row} />
            ))}
            {physicalRows.map((row) => (
              <DetailRow key={row.label} {...row} />
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader>
            <CardTitle className="text-base font-bold uppercase text-primary-green flex items-center gap-2">
              <History size={18} /> Professional Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {careerRows.map((row) => (
              <DetailRow key={row.label} {...row} />
            ))}

            <div className="pt-4">
              <p className="text-sm font-semibold text-primary-gray mb-4">
                Team History
              </p>

              <div className="flex flex-col">
                {teams.map((team) => (
                  <div
                    key={team.id}
                    title={team.name}
                    className="flex gap-3 p-2 rounded-lg hover:bg-primary-gray/10 transition-colors"
                  >
                    <Image
                      src={team.logo || "/no-image.png"}
                      alt={team.name}
                      width={100}
                      height={100}
                      className="object-contain w-10 h-10"
                    />
                    <span className="text-white text-sm font-medium truncate">
                      {team.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader>
            <CardTitle className="text-base font-bold uppercase text-primary-green flex items-center gap-2">
              <Trophy size={18} /> Status & Honours
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 border-none">
            {statusRows.map((row) => (
              <DetailRow
                key={row.label}
                label={row.label}
                icon={Info}
                value={
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      row.value === "Yes"
                        ? "bg-primary-green/10 text-primary-green"
                        : "bg-primary-red/10 text-primary-red"
                    }`}
                  >
                    {row.value === "Yes" ? "Active" : "Inactive"}
                  </span>
                }
              />
            ))}

            <div className="space-y-3">
              <p className="text-sm font-semibold text-primary-gray mb-2">
                Trophy Cabinet
              </p>

              {trophies.length > 0 ? (
                <div className="grid grid-cols-1 gap-2">
                  {trophies.map((trophy) => (
                    <div
                      key={trophy.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-primary-gray/10 group"
                    >
                      <div className="flex flex-col">
                        <span className="text-white text-sm font-bold leading-tight group-hover:text-primary-green transition-colors">
                          {trophy.name}
                        </span>
                        <span className="text-xs text-primary-gray font-medium">
                          {trophy.team?.name}
                        </span>
                      </div>

                      <Trophy
                        size={18}
                        className="text-primary-yellow/40 group-hover:text-primary-yellow/60 transition-colors"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-primary-gray italic pl-1 opacity-50">
                  No professional titles recorded
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const DetailRow = ({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string | number | React.ReactNode | boolean | null;
  icon?: ElementType;
}) => (
  <div className="flex justify-between items-center py-2.5 border-b border-white/5 last:border-0 group">
    <span className="text-sm text-primary-gray flex items-center gap-3 group-hover:text-white transition-colors">
      {Icon && <Icon size={16} className="opacity-40" />}
      {label}
    </span>
    <div className="text-sm font-bold text-white/90">{value ?? "—"}</div>
  </div>
);

export default PlayerOverviewTab;
