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
    isEnergyShield && "energyShield",
    isSpeedBurst && "speedBurst",
    isDoubleScore && "doubleScore",
    isExtendedBurst && "extendedBurst",
    isSlowSpeed && "slowSpeed",
    isMoreProduceMoretribute && "moreProduce",
    isSafeHeaven && "safeHeaven",
  ].filter(Boolean) as (keyof typeof buffConfig)[];

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/40 p-3 mb-6">
      {/* Header */}
      <h3 className="text-sm font-semibold text-gray-600 mb-2">
        {messages[language].buffpanel}
      </h3>

      {/* Buff Cards */}
      {activeBuffs.length > 0 ? (
        <div className="flex flex-wrap gap-3 justify-center">
          {activeBuffs.map((buffKey) => {
            const buff = buffConfig[buffKey];
            return (
              <div
                key={buffKey}
                className="group relative"
              >
                {/* Gradient Card */}
                <div
                  className={`
                    w-10 h-10 bg-gradient-to-br ${buff.gradient} 
                    rounded-2xl flex items-center justify-center shadow-lg
                    transition-all duration-300 ease-out
                    group-hover:scale-110 group-hover:shadow-2xl
                    animate-[fadeIn_0.4s_ease-out]
                  `}
                >
                  <span className="text-xl">{buff.emoji}</span>
                </div>

                {/* Tooltip on Hover */}
                <div
                  className="
                    absolute -bottom-8 left-1/2 -translate-x-1/2
                    bg-gray-800 text-white text-xs px-2 py-1 rounded
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-200
                    whitespace-nowrap pointer-events-none
                  "
                >
                  {messages[language][buff.labelKey]}
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