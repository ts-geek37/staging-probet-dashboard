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
