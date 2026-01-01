import { getLeagues } from "@/api/leagues";
import { LeaguesBrowse } from "@/modules/leagues";

const LeaguesPage = async () => {
  const response = await getLeagues({
    page: 1,
    limit: 20,
  });
  const initialLeagues = response.data;

  if (!initialLeagues) return null;

  return <LeaguesBrowse initialLeagues={response} />;
};

export default LeaguesPage;
