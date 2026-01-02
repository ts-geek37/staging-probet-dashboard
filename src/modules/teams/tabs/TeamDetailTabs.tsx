import { ApiResponse } from "@/api/types";
import { TeamDetailView, TeamOverviewResponse } from "@/types/teams";

import TeamOverviewTab from "./TeamOverviewTab";
import TeamMatchesTab from "./TeamMatchesTab";
import TeamSquadTab from "./TeamSquadTab";
import TeamStatsTab from "./TeamStatsTab";

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
      return <TeamMatchesTab teamId={teamId} />;

    case TeamDetailView.SQUAD:
      return <TeamSquadTab teamId={teamId} />;

    case TeamDetailView.STATS:
      return <TeamStatsTab teamId={teamId} />;

    default:
      return null;
  }
};

export default TeamDetailTabs;
