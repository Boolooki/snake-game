// components/ui/SpecialStatusSelector.tsx
import React from "react";
import { SpecialStatusFlags } from "@/hooks/useSpecialStatus";
import { useArrowKeySelector } from "@/hooks/useArrowKeySelector";

type Props = {
  onSelect: (status: keyof SpecialStatusFlags) => void;
  excludedKeys?: (keyof SpecialStatusFlags)[];
};

export default function SpecialStatusSelector({
  onSelect,
  excludedKeys,
}: Props) {
  const options: {
    key: keyof SpecialStatusFlags;
    label: string;
    description: string;
    emoji: string;
  }[] = [
    {
      key: "doubleScore",
      label: "เติบโตสมบูรณ์",
      description: "ได้แต้มเพิ่มเป็นสองเท่าเมื่อกินอาหาร",
      emoji: "⭐",
    },
    {
      key: "extendedSpeedBurst",
      label: "เร่งราวี",
      description: "Speed Burst ยาวนานขึ้น 2 เท่า",
      emoji: "⚡",
    },
    {
      key: "slowSpeed",
      label: "เยื่องเท้า",
      description: "ลดความเร็วของงูลงเท่าตัว",
      emoji: "🐢",
    },
    {
      key: "moreProduceMoretribute",
      label: "มากโภชนาการมากบรรณาการ",
      description: "อาหารเกิดมากขึ้น +1 อัน การสุ่มระเบิดจะสุ่มจาก 3-10 ลูกแทน (จากเดิม 1-5 ลูก)",
      emoji: "🍎",
    },
    {
      key: "safeHeaven",
      label: "สวรรค์ปัดป้อง",
      description: "สุ่มได้ระเบิดเท่าไรจำนวนสุดท้ายจะ -2 ลูก",
      emoji: "🛡️",
    },
  ];

  const filteredOptions = options.filter(
    (opt) => !excludedKeys?.includes(opt.key)
  );

  const optionKeys = filteredOptions.map((opt) => opt.key);
  const { selectedIndex } = useArrowKeySelector(optionKeys, onSelect, true);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      {/* Modal Card */}
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-block mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-3xl">✨</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            เลือกสถานะพิเศษ
          </h2>
          <p className="text-sm text-gray-500">
            ใช้ <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">↑↓</kbd> และ <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Enter</kbd> หรือคลิกเพื่อเลือก
          </p>
        </div>

        {/* Options List */}
        <ul className="space-y-3 max-h-[55vh] overflow-y-auto scrollbar-hide pr-2">
          {filteredOptions.map((opt, idx) => (
            <li
              key={opt.key}
              onClick={() => onSelect(opt.key)}
              className={`
                relative bg-white/60 backdrop-blur-sm rounded-2xl p-4 cursor-pointer 
                border-2 transition-all duration-200 ease-out
                ${
                  idx === selectedIndex
                    ? "border-gradient-to-r from-purple-500 to-pink-500 bg-gradient-to-r from-purple-50 to-pink-50 scale-[1.02] shadow-lg"
                    : "border-gray-200 hover:border-purple-300 hover:bg-purple-50/50"
                }
              `}
            >
              <div className="flex items-start gap-4">
                {/* Emoji Icon */}
                <div className={`
                  flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl
                  ${idx === selectedIndex 
                    ? "bg-gradient-to-br from-purple-400 to-pink-500 shadow-md" 
                    : "bg-gray-100"
                  }
                `}>
                  {opt.emoji}
                </div>

                {/* Content */}
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

              {/* Selected Border Effect */}
              {idx === selectedIndex && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-20 pointer-events-none" />
              )}
            </li>
          ))}
        </ul>

        {/* Footer Hint */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            💡 เลือกอัพเกรดที่เหมาะกับสไตล์การเล่นของคุณ
          </p>
        </div>
      </div>

      {/* Scrollbar Hide Styles */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}