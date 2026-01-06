import { useState } from "react";

import { ApiResponse } from "@/api/types";
import { TabList } from "@/components";
import { LeagueResponse, LeagueView } from "@/types/leagues";
import { LeaguesTabs } from "../constant";
import LeagueTab from "../leageTabs";

interface Props {
  initialLeagues: ApiResponse<LeagueResponse>;
}

const LeagueTabs: React.FC<Props> = ({ initialLeagues }) => {
  const [activeTab, setActiveTab] = useState<LeagueView>(LeagueView.OVERVIEW);

  return (
    <TabList
      tabs={LeaguesTabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      renderContent={
        <LeagueTab tab={activeTab} initialLeagues={initialLeagues} />
      }
    />
  );
};

export default LeagueTabs;
