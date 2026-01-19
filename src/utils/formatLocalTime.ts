const formatLocalTime = (utcTime?: string) => {
  if (!utcTime || utcTime === "LATEST") return "--";

  const date = new Date(utcTime);

  return date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export default formatLocalTime;
