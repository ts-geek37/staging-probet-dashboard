import { Metadata } from "next";

import { getTeamDetail } from "@/api/teams";
import { TeamDetailPresentation } from "@/modules/teams";
import { seo } from "@/utils/seo";

interface Props {
  params: Promise<{ id: string }>;
}
export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { id } = await params;

  try {
    const response = await getTeamDetail({
      id,
    });

    const team = response?.data;

    if (!team) {
      return seo({
        title: "Team",
        description:
          "Explore team details, fixtures, standings, and football predictions on ProBetPredictions.",
      });
    }

    return seo({
      title: team?.name || "Team",
      description:
        team?.name && team?.founded
          ? `${team.name} football club, founded in ${team.founded}. Fixtures, squad, stats, and latest updates.`
          : "Football team details, fixtures, squad, and statistics.",
    });
  } catch {
    return seo({
      title: "Team",
      description:
        "Explore team details, fixtures, standings, and football predictions on ProBetPredictions.",
    });
  }
};
const TeamDetailPage = async ({ params }: Props) => {
  const { id } = await params;

  const teamId = Number(id);
  const teamName = (await getTeamDetail({ id: teamId }))?.data?.name || "Team";

  const response = await getTeamDetail({
    id: teamId,
  });

  return (
    <TeamDetailPresentation
      teamId={teamId}
      teamName={teamName}
      initialData={response}
    />
  );
};

export default TeamDetailPage;
