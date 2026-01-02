import { useState } from "react";

import { ApiResponse } from "@/api/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LeagueResponse, LeagueView } from "@/types/leagues";

import { LeagueTabs } from "../constant";
import LeagueTab from "../leageTabs";

interface Props {
  initialLeagues: ApiResponse<LeagueResponse>;
}

const TabList: React.FC<Props> = ({ initialLeagues }) => {
  const [activeTab, setActiveTab] = useState<LeagueView>(LeagueView.OVERVIEW);

  const handleTabChange = (value: string) => {
    setActiveTab(value as LeagueView);
  };

  const id = initialLeagues?.data?.league?.id ?? 0;

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="bg-transparent flex gap-2 overflow-x-auto whitespace-nowrap rounded-none justify-start h-auto p-0 flex-wrap">
        {LeagueTabs.map(({ value, label }) => (
          <TabsTrigger
            key={value}
            value={value}
            className="w-24 rounded-xl px-4 py-2 text-sm sm:text-base font-medium text-white bg-gray-900 border border-primary-green data-[state=active]:bg-primary-green shrink-0"
          >
            {label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value={activeTab} className="mt-6">
        <LeagueTab tab={activeTab} initialLeagues={initialLeagues} />
      </TabsContent>
    </Tabs>
  );
};

export default TabList;
