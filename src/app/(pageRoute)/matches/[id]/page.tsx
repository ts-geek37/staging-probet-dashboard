import { getMatchDetail } from "@/api/matches";
import { MatchDetailPresentation } from "@/modules/matches";
import { MatchDetailView } from "@/types/matches";

interface PageProps {
  params: Promise<{ id: string }>;
}

const MatchDetailPage = async ({ params }: PageProps) => {
  const response = await getMatchDetail({
    id: (await params).id,
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
