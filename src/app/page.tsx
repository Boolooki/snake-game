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
import LeaderboardScore from "@/components/leaderbaord/Leaderboard";
import CountdownOverlay from "@/components/ui/CountdownOverlay";
import SpecialStatusSelector from "@/components/game/SpecialStatusSelector";
import { BACKGROUND_CIRCLES } from "@/constants/gameConstants";
import LoadingTransition from "@/components/ui/LoadingTransition";
import ExpBar from "@/components/ui/ExpBar";
import LevelUpNotification from "@/components/ui/LevelUpNotification";
import { useUIVisibility } from "@/hooks/useUIVisibility";
import LeaderboardModal from "@/components/leaderbaord/LeaderboardModal";

export default function Home() {
  const game = useSnakeGame();
  const { isUIVisible } = useUIVisibility(3000);

  const shouldShowUI =
    !game.hasStarted || game.isPaused || game.isGameOver || isUIVisible;

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-5 overflow-hidden">
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

      {/* Game Board */}
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

      <div
        className={`
          absolute left-[10vw] top-[5dvh] z-30 
          transition-all duration-500 ease-out
          flex space-x-4
          ${
            shouldShowUI
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0"
          }
        `}
      >
        <Score value={game.score} language={game.language} />
        <Timer seconds={game.playTime} />
      </div>
      <div
        className={`
          absolute z-30 bottom-[35dvh]
          transition-all duration-500 ease-out
          flex space-x-4
          ${
            (!game.countdown &&
              game.isPaused &&
              !game.upgradeQueue &&
              !game.showLevelUpNotification) ||
            game.isGameOver
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0"
          }
        `}
      >
          <LanguageSelector
            language={game.language}
            onLangToggle={game.onLangToggle}
          />
          <LeaderboardScore
            language={game.language}
            showboard={game.showLeaderboard}
            onOpen={() => game.setShowLeaderboard(true)}
          />
      </div>
      <div
        className={`
          fixed z-49 bottom-[5dvh]
          transition-all duration-500 ease-out
          flex space-x-4
          ${
            (!game.countdown &&
              game.isPaused &&
              !game.upgradeQueue &&
              !game.showLevelUpNotification) ||
            game.isGameOver ||
            game.triggerBuffPanel
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-0"
          }
        `}
      >
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
      </div>

      <ControlButtons
        isGameOver={game.isGameOver}
        isPaused={game.isPaused}
        resetGame={game.resetGame}
        onPauseToggle={game.onPauseToggle}
        countdown={game.countdown}
      />

      <div
        className={`
          fixed z-29 w-[80vw] top-[20dvh]
          transition-all duration-500 ease-out
          flex space-x-4
          ${
            (!game.countdown &&
              game.isPaused &&
              !game.upgradeQueue &&
              !game.showLevelUpNotification) ||
            game.isGameOver ||
            game.triggerBarExp 
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-0"
          }
        `}
      >
        <ExpBar
          score={game.score}
          level={game.level}
          thresholds={game.thresholds}
          language={game.language}
          settriggerBarExp={game.settriggerBarExp}
        />
      </div>

      {/* Countdown Overlay */}
      {game.hasStarted && game.countdown !== null && game.countdown > 0 && (
        <CountdownOverlay count={game.countdown} />
      )}

      {/* Decorative blur elements */}
      <div className="absolute -top-4 -left-4 w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full blur-3xl -z-10" />
      <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-full blur-3xl -z-10" />

      {/* Level Up Notification */}
      {game.showLevelUpNotification && (
        <LevelUpNotification
          level={game.level}
          onComplete={game.handleNotificationComplete}
        />
      )}
      {/* showboard Up Notification */}
      {game.showLeaderboard && (
        <LeaderboardModal
          onClose={() => game.setShowLeaderboard(false)}
          language={game.language}
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
