import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LeagueView } from "@/types/leagues";
import { useState } from "react";
import { LeagueTabs } from "../constant";
import LeagueTab from "../leageTabs";

type Props = {};

const TabList: React.FC<Props> = () => {
  const [activeTab, setActiveTab] = useState<LeagueView>(LeagueView.OVERVIEW);

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as LeagueView)}
      className="w-full"
    >
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
        <LeagueTab tab={activeTab} />
      </TabsContent>
    </Tabs>
  );
};

export default TabList;
