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

const BACKGROUND_CIRCLES = [
  { size: 120, left: 10, top: 15, delay: 0, duration: 20 },
  { size: 150, left: 80, top: 25, delay: 2, duration: 18 },
  { size: 100, left: 20, top: 70, delay: 4, duration: 22 },
  { size: 130, left: 85, top: 60, delay: 1, duration: 19 },
  { size: 110, left: 45, top: 10, delay: 3, duration: 21 },
  { size: 140, left: 60, top: 80, delay: 5, duration: 17 },
  { size: 90, left: 5, top: 45, delay: 2.5, duration: 23 },
  { size: 125, left: 90, top: 85, delay: 4.5, duration: 16 },
];

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

  const color = isGameOver ? "text-ruby-500" : "text-ruby-500";
  const bgpaused = isPaused ? "bg-emerald-100" : "bg-emerald-200";

  return (
    <div className={`absolute ${color} text-xl animate-[fadeIn_1s] font-bold flex justify-center items-center w-full h-full ${bgpaused} rounded-[20]`}>
      {message}
      <div className="opacity-50 absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 overflow-hidden">
        {BACKGROUND_CIRCLES.map((circle, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-emerald-400/30 to-teal-400/30 animate-float"
            style={{
              width: `${circle.size}px`,
              height: `${circle.size}px`,
              left: `${circle.left}%`,
              top: `${circle.top}%`,
              animationDelay: `${circle.delay}s`,
              animationDuration: `${circle.duration}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
