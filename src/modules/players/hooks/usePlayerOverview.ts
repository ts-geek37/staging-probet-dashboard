"use client";

import {
  Calendar,
  Footprints,
  Ruler,
  Scale,
  Briefcase,
} from "lucide-react";
import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import { PlayerDetailView, PlayerProfileResponse } from "@/types/players";

type InfoRow = {
  label: string;
  value: string | number | null;
  icon?: React.ElementType;
};

const buildRows = (rows: InfoRow[]): InfoRow[] =>
  rows.filter((row) => row.value != null);

const formatDate = (date: string | null) =>
  date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

const usePlayerOverview = (
  playerId: number,
  initialData?: ApiResponse<PlayerProfileResponse>,
) => {
  const { data, error } = useSWR<ApiResponse<PlayerProfileResponse>>(
    `/api/v2/players/${playerId}/${PlayerDetailView.Profile}`,
    {
      fallbackData: initialData,
      revalidateOnMount: false,
    },
  );

  const player = data?.data ?? null;

  const personalInfoRows = player
    ? buildRows([
        {
          label: "Date of Birth",
          value: formatDate(player.date_of_birth),
          icon: Calendar,
        },
        {
          label: "Age",
          value: player.age ? `${player.age} years` : null,
          icon: Calendar,
        },
      ])
    : [];

  const physicalRows = player
    ? buildRows([
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
      ])
    : [];

  const careerRows = player
    ? buildRows([
        {
          label: "Detailed Position",
          value: player.position?.detailed ?? null,
        },
        {
          label: "Contract Until",
          value: formatDate(player.contract?.until ?? null),
          icon: Briefcase,
        },
      ])
    : [];

  const statusRows = player
    ? buildRows([
        {
          label: "Active Player",
          value: player.is_active ? "Yes" : "No",
        },
      ])
    : [];

  return {
    player,

    id: player?.id ?? null,
    name: player?.name ?? null,
    photo: player?.photo ?? null,

    dateOfBirth: player?.date_of_birth ?? null,
    age: player?.age ?? null,

    height: player?.height ?? null,
    weight: player?.weight ?? null,
    preferredFoot: player?.preferred_foot ?? null,

    shirtNumber: player?.shirt_number ?? null,
    marketValue: player?.market_value ?? null,

    isActive: player?.is_active ?? false,
    isCaptain: player?.is_captain ?? false,

    nationality: player?.nationality ?? null,
    birthplace: player?.birthplace ?? null,
    position: player?.position ?? null,
    contract: player?.contract ?? null,

    currentTeam: player?.current_team ?? null,
    teams: player?.teams ?? [],
    trophies: player?.trophies ?? [],

    personalInfoRows,
    physicalRows,
    careerRows,
    statusRows,

    isLoading: !data && !error,
    error,
  };
};

export default usePlayerOverview;
