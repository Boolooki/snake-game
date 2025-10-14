// components/ui/SpecialStatusSelector.tsx
import React, { useEffect, useState } from "react";
import { SpecialStatusFlags } from "@/hooks/useSpecialStatus";
import { useArrowKeySelector } from "@/hooks/useArrowKeySelector";
import type { Language } from "@/types";

type Props = {
  onSelect: (status: keyof SpecialStatusFlags) => void;
  availableOptions: (keyof SpecialStatusFlags)[];
  language: Language;
};

const ALL_OPTIONS = {
  doubleScore: {
    label: { th: "เติบโตสมบูรณ์", en: "Full Growth" },
    description: { 
      th: "ได้แต้มเพิ่มเป็นสองเท่าเมื่อกินอาหาร", 
      en: "Get double points when eating food" 
    },
    emoji: "⭐",
  },
  extendedSpeedBurst: {
    label: { th: "เร่งราวี", en: "Swift Rush" },
    description: { 
      th: "Speed Burst ยาวนานขึ้น 2 เท่า", 
      en: "Speed Burst lasts 2x longer" 
    },
    emoji: "🔥",
  },
  slowSpeed: {
    label: { th: "คืบคลาน", en: "Slow & Steady" },
    description: { 
      th: "ลดความเร็วของงูลงเท่าตัว", 
      en: "Reduce snake speed by half" 
    },
    emoji: "🐢",
  },
  moreProduceMoretribute: {
    label: { th: "เต็มไปหมด", en: "Abundance" },
    description: { 
      th: "อาหารเกิด +1 สุ่มระเบิด 3-10 ลูกแทน (จากเดิม 1-5 ลูก)", 
      en: "+1 food spawn, bombs increase to 3-10 (from 1-5)" 
    },
    emoji: "🍎",
  },
  safeHeaven: {
    label: { th: "สวรรค์ปัดป้อง", en: "Safe Haven" },
    description: { 
      th: "สุ่มได้ระเบิดเท่าไรจำนวนสุดท้ายจะ -2 ลูก", 
      en: "Reduce final bomb count by 2" 
    },
    emoji: "🛡️",
  },
  petrified: {
    label: { th: "กลัวจนขาแข็ง", en: "Petrified" },
    description: { 
      th: "การเก็บอาหารและบัฟจะไม่สุ่มตำแหน่งอาหารและบัฟ", 
      en: "Collecting items won't respawn new ones" 
    },
    emoji: "😨",
  },
  chargingBehavior: {
    label: { th: "พุ่งลืมตาย", en: "Reckless Charge" },
    description: { 
      th: "เมื่อเหยียบระเบิดจะได้ 3 แต้ม", 
      en: "Get 3 points when hitting bombs" 
    },
    emoji: "💥",
  },
  armadilloLike: {
    label: { th: "อาร์มาดิลโลเอง", en: "Armadillo" },
    description: { 
      th: "โล่เก็บซ้อนได้", 
      en: "Shields can stack" 
    },
    emoji: "🦔",
  },
  noLimitSpeed: {
    label: { th: "ไร้ขีดจำกัด", en: "No Limits" },
    description: { 
      th: "Speed Burst เวลาพื้นฐานเพิ่ม 3 วินาที", 
      en: "Speed Burst base duration +3 seconds" 
    },
    emoji: "🚀",
  },
};

const messages = {
  th: {
    title: "เลือกสถานะพิเศษ",
    hint: "หรือคลิก",
    footer: "💡 เลือกอัพเกรดที่เหมาะกับสไตล์การเล่นของคุณ",
  },
  en: {
    title: "Choose Special Status",
    hint: "or Click",
    footer: "💡 Choose an upgrade that fits your playstyle",
  },
};

