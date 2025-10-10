"use client";

import React, { useMemo } from "react";
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

  // คำนวณ progress สำหรับระดับน้ำ
  const { progress } = useMemo(() => {
    const nextThreshold = game.thresholds.find((t) => game.score < t);
    const currentThreshold = game.thresholds[game.level - 1] || 0;

    if (!nextThreshold) {
      return { progress: 100 }; // Max level
    }

    const scoreInLevel = game.score - currentThreshold;
    const neededInLevel = nextThreshold - currentThreshold;
    const progress = (scoreInLevel / neededInLevel) * 100;

    return { progress: Math.min(progress, 100) };
  }, [game.score, game.level, game.thresholds]);

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full overflow-hidden">
      {/* Background with Water Effect */}
      <div className="fixed inset-0 -z-20 overflow-hidden">
        {/* ชั้นน้ำที่สูงขึ้น */}
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none water-layer"
          style={{
            height: `${progress}%`,
            background: `linear-gradient(to top, #a855f7, #34d399)`, // จากม่วงไปเขียว
            opacity: 0.7,
            backdropFilter: "blur(5px)",
            transition: "height 0.5s ease-out",
          }}
        >
          {/* ขอบน้ำที่มีริ้วคลื่น */}
          <div
            className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white/50 to-transparent animate-wave"
            style={{
              clipPath: "url(#waveClip)", // ใช้ clip-path เพื่อสร้างรูปร่างคลื่น
            }}
          />
          {/* SVG สำหรับ clip-path คลื่น */}
          <svg width="0" height="0">
            <defs>
              <clipPath id="waveClip" clipPathUnits="objectBoundingBox">
                <path
                  d="M0,0.8 Q0.25,1 0.5,0.8 T1,0.8 V0 H0 Z"
                  transform="translate(0, 0)"
                />
                <animate
                  attributeName="d"
                  values="
                      M0,0.8 Q0.25,1 0.5,0.8 T1,0.8 V0 H0 Z;
                      M0,0.9 Q0.25,0.7 0.5,0.9 T1,0.7 V0 H0 Z;
                      M0,0.8 Q0.25,1 0.5,0.8 T1,0.8 V0 H0 Z
                    "
                  dur="2s"
                  repeatCount="indefinite"
                />
              </clipPath>
            </defs>
          </svg>
          {/* ฟองสบู่ในน้ำ */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(circle at 30% 20%, rgba(255,255,255,0.3) 0%, transparent 5%),
                radial-gradient(circle at 70% 50%, rgba(255,255,255,0.2) 0%, transparent 4%),
                radial-gradient(circle at 50% 80%, rgba(255,255,255,0.25) 0%, transparent 6%)
              `,
              animation: "bubbleFloat 6s infinite ease-in-out",
            }}
          ></div>
        </div>
        {/* วงกลมพื้นหลังเดิม */}
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

      {/* Game Board */}
      <Board
        gridSize={game.gridSize}
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
        showLevelUpNotification={game.showLevelUpNotification}
        upgradeQueue={game.upgradeQueue}
      />

      <div
        className={`
          absolute left-[10vw] top-[10vh] z-30 
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
          absolute z-30 bottom-[35vh]
          transition-all duration-500 ease-out
          flex space-x-4 landscape:space-x-[50vw]
          ${
            (!game.countdown &&
              game.isPaused &&
              !game.upgradeQueue &&
              !game.showLevelUpNotification) ||
            game.isGameOver
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0 pointer-events-none"
          }
        `}
      >
        <LanguageSelector
          language={game.language}
          onLangToggle={game.onLangToggle}
        />
        <LeaderboardScore
          language={game.language}
          onOpen={() => game.setShowLeaderboard(true)}
        />
      </div>
      <div
        className={`
          fixed z-49 bottom-[5vh]
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
          fixed z-29 w-[80vw] top-[20vh]
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
          currentThreshold={game.currentThreshold}
          nextThreshold={game.nextThreshold}
          progress={game.progress}
          isMaxLevel={game.isMaxLevel}
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
      {/* Leaderboard Modal */}
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
