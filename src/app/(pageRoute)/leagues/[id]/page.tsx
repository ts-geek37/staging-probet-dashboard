import { getLeagueDetail } from "@/api/leagues";
import { LeaguesDetails } from "@/modules/leagues";
import { LeagueView } from "@/types/leagues";

const LeaguePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const response = await getLeagueDetail({ id, view: LeagueView.OVERVIEW });

  const initialLeagues = response.data;

  if (!initialLeagues) return null;

  return <LeaguesDetails initialLeagues={response} />;
};

export default LeaguePage;
