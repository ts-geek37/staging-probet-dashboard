import { getLeagues } from "@/api/leagues";
import { NoData } from "@/components";
import { LeaguesBrowse } from "@/modules/leagues";
import { seo } from "@/utils/seo";

export const metadata = seo({
  title: "Leagues",
  description:
    "Browse all major football leagues worldwide including Premier League, La Liga, Serie A, Bundesliga, Ligue 1, and more. Get fixtures, live scores, standings, and expert predictions on ProBetPredictions.",
});

const LeaguesPage = async () => {
  const response = await getLeagues({
    page: 1,
    limit: 12,
  });
  const initialLeagues = response.data;

  if (!initialLeagues) return <NoData isCenter message="No Leagues Found" />;

  return <LeaguesBrowse initialLeagues={response} />;
};

export default LeaguesPage;
