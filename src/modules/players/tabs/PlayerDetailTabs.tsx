import { ApiResponse } from "@/api/types";
import { PlayerDetailView, PlayerProfileResponse } from "@/types/players";

import PlayerMatchesTab from "./PlayerMatchesTab";
import PlayerOverviewTab from "./PlayerOverviewTab";
import PlayerStatsTab from "./PlayerStatsTab";
import PlayerTransferTab from "./PlayerTransferTab";

interface Props {
  activeTab: PlayerDetailView;
  playerId: number;
  initialData: ApiResponse<PlayerProfileResponse>;
}

const PlayerDetailTabs: React.FC<Props> = ({
  activeTab,
  playerId,
  initialData,
}) => {
  switch (activeTab) {
    case PlayerDetailView.STATS:
      return <PlayerStatsTab playerId={playerId} />;

    case PlayerDetailView.MATCHES:
      return <PlayerMatchesTab playerId={playerId} />;

    case PlayerDetailView.TRANSFERS:
      return <PlayerTransferTab playerId={playerId} />;

    case PlayerDetailView.Profile:
    default:
      return <PlayerOverviewTab initialData={initialData} />;
  }
};

export default PlayerDetailTabs;
