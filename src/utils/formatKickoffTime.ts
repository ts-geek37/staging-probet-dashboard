export const formatKickoffTime = (kickoffTime: string) => {
  const date = new Date(kickoffTime);

  const month = date
    .toLocaleDateString("en-GB", { month: "short" })
    .toUpperCase();

  const time = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return { month, time };
};
