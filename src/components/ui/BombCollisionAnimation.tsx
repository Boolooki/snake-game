// components/ui/BombCollisionAnimation.tsx
"use client";

import { useEffect, useState } from "react";

type Props = {
  onComplete: () => void;
};

export default function BombCollisionAnimation({ onComplete }: Props) {
  const [phase, setPhase] = useState<"slide" | "collision" | "explosion">("slide");

  useEffect(() => {
    // Phase 1: Slide in (0.8s)
    const slideTimer = setTimeout(() => {
      setPhase("collision");
    }, 800);

    // Phase 2: Collision (1.3s)
    const collisionTimer = setTimeout(() => {
      setPhase("explosion");
    }, 1300);

    // Phase 3: Complete (2.0s)
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => {
      clearTimeout(slideTimer);
      clearTimeout(collisionTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[99] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]" />

      {/* Bomb - Slide from left */}
      <div
        className={`absolute text-8xl transition-all duration-800 ease-out ${
          phase === "slide"
            ? "-translate-x-[200%]"
            : phase === "collision"
            ? "translate-x-0"
            : "translate-x-0 scale-0 opacity-0"
        }`}
        style={{
          left: phase === "collision" || phase === "explosion" ? "calc(50% - 100px)" : undefined,
        }}
      >
        💣
      </div>

      {/* Snake - Slide from right */}
      <div
        className={`absolute text-8xl transition-all duration-800 ease-out ${
          phase === "slide"
            ? "translate-x-[200%]"
            : phase === "collision"
            ? "translate-x-0"
            : "translate-x-0 scale-0 opacity-0"
        }`}
        style={{
          right: phase === "collision" || phase === "explosion" ? "calc(50% - 100px)" : undefined,
        }}
      >
        🐍
      </div>

      {/* Explosion - Pop from center */}
      {phase === "explosion" && (
        <div className="absolute animate-[explosionPop_0.7s_cubic-bezier(0.34,1.56,0.64,1)]">
          <div className="text-[200px] animate-pulse">💥</div>
        </div>
      )}

      {/* Shockwave rings */}
      {phase === "explosion" && (
        <>
          <div className="absolute w-32 h-32 border-4 border-red-500 rounded-full animate-[shockwave_0.8s_ease-out]" />
          <div className="absolute w-32 h-32 border-4 border-orange-500 rounded-full animate-[shockwave_0.8s_ease-out_0.15s]" />
          <div className="absolute w-32 h-32 border-4 border-yellow-500 rounded-full animate-[shockwave_0.8s_ease-out_0.3s]" />
        </>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes explosionPop {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.2) rotate(180deg);
            opacity: 1;
          }
          100% {
            transform: scale(1) rotate(360deg);
            opacity: 1;
          }
        }

        @keyframes shockwave {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}