import { getHome } from "@/api/home";
import { NoData } from "@/components";
import Home from "@/modules/home/Home";
import { seo } from "@/utils/seo";

export const metadata = seo({
  title: "ProBetPredictions – Football Insights, Predictions & Live Scores",
  description:
    "Browse all major football leagues worldwide including Premier League, La Liga, Serie A, Bundesliga, Ligue 1, and more. Get fixtures, live scores, standings, and expert predictions on ProBetPredictions.",
});

const HomePage = async () => {
  const response = await getHome();
  if (!response?.data)
    return <NoData isCenter message="Network Issue, Try Later" />;

  return <Home initialHome={response} />;
};

export default HomePage;
