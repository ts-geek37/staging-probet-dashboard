"use client";

import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import {
  PlayerApi,
  PlayerWithFlag,
  SquadSection,
  TeamPlayersResponse,
} from "@/types/teams";
import { getFlagUrlByName } from "@/utils/countryFlag";

const useTeamPlayers = (teamId: number) => {
  const { data, error } = useSWR<ApiResponse<TeamPlayersResponse>>(
    `/api/v2/teams/${teamId}/players`,
  );

  const isLoading = !data && !error;

  const players: PlayerWithFlag[] =
    data?.data?.players.map((p: PlayerApi) => ({
      ...p,
      flagUrl: getFlagUrlByName(p.nationality),
    })) ?? [];

  const sections: SquadSection[] = players.reduce(
    (acc: SquadSection[], player) => {
      const posLabel = player.position?.label ?? "Unknown";
      const existing = acc.find((s) => s.key === posLabel);
      if (existing) existing.players.push(player);
      else acc.push({ key: posLabel, label: posLabel, players: [player] });
      return acc;
    },
    [],
  );

  return { players, sections, isLoading, error };
};

export default useTeamPlayers;
