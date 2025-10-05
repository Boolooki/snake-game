"use client";

import React from "react";
import { useSnakeGame } from "@/hooks/useSnakeGame";
import Board from "@/components/game/Board";
import Score from "@/components/ui/Score";
import Timer from "@/components/ui/Timer";
import BuffStatus from "@/components/ui/BuffStatus";
import ControlButtons from "@/components/ui/ControlButtons";
import StartModal from "@/components/ui/StartModal";
import LanguageSelector from "@/components/ui/LanguageSelector";
import GameTutorial from "@/components/ui/GameTutorial";
import LeaderboardScore from "@/components/leaderbaord/Leaderboard";
import CountdownOverlay from "@/components/ui/CountdownOverlay";
import SpecialStatusSelector from "@/components/game/SpecialStatusSelector";
import { BACKGROUND_CIRCLES } from "@/constants/gameConstants";
import LoadingTransition from "@/components/ui/LoadingTransition";
import ExpBar from "@/components/ui/ExpBar";
import LevelUpNotification from "@/components/ui/LevelUpNotification";
//comment
export default function Home() {
  const game = useSnakeGame();

  return (
    <div className="relative flex flex-col items-center justify-start min-h-screen p-4 py-8 overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 -z-20">
        <div className="absolute w-32 h-32 bg-emerald-400/10 rounded-full top-10 left-10 blur-3xl" />
        <div className="absolute w-40 h-40 bg-teal-400/10 rounded-full top-40 right-20 blur-3xl" />
        <div className="absolute w-36 h-36 bg-cyan-400/10 rounded-full bottom-20 left-1/4 blur-3xl" />
        <div className="absolute w-44 h-44 bg-emerald-400/10 rounded-full bottom-10 right-10 blur-3xl" />
      </div>
      {/* Loading Transition */}
      {game.isLoading && (
        <LoadingTransition
          onComplete={game.triggerCountdown}
          username={game.username}
        />
      )}
      {/* Start Modal */}
      <StartModal
        username={game.username}
        setUsername={game.setUsername}
        gameStart={game.gameStart}
        hasStarted={game.hasStarted}
        language={game.language}
        onLangToggle={game.onLangToggle}
      />

      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 overflow-hidden pointer-events-none">
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
        <LanguageSelector
          language={game.language}
          onLangToggle={game.onLangToggle}
        />
        <GameTutorial
          language={game.language}
          onPauseToggle={game.onPauseToggle}
          isPaused={game.isPaused}
        />
        <LeaderboardScore
          language={game.language}
          showboard={game.showLeaderboard}
          onOpen={() => game.setShowLeaderboard(true)}
          onClose={() => game.setShowLeaderboard(false)}
        />
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
          showLevelUpNotification={game.showLevelUpNotification} // เพิ่ม
          upgradeQueue={game.upgradeQueue} // เพิ่ม
        />

        <div className="flex item-center">
          <ControlButtons
            isGameOver={game.isGameOver}
            isPaused={game.isPaused}
            resetGame={game.resetGame}
            onPauseToggle={game.onPauseToggle}
            countdown={game.countdown}
          />
        </div>

        <div className="mt-6 w-full flex justify-center">
          <ExpBar
            score={game.score}
            level={game.level}
            thresholds={game.thresholds}
            language={game.language}
          />
        </div>

        {/* Countdown Overlay */}
        {game.hasStarted && game.countdown !== null && game.countdown > 0 && (
          <CountdownOverlay count={game.countdown} />
        )}

        {/* Decorative blur elements */}
        <div className="absolute -top-4 -left-4 w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full blur-3xl -z-10" />
        <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-full blur-3xl -z-10" />
      </div>
      
      <div className="flex gap-4 mb-6">
        <Score value={game.score} language={game.language} />
        <Timer seconds={game.playTime} language={game.language} />
      </div>

      {/* Level Up Notification */}
      {game.showLevelUpNotification && (
        <LevelUpNotification
          level={game.level}
          onComplete={game.handleNotificationComplete}
        />
      )}

      {/* Special Status Selector */}
      {game.upgradeQueue && (
        <SpecialStatusSelector
          onSelect={(status) => {
            game.applyStatus(status);
            game.setSelectedStatuses((prev) => [...prev, status]);
            game.setUpgradeQueue(false);
            game.setIsPaused(false);
          }}
          availableOptions={game.randomOptions}
        />
      )}
    </div>
  );
}
