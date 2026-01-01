import React from 'react';
import { LeagueTeams } from '@/types/leagues';

interface Props {
  data?: LeagueTeams;
}

const Teams: React.FC<Props> = ({ data }) => {
  return (
    <div className="space-y-4 text-white">
      <h2 className="text-xl font-semibold">Teams</h2>
    </div>
  );
};

export default Teams;
