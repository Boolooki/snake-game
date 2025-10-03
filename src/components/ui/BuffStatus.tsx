import { PropsBuffStatus } from "@/types";
import {
  ShieldCheckIcon,
  BoltIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
  ChevronDoubleDownIcon,
  SquaresPlusIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/outline";
import type { Language } from "@/types"; // ถ้าคุณแยก type ไว้

const messages = {
  th: {
    buffpanel: "บัฟในปัจจุบัน :",
    none: "ไม่มี",
  },
  en: {
    buffpanel: "Current Buff:",
    none: "None",
  },
};

export default function BuffStatus({
  isEnergyShield,
  isSpeedBurst,
  isDoubleScore,
  isExtendedBurst,
  isSlowSpeed,
  isMoreProduceMoretribute,
  isSafeHeaven,
  language,
}: PropsBuffStatus & { language: Language }) {
  const activeBuffs = [
    isEnergyShield && (
      <ShieldCheckIcon key="energyShield" className="w-5 h-5 text-blue-500" />
    ),
    isSpeedBurst && (
      <BoltIcon key="speedBurst" className="w-5 h-5 text-yellow-400" />
    ),
    isDoubleScore && (
      <ArrowTrendingUpIcon
        key="doubleScore"
        className="w-5 h-5 text-purple-500"
      />
    ),
    isExtendedBurst && (
      <ClockIcon key="extendedBurst" className="w-5 h-5 text-orange-400" />
    ),
    isSlowSpeed && (
      <ChevronDoubleDownIcon
        key="slowSpeed"
        className="w-5 h-5 text-orange-400"
      />
    ),
    isMoreProduceMoretribute && (
      <SquaresPlusIcon key="moreProduce" className="w-5 h-5 text-orange-400" />
    ),
    isSafeHeaven && (
      <NoSymbolIcon key="safeHeaven" className="w-5 h-5 text-orange-400" />
    ),
  ].filter(Boolean);

  return (
    <div className="">
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/40 mb-6 overflow-hidden text-sm text-gray-600 flex items-center gap-2 p-5">
        <span>{messages[language].buffpanel}</span>
        {activeBuffs.length > 0 ? (
          activeBuffs
        ) : (
          <span>{messages[language].none}</span>
        )}
      </div>
    </div>
  );
}
