//useCountdownTimer.ts
import { useState, useEffect } from "react";

export const useCountdownTimer = ({
  setIsPaused,
  setHasStarted,
  username,
}: {
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
  setHasStarted: React.Dispatch<React.SetStateAction<boolean>>;
  username: string;
}) => {
  const [countdown, setCountdown] = useState<number | null>(600);

  useEffect(() => {
    if (countdown === null || countdown <= 0) return setIsPaused(false);

    const timer = setTimeout(() => {
      setCountdown((prev) => {
        if (prev === 1) return null; // ✅ จบแล้วเซตเป็น null
        return prev !== null ? prev - 1 : null;
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const triggerCountdown = () => {
    if (username.trim()) {
      console.log("[triggerCountdown] called");
      setHasStarted(true); // ✅ ปิด StartModal
      setCountdown(5); // ✅ เริ่มนับถอยหลัง // ✅ ยังไม่เริ่มเกมจริง
    }
  };

  return { countdown, triggerCountdown, setCountdown };
};
