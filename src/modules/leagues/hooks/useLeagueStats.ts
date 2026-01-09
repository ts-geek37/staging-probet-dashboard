import { useMemo, useState } from "react";
import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import {
  LeagueSeasonStatistics,
  LeagueStatisticsResponse,
  LeagueView,
} from "@/types/leagues";

import { disciplineStatMap, scoringStatMap, statsConfigMap } from "../constant";

interface IStat {
  value: number;
  label: string;
  valueClassName?: string;
  suffix?: string;
}

const useLeagueStats = (leagueId: number) => {
  const response = useSWR<ApiResponse<LeagueStatisticsResponse>>(
    `/api/v2/leagues/${leagueId}/${LeagueView.STATISTICS}`,
  );

  const stats = response.data?.data ?? null;
  const seasons = stats?.seasons ?? [];

  const [selectedSeasonId, setSelectedSeasonId] = useState<number | null>(null);

  const seasonOptions = useMemo(() => {
    return seasons.map((season) => ({
      value: String(season.season.id),
      label: String(season.season.name),
    }));
  }, [seasons]);

  const currentSeason = useMemo(() => {
    if (seasons.length === 0) return null;

    if (selectedSeasonId) {
      return (
        seasons.find((s) => s.season.id === selectedSeasonId) ?? seasons[0]
      );
    }

    return seasons[0];
  }, [seasons, selectedSeasonId]);

  const statsConfig = useMemo<IStat[]>(() => {
    if (!currentSeason?.overview) return [];

    return Object.entries(statsConfigMap)
      .map(([key, label]) => {
        const value =
          currentSeason.overview[key as keyof typeof statsConfigMap];
        if (!value) return null;

        return {
          value,
          label: label as string,
        };
      })
      .filter((item): item is IStat => item !== null);
  }, [currentSeason]);

  const scoringStats = useMemo(() => {
    if (!currentSeason?.scoring) return [];

    return Object.entries(scoringStatMap).flatMap(([key, config]) => {
      const value =
        currentSeason.scoring[key as keyof typeof currentSeason.scoring];

      if (value == null) return [];

      return [
        {
          value,
          label: config.label,
          suffix: config.suffix,
        },
      ];
    });
  }, [currentSeason]);

  const disciplineStats = useMemo<IStat[]>(() => {
    if (!currentSeason?.discipline) return [];

    return Object.entries(disciplineStatMap).flatMap(([key, config]) => {
      const value =
        currentSeason.discipline[key as keyof typeof currentSeason.discipline];
      if (!value) return [];

      return {
        value,
        label: config.label as string,
        valueClassName: config.valueClassName as string,
      };
    });
  }, [currentSeason]);

  const hasNoStats =
    currentSeason &&
    !currentSeason.overview.matches_played &&
    !currentSeason.overview.total_goals;

  return {
    stats,
    currentSeason,
    seasonOptions,
    selectedSeasonId: selectedSeasonId ?? seasonOptions[0]?.value ?? null,
    setSelectedSeasonId,
    disciplineStats,
    scoringStats,
    statsConfig,
    isEmpty: seasons.length === 0,
    hasNoStats,
    isLoading: !response.data && !response.error,
    error: response.error,
  };
};
export default useLeagueStats;
