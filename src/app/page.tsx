"use client";

import React from "react";
import { useSnakeGame } from "../hooks/useSnakeGame";
import Board from "../components/Board";
import Score from "../components/Score";
import Timer from "../components/Timer";
import BuffStatus from "../components/BuffStatus" 
import ControlButtons from "../components/ControlButtons" 
import StartModal from "../components/StartModal" 

export default function Home() {
  const game = useSnakeGame();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 p-4">
      <StartModal
        username={game.username}
        setUsername={game.setUsername}
        onStart={game.onStart}
        hasStarted={game.hasStarted}
      />
      <h1 className="text-3xl font-bold">Snake Game</h1>
      <div className="flex mt-2 space-x-4">
        <Score value={game.score} />
        <Timer
          isGameOver={game.isGameOver}
          isPaused={game.isPaused}
          triggerReset={game.triggerReset}
          onTimeUpdate={(sec) => game.setPlayTime(sec)}
        />
      </div>

      <ControlButtons 
        isGameOver={game.isGameOver}
        isPaused={game.isPaused}
        resetGame={game.resetGame}
        onPauseToggle={game.onPauseToggle}
      />

      <Board
        snake={game.snake}
        food={game.food}
        energyShield={game.energyShield}
        bomb={game.bomb}
        speedBurst={game.speedBurst}
        isEnergyShield={game.isEnergyShield}
        isGameOver={game.isGameOver}
        isPaused={game.isPaused}
        isSpeedBurst={game.isSpeedBurst}
      />

      <div className="text-sm text-gray-600 mt-5">
        Use Arrow Keys, ASWD or Gestures to Move
      </div>
      <div className="text-sm text-gray-600 mt-2">
        Collect the blue shield to survive one red bomb!
      </div>
      <BuffStatus
        isEnergyShield={game.isEnergyShield}
        isSpeedBurst={game.isSpeedBurst}
      />
    </div>
  );
}
