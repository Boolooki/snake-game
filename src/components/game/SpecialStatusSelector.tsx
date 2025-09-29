// components/ui/SpecialStatusSelector.tsx
import React from "react";
import { SpecialStatus } from "@/hooks/useSpecialStatus";

type Props = {
  onSelect: (status: SpecialStatus) => void;
};

export default function SpecialStatusSelector({ onSelect }: Props) {
  const options: { key: SpecialStatus; label: string; description: string }[] = [
    {
      key: "doubleScoreSlowSpeed",
      label: "แต้ม x2, งูช้าลง",
      description: "ลดความเร็วของงูลง แต่ได้แต้มเพิ่มเป็นสองเท่าเมื่อกินอาหาร",
    },
    {
      key: "extendedSpeedBurst",
      label: "Speed Burst นานขึ้น",
      description: "เมื่อเก็บ Speed Burst จะได้ระยะเวลาบัฟนานขึ้น 2 เท่า",
    },
    {
      key: "none",
      label: "ไม่เลือกตอนนี้",
      description: "ข้ามการเลือกสถานะพิเศษในรอบนี้",
    },
  ];

  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-100 animate-[fadeIn_1s_ease-out_forwards]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90vw] max-w-md space-y-4">
        <h2 className="text-xl font-bold text-center text-gray-800">เลือกสถานะพิเศษ</h2>
        <ul className="space-y-3">
          {options.map((opt) => (
            <li
              key={opt.key}
              className="border border-gray-300 rounded p-3 hover:bg-yellow-100 cursor-pointer transition duration-300 animate-fadeIn"
              onClick={() => onSelect(opt.key)}
            >
              <p className="font-semibold text-gray-700">{opt.label}</p>
              <p className="text-sm text-gray-500">{opt.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
