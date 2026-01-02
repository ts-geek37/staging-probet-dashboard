import { getPlayerDetail } from "@/api/players";
import { PlayerDetailView } from "@/types/players";
import { PlayerDetailPresentation } from "@/modules/players";

interface Props {
  params: Promise<{ id: string }>;
}

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
