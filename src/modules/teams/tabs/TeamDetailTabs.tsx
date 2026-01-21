import { ApiResponse } from "@/api/types";
import { TeamDetailView, TeamOverviewResponse } from "@/types/teams";

import TeamMatchesTab from "./TeamMatchesTab";
import TeamOverviewTab from "./TeamOverviewTab";
import TeamSquadTab from "./TeamSquadTab";
import TeamStatsTab from "./TeamStatsTab";
import TeamTransfersTab from "./TeamTransfers";

interface Props {
  activeTab: TeamDetailView;
  teamId: number;
  initialData: ApiResponse<TeamOverviewResponse>;
}

const TeamDetailTabs = ({ activeTab, teamId, initialData }: Props) => {
  switch (activeTab) {
    case TeamDetailView.OVERVIEW:
      return <TeamOverviewTab initialData={initialData} />;

    case TeamDetailView.MATCHES:
      return (
        <TeamMatchesTab
          teamId={teamId}
          teamName={initialData?.data?.name ?? ""}
        />
      );

    case TeamDetailView.SQUAD:
      return <TeamSquadTab teamId={teamId} />;

    case TeamDetailView.STATS:
      return <TeamStatsTab teamId={teamId} />;

    case TeamDetailView.TRANSFERS:
      return <TeamTransfersTab teamId={teamId} />;

    default:
      return null;
  }
};

export default TeamDetailTabs;
