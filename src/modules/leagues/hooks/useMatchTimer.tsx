import { useEffect, useState } from "react";

interface TimeRemaining {
  hours: string;
  minutes: string;
  seconds: string;
}

const useMatchTimer = (date: string) => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [isWithin12Hours, setIsWithin12Hours] = useState(false);
  const matchDate = new Date(date);

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

      const hoursInMs = 12 * 60 * 60 * 1000;
      setIsWithin12Hours(difference > 0 && difference <= hoursInMs);

      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60),
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeRemaining({
          hours: hours.toString().padStart(2, "0"),
          minutes: minutes.toString().padStart(2, "0"),
          seconds: seconds.toString().padStart(2, "0"),
        });
      }
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [matchDate]);

  return { timeRemaining, isWithin12Hours, month, time };
};

export default useMatchTimer;
