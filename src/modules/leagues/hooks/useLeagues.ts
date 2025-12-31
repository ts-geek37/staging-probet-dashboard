import { useEffect, useState } from "react";

import { mockLeagues } from "@/mockdata";
import { League } from "@/types/league";

export const useLeagues = () => {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLeagues = async () => {
      setIsLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLeagues(mockLeagues);
      setIsLoading(false);
    };

    fetchLeagues();
  }, []);

  return { leagues, isLoading };
};