export default function SpecialStatusSelector({
  onSelect,
  availableOptions,
  language,
}: Props) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const options = availableOptions.map((key) => ({
    key,
    label: ALL_OPTIONS[key].label[language],
    description: ALL_OPTIONS[key].description[language],
    emoji: ALL_OPTIONS[key].emoji,
  }));

  const { selectedIndex } = useArrowKeySelector(availableOptions, onSelect, true);
  const t = messages[language];

  return (
    <div
      className={`
        fixed inset-0 flex justify-center items-center z-48 p-4
        landscape:p-2
        transition-all duration-500 ease-out
        ${isVisible ? "opacity-100" : "opacity-0"}
      `}
    >
      {/* Backdrop */}
      <div
        className={`
          absolute inset-0 bg-black/40 backdrop-blur-sm
          transition-all duration-500 ease-out
          ${isVisible ? "opacity-100" : "opacity-0"}
        `}
      />

      {/* Modal Card */}
      <div
        className={`
          relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl 
          border border-white/50 
          p-8 
          landscape:p-4
          w-full max-w-lg 
          landscape:max-w-[60%]
          transition-all duration-600 ease-out
          ${isVisible ? "scale-100 opacity-100 blur-0" : "scale-75 opacity-0 blur-lg"}
        `}
        style={{
          transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {/* Header */}
        <div className="text-center mb-6 landscape:mb-3">
          <div
            className={`
              inline-block mb-4 landscape:mb-2
              transition-all duration-700 ease-out
              ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"}
            `}
            style={{
              transitionDelay: "0.2s",
              transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <div className="w-16 h-16 landscape:w-12 landscape:h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl landscape:rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-3xl landscape:text-2xl">✨</span>
            </div>
          </div>

          <h2
            className={`
              text-3xl landscape:text-2xl
              font-bold bg-gradient-to-r from-purple-600 to-pink-600 
              bg-clip-text text-transparent 
              mb-2 landscape:mb-1
              transition-all duration-500 ease-out
              ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}
            `}
            style={{ transitionDelay: "0.3s" }}
          >
            {t.title}
          </h2>

          <p
            className={`
              text-sm landscape:text-xs
              text-gray-500
              transition-all duration-500 ease-out
              ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}
            `}
            style={{ transitionDelay: "0.35s" }}
          >
            {language === "th" ? "ใช้" : "Use"}{" "}
            <kbd className="px-2 py-1 landscape:px-1.5 landscape:py-0.5 bg-gray-100 rounded text-xs landscape:text-[10px]">
              ↑↓
            </kbd>{" "}
            {language === "th" ? "และ" : "and"}{" "}
            <kbd className="px-2 py-1 landscape:px-1.5 landscape:py-0.5 bg-gray-100 rounded text-xs landscape:text-[10px]">
              Enter
            </kbd>{" "}
            {t.hint}
          </p>
        </div>

        {/* Options List */}
        <ul className="space-y-3 landscape:space-y-2 max-h-[55vh] landscape:max-h-[60vh] overflow-y-auto scrollbar-hide pr-2 px-1">
          {options.map((opt, idx) => (
            <li
              key={opt.key}
              onClick={() => onSelect(opt.key)}
              className={`
                relative bg-white/60 backdrop-blur-sm 
                rounded-2xl landscape:rounded-xl 
                p-4 landscape:p-2
                cursor-pointer border-2 transition-all duration-200 ease-out
                ${
                  idx === selectedIndex
                    ? "border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 scale-[1.01] shadow-lg shadow-purple-200/50"
                    : "border-gray-200 hover:border-purple-300 hover:bg-purple-50/50"
                }
              `}
              style={{
                animation: isVisible
                  ? `slideInUp 0.4s ease-out ${0.4 + idx * 0.1}s both`
                  : "none",
              }}
            >
              <div className="flex items-start gap-4 landscape:gap-2">
                <div
                  className={`
                    flex-shrink-0 
                    w-12 h-12 landscape:w-8 landscape:h-8
                    rounded-xl landscape:rounded-lg 
                    flex items-center justify-center 
                    text-2xl landscape:text-lg
                    transition-all duration-200
                    ${
                      idx === selectedIndex
                        ? "bg-gradient-to-br from-purple-400 to-pink-500 shadow-md"
                        : "bg-gray-100"
                    }
                  `}
                >
                  {opt.emoji}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1 landscape:mb-0.5">
                    <h3 className="font-bold text-gray-800 text-lg landscape:text-sm">
                      {opt.label}
                    </h3>
                    {idx === selectedIndex && (
                      <span className="text-purple-500 text-xl landscape:text-base animate-pulse">
                        ▶
                      </span>
                    )}
                  </div>
                  <p className="text-sm landscape:text-xs text-gray-600 leading-relaxed landscape:leading-snug">
                    {opt.description}
                  </p>
                </div>
              </div>

              {idx === selectedIndex && (
                <div className="absolute inset-0 rounded-2xl landscape:rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-20 pointer-events-none" />
              )}
            </li>
          ))}
        </ul>

        <div
          className={`
            mt-6 landscape:mt-3 
            text-center
            transition-all duration-500 ease-out
            ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}
          `}
          style={{ transitionDelay: `${0.4 + options.length * 0.1}s` }}
        >
          <p className="text-xs landscape:text-[10px] text-gray-400">
            {t.footer}
          </p>
        </div>
      </div>
    </div>
  );
}