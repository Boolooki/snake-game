import { PropsBuffStatus } from "@/types";
import type { Language } from "@/types";

const messages = {
  th: {
    buffpanel: "บัฟที่ใช้งานอยู่",
    none: "ไม่มีบัฟ",
    energyShield: "โล่พลังงาน",
    speedBurst: "เพิ่มความเร็ว",
    doubleScore: "แต้มคูณ 2",
    extendedBurst: "บัฟนานขึ้น",
    slowSpeed: "ความเร็วช้าลง",
    moreProduce: "อาหารมากขึ้น",
    safeHeaven: "ระเบิดน้อยลง",
    petrified: "อาหารและบัฟไม่สุ่ม",
    chargingBehavior: "เหยียบระเบิดได้แต้ม",
    armadilloLike: "สะสมโล่ได้",
    noLimitSpeed: "สะสมSBเพิ่มเวลา",
  },
  en: {
    buffpanel: "Active Buffs",
    none: "No Buffs",
    energyShield: "Energy Shield",
    speedBurst: "Speed Burst",
    doubleScore: "Double Score",
    extendedBurst: "Extended Burst",
    slowSpeed: "Slow Speed",
    moreProduce: "More Food",
    safeHeaven: "Safe Heaven",
    petrified: "Petrified",
    chargingBehavior: "Charging Behavior",
    armadilloLike: "Armadillo Like",
    noLimitSpeed: "No Limit Speed",
  },
};

const buffConfig = {
  energyShield: {
    emoji: "🛡️",
    gradient: "from-blue-400 to-cyan-500",
    labelKey: "energyShield" as const,
  },
  speedBurst: {
    emoji: "⚡",
    gradient: "from-yellow-400 to-orange-500",
    labelKey: "speedBurst" as const,
  },
  doubleScore: {
    emoji: "⭐",
    gradient: "from-purple-400 to-pink-500",
    labelKey: "doubleScore" as const,
  },
  extendedBurst: {
    emoji: "🔥",
    gradient: "from-red-400 to-orange-500",
    labelKey: "extendedBurst" as const,
  },
  slowSpeed: {
    emoji: "🐢",
    gradient: "from-green-400 to-emerald-500",
    labelKey: "slowSpeed" as const,
  },
  moreProduce: {
    emoji: "🍎",
    gradient: "from-rose-400 to-red-500",
    labelKey: "moreProduce" as const,
  },
  safeHeaven: {
    emoji: "🌟",
    gradient: "from-indigo-400 to-purple-500",
    labelKey: "safeHeaven" as const,
  },
  petrified: {
    emoji: "😨",
    gradient: "from-indigo-400 to-purple-500",
    labelKey: "petrified" as const,
  },
  chargingBehavior: {
    emoji: "💥",
    gradient: "from-indigo-400 to-purple-500",
    labelKey: "chargingBehavior" as const,
  },
  armadilloLike: {
    emoji: "🦔",
    gradient: "from-indigo-400 to-purple-500",
    labelKey: "armadilloLike" as const,
  },
  noLimitSpeed: {
    emoji: "🚀",
    gradient: "from-indigo-400 to-purple-500",
    labelKey: "noLimitSpeed" as const,
  },
};

interface PropsBuffStatusWithCount
  extends Omit<PropsBuffStatus, "isEnergyShield"> {
  isEnergyShield: number;
  language: Language;
}

export default function BuffStatus({
  isEnergyShield,
  isSpeedBurst,
  isDoubleScore,
  isExtendedBurst,
  isSlowSpeed,
  isMoreProduceMoretribute,
  isSafeHeaven,
  isPetrified,
  isChargingBehavior,
  isArmadilloLike,
  isNoLimitSpeed,
  language,
}: PropsBuffStatusWithCount & { language: Language }) {
  const activeBuffs = [
    isEnergyShield > 0 && "energyShield",
    isSpeedBurst && "speedBurst",
    isDoubleScore && "doubleScore",
    isExtendedBurst && "extendedBurst",
    isSlowSpeed && "slowSpeed",
    isMoreProduceMoretribute && "moreProduce",
    isSafeHeaven && "safeHeaven",
    isPetrified && "petrified",
    isChargingBehavior && "chargingBehavior",
    isArmadilloLike && "armadilloLike",
    isNoLimitSpeed && "noLimitSpeed",
  ].filter(Boolean) as (keyof typeof buffConfig)[];

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/40 p-3 mb-6 md:p-6">
      {/* Header */}
      <h3 className="text-sm md:text-xl font-semibold text-gray-600 mb-2">
        {messages[language].buffpanel}
      </h3>

      {/* Buff Cards */}
      {activeBuffs.length > 0 ? (
        <div className="flex flex-wrap gap-3 justify-center">
          {activeBuffs.map((buffKey) => {
            const buff = buffConfig[buffKey];
            const shieldCount = buffKey === "energyShield" ? isEnergyShield : 0;
            return (
              <div key={buffKey} className="group relative">
                {/* Gradient Card */}
                <div
                  className={`
                    w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br ${
                      buff.gradient
                    } 
                    rounded-2xl flex items-center justify-center shadow-lg
                    transition-all duration-300 ease-out
                    group-hover:scale-110 group-hover:shadow-2xl
                    animate-[fadeIn_0.4s_ease-out]
                    ${
                      shieldCount > 0
                        ? `border-2 border-blue-${300 + shieldCount * 100}`
                        : ""
                    }
                  `}
                >
                  <span className="text-xl md:text-3xl">{buff.emoji}</span>
                  {/* แสดงตัวเลขเล็ก ๆ สำหรับ energyShield */}
                  {shieldCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {shieldCount}
                    </span>
                  )}
                </div>

                {/* Tooltip on Hover */}
                <div
                  className="
                    absolute -bottom-8 left-1/2 -translate-x-1/2
                    bg-gray-800 text-white text-xs md:text-xl px-2 py-1 rounded
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-200
                    whitespace-nowrap pointer-events-none
                  "
                >
                  {messages[language][buff.labelKey]}
                  {shieldCount > 0 &&
                    ` (${shieldCount} layer${shieldCount > 1 ? "s" : ""})`}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-4 text-gray-400">
          {messages[language].none}
        </div>
      )}
    </div>
  );
}
