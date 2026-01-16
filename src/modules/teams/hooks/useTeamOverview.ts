import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import { TeamOverviewResponse } from "@/types/teams";

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

  const teamInfo = [
    {
      label: "Name",
      value: team.name ?? "N/A",
      image: team.logo,
    },
    {
      label: "Short Code",
      value: team.short_code ?? "N/A",
    },
    {
      label: "Country",
      value: team.country?.name ?? "N/A",
      image: team.country?.flag,
    },
    {
      label: "Founded",
      value: team.founded ?? "N/A",
    },
  ];

  const venue = [
    {
      label: "Stadium",
      value: team.stadium?.name ?? "N/A",
    },
    {
      label: "Stadium Image",
      image: team.stadium?.image || "/football-stadium.png",
    },
    {
      label: "Capacity",
      value: team.stadium?.capacity?.toLocaleString() ?? "N/A",
    },
  ];

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
      label: s.channel.name,
      extra: s.url,
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
