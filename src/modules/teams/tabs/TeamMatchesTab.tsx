"use client";

import { useRouter } from "next/navigation";

import { Card } from "@/components/ui/card";

import { useTeamMatches } from "../hooks";

const TeamMatchesTab = ({ teamId }: { teamId: number }) => {
  const { sections } = useTeamMatches(teamId);
  const router = useRouter();
  if (!sections) return null;

  return (
    <div className="space-y-10">
      {sections.map((section) => (
        <div key={section?.key} className="space-y-4">
          <h3 className="text-sm font-semibold">{section?.title}</h3>

          <div className="space-y-3">
            {section?.matches.map((match) => (
              <Card
                key={match.match_id}
                onClick={() => router.push(`/matches/${match.match_id}`)}
                className="group flex-row bg-slate-800 items-center justify-between px-4 py-3 border border-transparent transition-colors hover:border-primary-green cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-green/5 text-xs text-primary-green/80 transition-colors group-hover:text-primary-green group-hover:bg-primary-green/20 font-semibold">
                    {match?.opponent.charAt(0).toUpperCase()}
                  </div>

                  <div className="flex flex-col">
                    <p className="text-sm text-white transition-colors group-hover:text-primary-green font-medium">
                      <span className="text-white">
                        {match.home_away === "home" ? "vs" : "@"}
                      </span>{" "}
                      {match.opponent}
                    </p>
                    {section.key === "upcoming" ? (
                      <p className="text-xs text-muted-foreground">
                        {match.competition}
                      </p>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        {new Date(match.kickoff_time).toLocaleDateString([], {
                          month: "short",
                          day: "2-digit",
                        })}
                      </p>
                    )}
                  </div>
                </div>

                <div className="text-right text-white/70 text-sm font-semibold">
                  {match.score ? (
                    <p className="transition-colors group-hover:text-primary-green">
                      {match.score}
                    </p>
                  ) : (
                    <p className="flex flex-col gap-1 text-primary-green">
                      {new Date(match.kickoff_time).toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: false,
                      })}
                      <span className="text-xs text-muted-foreground">
                        {new Date(match.kickoff_time).toLocaleDateString([], {
                          month: "short",
                          day: "2-digit",
                        })}
                      </span>
                    </p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamMatchesTab;
