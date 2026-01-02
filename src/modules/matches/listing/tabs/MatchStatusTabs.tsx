import React from "react";

import { MatchListStatus } from "@/types/matches";

interface Props {
  activeStatus: MatchListStatus;
  onChange: (s: MatchListStatus) => void;
}

const MatchStatusTabs: React.FC<Props> = ({ activeStatus, onChange }) => {
  return (
    <nav>
      {Object.values(MatchListStatus).map((status) => (
        <button
          key={status}
          onClick={() => onChange(status)}
          disabled={status === activeStatus}
        >
          {status}
        </button>
      ))}
    </nav>
  );
};

export default MatchStatusTabs;
