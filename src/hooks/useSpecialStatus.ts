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

  const [selectedStatuses, setSelectedStatuses] = useState<
    (keyof SpecialStatusFlags)[]
  >([]);
  // สุ่ม 4 ตัวเลือกที่ยังไม่เคยเลือก
  const [randomOptions, setRandomOptions] = useState<
    (keyof SpecialStatusFlags)[]
  >([]);

  const generateRandomOptions = () => {
    const allKeys = Object.keys(status) as (keyof SpecialStatusFlags)[];
    const availableKeys = allKeys.filter(
      (key) => !selectedStatuses.includes(key)
    );

    // ถ้าเหลือน้อยกว่า 4 ก็เอาทั้งหมด
    const count = Math.min(3, availableKeys.length);

    // Shuffle และเอาแค่ 4 ตัวแรก
    const shuffled = [...availableKeys].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, count);

    setRandomOptions(selected);
  };

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
    setRandomOptions([]);
  };

  return {
    status,
    applyStatus,
    resetStatus,
    selectedStatuses,
    setSelectedStatuses,
    randomOptions,
    generateRandomOptions,
    isDoubleScore: status.doubleScore,
    isExtendedBurst: status.extendedSpeedBurst,
    isSlowSpeed: status.slowSpeed,
    isMoreProduceMoretribute: status.moreProduceMoretribute,
    isSafeHeaven: status.safeHeaven,
  };
};
