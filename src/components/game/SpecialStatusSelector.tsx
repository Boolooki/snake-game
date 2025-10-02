// components/ui/SpecialStatusSelector.tsx
import React from "react";
import { SpecialStatusFlags } from "@/hooks/useSpecialStatus";

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
  }[] = [
    {
      key: "doubleScore",
      label: "แต้ม x2",
      description: "ได้แต้มเพิ่มเป็นสองเท่าเมื่อกินอาหาร",
    },
    {
      key: "extendedSpeedBurst",
      label: "Speed Burst นานขึ้น",
      description: "เมื่อเก็บ Speed Burst จะได้ระยะเวลาบัฟนานขึ้น 2 เท่า",
    },
    {
      key: "slowSpeed",
      label: "งูช้าลง",
      description: "ลดความเร็วของงูลง",
    },
    {
      key: "moreProduceMoretribute",
      label: "เกิดอาหารและระเบิดมากขึ้น",
      description: "อาหารเกิดมากขึ้น +1 อัน การสุ่มระเบิดจะสุ่มจาก 3-10 ลูกแทน",
    },
     {
       key: "safeHeaven",
       label: "ระเบิดสุ่มจำนวนน้อยลง",
       description: "ระเบิดสูงสุดมีได้ -2 ลูก",
     },
    // {
    //   key: "passiveDeathWish",
    //   label: "เหยียบระเบิดจะให้แต้ม",
    //   description: "การเก็บระเบิดจะให้แต้ม +1",
    // },
    // {
    //   key: "LeonidasProof",
    //   label: "โล่จะสะสมได้",
    //   description: "สามารถสะสมจำนวนโล่ได้",
    // },
    // {
    //   key: "playingWithTime",
    //   label: "เกมเร็วเท่าเดิมแต่เวลาเดินช้าลง",
    //   description: "เวลาเดินช้าลง แต่เกมยังคงเร็วปกติ และการบันทึกผลจะยึดจากเวลาที่ช้าลงเช่นกัน",
    // },
  ];

  const filteredOptions = options.filter(
    (opt) => !excludedKeys?.includes(opt.key)
  );

  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-100 animate-[fadeIn_1s_ease-out_forwards]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90vw] max-w-md space-y-4">
        <h2 className="text-xl font-bold text-center text-gray-800">
          เลือกสถานะพิเศษ
        </h2>
        <ul className="space-y-3">
          {filteredOptions.map((opt) => (
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
