"use client";

import React from "react";
import { useSnakeGame } from "../hooks/useSnakeGame";
import Board from "../components/game/Board";
import Score from "../components/ui/Score";
import Timer from "../components/ui/Timer";
import BuffStatus from "../components/ui/BuffStatus";
import ControlButtons from "../components/ui/ControlButtons";
import StartModal from "../components/ui/StartModal";
import LanguageSelector from "@/components/ui/LanguageSelector";
import GameInstructions from "@/components/ui/GameInstructions";
import LeaderboardScore from "@/components/leaderbaord/Leaderboard";


export default function Home() {
  const game = useSnakeGame();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 p-4">
      <StartModal
        username={game.username}
        setUsername={game.setUsername}
        onStart={game.onStart}
        hasStarted={game.hasStarted}
        language={game.language}
        onLangToggle={game.onLangToggle}
      />

      <h1 className="text-3xl font-bold">
        {game.language === "th" ? "เกมงูกินหรรม" : "Snake Game"}
      </h1>

      <div className="flex mt-2 space-x-4">
        <Score value={game.score} language={game.language} />
        <Timer
          isGameOver={game.isGameOver}
          isPaused={game.isPaused}
          triggerReset={game.triggerReset}
          language={game.language}
          onTimeUpdate={(sec) => game.setPlayTime(sec)}
        />
      </div>

      <div className="flex items-center space-x-4">
      <ControlButtons
        isGameOver={game.isGameOver}
        isPaused={game.isPaused}
        resetGame={game.resetGame}
        onPauseToggle={game.onPauseToggle}
      />
      <LeaderboardScore language={game.language} /></div>

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
        language={game.language}
      />

      <div className="mt-5">
        <GameInstructions language={game.language}/>
      </div>

      <BuffStatus
        isEnergyShield={game.isEnergyShield}
        isSpeedBurst={game.isSpeedBurst}
        language={game.language}
      />
      <div className="mt-3">
        <LanguageSelector
          language={game.language}
          onLangToggle={game.onLangToggle}
        />
      </div>
    </div>
  );
}
