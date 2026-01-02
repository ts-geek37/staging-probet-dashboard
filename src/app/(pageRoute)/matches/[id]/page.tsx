import { getMatchDetail } from "@/api/matches";
import { MatchDetailPresentation } from "@/modules/matches";
import { MatchDetailView } from "@/types/matches";
import { seo } from "@/utils/seo";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
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
          "Explore league details, fixtures, standings, and football predictions on ProBets.",
      });
    }

    return seo({
      title: match?.home_team?.name + " vs " + match?.away_team?.name || "League",
      description: match?.away_team?.name + " vs " + match?.home_team?.name,
    });
  } catch {
    return seo({
      title: "League",
      description:
        "Explore league details, fixtures, standings, and football predictions on ProBets.",
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
      <div>
        <h1>Match not found</h1>
      </div>
    );
  }

  return <MatchDetailPresentation initialData={response.data} />;
};

export default MatchDetailPage;
