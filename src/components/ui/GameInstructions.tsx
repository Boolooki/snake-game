import type { Language } from "@/types"; // ถ้าคุณแยก type ไว้

const messages = {
  th: {
    move: "ใช้ปุ่มลูกศร, ASWD หรือท่าทางเพื่อเคลื่อนที่",
    shield: "เก็บโล่สีน้ำเงินเพื่อรอดจากระเบิดสีแดงหนึ่งลูก!",
  },
  en: {
    move: "Use Arrow Keys, ASWD or Gestures to Move",
    shield: "Collect the blue shield to survive one red bomb!",
  },
};

export default function GameInstructions({ language }: { language: Language }) {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/40 p-6 max-w-2xl text-sm text-gray-600">
      <div>{messages[language].move}</div>
      <div>{messages[language].shield}</div>
    </div>
  );
}
