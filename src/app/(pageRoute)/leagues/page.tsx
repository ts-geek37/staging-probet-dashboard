import { getLeagues } from "@/api/leagues";
import { LeaguesBrowse } from "@/modules/leagues";

type LeaguesPageProps = {
  searchParams: Promise<{ page?: string; limit?: string; search?: string }>;
};

const LeaguesPage: React.FC<LeaguesPageProps> = async ({ searchParams }) => {
  const { page, limit, search } = await searchParams;

  const response = await getLeagues({
    page: Number(page) || 1,
    limit: Number(limit) || 12,
    search : search?.trim() || "",
  });
  const initialLeagues = response.data;

  if (!initialLeagues) return null;

  return <LeaguesBrowse initialLeagues={response} />;
};

export default LeaguesPage;
