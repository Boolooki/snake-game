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
}: {
  isGameOver: boolean;
  isPaused: boolean;
  language: Language;
}) {
  if (!isGameOver && !isPaused) return null;

  const safeLanguage = messages[language] ? language : fallbackLanguage;
  const message = isGameOver
    ? messages[safeLanguage].gameover
    : messages[safeLanguage].paused;

  const color = isGameOver ? "text-red-500" : "text-orange-500";

  return (
    <div className={`absolute ${color} text-xl font-bold flex justify-center items-center w-full h-full bg-opacity-75`}>
      {message}
    </div>
  );
}
