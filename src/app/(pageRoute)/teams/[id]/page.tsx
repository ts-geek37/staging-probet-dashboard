import { getTeamDetail } from "@/api/teams";
import { TeamDetailPresentation } from "@/modules/teams";
import { TeamDetailView } from "@/types/teams";

interface Props {
  params: Promise<{ id: string }>;
}

const TeamDetailPage = async ({ params }: Props) => {
  const { id } = await params;

  const teamId = Number(id);

  const response = await getTeamDetail({
    id: teamId,
    view: TeamDetailView.OVERVIEW,
  });

  return <TeamDetailPresentation teamId={teamId} initialData={response} />;
};

export default TeamDetailPage;
