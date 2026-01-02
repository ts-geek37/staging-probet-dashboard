"use client";

import { ApiResponse } from "@/api/types";
import { PlayerOverviewResponse } from "@/types/players";
import { usePlayerOverview } from "../hooks";

interface Props {
  initialData: ApiResponse<PlayerOverviewResponse>;
}

const PlayerOverviewTab: React.FC<Props> = ({ initialData }) => {
  const { player, isLoading } = usePlayerOverview(
    initialData.data?.id ?? 0,
    initialData,
  );

  if (isLoading || !player) return null;

  return (
    <div>
      <div>
        <p>Appearances: {player.current_season_summary.appearances}</p>
        <p>Goals: {player.current_season_summary.goals}</p>
        <p>Assists: {player.current_season_summary.assists}</p>
        <p>Minutes: {player.current_season_summary.minutes}</p>
      </div>

      <div>
        <p>Market value: {player.market_value ?? "N/A"}</p>
        <p>Contract end: {player.contract_end_year ?? "N/A"}</p>
      </div>
    </div>
  );
};

export default PlayerOverviewTab;
