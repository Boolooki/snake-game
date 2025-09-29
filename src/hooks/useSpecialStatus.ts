// hooks/useSpecialStatus.ts
import { useState } from "react";

export type SpecialStatus =
  | "doubleScoreSlowSpeed"
  | "extendedSpeedBurst"
  | "none";

export const useSpecialStatus = () => {
  const [status, setStatus] = useState<SpecialStatus>("none");

  const applyStatus = (selected: SpecialStatus) => {
    setStatus(selected);
  };

  const resetStatus = () => {
    setStatus("none");
  };

  return {
    status,
    applyStatus,
    resetStatus,
    isDoubleScore: status === "doubleScoreSlowSpeed",
    isExtendedBurst: status === "extendedSpeedBurst",
  };
};
