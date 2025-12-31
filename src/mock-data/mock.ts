export interface MatchProps {
  teamA: string;
  teamB: string;
  scoreA: number;
  scoreB: number;
  teamALogo?: string;
  teamBLogo?: string;
  livePercentageA: number;
  livePercentageB: number;
}
export const liveMatchCardsMock: MatchProps[] = [
  {
    teamA: "Real Madrid",
    teamB: "Barcelona",
    scoreA: 3,
    scoreB: 3,
    livePercentageA: 45,
    livePercentageB: 55,
    teamALogo:
      "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
    teamBLogo:
      "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
  },
  {
    teamA: "Manchester United",
    teamB: "Liverpool",
    scoreA: 3,
    scoreB: 1,
    livePercentageA: 90,
    livePercentageB: 10,
    teamALogo:
      "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg",
    teamBLogo:
      "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
  },
];

export interface UpcomingMatchProps {
  date: string;
  time: string;
  teamA: string;
  teamB: string;
  scoreA: number;
  scoreB: number;
  teamALogo: string;
  teamBLogo: string;
}

export const upcomingMatchCardsMock: UpcomingMatchProps[] = [
  {
    date: "Dec 19, 2025",
    time: "08:00",
    teamA: "Manchester United",
    teamB: "Barcelona",
    scoreA: 0,
    scoreB: 0,
    teamALogo:
      "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg",
    teamBLogo:
      "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
  },
  {
    date: "Dec 19, 2025",
    time: "16:00",
    teamA: "Real Madrid",
    teamB: "Liverpool",
    scoreA: 0,
    scoreB: 0,
    teamALogo:
      "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
    teamBLogo:
      "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
  },
  {
    date: "Dec 19, 2025",
    time: "20:00",
    teamA: "Bayern Munich",
    teamB: "Marseille",
    scoreA: 0,
    scoreB: 0,
    teamALogo:
      "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg",
    teamBLogo:
      "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
  },
];
