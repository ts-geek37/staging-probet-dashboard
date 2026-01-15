import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LeagueView } from "@/types/leagues";

import { LeagueTabs } from "../constant";
import LeagueTab from "../leageTabs";

interface Props {
  id: number;
}

const TabList: React.FC<Props> = ({ id }) => {
  const [activeTab, setActiveTab] = useState<LeagueView>(LeagueView.STANDINGS);

  const handleTabChange = (value: string) => {
    setActiveTab(value as LeagueView);
  };
  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="bg-transparent flex gap-2 overflow-x-auto whitespace-nowrap rounded-none justify-start h-auto p-0 flex-wrap">
        {LeagueTabs.map(({ value, label }) => (
          <TabsTrigger
            key={value}
            value={value}
            className="min-w-24 w-fit rounded-xl px-6 py-2 text-sm sm:text-base font-medium text-white bg-gray-900 border border-primary-green data-[state=active]:bg-primary-green shrink-0"
          >
            {label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value={activeTab} className="mt-6">
        <LeagueTab tab={activeTab} id={id} />
      </TabsContent>
    </Tabs>
  );
};

export default TabList;
