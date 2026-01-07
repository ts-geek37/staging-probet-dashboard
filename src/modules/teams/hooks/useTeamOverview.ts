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

  const teamInfo = team
    ? [
        { label: "Name", value: team.name ?? "N/A" },
        { label: "Short Code", value: team.short_code ?? "N/A" },
        { label: "Founded", value: team.founded ?? "N/A" },
        { label: "Country", value: team.country?.name ?? "N/A" },
      ]
    : [];

  const venueInfo = team
    ? [
        { label: "Stadium", value: team.stadium?.name ?? "N/A" },
        {
          label: "Capacity",
          value: team.stadium?.capacity?.toLocaleString() ?? "N/A",
        },
      ]
    : [];

  const seasonInfo = team
    ? [{ label: "Current Season", value: team.current_season?.name ?? "N/A" }]
    : [];

  const sections: OverviewSection[] = useMemo(
    () => [
      {
        key: "team-info",
        title: "Team Information",
        columns: "grid-cols-2",
        items: teamInfo.map((item) => ({ ...item, variant: "default" })),
      },
      {
        key: "venue-info",
        title: "Venue & Infrastructure",
        columns: "grid-cols-2",
        items: venueInfo.map((item) => ({ ...item, variant: "default" })),
      },
      {
        key: "season-info",
        title: "Season Information",
        columns: "grid-cols-1 sm:grid-cols-2",
        items: seasonInfo.map((item) => ({ ...item, variant: "default" })),
      },
    ],
    [teamInfo, venueInfo, seasonInfo],
  );

  return {
    team,
    sections,
    isLoading: !data && !error,
    error,
  };
};

export default useTeamOverview;
