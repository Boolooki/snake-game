// components/ui/WallCollisionAnimation.tsx
"use client";

import { useEffect, useState } from "react";

type Props = {
  onComplete: () => void;
  direction: "UP" | "DOWN" | "LEFT" | "RIGHT"; // ทิศทางที่งูชน
};

export default function WallCollisionAnimation({ onComplete, direction }: Props) {
  const [phase, setPhase] = useState<"slide" | "collision" | "impact">("slide");

  useEffect(() => {
    // Phase 1: Slide in (0.8s)
    const slideTimer = setTimeout(() => {
      setPhase("collision");
    }, 800);

    // Phase 2: Collision (1.3s)
    const collisionTimer = setTimeout(() => {
      setPhase("impact");
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

  // คำนวณตำแหน่งตามทิศทาง
  const getPositions = () => {
    switch (direction) {
      case "UP":
        return {
          snake: {
            initial: "translate-y-[200%]",
            final: "translate-y-0",
          },
          wall: {
            position: "top-0 left-0 right-0",
            axis: "horizontal",
          },
          impact: "top-[20%]",
        };
      case "DOWN":
        return {
          snake: {
            initial: "-translate-y-[200%]",
            final: "translate-y-0",
          },
          wall: {
            position: "bottom-0 left-0 right-0",
            axis: "horizontal",
          },
          impact: "bottom-[20%]",
        };
      case "LEFT":
        return {
          snake: {
            initial: "translate-x-[200%]",
            final: "translate-x-0",
          },
          wall: {
            position: "left-0 top-0 bottom-0",
            axis: "vertical",
          },
          impact: "left-[20%]",
        };
      case "RIGHT":
        return {
          snake: {
            initial: "-translate-x-[200%]",
            final: "translate-x-0",
          },
          wall: {
            position: "right-0 top-0 bottom-0",
            axis: "vertical",
          },
          impact: "right-[20%]",
        };
    }
  };

  const positions = getPositions();

  return (
    <div className="fixed inset-0 z-[99] flex items-center justify-center overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]" />

      {/* Wall */}
      <div
        className={`absolute ${positions.wall.position} ${
          positions.wall.axis === "horizontal" ? "h-16" : "w-16"
        } bg-gradient-to-br from-gray-600 to-gray-800 shadow-inner`}
      >
        {/* Brick pattern */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute border border-gray-700"
              style={{
                width: positions.wall.axis === "horizontal" ? "10%" : "100%",
                height: positions.wall.axis === "horizontal" ? "100%" : "10%",
                left: positions.wall.axis === "horizontal" ? `${i * 10}%` : 0,
                top: positions.wall.axis === "horizontal" ? 0 : `${i * 10}%`,
              }}
            />
          ))}
        </div>

        {/* Wall shake effect on collision */}
        {phase === "collision" && (
          <div className="absolute inset-0 bg-red-500/30 animate-[shake_0.5s_ease-in-out]" />
        )}
      </div>

      {/* Snake - Slide towards wall */}
      <div
        className={`absolute ${positions.impact} text-8xl transition-all duration-800 ease-out ${
          phase === "slide"
            ? positions.snake.initial
            : phase === "collision"
            ? `${positions.snake.final}`
            : `${positions.snake.final} scale-75 opacity-50`
        }`}
      >
        🐍
      </div>

      {/* Impact effect */}
      {phase === "impact" && (
        <div className={`absolute ${positions.impact} flex items-center justify-center`}>
          {/* Main explosion */}
          <div className="absolute animate-[explosionPop_0.7s_cubic-bezier(0.34,1.56,0.64,1)]">
            <div className="text-[200px] animate-pulse">💥</div>
          </div>

          {/* Shockwave rings */}
          <div className="absolute w-32 h-32 border-4 border-red-500 rounded-full animate-[shockwave_0.8s_ease-out]" />
          <div className="absolute w-32 h-32 border-4 border-orange-500 rounded-full animate-[shockwave_0.8s_ease-out_0.15s]" />
          <div className="absolute w-32 h-32 border-4 border-yellow-500 rounded-full animate-[shockwave_0.8s_ease-out_0.3s]" />

          {/* Debris particles */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 bg-gradient-to-br from-gray-600 to-gray-800 rounded-sm"
              style={{
                animation: `debris 0.8s ease-out forwards`,
                animationDelay: `${i * 0.05}s`,
                transform: `rotate(${i * 45}deg)`,
              }}
            />
          ))}

          {/* Dizzy stars */}
          {[...Array(3)].map((_, i) => (
            <div
              key={`star-${i}`}
              className="absolute text-4xl animate-[dizzy_1s_ease-in-out_infinite]"
              style={{
                animationDelay: `${i * 0.2}s`,
                left: `${(i - 1) * 60}px`,
                top: "-60px",
              }}
            >
              ⭐
            </div>
          ))}
        </div>
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

        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          10%, 30%, 50%, 70%, 90% {
            transform: translateX(-4px);
          }
          20%, 40%, 60%, 80% {
            transform: translateX(4px);
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

        @keyframes debris {
          0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translate(var(--x), var(--y)) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes dizzy {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        .animate-\\[debris_0\\.8s_ease-out_forwards\\] {
          --x: ${Math.cos(Math.random() * Math.PI * 2) * 100}px;
          --y: ${Math.sin(Math.random() * Math.PI * 2) * 100}px;
        }
      `}</style>
    </div>
  );
}