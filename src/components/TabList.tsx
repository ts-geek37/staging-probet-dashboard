import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export interface TabConfig<T extends string> {
  value: T;
  label: string;
}

interface TabsProps<T extends string> {
  tabs: TabConfig<T>[];
  activeTab: T;
  onTabChange: (tab: T) => void;
  renderContent: React.ReactNode;
}

const TabList = <T extends string>({
  tabs,
  activeTab,
  onTabChange,
  renderContent,
}: TabsProps<T>) => {
  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => onTabChange(value as T)}
      className="w-full"
    >
      <TabsList className="bg-transparent flex gap-2 overflow-x-auto whitespace-nowrap rounded-none justify-start h-auto p-0 flex-wrap">
        {tabs.map(({ value, label }) => (
          <TabsTrigger
            key={value}
            value={value}
            className="w-24 rounded-xl px-4 py-2 text-sm sm:text-base font-medium
              text-white bg-gray-900 border border-primary-green
              data-[state=active]:bg-primary-green shrink-0"
          >
            {label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value={activeTab} className="mt-6">
        {renderContent}
      </TabsContent>
    </Tabs>
  );
};

export default TabList;
