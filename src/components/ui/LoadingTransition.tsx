// components/ui/LoadingTransition.tsx
import { useEffect, useState } from "react";
import { BACKGROUND_CIRCLES } from "@/constants/gameConstants";
import { Language } from "@/types";

type Props = {
  onComplete: () => void;
  username: string;
  language: Language;
};

const messages = {
  th: {
    welcome: "ยินดีต้อนรับ",
    prepairing: "กำลังเตรียมเกม...",
  },
  en: {
    welcome: "Welcome",
    prepairing: "Prepairing assets...",
  },
}

export default function LoadingTransition({
  language,
  onComplete,
  username,
}: Props) {
  const [phase, setPhase] = useState<"loading" | "scattering" | "complete">(
    "loading"
  );
  const [progress, setProgress] = useState(0);
  const t = messages[language];

  useEffect(() => {
    // Phase 1: Loading (2 วินาที)
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    // Phase 2: เริ่ม scatter หลัง 2 วินาที
    const scatterTimer = setTimeout(() => {
      setPhase("scattering");
    }, 2000);

    // Phase 3: เสร็จสมบูรณ์หลัง 3 วินาที
    const completeTimer = setTimeout(() => {
      setPhase("complete");
      onComplete();
    }, 3000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(scatterTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  if (phase === "complete") return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        {/* Animated Circles */}
        {BACKGROUND_CIRCLES.map((circle, i) => (
          <div
            key={i}
            className={`
              absolute rounded-full bg-gradient-to-br from-emerald-400/30 to-teal-400/30
              transition-all duration-1000
              ${phase === "loading" ? "animate-float" : ""}
            `}
            style={{
              width: `${circle.size}px`,
              height: `${circle.size}px`,
              left:
                phase === "scattering"
                  ? `${Math.random() * 120 - 10}%`
                  : `${circle.left}%`,
              top:
                phase === "scattering"
                  ? `${Math.random() * 120 - 10}%`
                  : `${circle.top}%`,
              opacity: phase === "scattering" ? 0 : 1,
              transform: phase === "scattering" ? "scale(2)" : "scale(1)",
              animationDelay: `${circle.delay}s`,
              animationDuration: `${circle.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Loading Content */}
      <div
        className={`
          absolute inset-0 flex flex-col items-center justify-center
          transition-all duration-1000
          ${
            phase === "scattering"
              ? "opacity-0 scale-150 blur-lg"
              : "opacity-100 scale-100"
          }
        `}
      >
        {/* Snake Icon */}
        <div className="mb-8 relative">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl flex items-center justify-center shadow-2xl animate-pulse">
            <span className="text-6xl">🐍</span>
          </div>
          {/* Orbiting dots */}
          <div
            className="absolute inset-0 animate-spin"
            style={{ animationDuration: "3s" }}
          >
            <div className="absolute top-0 left-1/2 -ml-2 w-4 h-4 bg-emerald-500 rounded-full" />
          </div>
          <div
            className="absolute inset-0 animate-spin"
            style={{ animationDuration: "2s", animationDirection: "reverse" }}
          >
            <div className="absolute bottom-0 left-1/2 -ml-2 w-4 h-4 bg-teal-500 rounded-full" />
          </div>
        </div>

        {/* Welcome Message */}
        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
          {t.welcome} {username}!
        </h2>
        <p className="text-gray-500 mb-8">{t.prepairing}</p>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-white/60 backdrop-blur-sm rounded-full overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress Text */}
        <p className="text-sm text-gray-400 mt-4 font-mono">{progress}%</p>
      </div>
    </div>
  );
}
