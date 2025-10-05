// components/ui/GameTutorial.tsx
import { useState } from "react";
import type { Language } from "@/types";

const messages = {
  th: {
    skip: "ข้าม",
    next: "ถัดไป",
    prev: "ก่อนหน้า",
    gotIt: "เข้าใจแล้ว!",
    steps: [
      {
        title: "เคลื่อนที่",
        desc: "ใช้ปุ่มลูกศร, WASD หรือสไลด์หน้าจอ",
        icon: "🎮",
      },
      {
        title: "กินอาหาร",
        desc: "เก็บอาหารสีเขียวเพื่อเติบโตและได้คะแนน",
        icon: "🍎",
      },
      {
        title: "หลบระเบิด",
        desc: "หลีกเลี่ยงระเบิดสีแดง ถูกแล้ว Game Over!",
        icon: "💣",
      },
      {
        title: "รับโล่",
        desc: "โล่สีน้ำเงินปกป้องคุณจากระเบิด 1 ครั้ง",
        icon: "🛡️",
      },
      {
        title: "Speed Burst",
        desc: "เก็บฟ้าผ่าเพื่อเพิ่มความเร็วชั่วคราว",
        icon: "⚡",
      },
      {
        title: "Level Up",
        desc: "ทุก 5, 20, 50, 100 คะแนน จะได้เลือกสกิลพิเศษ!",
        icon: "✨",
      },
    ],
  },
  en: {
    skip: "Skip",
    next: "Next",
    prev: "Back",
    gotIt: "Got it!",
    steps: [
      {
        title: "Movement",
        desc: "Use Arrow Keys, WASD or Swipe to move",
        icon: "🎮",
      },
      {
        title: "Eat Food",
        desc: "Collect green food to grow and score points",
        icon: "🍎",
      },
      {
        title: "Avoid Bombs",
        desc: "Stay away from red bombs or it's Game Over!",
        icon: "💣",
      },
      {
        title: "Get Shield",
        desc: "Blue shield protects you from 1 bomb hit",
        icon: "🛡️",
      },
      {
        title: "Speed Burst",
        desc: "Collect lightning for temporary speed boost",
        icon: "⚡",
      },
      {
        title: "Level Up",
        desc: "At 5, 20, 50, 100 score, choose special skills!",
        icon: "✨",
      },
    ],
  },
};

// components/ui/GameTutorial.tsx
export default function GameTutorial({
  language,
  isPaused,
  onPauseToggle,
}: {
  language: Language;
  isPaused: boolean;
  onPauseToggle: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [wasPausedBeforeOpen, setWasPausedBeforeOpen] = useState(false);

  const t = messages[language];
  const totalSteps = t.steps.length;

  const handleOpen = () => {
    setWasPausedBeforeOpen(isPaused);
    setIsOpen(true);
    if (!isPaused) {
      onPauseToggle(); // pause เฉพาะถ้ายังไม่ pause
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setCurrentStep(0);
    if (!wasPausedBeforeOpen) {
      onPauseToggle(); // resume เฉพาะถ้าไม่ได้ pause อยู่ก่อน
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={handleOpen}
        className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/40 px-4 py-2 hover:scale-105 transition-all font-medium text-gray-700 hover:bg-blue-50"
      >
        ❓
      </button>
    );
  }

  const currentStepData = t.steps[currentStep];

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[80] p-4">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          </h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="flex gap-1 mb-6">
          {t.steps.map((_, idx) => (
            <div
              key={idx}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                idx <= currentStep
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                  : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        <div className="text-center mb-8">
          <div className="inline-block mb-4 animate-bounce">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-5xl">{currentStepData.icon}</span>
            </div>
          </div>

          <h4 className="text-xl font-bold text-gray-800 mb-2">
            {currentStepData.title}
          </h4>

          <p className="text-gray-600 leading-relaxed">
            {currentStepData.desc}
          </p>

          <p className="text-sm text-gray-400 mt-4">
            {currentStep + 1} / {totalSteps}
          </p>
        </div>

        <div className="flex gap-3">
          {currentStep > 0 && (
            <button
              onClick={handlePrev}
              className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium text-gray-700 transition-all"
            >
              ← {t.prev}
            </button>
          )}
          <button
            onClick={handleNext}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
          >
            {currentStep === totalSteps - 1 ? t.gotIt : t.next} →
          </button>
        </div>

        {currentStep < totalSteps - 1 && (
          <button
            onClick={handleClose}
            className="w-full mt-3 text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            {t.skip}
          </button>
        )}
      </div>
    </div>
  );
}
