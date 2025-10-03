import { formatTime } from "@/utils/gameUtils";
import type { Language } from "@/types"; // ถ้าคุณแยก type ไว้

const messages = {
  th: {
    timeelap: "เวลาที่ทำได้: ",
  },
  en: {
    timeelap: "Time Elapsed: ",
  },
};

export default function Timer({
  seconds,
  language,
}: {
  seconds: number;
  language: Language;
}) {
  return (
    <div className="p-2 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/40 overflow-hidden">
      {messages[language].timeelap}
      {formatTime(seconds)}
    </div>
  );
}
