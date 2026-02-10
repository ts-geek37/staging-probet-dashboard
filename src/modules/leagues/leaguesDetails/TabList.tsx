import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LeagueProfileResponse, LeagueView } from "@/types/leagues";

import { LeagueTabs } from "../constant";
import LeagueTab from "../leagueTabs";

interface Props {
  league: LeagueProfileResponse;
}

const TabList: React.FC<Props> = ({ league }) => {
  const [activeTab, setActiveTab] = useState<LeagueView>(LeagueView.STANDINGS);

  const filteredTabs = LeagueTabs.filter((tab) => {
    if (tab.value === LeagueView.TOP_SCORERS) return !!league.hasTopScorer;
    if (tab.value === LeagueView.RED_CARDS) return !!league.hasRedCard;
    if (tab.value === LeagueView.YELLOW_CARDS) return !!league.hasYellowCard;
    return true;
  });

  const handleTabChange = (value: string) => {
    setActiveTab(value as LeagueView);
  };
  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="bg-transparent flex gap-2 overflow-x-auto whitespace-nowrap rounded-none justify-start h-auto p-0 flex-wrap">
        {filteredTabs.map(({ value, label }) => (
          <TabsTrigger
            key={value}
            value={value}
            className="min-w-24 w-fit rounded-xl px-6 py-2 text-sm sm:text-base font-medium text-white bg-primary-bg border border-primary-gray/20 data-[state=active]:bg-primary-green shrink-0"
          >
            {label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value={activeTab} className="mt-6">
        <LeagueTab tab={activeTab} id={league.id} />
      </TabsContent>
    </Tabs>
  );
};

export default TabList;
