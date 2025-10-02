import { useState, useEffect } from "react";

export const useLevelProgression = ({
  score,
  thresholds = [5, 20, 50, 100],
  setIsPaused,
}: {
  score: number;
  thresholds?: number[];
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [level, setLevel] = useState(0);
  const [passedThresholds, setPassedThresholds] = useState<number[]>([]);
  const [upgradeQueue, setUpgradeQueue] = useState(false);

  useEffect(() => {
    const next = thresholds.find(
      (t) => score >= t && !passedThresholds.includes(t)
    );
    if (next !== undefined) {
      setPassedThresholds((prev) => [...prev, next]);
      setLevel((prev) => prev + 1);
      setUpgradeQueue(true);
      setIsPaused(true)
    }
  }, [score, passedThresholds]);

  const resetProgression = () => {
    setLevel(0);
    setPassedThresholds([]);
    setUpgradeQueue(false);
  };

  return { level, upgradeQueue, setUpgradeQueue, resetProgression };
};
