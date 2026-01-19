export enum LiveScopeEnum {
  GENERAL = "general",
  LEAGUE = "league",
  TEAM = "team",
}

export type LiveScope =
  | LiveScopeEnum.GENERAL
  | LiveScopeEnum.LEAGUE
  | LiveScopeEnum.TEAM;

export interface LiveMatchesScopeProps {
  scope: LiveScope;
  id?: number;
}
