import React from "react";

export default function CountdownOverlay({ count }: { count: number }) {
  if (count >= 10) return null;

  return (
    <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-48">
      {/* Backdrop blur */}
      <div className="absolute inset-0 bg-black/20 animate-[fadeIn_0.3s_ease-out]" />

      {/* Countdown Card */}
      <div className="relative animate-[scaleIn_0.5s_cubic-bezier(0.34,1.56,0.64,1)]">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full blur-3xl opacity-50 animate-pulse" />
        
        {/* Main Number */}
        <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/50 p-12 flex flex-col items-center">
          {/* Number */}
          <div className="text-8xl font-black bg-gradient-to-br from-emerald-500 to-teal-600 bg-clip-text text-transparent animate-[bounce_0.6s_ease-in-out]">
            {count}
          </div>

          {/* Progress ring */}
          <div className="absolute inset-0 -z-10">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-gray-200"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="283"
                strokeDashoffset={283 - (283 * (4 - count)) / 3}
                className="text-emerald-500 transition-all duration-1000"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full"
            style={{
              top: "50%",
              left: "50%",
              animation: `particle 0.8s ease-out ${i * 0.1}s forwards`,
              transform: `rotate(${i * 45}deg) translateY(-60px)`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes scaleIn {
          from {
            transform: scale(0.5);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes particle {
          0% {
            opacity: 1;
            transform: rotate(var(--rotation)) translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: rotate(var(--rotation)) translateY(-120px) scale(0);
          }
        }
      `}</style>
    </div>
  );
}