// hooks/useLevelProgression.ts
import { useState, useEffect, useRef } from "react";
import { LEVELUPTHRESHOLDS } from "@/constants/gameConstants";
export const useLevelProgression = ({
  score,
  thresholds = LEVELUPTHRESHOLDS,
  setIsPaused,
  generateRandomOptions,
  onComplete,
}: {
  score: number;
  thresholds?: number[];
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
  generateRandomOptions: () => void;
  onComplete: () => void;
}) => {
  const [level, setLevel] = useState(0);
  const [passedThresholds, setPassedThresholds] = useState<number[]>([]);
  const [upgradeQueue, setUpgradeQueue] = useState(false);
  const [showLevelUpNotification, setShowLevelUpNotification] = useState(false);

  const wasUpgradeActive = useRef(false);

  useEffect(() => {
    const next = thresholds.find(
      (t) => score >= t && !passedThresholds.includes(t)
    );

    if (next !== undefined) {
      setPassedThresholds((prev) => [...prev, next]);
      setLevel((prev) => prev + 1);

      // หยุดเกมก่อน
      setIsPaused(true);

      // แสดง Level Up notification
      setShowLevelUpNotification(true);
    }
  }, [score, passedThresholds, setIsPaused, thresholds]);

  // เมื่อ notification จบ → สุ่มตัวเลือกและแสดง popup
  const handleNotificationComplete = () => {
    setShowLevelUpNotification(false);
    generateRandomOptions();
    setUpgradeQueue(true);
  };

  useEffect(() => {
    if (wasUpgradeActive.current && !upgradeQueue) {
      onComplete();
    }
    wasUpgradeActive.current = upgradeQueue;
  }, [upgradeQueue, onComplete]);

  const resetProgression = () => {
    setLevel(0);
    setPassedThresholds([]);
    setUpgradeQueue(false);
    setShowLevelUpNotification(false);
    wasUpgradeActive.current = false;
  };

  return {
    level,
    upgradeQueue,
    setUpgradeQueue,
    resetProgression,
    showLevelUpNotification,
    handleNotificationComplete,
    thresholds,
  };
};
