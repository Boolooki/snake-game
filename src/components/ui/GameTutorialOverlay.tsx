// components/ui/GameTutorialOverlay.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import type { TutorialStep } from "@/hooks/useGameTutorial";
import type { Language } from "@/types";

type Props = {
  step: TutorialStep;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
  language: Language;
};

const messages = {
  th: {
    prev: "ก่อนหน้า",
    next: "ถัดไป",
    done: "เสร็จสิ้น",
  },
  en: {
    prev: "Back",
    next: "Next",
    done: "Done",
  },
};

export default function GameTutorialOverlay({
  step,
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  onSkip,
  language,
}: Props) {
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [tooltipSize, setTooltipSize] = useState({ width: 320, height: 250 });
  const tooltipRef = useRef<HTMLDivElement>(null);

  const t = messages[language];

  useEffect(() => {
    const updateTargetPosition = () => {
      const element = document.querySelector(step.targetSelector);
      if (element) {
        const rect = element.getBoundingClientRect();
        setTargetRect(rect);
      }
    };

    setTimeout(updateTargetPosition, 100);

    window.addEventListener("resize", updateTargetPosition);
    window.addEventListener("scroll", updateTargetPosition);

    return () => {
      window.removeEventListener("resize", updateTargetPosition);
      window.removeEventListener("scroll", updateTargetPosition);
    };
  }, [step.targetSelector]);

  useEffect(() => {
    if (tooltipRef.current) {
      const rect = tooltipRef.current.getBoundingClientRect();
      setTooltipSize({ width: rect.width, height: rect.height });
    }
  }, [currentStep]);

  if (!targetRect) return null;

  const getTooltipPosition = () => {
    const padding = 12;
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    let position = step.position || "bottom";
    let left = 0;
    let top = 0;
    let transform = "";

    if (currentStep === 0) {
      left = (viewport.width - tooltipSize.width + 50) / 2; // กลางแนวนอน
      top = (viewport.height - tooltipSize.height) / 2; // กลางแนวตั้ง
      transform = "translate(0, 0)"; // ไม่ต้องปรับตำแหน่งเพิ่ม
    } else {
      switch (position) {
        case "top":
          left = targetRect.left + targetRect.width / 2;
          top = targetRect.top - padding;
          transform = "translate(-50%, -100%)";
          
          if (top - tooltipSize.height < 0) {
            position = "bottom";
            top = targetRect.bottom + padding;
            transform = "translate(-50%, 0)";
          }
          break;

        case "bottom":
          left = targetRect.left + targetRect.width / 2;
          top = targetRect.bottom + padding;
          transform = "translate(-50%, 0)";
          
          if (top + tooltipSize.height > viewport.height) {
            position = "top";
            top = targetRect.top - padding;
            transform = "translate(-50%, -100%)";
          }
          break;

        case "left":
          left = targetRect.left - padding;
          top = targetRect.top + targetRect.height / 2;
          transform = "translate(-100%, -50%)";
          
          if (left - tooltipSize.width < 0) {
            position = "right";
            left = targetRect.right + padding;
            transform = "translate(0, -50%)";
          }
          break;

        case "right":
          left = targetRect.right + padding;
          top = targetRect.top + targetRect.height / 2;
          transform = "translate(0, -50%)";
          
          if (left + tooltipSize.width > viewport.width) {
            position = "left";
            left = targetRect.left - padding;
            transform = "translate(-100%, -50%)";
          }
          break;
      }

      if (position === "top" || position === "bottom") {
        const tooltipLeft = left - tooltipSize.width / 2;
        const tooltipRight = left + tooltipSize.width / 2;

        if (tooltipLeft < padding) {
          left = tooltipSize.width / 2 + padding;
          transform = "translate(-50%, " + (position === "top" ? "-100%" : "0") + ")";
        } else if (tooltipRight > viewport.width - padding) {
          left = viewport.width - tooltipSize.width / 2 - padding;
          transform = "translate(-50%, " + (position === "top" ? "-100%" : "0") + ")";
        }
      }

      if (position === "left" || position === "right") {
        const tooltipTop = top - tooltipSize.height / 2;
        const tooltipBottom = top + tooltipSize.height / 2;

        if (tooltipTop < padding) {
          top = tooltipSize.height / 2 + padding;
          transform = "translate(" + (position === "left" ? "-100%" : "0") + ", -50%)";
        } else if (tooltipBottom > viewport.height - padding) {
          top = viewport.height - tooltipSize.height / 2 - padding;
          transform = "translate(" + (position === "left" ? "-100%" : "0") + ", -50%)";
        }
      }
    }

    return { left, top, transform, finalPosition: position };
  };

  const tooltipStyle = getTooltipPosition();

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        className="absolute left-0 right-0 top-0 bg-black/70 backdrop-blur-sm transition-all duration-500 pointer-events-none"
        style={{ height: `${targetRect.top}px` }}
      />
      
      <div
        className="absolute left-0 bg-black/70 backdrop-blur-sm transition-all duration-500 pointer-events-none"
        style={{
          top: `${targetRect.top}px`,
          width: `${targetRect.left}px`,
          height: `${targetRect.height}px`,
        }}
      />
      
      <div
        className="absolute right-0 bg-black/70 backdrop-blur-sm transition-all duration-500 pointer-events-none"
        style={{
          top: `${targetRect.top}px`,
          left: `${targetRect.right}px`,
          height: `${targetRect.height}px`,
        }}
      />
      
      <div
        className="absolute left-0 right-0 bottom-0 bg-black/70 backdrop-blur-sm transition-all duration-500 pointer-events-none"
        style={{
          top: `${targetRect.bottom}px`,
        }}
      />

      {/* Highlight border */}
      <div
        className="absolute border-2 border-yellow-400 rounded-lg transition-all duration-500 pointer-events-none"
        style={{
          left: `${targetRect.left - 4}px`,
          top: `${targetRect.top - 4}px`,
          width: `${targetRect.width + 8}px`,
          height: `${targetRect.height + 8}px`,
          animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        }}
      />

      {/* Tooltip Card */}
      <div
        className="absolute z-[101] animate-[fadeIn_1s_ease-out] transition-all duration-500"
        style={{
          left: `${tooltipStyle.left}px`,
          top: `${tooltipStyle.top}px`,
          transform: tooltipStyle.transform,
        }}
      >
        <div 
          ref={tooltipRef}
          className="bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl p-4 w-80 border border-yellow-400/50 animate-[fadeIn_1s_ease-out]"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-800 mb-1 flex items-center gap-2">
                <span className="text-lg">💡</span>
                {step.title}
              </h3>
            </div>
            <button
              onClick={onSkip}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-700 mb-4 leading-snug">
            {step.description}
          </p>

          {/* Progress Bar */}
          <div className="mb-3">
            <div className="h-0.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 transition-all duration-300"
                style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-2">
            {currentStep > 0 && (
              <button
                onClick={onPrev}
                className="flex-1 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-gray-700 transition-all flex items-center justify-center gap-1"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {t.prev}
              </button>
            )}
            <button
              onClick={onNext}
              className="flex-1 px-3 py-2 text-sm bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white rounded-lg font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-1"
            >
              {currentStep === totalSteps - 1 ? (
                <>
                  {t.done}
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </>
              ) : (
                <>
                  {t.next}
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}