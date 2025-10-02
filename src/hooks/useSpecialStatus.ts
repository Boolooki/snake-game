// hooks/useSpecialStatus.ts
import { useState } from "react";

export type SpecialStatusFlags = {
  doubleScore: boolean;
  extendedSpeedBurst: boolean;
  slowSpeed: boolean;
  moreProduceMoretribute: boolean;
  safeHeaven: boolean;
};

export const useSpecialStatus = () => {
  const [status, setStatus] = useState<SpecialStatusFlags>({
    doubleScore: false,
    extendedSpeedBurst: false,
    slowSpeed: false,
    moreProduceMoretribute: false,
    safeHeaven: false,
  });

  const [selectedStatuses, setSelectedStatuses] = useState<(keyof SpecialStatusFlags)[]>([]);

  const applyStatus = (selected: keyof SpecialStatusFlags) => {
    setStatus((prev) => ({
      ...prev,
      [selected]: true,
    }));
  };

  const resetStatus = () => {
    setStatus({
      doubleScore: false,
      extendedSpeedBurst: false,
      slowSpeed: false,
      moreProduceMoretribute: false,
      safeHeaven: false,
    });
    setSelectedStatuses([]);
  };

  return {
    status,
    applyStatus,
    resetStatus,
    selectedStatuses,
    setSelectedStatuses,
    isDoubleScore: status.doubleScore,
    isExtendedBurst: status.extendedSpeedBurst,
    isSlowSpeed: status.slowSpeed,
    isMoreProduceMoretribute: status.moreProduceMoretribute,
    isSafeHeaven: status.safeHeaven,
  };
};
