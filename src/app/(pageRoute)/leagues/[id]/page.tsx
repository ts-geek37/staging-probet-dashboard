import { Metadata } from "next";

import { getLeagueDetail } from "@/api/leagues";
import { LeaguesDetails } from "@/modules/leagues";
import { LeagueView } from "@/types/leagues";
import { seo } from "@/utils/seo";

interface Props {
  params: {
    id: string;
  };
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { id } = await params;

  try {
    const response = await getLeagueDetail({
      id,
      view: LeagueView.OVERVIEW,
    });

    const league = response?.data;

    if (!league) {
      return seo({
        title: "League",
        description:
          "Explore league details, fixtures, standings, and football predictions on ProBets.",
      });
    }

    return seo({
      title: league?.name || "League",
      description: `${league.name} football competition in ${league.country.name}. Get season information, standings, and key details on ProBets.`,
    });
  } catch {
    return seo({
      title: "League",
      description:
        "Explore league details, fixtures, standings, and football predictions on ProBets.",
    });
  }
};

const LeaguePage: React.FC<Props> = async ({ params }) => {
  const { id } = await params;
  const response = await getLeagueDetail({ id, view: LeagueView.OVERVIEW });

  const initialLeagues = response.data;

  if (!initialLeagues) return null;

  return <LeaguesDetails initialLeagues={response} />;
};

export default LeaguePage;
