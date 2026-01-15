import { PredictionMatchCard, PredictionTab } from "@/types/prediction";

export const MOCK_MATCHES: PredictionMatchCard[] = [
  {
    id: 1,
    status: PredictionTab.TODAY,
    kickoff_time: "2026-01-06T14:00:00Z",
    minute: 88,
    home_team: {
      id: 1,
      name: "Arsenal",
      logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
      score: 3,
    },
    away_team: {
      id: 2,
      name: "Chelsea",
      logo: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
      score: 0,
    },
  },
  {
    id: 2,
    status: PredictionTab.TODAY,
    kickoff_time: "2026-01-06T16:30:00Z",
    minute: 24,
    home_team: {
      id: 3,
      name: "Liverpool",
      logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
      score: 1,
    },
    away_team: {
      id: 4,
      name: "Manchester United",
      logo: "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg",
      score: 1,
    },
  },
  {
    id: 3,
    status: PredictionTab.TODAY,
    kickoff_time: "2026-01-06T20:00:00Z",
    home_team: {
      id: 2,
      name: "Chelsea",
      logo: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
      score: 0,
    },
    away_team: {
      id: 1,
      name: "Arsenal",
      logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
      score: 0,
    },
  },
  {
    id: 4,
    status: PredictionTab.TOMORROW,
    kickoff_time: "2026-01-07T12:00:00Z",
    home_team: {
      id: 4,
      name: "Manchester United",
      logo: "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg",
    },
    away_team: {
      id: 3,
      name: "Liverpool",
      logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
    },
  },
  {
    id: 5,
    status: PredictionTab.TOMORROW,
    kickoff_time: "2026-01-07T15:00:00Z",
    home_team: {
      id: 1,
      name: "Arsenal",
      logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
    },
    away_team: {
      id: 4,
      name: "Manchester United",
      logo: "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg",
    },
  },
  {
    id: 6,
    status: PredictionTab.TOMORROW,
    kickoff_time: "2026-01-07T18:45:00Z",
    home_team: {
      id: 2,
      name: "Chelsea",
      logo: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
    },
    away_team: {
      id: 3,
      name: "Liverpool",
      logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
    },
  },
  {
    id: 7,
    status: PredictionTab.NEXT,
    kickoff_time: "2026-01-09T20:00:00Z",
    home_team: {
      id: 3,
      name: "Liverpool",
      logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
    },
    away_team: {
      id: 1,
      name: "Arsenal",
      logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
    },
  },
  {
    id: 8,
    status: PredictionTab.NEXT,
    kickoff_time: "2026-01-10T14:00:00Z",
    home_team: {
      id: 4,
      name: "Manchester United",
      logo: "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg",
    },
    away_team: {
      id: 2,
      name: "Chelsea",
      logo: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
    },
  },
  {
    id: 9,
    status: PredictionTab.NEXT,
    kickoff_time: "2026-01-11T16:00:00Z",
    home_team: {
      id: 1,
      name: "Arsenal",
      logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
    },
    away_team: {
      id: 3,
      name: "Liverpool",
      logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
    },
  },
  {
    id: 10,
    status: PredictionTab.NEXT,
    kickoff_time: "2026-01-12T19:30:00Z",
    home_team: {
      id: 2,
      name: "Chelsea",
      logo: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
    },
    away_team: {
      id: 4,
      name: "Manchester United",
      logo: "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg",
    },
  },
  {
    id: 11,
    status: PredictionTab.NEXT,
    kickoff_time: "2026-01-15T20:00:00Z",
    home_team: {
      id: 3,
      name: "Liverpool",
      logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
    },
    away_team: {
      id: 2,
      name: "Chelsea",
      logo: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
    },
  },
  {
    id: 12,
    status: PredictionTab.NEXT,
    kickoff_time: "2026-01-18T13:00:00Z",
    home_team: {
      id: 1,
      name: "Arsenal",
      logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
    },
    away_team: {
      id: 4,
      name: "Manchester United",
      logo: "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg",
    },
  },
];
