const formatLocalTime = (utcTime?: string) => {
  if (!utcTime || utcTime === "LATEST") return "--";

  const isoUtc = utcTime.replace(" ", "T") + "Z";
  const date = new Date(isoUtc);

  return date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export default formatLocalTime;
export const parseDate = (time: string | undefined | null): Date | null => {
  // To-Do: After Mock Data, Update to return null;
  if (!time) return new Date();
  const isoTime = time.includes("T") ? time : time.replace(" ", "T");
  const date = new Date(isoTime);
  return isNaN(date.getTime()) ? new Date() : date;
};

export const formatTimeLocal = (time: string | undefined | null) => {
  const date = parseDate(time);
  if (!date) return "-";

  return date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatDate = (time: string | undefined | null) => {
  const date = parseDate(time);
  if (!date) return "-";

  return date.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
