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
