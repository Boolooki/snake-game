"use client";

import { useEffect, useState } from "react";

export default function Timer({
  isGameOver,
  isPaused,
  triggerReset,
  onTimeUpdate,
}: {
  isGameOver: boolean;
  isPaused: boolean;
  triggerReset: boolean;
  onTimeUpdate: (seconds: number) => void;
}) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (isPaused || isGameOver) return;
    else if (triggerReset) {
      setSeconds(0);
      return;
    }

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, isGameOver, triggerReset]);

  useEffect(() => {
    onTimeUpdate?.(seconds);
  }, [seconds]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="text-xl font-bold text-center mt-4">
      Time Elapsed: {formatTime(seconds)}
    </div>
  );
}
