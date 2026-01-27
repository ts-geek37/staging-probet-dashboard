export const MARKET_COLORS: Record<string, string> = {
  yes: "bg-primary-green",
  over: "bg-primary-green",
  home: "bg-primary-green",
  home_home: "bg-primary-green",
  draw_home: "bg-primary-green",

  equal: "bg-primary-yellow",
  draw: "bg-primary-yellow",
  draw_draw: "bg-primary-yellow",
  home_draw: "bg-primary-yellow",
  away_draw: "bg-primary-yellow",

  no: "bg-primary-red",
  under: "bg-primary-red",
  away: "bg-primary-red",
  away_away: "bg-primary-red",
  away_home: "bg-primary-red",
  home_away: "bg-primary-red",
  draw_away: "bg-primary-red",
};

export const MARKET_PRIORITY_ORDER = ["yes", "no", "equal"];
