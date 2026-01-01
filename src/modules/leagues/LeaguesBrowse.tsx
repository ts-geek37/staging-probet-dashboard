import { ApiResponse } from "@/api/types";
import Ads from "@/components/Ads";
import { LeagueListResponse } from "@/types/leagues";

import LeagueBanner from "./LeagueBanner";
import LeagueListing from "./leagueListing";

interface Props {
  initialLeagues: ApiResponse<LeagueListResponse>;
}

const LeaguesBrowse: React.FC<Props> = ({ initialLeagues }) => {
  return (
    <div className="max-w-7xl w-full mx-auto grid grid-cols-1 gap-5 sm:gap-16 py-10 px-5 sm:px-">
      <Ads />
      <LeagueListing initialLeagues={initialLeagues} />
      <LeagueBanner banner="betting" />
    </div>
  );
};

export default LeaguesBrowse;
