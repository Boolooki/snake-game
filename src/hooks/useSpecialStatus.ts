// hooks/useSpecialStatus.ts
import { useState } from "react";

export type SpecialStatusFlags = {
  doubleScore: boolean;
  extendedSpeedBurst: boolean;
  slowSpeed: boolean;
  moreProduceMoretribute: boolean;
};

export const useSpecialStatus = () => {
  const [status, setStatus] = useState<SpecialStatusFlags>({
    doubleScore: false,
    extendedSpeedBurst: false,
    slowSpeed: false,
    moreProduceMoretribute: false,
  });

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
    });
  };

  return {
    status,
    applyStatus,
    resetStatus,
    isDoubleScore: status.doubleScore,
    isExtendedBurst: status.extendedSpeedBurst,
    isSlowSpeed: status.slowSpeed,
    isMoreProduceMoretribute: status.moreProduceMoretribute,
  };
};
