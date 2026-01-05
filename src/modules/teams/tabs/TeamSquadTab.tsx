"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Card } from "@/components/ui/card";

import { useTeamPlayers } from "../hooks";

const TeamSquadTab = ({ teamId }: { teamId: number }) => {
  const { sections } = useTeamPlayers(teamId);
  const router = useRouter();

  if (!sections.length) return null;

  return (
    <div className="space-y-8">
      {sections.map((section) => (
        <div key={section.key} className="space-y-4">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold">{section.label}</h3>
            <span className="rounded-full bg-primary-green/30 px-2 py-0.5 text-xs text-primary-green">
              {section.players.length}
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {section.players.map((player) => (
              <Card
                key={player.player_id}
                onClick={() => router.push(`/players/${player.player_id}`)}
                className="group flex-row p-3 bg-slate-800 w-full border border-transparent transition-colors hover:border-primary-green cursor-pointer"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-green/5 text-primary-green font-semibold transition-colors group-hover:bg-primary-green/20">
                  {player.shirt_number ?? "-"}
                </div>

                <div className="flex justify-between items-center flex-1 gap-4">
                  <div className="flex flex-col">
                    <p className="text-sm text-white transition-colors group-hover:text-primary-green font-medium">
                      {player.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {player.position}
                    </p>
                  </div>
                  <div>
                    <Image
                      src={player.flagUrl}
                      alt={player.nationality}
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamSquadTab;
