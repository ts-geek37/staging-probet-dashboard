import { useEffect, useMemo, useState } from "react";

interface TimeRemaining {
  hours: string;
  minutes: string;
  seconds: string;
}
type MatchTimeState = "PAST" | "WITHIN_12_HOURS" | "UPCOMING";
const TWELVE_HOURS_MS = 12 * 60 * 60 * 1000;

const useMatchTimer = (date: string) => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [matchState, setMatchState] = useState<MatchTimeState>("UPCOMING");

  const matchDate = useMemo(() => new Date(date), [date]);
  const month = matchDate
    .toLocaleDateString("en-US", { month: "short" })
    .toUpperCase();
  const time =
    matchDate.getHours() !== 0 || matchDate.getMinutes() !== 0
      ? matchDate.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      : "12:00";

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const matchTime = matchDate.getTime();
      const difference = matchTime - now;

      if (difference <= 0) {
        setMatchState("PAST");
        setTimeRemaining({ hours: "00", minutes: "00", seconds: "00" });
        return;
      }

      if (difference <= TWELVE_HOURS_MS) {
        setMatchState("WITHIN_12_HOURS");
      } else {
        setMatchState("UPCOMING");
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeRemaining({
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
      });
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [matchDate]);

  const timeUnits = useMemo(() => {
    return [
      { label: "HH", value: timeRemaining.hours },
      { label: "MM", value: timeRemaining.minutes },
      { label: "SS", value: timeRemaining.seconds },
    ];
  }, [timeRemaining]);

  return { timeRemaining, matchState, month, time, timeUnits };
};

export default useMatchTimer;
