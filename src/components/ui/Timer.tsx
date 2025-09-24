"use client";

import { useEffect, useState } from "react";
import { formatTime } from "@/utils/gameUtils";
import type { Language } from "@/types"; // ถ้าคุณแยก type ไว้

const messages = {
  th: {
    timeelap: "เวลาที่ทำได้: ",
  },
  en: {
    timeelap: "Time Elapsed: ",
  },
};

export default function Timer({
  isGameOver,
  isPaused,
  triggerReset,
  onTimeUpdate,
  language,
}: {
  isGameOver: boolean;
  isPaused: boolean;
  triggerReset: boolean;
  onTimeUpdate: (seconds: number) => void;
  language: Language;
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
  }, [seconds, onTimeUpdate]);

  return (
    <div className="text-xl font-bold text-center mt-4">
      {messages[language].timeelap}
      {formatTime(seconds)}
    </div>
  );
}
