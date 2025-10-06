// components/ui/SpecialStatusSelector.tsx
import React, { useEffect, useState } from "react";
import { SpecialStatusFlags } from "@/hooks/useSpecialStatus";
import { useArrowKeySelector } from "@/hooks/useArrowKeySelector";

type Props = {
  onSelect: (status: keyof SpecialStatusFlags) => void;
  availableOptions: (keyof SpecialStatusFlags)[]; // เปลี่ยนเป็นรับ available options
};

const ALL_OPTIONS = {
  doubleScore: {
    label: "เติบโตสมบูรณ์",
    description: "ได้แต้มเพิ่มเป็นสองเท่าเมื่อกินอาหาร",
    emoji: "⭐",
  },
  extendedSpeedBurst: {
    label: "เร่งราวี",
    description: "Speed Burst ยาวนานขึ้น 2 เท่า",
    emoji: "🔥",
  },
  slowSpeed: {
    label: "เยื่องเท้า",
    description: "ลดความเร็วของงูลงเท่าตัว",
    emoji: "🐢",
  },
  moreProduceMoretribute: {
    label: "เต็มไปหมด",
    description:
      "อาหารเกิด +1 สุ่มระเบิด 3-10 ลูกแทน (จากเดิม 1-5 ลูก)",
    emoji: "🍎",
  },
  safeHeaven: {
    label: "สวรรค์ปัดป้อง",
    description: "สุ่มได้ระเบิดเท่าไรจำนวนสุดท้ายจะ -2 ลูก",
    emoji: "🛡️",
  },
};

export default function SpecialStatusSelector({
  onSelect,
  availableOptions,
}: Props) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // กรองเฉพาะ options ที่สุ่มได้
  const options = availableOptions.map((key) => ({
    key,
    ...ALL_OPTIONS[key],
  }));

  const { selectedIndex } = useArrowKeySelector(
    availableOptions,
    onSelect,
    true
  );

  return (
    <div
      className={`
        fixed inset-0 flex justify-center items-center z-50 p-4
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
          border border-white/50 p-8 w-full max-w-lg
          transition-all duration-600 ease-out
          ${
            isVisible
              ? "scale-100 opacity-100 blur-0"
              : "scale-75 opacity-0 blur-lg"
          }
        `}
        style={{
          transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <div
            className={`
              inline-block mb-4
              transition-all duration-700 ease-out
              ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-12 opacity-0"
              }
            `}
            style={{
              transitionDelay: "0.2s",
              transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-3xl">✨</span>
            </div>
          </div>

          <h2
            className={`
              text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 
              bg-clip-text text-transparent mb-2
              transition-all duration-500 ease-out
              ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }
            `}
            style={{ transitionDelay: "0.3s" }}
          >
            เลือกสถานะพิเศษ
          </h2>

          <p
            className={`
              text-sm text-gray-500
              transition-all duration-500 ease-out
              ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }
            `}
            style={{ transitionDelay: "0.35s" }}
          >
            ใช้ <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">↑↓</kbd>{" "}
            และ{" "}
            <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Enter</kbd>{" "}
            หรือคลิกเพื่อเลือก
          </p>
        </div>

        {/* Options List */}
        <ul className="space-y-3 max-h-[55vh] overflow-y-auto scrollbar-hide pr-2 px-1">
          {" "}
          {/* เพิ่ม px-1 */}
          {options.map((opt, idx) => (
            <li
              key={opt.key}
              onClick={() => onSelect(opt.key)}
              className={`
        relative bg-white/60 backdrop-blur-sm rounded-2xl p-4 cursor-pointer 
        border-2 transition-all duration-200 ease-out
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
              <div className="flex items-start gap-4">
                <div
                  className={`
                  flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl
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
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-gray-800 text-lg">
                      {opt.label}
                    </h3>
                    {idx === selectedIndex && (
                      <span className="text-purple-500 text-xl animate-pulse">
                        ▶
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {opt.description}
                  </p>
                </div>
              </div>

              {idx === selectedIndex && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-20 pointer-events-none" />
              )}
            </li>
          ))}
        </ul>

        <div
          className={`
            mt-6 text-center
            transition-all duration-500 ease-out
            ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }
          `}
          style={{ transitionDelay: `${0.4 + options.length * 0.1}s` }}
        >
          <p className="text-xs text-gray-400">
            💡 เลือกอัพเกรดที่เหมาะกับสไตล์การเล่นของคุณ
          </p>
        </div>
      </div>
    </div>
  );
}
