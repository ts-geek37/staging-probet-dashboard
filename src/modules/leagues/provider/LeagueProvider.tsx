import { ApiResponse } from "@/api/types";
import { LeagueResponse } from "@/types/leagues";
import React, { createContext, useContext } from "react";

export type InitialLeaguesType = ApiResponse<LeagueResponse>;

const LeaguesContext = createContext<InitialLeaguesType | undefined>(undefined);

export const useLeague = () => {
  const context = useContext(LeaguesContext);
  if (!context)
    throw new Error("useLeagues must be used within a LeaguesProvider");
  return context;
};

export const LeaguesProvider: React.FC<{
  initialLeagues: InitialLeaguesType;
  children: React.ReactNode;
}> = ({ initialLeagues, children }) => {
  return (
    <LeaguesContext.Provider value={initialLeagues}>
      {children}
    </LeaguesContext.Provider>
  );
};
