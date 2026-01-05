"use client";

import { useMemo } from "react";
import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import { TeamDetailView, TeamOverviewResponse } from "@/types/teams";

export interface OverviewSection {
  key: string;
  title: string;
  columns: string;
  colSpan?: string;
  items: {
    label: string;
    value: string | number;
    variant: "default" | "stat";
  }[];
}

const useTeamOverview = (
  teamId: number,
  initialData?: ApiResponse<TeamOverviewResponse>,
) => {
  const response = useSWR<ApiResponse<TeamOverviewResponse>>(
    `/api/teams/${teamId}?view=${TeamDetailView.OVERVIEW}`,
    {
      fallbackData: initialData,
      revalidateOnMount: false,
    },
  );
  const team = response.data?.data ?? null;

  const teamInfo = team
    ? [
        { label: "Country", value: team?.country ?? "N/A" },
        { label: "Founded", value: team?.founded ?? "N/A" },
        { label: "League", value: team?.league?.name ?? "N/A" },
        { label: "Season", value: team?.league?.season ?? "N/A" },
      ]
    : [];

  const venueInfo = team
    ? [
        { label: "Stadium", value: team?.stadium?.name ?? "N/A" },
        {
          label: "Capacity",
          value: team?.stadium?.capacity?.toLocaleString() ?? "N/A",
        },
      ]
    : [];

  const performanceStats = team
    ? [
        { label: "Played", value: team?.season_summary?.played ?? 0 },
        { label: "Won", value: team?.season_summary?.won ?? 0 },
        { label: "Drawn", value: team?.season_summary?.drawn ?? 0 },
        { label: "Lost", value: team?.season_summary?.lost ?? 0 },
        { label: "Goals Scored", value: team?.key_stats?.goals_scored ?? 0 },
        {
          label: "Goals Conceded",
          value: team?.key_stats?.goals_conceded ?? 0,
        },
        { label: "Clean Sheets", value: team?.key_stats?.clean_sheets ?? 0 },
        {
          label: "Goal Difference",
          value: team?.key_stats?.goal_difference ?? 0,
        },
      ]
    : [];

  const sections: OverviewSection[] = useMemo(
    () => [
      {
        key: "team-info",
        title: "Team Information",
        columns: "grid-cols-2",
        items: teamInfo.map((item) => ({
          ...item,
          variant: "default",
        })),
      },
      {
        key: "venue-info",
        title: "Venue & Infrastructure",
        columns: "grid-cols-2",
        items: venueInfo.map((item) => ({
          ...item,
          variant: "default",
        })),
      },
      {
        key: "performance",
        title: "Performance Summary",
        columns: "grid-cols-2 sm:grid-cols-4",
        colSpan: "md:col-span-2",
        items: performanceStats.map((item) => ({
          ...item,
          variant: "stat",
        })),
      },
    ],
    [teamInfo, venueInfo, performanceStats],
  );

  return {
    team,
    teamInfo,
    venueInfo,
    performanceStats,
    sections,
    isLoading: !response.data && !response.error,
    error: response.error,
  };
};

export default useTeamOverview;
