"use client";

import { useMemo } from "react";
import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import { TeamOverviewResponse, OverviewSection } from "@/types/teams";

export const useTeamOverview = (
  teamId: number,
  initialData?: ApiResponse<TeamOverviewResponse>,
) => {
  const { data, error } = useSWR<ApiResponse<TeamOverviewResponse>>(
    `/api/v2/teams/${teamId}`,
    {
      fallbackData: initialData,
      revalidateOnMount: false,
    },
  );

  const team = data?.data ?? null;

  const sections: OverviewSection[] = useMemo(() => {
    if (!team) return [];

    const teamInfo = [
      { label: "Name", value: team.name ?? "N/A" },
      { label: "Short Code", value: team.short_code ?? "N/A" },
      { label: "Founded", value: team.founded ?? "N/A" },
      {
        label: "Country",
        value: team.country?.name ?? "N/A",
        image: team.country?.flag,
      },
      { label: "Logo", value: "", image: team.logo },
    ];

    const venueInfo = [
      {
        label: "Stadium",
        value: team.stadium?.name ?? "N/A",
      },
      {
        label: "Capacity",
        value: team.stadium?.capacity?.toLocaleString() ?? "N/A",
      },
      {
        label: "Stadium Image",
        value: "",
        image: team.stadium?.image || "/football-stadium.png", // fallback image
      },
    ];

    const seasonsInfo =
      team.current_seasons?.map((season) => ({
        label: season.name,
        value: season.league.name,
        image: season.league.logo,
        extra: `${season.starting_at ? `Start: ${season.starting_at}` : ""} ${season.starting_at && season.ending_at ? "|" : ""} ${season.ending_at ? `End: ${season.ending_at}` : ""}`,
      })) ?? [];

    const rankingsInfo =
      team.rankings?.map((r) => ({
        label: r.name,
        value: r.rank ? `Rank: ${r.rank}` : "Unranked",
        extra: r.points ? `${r.points} Points` : undefined,
      })) ?? [];

    const rivalsInfo =
      team.rivals?.map((r) => ({
        label: r.name,
        value: r.type ?? "Rival",
        image: r.logo,
      })) ?? [];

    const socialsInfo =
      team.socials?.map((s) => ({
        label: s.channel.name,
        value: s.handle,
        type: "badge",
        extra: s.url,
        color: s.channel.color,
      })) ?? [];

    return [
      {
        key: "team-info",
        title: "Team Information",
        columns: "grid-cols-2",
        items: teamInfo.map((item) => ({ ...item, variant: "default" })),
      },
      {
        key: "venue-info",
        title: "Venue & Stadium",
        columns: "grid-cols-2",
        items: venueInfo.map((item) => ({ ...item, variant: "default" })),
      },
      {
        key: "seasons-info",
        title: "Current Seasons",
        columns: "grid-cols-1 sm:grid-cols-2",
        items: seasonsInfo.map((item) => ({ ...item, variant: "default" })),
      },
      {
        key: "rankings-info",
        title: "Rankings",
        columns: "grid-cols-1 sm:grid-cols-2",
        items: rankingsInfo.map((item) => ({ ...item, variant: "default" })),
      },
      {
        key: "rivals-info",
        title: "Rivals",
        columns: "grid-cols-1 sm:grid-cols-2",
        items: rivalsInfo.map((item) => ({ ...item, variant: "default" })),
      },
      {
        key: "socials-info",
        title: "Social Links",
        columns: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        items: socialsInfo.map((item) => ({ ...item, variant: "default" })),
      },
    ];
  }, [team]);

  return {
    team,
    sections,
    isLoading: !data && !error,
    error,
  };
};

export default useTeamOverview;
