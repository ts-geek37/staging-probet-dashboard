"use client";

import { ApiResponse } from "@/api/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TeamOverviewResponse } from "@/types/teams";

import { useTeamOverview } from "../hooks";

interface Props {
  initialData: ApiResponse<TeamOverviewResponse>;
}

const TeamOverviewTab: React.FC<Props> = ({ initialData }) => {
  const { team, sections } = useTeamOverview(
    initialData?.data?.id ?? 0,
    initialData,
  );
  if (!team) return null;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {sections.map((section) => (
        <Card
          key={section.key}
          className={cn(
            "bg-slate-800 text-white max-md:gap-4 border-none",
            section.colSpan,
          )}
        >
          <CardHeader>
            <CardTitle className="lg:text-lg font-semibold text-primary-green">
              {section.title}
            </CardTitle>
          </CardHeader>

          <CardContent className={`grid gap-4 ${section.columns}`}>
            {section.items.map((item) => (
              <div key={item.label} className="space-y-1 text-white/80">
                <p className="text-xs sm:text-sm font-medium tracking-wider text-muted-foreground">
                  {item.label}
                </p>

                {item.variant === "stat" ? (
                  <p className="text-xl sm:text-2xl font-bold tracking-tight">
                    {item.value}
                  </p>
                ) : (
                  <p className="text-sm sm:text-base font-medium">
                    {item.value}
                  </p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TeamOverviewTab;
