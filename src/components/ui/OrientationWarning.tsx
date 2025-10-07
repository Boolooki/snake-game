// components/ui/OrientationWarning.tsx
"use client";

import { useEffect, useState } from "react";

// Define type สำหรับ Screen Orientation API
interface ScreenOrientationExtended extends ScreenOrientation {
  lock?: (orientation: "landscape" | "portrait") => Promise<void>;
}

export default function OrientationWarning() {
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    checkOrientation();

    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);

    // Lock orientation
    const lockOrientation = async () => {
      try {
        const orientation = screen.orientation as ScreenOrientationExtended;
        if (orientation?.lock) {
          await orientation.lock("landscape");
        }
      } catch (err) {
        // Lock ไม่สำเร็จ (ปกติบน mobile browser)
      }
    };

    lockOrientation();

    return () => {
      window.removeEventListener("resize", checkOrientation);
      window.removeEventListener("orientationchange", checkOrientation);
    };
  }, []);

  if (!isPortrait) return null;

  return (
    <div className="fixed inset-0 bg-black z-[999] flex items-center justify-center">
      <div className="text-center text-white p-8">
        {/* Phone Icon */}
        <div className="mb-6 animate-bounce">
          <div className="w-24 h-36 border-4 border-white rounded-2xl mx-auto relative">
            <div className="absolute inset-2 border-2 border-white/50 rounded-lg" />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-1 bg-white rounded-full" />
          </div>
          {/* Rotation Arrow */}
          <div className="text-6xl mt-4">↻</div>
        </div>

        <h2 className="text-3xl font-bold mb-4">
          กรุณาหมุนหน้าจอ
        </h2>
        <p className="text-lg text-gray-300">
          เกมนี้รองรับเฉพาะโหมดแนวนอน
        </p>
      </div>
    </div>
  );
}