// components/game/BoardOverlay.tsx
import type { Language } from "@/types";
import { BACKGROUND_CIRCLES } from "@/constants/gameConstants";

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
  isTutorial,
  isShowWallAnimation,
  isBombAnimation,
  isGameOver,
  isPaused,
  language,
  countdown,
  isLevelingUp, // เพิ่ม prop นี้
}: {
  isShowWallAnimation: boolean;
  isBombAnimation: boolean;
  isTutorial: boolean;
  isGameOver: boolean;
  isPaused: boolean;
  language: Language;
  countdown: number | null;
  isLevelingUp?: boolean; // เพิ่ม
}) {
  if (countdown !== null && countdown > 0) return null;
  if (!isGameOver && !isPaused) return null;

  // ซ่อนถ้ากำลัง level up
  if (isLevelingUp || isTutorial || isBombAnimation || isShowWallAnimation)
    return null;

  const safeLanguage = messages[language] ? language : fallbackLanguage;
  const message = isGameOver
    ? messages[safeLanguage].gameover
    : messages[safeLanguage].paused;

  return (
    <>
      {/* Background Overlay with Blur Effect */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-[overlayFadeIn_0.5s_ease-out_forwards] rounded-[20px] overflow-hidden">
        {/* Animated Circles */}
        <div className="absolute inset-0 opacity-30">
          {BACKGROUND_CIRCLES.map((circle, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gradient-to-br from-emerald-400/40 to-teal-400/40 animate-float"
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

      {/* Message Container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        {isGameOver ? (
          // Game Over - Dramatic entrance
          <div className="animate-[gameOverDramatic_0.8s_cubic-bezier(0.34,1.56,0.64,1)_forwards]">
            <h1 className="text-5xl md:text-6xl text-center font-black text-white drop-shadow-[0_0_20px_rgba(239,68,68,0.8)] mb-4">
              {message}
            </h1>
            <div className="h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent animate-[expandWidth_0.6s_ease-out_0.3s_forwards] w-0 mx-auto" />
          </div>
        ) : (
          // Paused - Smooth fade with scale
          <div className="animate-[pausedSmooth_0.4s_ease-out_forwards]">
            <div className="bg-white/90 backdrop-blur-md px-8 py-4 rounded-2xl shadow-2xl border border-white/50">
              <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                {message}
              </h2>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
