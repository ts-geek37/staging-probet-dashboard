"use client";

import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import {
  PlayerPosition,
  TeamDetailView,
  TeamPlayerSummary,
  TeamSquadResponse,
} from "@/types/teams";
import { getFlagUrlByName } from "@/utils/countryFlag";

type playerWithFlag = TeamPlayerSummary & { flagUrl: string };
interface SquadSection {
  key: PlayerPosition;
  label: string;
  players: playerWithFlag[];
}

const useTeamPlayers = (teamId: number) => {
  const response = useSWR<ApiResponse<TeamSquadResponse>>(
    `/api/teams/${teamId}?view=${TeamDetailView.SQUAD}`,
  );
  const squad = response.data?.data?.squad ?? [];
  const sections: SquadSection[] = squad.reduce((acc, player) => {
    const existingSection = acc.find(
      (section) => section.key === player.position,
    );
    const country = player?.nationality;
    const flagUrl = getFlagUrlByName(country);
    const playerWithFlag = { ...player, flagUrl };

    if (existingSection) {
      existingSection.players.push(playerWithFlag);
    } else {
      acc.push({
        key: player.position,
        label: player.position,
        players: [playerWithFlag],
      });
    }

    return acc;
  }, [] as SquadSection[]);

  return {
    sections,
    players: squad,
    isLoading: !response.data && !response.error,
    error: response.error,
  };
};

export default useTeamPlayers;
