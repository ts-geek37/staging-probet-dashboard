import { getPlayerDetail } from "@/api/players";
import { PlayerDetailPresentation } from "@/modules/players";
import { PlayerDetailView } from "@/types/players";
import { seo } from "@/utils/seo";
import { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { id } = await params;

  try {
    const response = await getPlayerDetail({
      id,
      view: PlayerDetailView.OVERVIEW,
    });

    const player = response?.data;

    if (!player) {
      return seo({
        title: "Player",
        description:
          "Explore player details, fixtures, standings, and football predictions on ProBets.",
      });
    }

    return seo({
      title: `${player?.full_name ?? "Player"} | ProBets`,
      description: player
        ? `${player.full_name}, a professional footballer for ${player.team.name}, born on ${player.date_of_birth}. View age, position, nationality, market value, contract details, and latest performance stats on ProBets.`
        : "Football player profile including biography, club, position, and career statistics.",
    });
  } catch {
    return seo({
      title: "Player",
      description:
        "Explore player details, fixtures, standings, and football predictions on ProBets.",
    });
  }
};
const PlayerDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const playerId = Number(id);

  const response = await getPlayerDetail({
    id: playerId,
    view: PlayerDetailView.OVERVIEW,
  });

  return (
    <PlayerDetailPresentation playerId={playerId} initialData={response} />
  );
};

export default PlayerDetailPage;
