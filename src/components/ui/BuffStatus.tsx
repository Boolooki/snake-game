import { PropsBuffStatus } from "@/types";
import { ShieldCheckIcon, BoltIcon } from "@heroicons/react/24/outline";

export default function BuffStatus({ isEnergyShield, isSpeedBurst }: PropsBuffStatus) {
  return (
    <div className="text-sm text-gray-600 mt-5 flex items-center gap-2">
      <span>Current Buff:</span>
      {isEnergyShield && <ShieldCheckIcon className="w-5 h-5 text-blue-500" />}
      {isSpeedBurst && <BoltIcon className="w-5 h-5 text-yellow-400" />}
      {!isEnergyShield && !isSpeedBurst && <span>None</span>}
    </div>
  );
}
