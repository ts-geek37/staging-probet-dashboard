import { ApiResponse } from "@/api/types";
import { LeagueResponse } from "@/types/leagues";
import React, { createContext, useContext } from "react";

export type InitialLeagueType = ApiResponse<LeagueResponse>;
type LeaguesContextValue = InitialLeagueType & {
  setLeague: React.Dispatch<React.SetStateAction<InitialLeagueType>>;
};

const LeaguesContext = createContext<LeaguesContextValue | undefined>(
  undefined,
);

export const useLeague = () => {
  const context = useContext(LeaguesContext);
  if (!context)
    throw new Error("useLeagues must be used within a LeaguesProvider");
  return context;
};

export const LeaguesProvider: React.FC<{
  initialLeague: InitialLeagueType;
  children: React.ReactNode;
}> = ({ initialLeague, children }) => {
  const [league, setLeague] = React.useState<InitialLeagueType>(initialLeague);
  return (
    <LeaguesContext.Provider value={{ ...league, setLeague }}>
      {children}
    </LeaguesContext.Provider>
  );
};
