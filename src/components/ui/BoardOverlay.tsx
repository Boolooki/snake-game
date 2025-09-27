import type { Language } from "@/types";

const messages = {
  th: {
    gameover: "จบเกม!",
    paused: "เกมหยุดพัก",
  },
  en: {
    gameover: "Game Over!",
    paused: "Paused",
  },
};

const fallbackLanguage: Language = "en";

export default function BoardOverlay({
  isGameOver,
  isPaused,
  language,
  countdown,
}: {
  isGameOver: boolean;
  isPaused: boolean;
  language: Language;
  countdown: number | null;
}) {
  if (countdown !== null && countdown > 0) return null;
  if (!isGameOver && !isPaused) return null;

  const safeLanguage = messages[language] ? language : fallbackLanguage;
  const message = isGameOver
    ? messages[safeLanguage].gameover
    : messages[safeLanguage].paused;

  const color = isGameOver ? "text-red-500" : "text-orange-500";
  const bgpaused = isPaused ? "bg-yellow-100" : ""

  return (
    <div className={`absolute ${color} text-xl font-bold flex justify-center items-center w-full h-full ${bgpaused} rounded-[20]`}>
      {message}
    </div>
  );
}
