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
    <div className="text-xl font-bold text-center mt-4">
      {messages[language].timeelap}
      {formatTime(seconds)}
    </div>
  );
}
