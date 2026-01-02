import { getLeagues } from "@/api/leagues";
import { LeaguesBrowse } from "@/modules/leagues";
import { seo } from "@/utils/seo";

export const metadata = seo({
  title: "Leagues | ProBets",
  description:
    "Browse all major football leagues worldwide including Premier League, La Liga, Serie A, Bundesliga, Ligue 1, and more. Get fixtures, live scores, standings, and expert predictions on ProBets.",
});

const LeaguesPage = async () => {
  const response = await getLeagues({
    page: 1,
    limit: 12,
  });
  const initialLeagues = response.data;

  if (!initialLeagues) return null;

  return <LeaguesBrowse initialLeagues={response} />;
};

export default LeaguesPage;
