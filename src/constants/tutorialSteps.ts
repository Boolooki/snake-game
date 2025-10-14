// constants/tutorialSteps.ts
import { TutorialStep } from "@/hooks/useGameTutorial";

export const GAME_TUTORIAL_STEPS: TutorialStep[] = [
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