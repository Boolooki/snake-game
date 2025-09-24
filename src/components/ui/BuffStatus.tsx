import { PropsBuffStatus } from "@/types";
import { ShieldCheckIcon, BoltIcon } from "@heroicons/react/24/outline";
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
  language,
}: PropsBuffStatus & { language: Language }) {
  return (
    <div className="text-sm text-gray-600 mt-5 flex items-center gap-2">
      <span>{messages[language].buffpanel}</span>
      {isEnergyShield && <ShieldCheckIcon className="w-5 h-5 text-blue-500" />}
      {isSpeedBurst && <BoltIcon className="w-5 h-5 text-yellow-400" />}
      {!isEnergyShield && !isSpeedBurst && <span>{messages[language].none}</span>}
    </div>
  );
}
