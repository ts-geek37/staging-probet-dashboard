"use client";

import { ApiResponse } from "@/api/types";
import { TeamOverviewResponse } from "@/types/teams";

interface Props {
  initialData: ApiResponse<TeamOverviewResponse>;
}

const TeamOverviewTab: React.FC<Props> = ({ initialData }) => {
  if (!initialData.success || !initialData.data) return null;

  const team = initialData.data;

  return (
    <div>
      <div>
        <p>Played: {team.season_summary.played}</p>
        <p>Won: {team.season_summary.won}</p>
        <p>Drawn: {team.season_summary.drawn}</p>
        <p>Lost: {team.season_summary.lost}</p>
      </div>

      <div>
        <p>Goals scored: {team.key_stats.goals_scored}</p>
        <p>Goals conceded: {team.key_stats.goals_conceded}</p>
        <p>Clean sheets: {team.key_stats.clean_sheets}</p>
        <p>Goal difference: {team.key_stats.goal_difference}</p>
      </div>

      <div>
        {team.recent_matches.map((match) => (
          <div key={match.match_id}>
            <p>{match.opponent}</p>
            <p>{match.score ?? "TBD"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamOverviewTab;
