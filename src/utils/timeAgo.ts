export const formatTimeAgo = (dateString: string): string => {
  const [datePart, timePart] = dateString.split(" ");
  if (!datePart || !timePart) return "";

  const [dd, mm, yyyy] = datePart.split("-").map(Number);
  const [hh, min, ss] = timePart.split(":").map(Number);

  if (
    !dd ||
    !mm ||
    !yyyy ||
    hh === undefined ||
    min === undefined ||
    ss === undefined
  )
    return "";

  const inputDate = new Date(yyyy, mm - 1, dd, hh, min, ss).getTime();
  const now = Date.now();

  const diffMs = now - inputDate;

  if (diffMs <= 0) return "Recently Published";

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  const days = Math.floor(diffMs / day);
  const hours = Math.floor((diffMs % day) / hour);
  const minutes = Math.floor((diffMs % hour) / minute);

  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
};
