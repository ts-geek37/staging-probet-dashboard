import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import { TeamOverviewResponse } from "@/types/teams";

import { Item as OverviewItem } from "../components/TeamProfileOverview";

const mapOverview = (
  item: OverviewItem | false | null | "",
): OverviewItem | undefined => (item ? item : undefined);
export const useTeamOverview = (
  teamId: number,
  initialData?: ApiResponse<TeamOverviewResponse>,
) => {
  const { data, error } = useSWR<ApiResponse<TeamOverviewResponse>>(
    `/api/v2/teams/${teamId}`,
    {
      fallbackData: initialData,
      revalidateOnMount: false,
    },
  );

  const team = data?.data ?? null;

  if (!team) {
    return {
      teamInfo: null,
      venue: null,
      seasons: [],
      rankings: [],
      rivals: [],
      socials: [],
      isLoading: !data && !error,
      error,
    };
  }

  const teamInfo: OverviewItem[] = [
    team.name ? { label: "Name", value: team.name, image: team.logo } : null,
    team.short_code ? { label: "Short Code", value: team.short_code } : null,
    team.country?.name
      ? { label: "Country", value: team.country.name, image: team.country.flag }
      : null,
    team.founded ? { label: "Founded", value: team.founded } : null,
  ]
    .map(mapOverview)
    .filter(Boolean) as OverviewItem[];

  const venue: OverviewItem[] = [
    team.stadium?.name ? { label: "Stadium", value: team.stadium.name } : null,
    team.stadium?.image
      ? { label: "Stadium Image", image: team.stadium.image }
      : null,
    team.stadium?.capacity != null
      ? { label: "Capacity", value: team.stadium.capacity.toLocaleString() }
      : null,
  ]
    .map(mapOverview)
    .filter(Boolean) as OverviewItem[];

  const seasons =
    team.current_seasons?.map((s) => ({
      label: s.name,
      value: s.league.name,
      image: s.league.logo,
      extra: `${s.starting_at ? `Start: ${s.starting_at}` : ""}${
        s.starting_at && s.ending_at ? " | " : ""
      }${s.ending_at ? `End: ${s.ending_at}` : ""}`,
    })) ?? [];

  const rankings =
    team.rankings?.map((r) => ({
      label: r.name,
      value: r.rank ? `#${r.rank}` : "Unranked",
      extra: r.points ? `${r.points} Points` : undefined,
    })) ?? [];

  const rivals =
    team.rivals?.map((r) => ({
      label: r.name,
      image: r.logo,
    })) ?? [];
  const socials =
    team.socials?.map((s) => ({
      label: s.channel?.name,
      value: s.handle,
      extra: s.url,
      color: s.channel?.color,
    })) ?? [];

  return {
    teamInfo,
    venue,
    seasons,
    rankings,
    rivals,
    socials,
    isLoading: !data && !error,
    error,
  };
};

export default useTeamOverview;
