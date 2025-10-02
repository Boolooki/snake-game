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
    isEnergyShield && <ShieldCheckIcon className="w-5 h-5 text-blue-500" />,
    isSpeedBurst && <BoltIcon className="w-5 h-5 text-yellow-400" />,
    isDoubleScore && (<ArrowTrendingUpIcon className="w-5 h-5 text-purple-500" />),
    isExtendedBurst && <ClockIcon className="w-5 h-5 text-orange-400" />,
    isSlowSpeed && (<ChevronDoubleDownIcon className="w-5 h-5 text-orange-400" />),
    isMoreProduceMoretribute && (<SquaresPlusIcon className="w-5 h-5 text-orange-400" />),
    isSafeHeaven && <NoSymbolIcon className="w-5 h-5 text-orange-400" />,
  ].filter(Boolean);
  return (
    <div className="text-sm text-gray-600 mt-5 flex items-center gap-2">
      <span>{messages[language].buffpanel}</span>
      {activeBuffs.length > 0 ? (
        activeBuffs
      ) : (
        <span>{messages[language].none}</span>
      )}
    </div>
  );
}
