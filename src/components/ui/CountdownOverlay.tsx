import React from "react";

export default function CountdownOverlay({ count }: { count: number }) {
  return (
    <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-50">
      <div className="text-6xl font-extrabold text-red-500 animate-pulse">
        {count}
      </div>
    </div>
  );
}
