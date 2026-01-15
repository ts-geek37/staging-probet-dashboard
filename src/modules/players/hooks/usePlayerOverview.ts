"use client";

import {
  Calendar,
  Footprints,
  Ruler,
  Scale,
  User,
  Shield,
  Shirt,
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
  rows.filter((row) => row.value !== null && row.value !== undefined);

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

  /* -------------------- UI Rows -------------------- */

  const personalInfoRows = player
    ? buildRows([
        { label: "Full Name", value: player.name, icon: User },
        { label: "Nationality", value: player.nationality?.name || null },
        { label: "Date of Birth", value: formatDate(player.date_of_birth) },
        {
          label: "Age",
          value: player.age ? `${player.age} years` : null,
          icon: Calendar,
        },
        {
          label: "Birthplace",
          value:
            player.birthplace?.city || player.birthplace?.country
              ? `${player.birthplace.city ?? ""}${
                  player.birthplace.city && player.birthplace.country
                    ? ", "
                    : ""
                }${player.birthplace.country ?? ""}`
              : null,
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
        { label: "Position", value: player.position?.name },
        { label: "Detailed Position", value: player.position?.detailed },
        {
          label: "Current Team",
          value: player.current_team?.name || null,
          icon: Shield,
        },
        {
          label: "Shirt Number",
          value: player.shirt_number,
          icon: Shirt,
        },
        {
          label: "Captain",
          value: player.is_captain ? "Yes" : null,
        },
        {
          label: "Market Value",
          value:
            player.market_value !== null
              ? `€${player.market_value.toLocaleString()}`
              : null,
        },
        {
          label: "Contract Until",
          value: player.contract?.until
            ? new Date(player.contract.until).getFullYear()
            : null,
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

  /* -------------------- Explicit Raw Fields -------------------- */

  return {
    /* ---------- Raw Player ---------- */
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

    /* ---------- Structured Objects ---------- */
    nationality: player?.nationality ?? null,
    birthplace: player?.birthplace ?? null,
    position: player?.position ?? null,
    contract: player?.contract ?? null,

    currentTeam: player?.current_team ?? null,
    teams: player?.teams ?? [],
    trophies: player?.trophies ?? [],

    /* ---------- UI-ready Rows ---------- */
    personalInfoRows,
    physicalRows,
    careerRows,
    statusRows,

    /* ---------- SWR State ---------- */
    isLoading: !data && !error,
    error,
  };
};

export default usePlayerOverview;
