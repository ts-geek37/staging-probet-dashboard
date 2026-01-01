export const formatTimeAgo = (dateString: string): string => {
  const now = Date.now();
  const inputDate = new Date(dateString).getTime();

  if (Number.isNaN(inputDate)) return "";

  const diffMs = now - inputDate;

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
