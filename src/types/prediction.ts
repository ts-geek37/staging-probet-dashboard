export enum PredictionTab {
  TODAY = "TODAY",
  TOMORROW = "TOMORROW",
  NEXT = "NEXT",
}

export type PredictionCardVariant = "prediction" | "vip";

export interface TeamSide {
  id: number;
  name: string;
  logo: string;
  score?: number;
}

export interface PredictionMatchCard {
  id: number;
  status: PredictionTab;
  kickoff_time: string;
  minute?: number;
  home_team: TeamSide;
  away_team: TeamSide;
}
