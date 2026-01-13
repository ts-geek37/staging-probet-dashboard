import { getHome } from "@/api/home";
import Home from "@/modules/home/Home";
import { seo } from "@/utils/seo";

export const metadata = seo({
  title: "ProBetTips – Football Insights, Predictions & Live Scores",
  description:
    "Browse all major football leagues worldwide including Premier League, La Liga, Serie A, Bundesliga, Ligue 1, and more. Get fixtures, live scores, standings, and expert predictions on ProBetTips.",
});

const HomePage = async () => {
  const response = await getHome();
  if (!response?.data) return null;

  return <Home initialHome={response} />;
};

export default HomePage;
