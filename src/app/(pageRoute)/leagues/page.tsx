import { getLeagues } from "@/api/leagues";
import { LeaguesBrowse } from "@/modules/leagues";

type LeaguesPageProps = {
  searchParams?: {
    page?: string;
    limit?: string;
    search?: string;
  };
};

const LeaguesPage: React.FC<LeaguesPageProps> = async ({ searchParams }) => {
  const page = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 12;
  const search = searchParams?.search?.trim() || undefined;

  const response = await getLeagues({
    page: page,
    limit: limit,
    search,
  });
  const initialLeagues = response.data;

  if (!initialLeagues) return null;

  return <LeaguesBrowse initialLeagues={response} />;
};

export default LeaguesPage;
