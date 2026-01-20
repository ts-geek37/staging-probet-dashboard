"use client";

import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import { TeamPlayer, TeamPlayersResponse } from "@/types/teams";

type SquadSection = {
  key: string;
  label: string;
  players: TeamPlayer[];
};

const useTeamPlayers = (teamId: number) => {
  const { data, error } = useSWR<ApiResponse<TeamPlayersResponse>>(
    `/api/v2/teams/${teamId}/players`,
  );

  const isLoading = !data && !error;

  const players: TeamPlayer[] = data?.data?.players ?? [];
  const sections: SquadSection[] = Object.values(
    players
      .reduce<SquadSection[]>((acc, player) => {
        const positionLabel = player.position?.label ?? "Unknown";
        const section = acc.find((s) => s.key === positionLabel);

        if (section) {
          section.players.push(player);
        } else {
          acc.push({
            key: positionLabel,
            label: positionLabel,
            players: [player],
          });
        }

        return acc;
      }, [])
      .sort((a, b) => b.players.length - a.players.length),
  );

  return {
    players,
    sections,
    isLoading,
    error,
  };
};

export default useTeamPlayers;
