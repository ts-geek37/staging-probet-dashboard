"use client";

import { useMemo } from "react";
import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import { TeamDetailView, TeamStatsResponse } from "@/types/teams";

const useTeamStats = (teamId: number) => {
  const response = useSWR<ApiResponse<TeamStatsResponse>>(
    `/api/teams/${teamId}?view=${TeamDetailView.STATS}`,
  );

  const stats = response.data?.data?.stats ?? null;

  const overviewStats = useMemo(
    () => [
      {
        label: "Played",
        value: stats?.matches_played ?? 0,
        color: "text-white",
      },
      {
        label: "Won",
        value: stats?.wins ?? 0,
        color: "text-green-500",
      },
      {
        label: "Drawn",
        value: stats?.draws ?? 0,
        color: "text-yellow-400",
      },
      {
        label: "Lost",
        value: stats?.losses ?? 0,
        color: "text-red-500",
      },
    ],
    [stats],
  );
  const goalStats = useMemo(() => {
    return [
      {
        label: "Scored",
        value: stats?.goals_scored ?? 0,
      },
      {
        label: "Conceded",
        value: stats?.goals_conceded ?? 0,
      },
      {
        label: "Goal Difference",
        value: Math.abs(stats?.goal_difference ?? 0),
      },
    ];
  }, [stats]);

  const performanceStats = useMemo(() => {
    if (!stats) return [];

    const {
      clean_sheets,
      possession_percentage,
      pass_accuracy_percentage,
      average_shots,
    } = stats;

    return [
      {
        label: "Clean Sheets",
        value: clean_sheets,
      },
      {
        label: "Possession",
        value: `${possession_percentage}%`,
      },
      {
        label: "Pass Accuracy",
        value: `${pass_accuracy_percentage}%`,
      },
      {
        label: "Avg Shots",
        value: average_shots,
      },
    ];
  }, [stats]);

  return {
    overviewStats,
    goalStats,
    performanceStats,
    stats,
    isLoading: !response.data && !response.error,
    error: response.error,
  };
};

export default useTeamStats;
