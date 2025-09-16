"use client";

import React from "react";
import { useSnakeGame } from "../hooks/useSnakeGame";
import Board from "../components/Board";
import Score from "../components/Score";
import {
  ArrowPathIcon,
  PauseIcon,
  PlayIcon,
  ShieldCheckIcon,
  BoltIcon,
} from "@heroicons/react/24/outline";
import Timer from "../components/Timer";

export default function Home() {
  const {
    snake,
    food,
    score,
    isPaused,
    isGameOver,
    isEnergyShield,
    isSpeedBurst,
    resetGame,
    setIsPaused,
    energyShield,
    speedBurst,
    bomb,
    triggerReset,
  } = useSnakeGame();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 p-4">
      <h1 className="text-3xl font-bold">Snake Game</h1>
      <div className="flex mt-2 space-x-4">
        <Score value={score} />
        <Timer isPaused={isPaused} isGameOver={isGameOver} triggerReset={triggerReset} />
      </div>

      <div className={`flex mt-4 mb-4 ${isGameOver ? "" : "space-x-4"}`}>
        <button className="px-4 py-2 rounded" onClick={() => resetGame()}>
          <ArrowPathIcon className="h-5 w-5" />
        </button>
        <button
          className={`px-4 py-2 rounded ${isGameOver ? "hidden" : ""}`}
          onClick={() => setIsPaused((prev) => !prev)}
        >
          {isPaused ? (
            <PlayIcon className="w-5 h-5" />
          ) : (
            <PauseIcon className="w-5 h-5" />
          )}
        </button>
      </div>
      <Board
        snake={snake}
        food={food}
        energyShield={energyShield}
        bomb={bomb}
        speedBurst={speedBurst}
        isEnergyShield={isEnergyShield}
        isGameOver={isGameOver}
        isPaused={isPaused}
        isSpeedBurst={isSpeedBurst}
      />
      <div className="text-sm text-gray-600 mt-5">
        Use Arrow Keys,ASWD or Gestures to Move
      </div>
      <div className="text-sm text-gray-600 mt-2">
        Collect the blue shield to survive one red bomb!
      </div>
      <div className="text-sm text-gray-600 mt-5 flex items-center gap-2">
        <span>Current Buff:</span>
        {isEnergyShield && (
          <ShieldCheckIcon className="w-5 h-5 text-blue-500" />
        )}
        {isSpeedBurst && <BoltIcon className="w-5 h-5 text-yellow-400" />}
        {!isEnergyShield && !isSpeedBurst && <span>None</span>}
      </div>
    </div>
  );
}
