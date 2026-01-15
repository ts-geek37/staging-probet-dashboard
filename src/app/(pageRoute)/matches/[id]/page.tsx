import { Metadata } from "next";

import { getMatchDetail } from "@/api/matches";
import { MatchDetailPresentation } from "@/modules/matches";
import { MatchDetailView } from "@/types/matches";
import { seo } from "@/utils/seo";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { id } = await params;

  try {
    const response = await getMatchDetail({
      id,
      view: MatchDetailView.OVERVIEW,
    });

    const match = response?.data;

    if (!match) {
      return seo({
        title: "League",
        description:
          "Explore league details, fixtures, standings, and football predictions on ProBetTips.",
      });
    }

    const home = match.teams.home.name;
    const away = match.teams.away.name;
    const league = match.league.name;

    return seo({
      title: `${home} vs ${away} | ${league}`,
      description: `Live match details, score, stats, and lineups for ${home} vs ${away} in the ${league}.`,
    });
  } catch {
    return seo({
      title: "League",
      description:
        "Explore league details, fixtures, standings, and football predictions on ProBetTips.",
    });
  }
};

const MatchDetailPage = async ({ params }: PageProps) => {
  const { id } = await params;

  const response = await getMatchDetail({
    id,
    view: MatchDetailView.OVERVIEW,
  });

  if (!response.success || !response.data) {
    return (
      <div className="text-white min-h-screen flex items-center justify-center">
        <h1 className="text-2xl">Match not found</h1>
      </div>
    );
  }

  return (
    <div className="text-white">
      <MatchDetailPresentation initialData={response.data} />
    </div>
  );
};

export default MatchDetailPage;
