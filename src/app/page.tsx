"use client";

import React from "react";
import { useSnakeGame } from "../hooks/useSnakeGame";
import Board from "../components/Board";
import Score from "../components/Score";
import LeaderboardScore from "../components/Leaderboard";
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
    username,
    setUsername,
    triggerReset,
    setPlayTime,
    hasStarted,
    setHasStarted,
  } = useSnakeGame();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 p-4">
      {!hasStarted && (
        <div className="fixed inset-0 bg-green-300 bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow text-center">
            <h2 className="text-lg font-bold mb-4">Enter your name to start</h2>
            
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="px-3 py-2 border rounded w-64 text-center mb-4"
              placeholder="Maximum 10 character"
            />
            <button
              onClick={() => {
                if (username.trim()) setHasStarted(true);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Start Game
            </button>
          </div>
          
        </div>
      )}

      <h1 className="text-3xl font-bold">Snake Game</h1>
      <div className="flex mt-2 space-x-4">
        <Score value={score} />
        <Timer
          isGameOver={isGameOver}
          isPaused={isPaused}
          triggerReset={triggerReset}
          onTimeUpdate={(sec) => setPlayTime(sec)}
        />
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
        <LeaderboardScore />
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
