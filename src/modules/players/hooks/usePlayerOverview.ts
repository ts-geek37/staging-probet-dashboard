"use client";

import { Calendar, Footprints, Ruler, Scale } from "lucide-react";
import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import { PlayerDetailView, PlayerProfileResponse } from "@/types/players";

const usePlayerOverview = (
  playerId: number,
  initialData?: ApiResponse<PlayerProfileResponse>,
) => {
  const response = useSWR<ApiResponse<PlayerProfileResponse>>(
    `/api/v2/players/${playerId}/${PlayerDetailView.Profile}`,
    {
      fallbackData: initialData,
      revalidateOnMount: false,
    },
  );
  const player = response.data?.data ?? null;
  const personalInfoRows = !!player
    ? [
        {
          label: "Full Name",
          value: player?.name,
        },
        {
          label: "Nationality",
          value: player?.nationality?.name,
        },
        {
          label: "Date of Birth",
          value: player?.date_of_birth
            ? new Date(player.date_of_birth).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : null,
        },
        {
          label: "Age",
          value: player?.age ? `${player.age} years` : null,
          icon: Calendar,
        },
      ]
    : [];

  const physicalRows = !!player
    ? [
        {
          label: "Height",
          value: player.height ? `${player.height} cm` : null,
          icon: Ruler,
        },
        {
          label: "Weight",
          value: player.weight ? `${player.weight} kg` : null,
          icon: Scale,
        },
        {
          label: "Preferred Foot",
          value: player.preferred_foot,
          icon: Footprints,
        },
      ]
    : [];

  return {
    player,
    personalInfoRows,
    physicalRows,
    isLoading: !response.data && !response.error,
    error: response.error,
  };
};

export default usePlayerOverview;
