import { useState, useEffect } from "react";

export const usePlayTimeTracker = ({
  isPaused,
  isGameOver,
  countdown,
}: {
  isPaused: boolean;
  isGameOver: boolean;
  countdown: number | null;
}) => {
  const [playTime, setPlayTime] = useState(0);

  useEffect(() => {
    if (isPaused || isGameOver || countdown !== null) return;
    const timer = setInterval(() => setPlayTime((prev) => prev + 1), 1000);
    return () => clearInterval(timer);
  }, [isPaused, isGameOver, countdown]);

  const resetPlayTime = () => setPlayTime(0);

  return { playTime, resetPlayTime };
};
