
export const convertToLocalTime = (kickoffTime: string): { date: string; time: string } => {
  if (!kickoffTime) return { date: "Date TBD", time: "--:--" };

  const utcDate = new Date(kickoffTime + " UTC");

  const date = utcDate.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  const time = utcDate.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return { date, time };
};
