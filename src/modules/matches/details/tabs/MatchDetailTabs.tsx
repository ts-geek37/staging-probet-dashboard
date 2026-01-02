import React from "react";

import { MatchDetailView } from "@/types/matches";

import MatchEventsTab from "./MatchEventsTab";
import MatchLineupsTab from "./MatchLineupsTab";
import MatchOverviewTab from "./MatchOverviewTab";
import MatchPredictionsTab from "./MatchPredictionsTab";
import MatchStatsTab from "./MatchStatsTab";

interface Props {
  matchId: number;
  activeTab: MatchDetailView;
  onTabChange: (tab: MatchDetailView) => void;
}

const MatchDetailTabs: React.FC<Props> = ({
  matchId,
  activeTab,
  onTabChange,
}) => {
  return (
    <section>
      <nav>
        {Object.values(MatchDetailView).map((tab) => (
          <button key={tab} onClick={() => onTabChange(tab)}>
            {tab}
          </button>
        ))}
      </nav>

      {activeTab === MatchDetailView.OVERVIEW && <MatchOverviewTab />}

      {activeTab === MatchDetailView.STATS && (
        <MatchStatsTab matchId={matchId} />
      )}

      {activeTab === MatchDetailView.LINEUPS && (
        <MatchLineupsTab matchId={matchId} />
      )}

      {activeTab === MatchDetailView.EVENTS && (
        <MatchEventsTab matchId={matchId} />
      )}

      {activeTab === MatchDetailView.PREDICTIONS && (
        <MatchPredictionsTab matchId={matchId} />
      )}
    </section>
  );
};

export default MatchDetailTabs;
