// constants/tutorialSteps.ts
import { TutorialStep } from "@/hooks/useGameTutorial";

export const GAME_TUTORIAL_STEPS_TH: TutorialStep[] = [
  {
    id: "snake",
    targetSelector: "[data-tutorial='snake']",
    title: "งูของคุณ",
    description: "นี่คือตัวงูของคุณ 🐍 ใช้ปุ่มลูกศร (↑↓←→) WASD หรือการสไลด์นิ้ว(Gesture) เพื่อเคลื่อนที่ ระวังอย่าให้งูชนตัวเองหรือชนขอบจอ!",
    position: "right",
  },
  {
    id: "food",
    targetSelector: "[data-tutorial='food']",
    title: "อาหาร",
    description: "เก็บอาหารสีเขียว 🍎 เพื่อเติบโตและได้คะแนน",
    position: "bottom",
  },
  {
    id: "bomb",
    targetSelector: "[data-tutorial='bomb']",
    title: "ระเบิด",
    description: "หลีกเลี่ยงระเบิดสีแดง 💣 ถ้าโดนจะ Game Over ทันที!",
    position: "bottom",
  },
  {
    id: "shield",
    targetSelector: "[data-tutorial='shield']",
    title: "โล่พลังงาน",
    description: "เก็บโล่สีน้ำเงิน 🛡️ เพื่อปกป้องตัวเองจากระเบิด 1 ครั้ง",
    position: "bottom",
  },
  {
    id: "speed",
    targetSelector: "[data-tutorial='speed']",
    title: "Speed Burst",
    description: "เก็บ Speed Burst เพื่อเพิ่มความเร็วชั่วคราว แต่ระวังเร็วจนควบคุมไม่ได้!",
    position: "bottom",
  },
];

export const GAME_TUTORIAL_STEPS_ENG: TutorialStep[] = [
  {
    id: "snake",
    targetSelector: "[data-tutorial='snake']",
    title: "Your Snake",
    description: "This is your snake 🐍 Use arrow keys (↑↓←→), WASD, or swipe gestures to move. Be careful not to crash into yourself or the screen edges!",
    position: "right",
  },
  {
    id: "food",
    targetSelector: "[data-tutorial='food']",
    title: "Food",
    description: "Collect the green food 🍎 to grow and earn points.",
    position: "bottom",
  },
  {
    id: "bomb",
    targetSelector: "[data-tutorial='bomb']",
    title: "Bomb",
    description: "Avoid the red bomb 💣 — hitting it means instant Game Over!",
    position: "bottom",
  },
  {
    id: "shield",
    targetSelector: "[data-tutorial='shield']",
    title: "Energy Shield",
    description: "Pick up the blue shield 🛡️ to protect yourself from one bomb hit.",
    position: "bottom",
  },
  {
    id: "speed",
    targetSelector: "[data-tutorial='speed']",
    title: "Speed Burst",
    description: "Grab a Speed Burst to temporarily boost your speed — but beware, it might get hard to control!",
    position: "bottom",
  },
];
