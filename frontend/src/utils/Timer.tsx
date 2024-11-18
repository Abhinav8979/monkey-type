import { useState, useEffect } from "react";
import { TimerType } from "../types";

const Timer = ({ startTime, onTimeUp }: TimerType) => {
  const [time, setTime] = useState(startTime);

  useEffect(() => {
    if (time <= 0) {
      onTimeUp();
      return;
    }

    const intervalId = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [time]);

  const formatTime = (time: number) => {
    const seconds = time;
    return `${String(seconds)}`;
  };

  return <> {formatTime(time)}</>;
};

export default Timer;
