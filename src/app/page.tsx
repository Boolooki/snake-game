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
import CountdownOverlay from "@/components/ui/CountdownOverlay";
import SpecialStatusSelector from "@/components/game/SpecialStatusSelector";

const BACKGROUND_CIRCLES = [
  { size: 120, left: 10, top: 15, delay: 0, duration: 20 },
  { size: 150, left: 80, top: 25, delay: 2, duration: 18 },
  { size: 100, left: 20, top: 70, delay: 4, duration: 22 },
  { size: 130, left: 85, top: 60, delay: 1, duration: 19 },
  { size: 110, left: 45, top: 10, delay: 3, duration: 21 },
  { size: 140, left: 60, top: 80, delay: 5, duration: 17 },
  { size: 90, left: 5, top: 45, delay: 2.5, duration: 23 },
  { size: 125, left: 90, top: 85, delay: 4.5, duration: 16 },
];


export default function Home() {
  const game = useSnakeGame();

  return (
    <div className="relative flex flex-col items-center justify-start min-h-screen p-4 py-8 overflow-hidden">
      {/* Start Modal */}
      <StartModal
        username={game.username}
        setUsername={game.setUsername}
        triggerCountdown={game.triggerCountdown}
        hasStarted={game.hasStarted}
        language={game.language}
        onLangToggle={game.onLangToggle}
      />

      <h1 className="z-10 text-4xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
        {game.language === "th" ? "เกมงูกินหรรม" : "Snake Game"}
      </h1>

      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 overflow-hidden">
        {BACKGROUND_CIRCLES.map((circle, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-emerald-400/30 to-teal-400/30 animate-float"
            style={{
              width: `${circle.size}px`,
              height: `${circle.size}px`,
              left: `${circle.left}%`,
              top: `${circle.top}%`,
              animationDelay: `${circle.delay}s`,
              animationDuration: `${circle.duration}s`,
            }}
          />
        ))}
        
      </div>

      <div className="flex gap-4 mb-6">
        <Score value={game.score} language={game.language} />
        <Timer seconds={game.playTime} language={game.language} />
      </div>

      <div className="flex gap-3 mb-6">
        <ControlButtons
          isGameOver={game.isGameOver}
          isPaused={game.isPaused}
          resetGame={game.resetGame}
          onPauseToggle={game.onPauseToggle}
        />
        <LeaderboardScore
          language={game.language}
          showboard={game.showLeaderboard}
          onOpen={() => game.setShowLeaderboard(true)}
          onClose={() => game.setShowLeaderboard(false)}
        />
        <LanguageSelector
          language={game.language}
          onLangToggle={game.onLangToggle}
        />
      </div>

      {/* Game Board */}
      <div className="relative mb-6">
        <Board
          snake={game.snake}
          foods={game.foods}
          energyShields={game.energyShields}
          bombs={game.bombs}
          speedBursts={game.speedBursts}
          isEnergyShield={game.isEnergyShield}
          isGameOver={game.isGameOver}
          isPaused={game.isPaused}
          isSpeedBurst={game.isSpeedBurst}
          language={game.language}
          countdown={game.countdown}
        />

        {/* Countdown Overlay */}
        {game.hasStarted && game.countdown !== null && game.countdown > 0 && (
          <CountdownOverlay count={game.countdown} />
        )}

        {/* Decorative blur elements */}
        <div className="absolute -top-4 -left-4 w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full blur-3xl -z-10" />
        <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-full blur-3xl -z-10" />
      </div>

        <BuffStatus
          isEnergyShield={game.isEnergyShield}
          isSpeedBurst={game.isSpeedBurst}
          isDoubleScore={game.isDoubleScore}
          isExtendedBurst={game.isExtendedBurst}
          isSlowSpeed={game.isSlowSpeed}
          isMoreProduceMoretribute={game.isMoreProduceMoretribute}
          isSafeHeaven={game.isSafeHeaven}
          language={game.language}
        />

        <GameInstructions language={game.language} />

      {/* Special Status Selector */}
      {game.upgradeQueue && (
        <SpecialStatusSelector
          onSelect={(status) => {
            game.applyStatus(status);
            game.setSelectedStatuses((prev) => [...prev, status]);
            game.setUpgradeQueue(false);
            game.setIsPaused(false);
          }}
          excludedKeys={game.selectedStatuses}
        />
      )}
    </div>
  );
}
