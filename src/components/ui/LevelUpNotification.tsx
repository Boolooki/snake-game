// components/ui/LevelUpNotification.tsx
import { useEffect, useState } from "react";

type Props = {
  level: number;
  onComplete: () => void;
};

export default function LevelUpNotification({ level, onComplete }: Props) {
  const [phase, setPhase] = useState<"entering" | "displaying" | "exiting">("entering");

  useEffect(() => {
    // Phase 1: Entering (0.5s)
    const enterTimer = setTimeout(() => {
      setPhase("displaying");
    }, 500);

    // Phase 2: Display (1.5s)
    const displayTimer = setTimeout(() => {
      setPhase("exiting");
    }, 2000);

    // Phase 3: Exit and complete (2.5s total)
    const exitTimer = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(displayTimer);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[90] pointer-events-none flex items-center justify-center">
      {/* Background flash */}
      <div
        className={`
          absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20
          transition-opacity duration-500
          ${phase === "displaying" ? "opacity-100" : "opacity-0"}
        `}
      />

      {/* Level Up Card */}
      <div
        className={`
          relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl 
          border-4 border-gradient p-12
          transition-all duration-500 ease-out
          ${
            phase === "entering"
              ? "scale-50 opacity-0 blur-lg rotate-12"
              : phase === "displaying"
              ? "scale-100 opacity-100 blur-0 rotate-0"
              : "scale-150 opacity-0 blur-lg -rotate-12"
          }
        `}
        style={{
          borderImage: "linear-gradient(135deg, #a855f7, #ec4899) 1",
        }}
      >
        {/* Particles */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-particle"
              style={{
                left: `${50 + Math.cos((i / 12) * Math.PI * 2) * 40}%`,
                top: `${50 + Math.sin((i / 12) * Math.PI * 2) * 40}%`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: "1.5s",
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 text-center">
          {/* Icon */}
          <div
            className={`
              inline-block mb-4
              transition-all duration-700 ease-out
              ${phase === "displaying" ? "scale-100 rotate-0" : "scale-0 rotate-180"}
            `}
            style={{ transitionDelay: "0.2s" }}
          >
            <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl">
              <span className="text-6xl">⬆️</span>
            </div>
          </div>

          {/* Text */}
          <h2
            className={`
              text-5xl font-black mb-2
              bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent
              transition-all duration-500 ease-out
              ${
                phase === "displaying"
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }
            `}
            style={{ transitionDelay: "0.3s" }}
          >
            LEVEL UP!
          </h2>

          <p
            className={`
              text-3xl font-bold text-gray-700
              transition-all duration-500 ease-out
              ${
                phase === "displaying"
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }
            `}
            style={{ transitionDelay: "0.4s" }}
          >
            Level {level}
          </p>

          {/* Subtitle */}
          <p
            className={`
              text-sm text-gray-500 mt-4
              transition-all duration-500 ease-out
              ${
                phase === "displaying"
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }
            `}
            style={{ transitionDelay: "0.5s" }}
          >
            เตรียมพบกับสถานะพิเศษ...
          </p>
        </div>

        {/* Glow effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-2xl -z-10" />
      </div>

      {/* Keyframes */}
      <style jsx>{`
        @keyframes particle {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(
                ${Math.random() * 200 - 100}px,
                ${Math.random() * 200 - 100}px
              )
              scale(0);
            opacity: 0;
          }
        }
        .animate-particle {
          animation: particle ease-out;
        }
      `}</style>
    </div>
  );
}