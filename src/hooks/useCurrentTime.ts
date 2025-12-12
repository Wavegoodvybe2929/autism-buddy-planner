import { useState, useEffect } from "react";
import { format } from "date-fns";

export const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedDate = format(currentTime, "EEEE, MMMM d, yyyy");
  const formattedTime = format(currentTime, "h:mm:ss a");
  const dateKey = format(currentTime, "yyyy-MM-dd");

  return { currentTime, formattedDate, formattedTime, dateKey };
};
