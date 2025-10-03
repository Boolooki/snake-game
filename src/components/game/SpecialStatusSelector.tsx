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
    emoji?: string;
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
      description: "อาหารเกิดมากขึ้น +1 อัน การสุ่มระเบิดจะสุ่มจาก 3-10 ลูกแทน ( จากเดิม 1-5 ลูก )",
      emoji: "🍎",
    },
    {
      key: "safeHeaven",
      label: "สวรรค์ปัดป้อง",
      description: "สุ่มได้ระเบิดเท่าไรจำนวนสุดท้ายจะ-2ลูก",
      emoji: "🛡️",
    },
  ];

  const filteredOptions = options.filter(
    (opt) => !excludedKeys?.includes(opt.key)
  );

  const optionKeys = filteredOptions.map((opt) => opt.key);

  const { selectedIndex } = useArrowKeySelector(optionKeys, onSelect, true);

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 animate-[fadeIn_0.3s_ease-out_forwards]">
      <div className="bg-white p-6 rounded-lg shadow-2xl w-[90vw] max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          เลือกสถานะพิเศษ
        </h2>
        <p className="text-center text-sm text-gray-500">
          ใช้ ↑↓ เพื่อเลือก, Enter เพื่อยืนยัน
        </p>
        <ul className="space-y-3 max-h-[60vh] overflow-y-auto scrollbar-hide">
          {filteredOptions.map((opt, idx) => (
            <li
              key={opt.key}
              className={`
                border rounded-lg p-4 cursor-pointer 
                transition-all duration-200 ease-in-out
                ${
                  idx === selectedIndex
                    ? "bg-yellow-200 border-yellow-500 scale-105 shadow-lg"
                    : "border-gray-300 hover:bg-yellow-50 hover:border-yellow-300"
                }
              `}
              onClick={() => onSelect(opt.key)}
            >
              <div className="flex items-start gap-3">
                {opt.emoji && (
                  <span className="text-2xl flex-shrink-0">{opt.emoji}</span>
                )}
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 mb-1">
                    {opt.label}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {opt.description}
                  </p>
                </div>
                {idx === selectedIndex && (
                  <span className="text-yellow-500 flex-shrink-0 text-xl">
                    ▶
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
        <p className="text-center text-xs text-gray-400 mt-4">
          หรือคลิกเพื่อเลือกได้เลย
        </p>
      </div>
    </div>
  );
}
