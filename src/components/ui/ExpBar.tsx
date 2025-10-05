// components/ui/ExpBar.tsx
import { useMemo } from "react";

type Props = {
  score: number;
  level: number;
  thresholds?: number[];
  language: "th" | "en";
};

const messages = {
  th: {
    level: "เลเวล",
    max: "สูงสุด",
  },
  en: {
    level: "Level",
    max: "Max",
  },
};

export default function ExpBar({
  score,
  level,
  thresholds = [5, 20, 50, 100],
  language,
}: Props) {
  // คำนวณ progress
  const { currentThreshold, nextThreshold, progress, isMaxLevel } = useMemo(() => {
    const nextThreshold = thresholds.find((t) => score < t);
    const currentThreshold = thresholds[level - 1] || 0;

    if (!nextThreshold) {
      // Max level แล้ว
      return {
        currentThreshold: thresholds[thresholds.length - 1] || 0,
        nextThreshold: null,
        progress: 100,
        isMaxLevel: true,
      };
    }

    const scoreInLevel = score - currentThreshold;
    const neededInLevel = nextThreshold - currentThreshold;
    const progress = (scoreInLevel / neededInLevel) * 100;

    return {
      currentThreshold,
      nextThreshold,
      progress: Math.min(progress, 100),
      isMaxLevel: false,
    };
  }, [score, level, thresholds]);

  return (
    <div className="w-full max-w-md">
      {/* Level Display */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-600">
            {messages[language].level} {level}
          </span>
          {!isMaxLevel && (
            <span className="text-xs text-gray-400">
              {score}/{nextThreshold}
            </span>
          )}
          {isMaxLevel && (
            <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">
              {messages[language].max}
            </span>
          )}
        </div>

        {/* Next Level Preview */}
        {!isMaxLevel && (
          <span className="text-xs text-gray-400">{Math.round(progress)}%</span>
        )}
      </div>

      {/* Progress Bar */}
      <div className="relative h-3 bg-white/60 backdrop-blur-sm rounded-full overflow-hidden shadow-inner border border-white/40">
        {/* Background gradient glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20" />

        {/* Progress Fill */}
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full transition-all duration-500 ease-out shadow-lg"
          style={{ width: `${progress}%` }}
        >
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
        </div>

        {/* Threshold markers */}
        {!isMaxLevel &&
          thresholds.map((threshold, idx) => {
            if (threshold <= currentThreshold || threshold >= (nextThreshold || Infinity)) {
              return null;
            }

            const position = ((threshold - currentThreshold) / ((nextThreshold || threshold) - currentThreshold)) * 100;

            return (
              <div
                key={idx}
                className="absolute top-0 bottom-0 w-0.5 bg-white/50"
                style={{ left: `${position}%` }}
              />
            );
          })}
      </div>

      {/* Level up indicator */}
      {progress === 100 && !isMaxLevel && (
        <div className="mt-1 text-center animate-pulse">
          <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
            ✨ พร้อมเลเวลอัพ!
          </span>
        </div>
      )}
    </div>
  );
}