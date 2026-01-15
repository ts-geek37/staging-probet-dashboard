"use client";

import { Trophy, History, User, Info } from "lucide-react";
import Image from "next/image";
import React from "react";

import { ApiResponse } from "@/api/types";
import { NoData, SkeletonCardLoader } from "@/components";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayerProfileResponse } from "@/types/players";

import { PlayerHeroSection, DetailRow } from "../components";
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
    <div className="flex flex-col gap-4 md:gap-8 max-w-7xl mx-auto">
      <PlayerHeroSection player={player} />

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
              <p className="text-sm font-semibold text-primary-gray mb-2">
                Team History
              </p>

              <div className="flex flex-col gap-1">
                {teams.map((team) => (
                  <div
                    key={team.id}
                    title={team.name}
                    className="flex gap-3 p-2 rounded-lg hover:bg-primary-gray/10 transition-colors"
                  >
                    <Image
                      src={team.logo || "/no-image.png"}
                      alt=""
                      width={32}
                      height={32}
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
          <CardContent className="space-y-6">
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

export default PlayerOverviewTab;
