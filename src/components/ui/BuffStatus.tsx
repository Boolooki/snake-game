import { PropsBuffStatus } from "@/types";
import {
  ShieldCheckIcon,
  BoltIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
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
  language,
}: PropsBuffStatus & { language: Language }) {
  return (
    <div className="text-sm text-gray-600 mt-5 flex items-center gap-2">
      <span>{messages[language].buffpanel}</span>
      {isEnergyShield && <ShieldCheckIcon className="w-5 h-5 text-blue-500" />}
      {isSpeedBurst && <BoltIcon className="w-5 h-5 text-yellow-400" />}
      {isDoubleScore && (
        <ArrowTrendingUpIcon className="w-5 h-5 text-purple-500" />
      )}
      {isExtendedBurst && <ClockIcon className="w-5 h-5 text-orange-400" />}
      {!isEnergyShield && !isSpeedBurst && !isDoubleScore && !isExtendedBurst && (
        <span>{messages[language].none}</span>
      )}
    </div>
  );
}
