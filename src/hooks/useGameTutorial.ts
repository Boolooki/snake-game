// hooks/useGameTutorial.ts
import { useState, useCallback } from "react";

export type TutorialStep = {
  id: string;
  targetSelector: string; // CSS selector เช่น "[data-tutorial='food']"
  title: string;
  description: string;
  position?: "top" | "bottom" | "left" | "right";
};

export const useGameTutorial = (steps: TutorialStep[]) => {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasCompleted, setHasCompleted] = useState(false);

  const startTutorial = useCallback(() => {
    setIsActive(true);
    setCurrentStep(0);
  }, []);

  const nextStep = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      endTutorial();
    }
  }, [currentStep, steps.length]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const skipTutorial = useCallback(() => {
    setIsActive(false);
    setHasCompleted(true);
  }, []);

  const endTutorial = useCallback(() => {
    setIsActive(false);
    setHasCompleted(true);
  }, []);

  return {
    isActive,
    currentStep,
    currentStepData: steps[currentStep],
    totalSteps: steps.length,
    hasCompleted,
    startTutorial,
    nextStep,
    prevStep,
    skipTutorial,
    endTutorial,
  };
};