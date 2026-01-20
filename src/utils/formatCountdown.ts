export const getCountdownData = (kickoffTime: string) => {
  if (!kickoffTime || kickoffTime === "LATEST") return null;

  const isoUtc = kickoffTime.replace(" ", "T") + "Z";
  const start = new Date(isoUtc).getTime();
  const now = new Date().getTime();
  const diff = start - now;

  if (isNaN(start)) return null;

  if (diff <= 0) {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalMs: diff,
      formatted: "STARTING SOON",
      isStartingSoon: true,
    };
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  const formatted = `${hours > 0 ? `${hours}:` : ""}${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return {
    hours,
    minutes,
    seconds,
    totalMs: diff,
    formatted,
    isStartingSoon: false,
  };
};
