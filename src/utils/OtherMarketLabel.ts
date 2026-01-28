const OtherMarketLabel = (label: string, home: string, away: string) => {
  const map: Record<string, string> = {
    home_home: `${home} HT / ${home} FT`,
    home_away_ft: `${home} HT / ${away} FT`,
    home_draw: `${home} HT / Draw FT`,
    away_home: `${away} HT / ${home} FT`,
    away_away: `${away} HT / ${away} FT`,
    away_draw: `${away} HT / Draw FT`,
    draw_home_ft: `Draw HT / ${home} FT`,
    draw_away_ft: `Draw HT / ${away} FT`,
    draw_draw: `Draw HT / Draw FT`,

    home_away: `${home} or ${away} Win`,
    draw_home: `Draw or ${home} Win`,
    draw_away: `Draw or ${away} Win`,
  };

  return map[label] ?? label;
};

export default OtherMarketLabel;
