"use client";

import React from "react";

import TeamTransfersTable from "../components/TeamTransfersTable";

interface Transfer {
  id: number;
  date: string;
  amount: string | null;
  completed: boolean;
  type: {
    id: number;
    code: string;
    label: string;
  };
  player: {
    id: number;
    name: string;
    image?: string;
  };
  from_team: {
    id: number;
    name: string;
    logo?: string;
  };
  to_team: {
    id: number;
    name: string;
    logo?: string;
  };
}

interface Props {
  teamId: number;
}

const TRANSFERS: Transfer[] = [
  {
    id: 537328,
    date: "2026-01-01",
    amount: null,
    completed: true,
    type: {
      id: 220,
      code: "free-transfer",
      label: "Free Transfer",
    },
    player: {
      id: 19642679,
      name: "Michael Schjonning-Larsen",
      image: "https://cdn.sportmonks.com/images/soccer/players/23/19642679.png",
    },
    from_team: {
      id: 4400,
      name: "Levadia",
      logo: "https://cdn.sportmonks.com/images/soccer/teams/16/4400.png",
    },
    to_team: {
      id: 180,
      name: "Kilmarnock",
      logo: "https://cdn.sportmonks.com/images/soccer/teams/20/180.png",
    },
  },
  {
    id: 526092,
    date: "2025-10-24",
    amount: null,
    completed: true,
    type: {
      id: 219,
      code: "transfer",
      label: "Transfer",
    },
    player: {
      id: 7026565,
      name: "Tyreece John-Jules",
      image: "https://cdn.sportmonks.com/images/soccer/players/5/7026565.png",
    },
    from_team: {
      id: 260131,
      name: "TBC",
      logo: "https://cdn.sportmonks.com/images/soccer/team_placeholder.png",
    },
    to_team: {
      id: 180,
      name: "Kilmarnock",
      logo: "https://cdn.sportmonks.com/images/soccer/teams/20/180.png",
    },
  },
  {
    id: 525921,
    date: "2025-10-22",
    amount: null,
    completed: true,
    type: {
      id: 218,
      code: "loan-transfer",
      label: "Loan",
    },
    player: {
      id: 37459066,
      name: "Oluwatobi Oluwayemi",
      image: "https://cdn.sportmonks.com/images/soccer/players/26/37459066.png",
    },
    from_team: {
      id: 256438,
      name: "Celtic II",
      logo: "https://cdn.sportmonks.com/images/soccer/teams/22/256438.png",
    },
    to_team: {
      id: 180,
      name: "Kilmarnock",
      logo: "https://cdn.sportmonks.com/images/soccer/teams/20/180.png",
    },
  },
];

const TeamTransfersTab: React.FC<Props> = ({ teamId }) => {
  return <TeamTransfersTable transfers={TRANSFERS} />;
};

export default TeamTransfersTab;
