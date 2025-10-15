import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { Position, Language } from "../types";
import { INITIAL_SNAKE, SPEED } from "../constants/gameConstants";
import {
  GAME_TUTORIAL_STEPS_TH,
  GAME_TUTORIAL_STEPS_ENG,
} from "@/constants/tutorialSteps";
import { isCollision, isOutOfBounds, getSpawnCounts } from "../utils/gameUtils";
import { useSpecialStatus } from "./useSpecialStatus";
import { useSpawning } from "./useSpawning";
import { useInputSystem } from "./useInputSystem";
import { usePlayTimeTracker } from "./usePlayTimeTracker";
import { useLevelProgression } from "./useLevelProgression";
import { useScoreSubmission } from "./useScoreSubmission";
import { useCountdownTimer } from "./useCountdownTimer";
import { useGameTutorial } from "./useGameTutorial";

export const useSnakeGame = () => {
  const [gridSize, setGridSize] = useState({ columns: 40, rows: 20 }); // ค่าเริ่มต้น
  const [showBombAnimation, setShowBombAnimation] = useState(false);
  const [showWallAnimation, setShowWallAnimation] = useState(false);
  const [collisionDirection, setCollisionDirection] = useState<
    "UP" | "DOWN" | "LEFT" | "RIGHT"
  >("UP");
  const [showRotateHint, setShowRotateHint] = useState(false);

  useEffect(() => {
    const updateGridSize = () => {
      const isLandscape = window.innerWidth > window.innerHeight;
      setGridSize({
        columns: isLandscape ? 40 : 20,
        rows: isLandscape ? 20 : 40,
      });
      setShowRotateHint(!isLandscape); // แสดง hint เมื่ออยู่ใน portrait
    };
    updateGridSize(); // เรียกครั้งแรก
    window.addEventListener("resize", updateGridSize);
    return () => window.removeEventListener("resize", updateGridSize);
  }, []);
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const { bombs, foods, energyShields, speedBursts, spawner } =
    useSpawning(gridSize);

  // ใน useSnakeGame.ts

  const {
    isDoubleScore,
    isExtendedBurst,
    isSlowSpeed,
    isSafeHeaven,
    isMoreProduceMoretribute,
    isPetrified,
    isChargingBehavior,
    isArmadilloLike,
    isNoLimitSpeed,
    applyStatus,
    resetStatus,
    setSelectedStatuses,
    selectedStatuses,
    randomOptions,
    generateRandomOptions,
  } = useSpecialStatus();

  const [username, setUsername] = useState("");
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const speedBurstTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [triggerReset, setTriggerReset] = useState<boolean>(false);
  const [language, setLanguage] = useState<Language>("th");
  const {
    isActive,
    currentStep,
    currentStepData,
    totalSteps,
    hasCompleted,
    startTutorial,
    nextStep,
    prevStep,
    skipTutorial,
    endTutorial,
  } = useGameTutorial(
    language === "th" ? GAME_TUTORIAL_STEPS_TH : GAME_TUTORIAL_STEPS_ENG
  );
  const { countdown, triggerCountdown, setCountdown, setIsLoading, isLoading } =
    useCountdownTimer({
      setIsPaused,
      setHasStarted,
      username,
    });
  const { playTime, resetPlayTime } = usePlayTimeTracker({
    isPaused,
    isGameOver,
    countdown,
  });

  const { direction, setDirection, inputBuffer, resetInput } = useInputSystem({
    setIsPaused,
  });
  const [score, setScore] = useState<number>(0);
  const { hasSubmitted, resetSubmission } = useScoreSubmission({
    score,
    playTime,
    isGameOver,
    isPaused,
    username,
  });
  const {
    level,
    upgradeQueue,
    setUpgradeQueue,
    resetProgression,
    thresholds,
    showLevelUpNotification,
    handleNotificationComplete,
  } = useLevelProgression({
    score,
    setIsPaused,
    generateRandomOptions,
    onComplete: triggerCountdown,
  });
  const [energyShield, setEnergyShield] = useState<number>(0);
  const [isSpeedBurst, setIsSpeedBurst] = useState<boolean>(false);
  const [triggerBarExp, settriggerBarExp] = useState<boolean>(false);
  const [triggerBuffPanel, setTriggerBuffPanel] = useState<boolean>(false);

  const { currentThreshold, nextThreshold, progress, isMaxLevel } =
    useMemo(() => {
      const nextThreshold = thresholds.find((t) => score < t);
      const currentThreshold = thresholds[level - 1] || 0;

      if (!nextThreshold) {
        // Max level แล้ว
        return {
          currentThreshold: thresholds[thresholds.length - 1] || 0,
          nextThreshold: null,
          progress: 100,
          isMaxLevel: true,
        };
      }

      const scoreInLevel = score - currentThreshold;
      const neededInLevel = nextThreshold - currentThreshold;
      const progress = (scoreInLevel / neededInLevel) * 100;

      return {
        currentThreshold,
        nextThreshold,
        progress: Math.min(progress, 100),
        isMaxLevel: false,
      };
    }, [score, level, thresholds]);

  const hasTriggeredbarexp = useRef<boolean>(false);

  useEffect(() => {
    if (!hasTriggeredbarexp.current && Math.round(progress) >= 50) {
      settriggerBarExp(true);
      hasTriggeredbarexp.current = true; // ป้องกันไม่ให้ trigger ซ้ำ

      setTimeout(() => {
        settriggerBarExp(false);
      }, 3000);
    }
    if (Math.round(progress) <= 50) {
      hasTriggeredbarexp.current = false;
    }
  }, [progress, settriggerBarExp]);

  useEffect(() => {
    const collectedItems = { foods, energyShields, speedBursts };
    const { countFoods, countBombs, countES, countSB } = getSpawnCounts(
      isMoreProduceMoretribute,
      isSafeHeaven
    );
    spawner(
      countFoods,
      countBombs,
      countES,
      countSB,
      snake,
      isPetrified,
      collectedItems
    );
  }, [isMoreProduceMoretribute, gridSize, isSafeHeaven]);

  useEffect(() => {
    // ปรับตำแหน่ง snake ให้อยู่ใน grid ใหม่
    setSnake((prev) => {
      const newHead = { ...prev[0] };
      if (newHead.x >= gridSize.columns) newHead.x = gridSize.columns - 1;
      if (newHead.y >= gridSize.rows) newHead.y = gridSize.rows - 1;
      return [newHead, ...prev.slice(1)];
    });
  }, [gridSize]);

  // เริ่ม tutorial อัตโนมัติเมื่อเกมเริ่มครั้งแรก
  useEffect(() => {
    if (hasStarted && !hasCompleted && !isActive) {
      // Delay ให้เกม render objects ก่อน
      const timer = setTimeout(() => {
        setIsPaused(true); // Pause เกมระหว่าง tutorial
        startTutorial();
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [hasStarted, hasCompleted]);

  // Resume เกมเมื่อ tutorial จบ
  useEffect(() => {
    if (!isActive && hasCompleted && isPaused) {
      triggerCountdown();
    }
  }, [isActive, hasCompleted]);

  useEffect(() => {
    if (countdown === 0) {
      startGame();
    }
  }, [countdown]);

  useEffect(() => {
    if (upgradeQueue) {
      setIsPaused(true);
    }
  }, [upgradeQueue]);

  const handleWallAnimationComplete = useCallback(() => {
    setShowWallAnimation(false);
    setIsGameOver(true);
  }, []);

  useEffect(() => {
    if (energyShield > 0 || isSpeedBurst) {
      setTriggerBuffPanel(true);

      setTimeout(() => {
        setTriggerBuffPanel(false);
      }, 3000);
    }
  }, [energyShield, isSpeedBurst]);

  const gameStart = useCallback(() => {
    setHasStarted(true);
    setIsLoading(true);
  }, []);

  const startGame = useCallback(() => {
    setIsPaused(false);
    setIsGameOver(false);
    setTriggerReset(true);
    resetInput();
    resetProgression();
  }, []);

  const moveSnake = useCallback(() => {
    const dir = inputBuffer.current;
    setDirection(dir); // อัปเดตทิศทางจริงหลังเคลื่อนที่

    setSnake((prevSnake) => {
      const head = { ...prevSnake[0] };

      switch (dir) {
        case "UP":
          head.y -= 1;
          break;
        case "DOWN":
          head.y += 1;
          break;
        case "LEFT":
          head.x -= 1;
          break;
        case "RIGHT":
          head.x += 1;
          break;
      }

      const newSnake = [head, ...prevSnake];
      const utilSnake = [head, ...prevSnake.slice(0, -1)];

      requestAnimationFrame(() => {
        if (isCollision(prevSnake, head) || isOutOfBounds(head, gridSize)) {
          setCollisionDirection(dir);
          setShowWallAnimation(true);
          setIsPaused(true);
        }
        if (
          bombs.some(
            (b) => b.x === head.x && b.y === head.y && energyShield <= 0
          )
        ) {
          setScore((prev) => prev + (isChargingBehavior ? 3 : 0));
          setShowBombAnimation(true);
          setIsPaused(true);
        }
      });

      if (foods.some((b) => b.x === head.x && b.y === head.y)) {
        const { countFoods, countBombs, countES, countSB } = getSpawnCounts(
          isMoreProduceMoretribute,
          isSafeHeaven
        );
        const collectedItems = {
          foods: foods.filter((f) => !(f.x === head.x && f.y === head.y)),
          energyShields: energyShields.filter(
            (es) => !(es.x === head.x && es.y === head.y)
          ),
          speedBursts: speedBursts.filter(
            (sb) => !(sb.x === head.x && sb.y === head.y)
          ),
        };
        spawner(
          countFoods,
          countBombs,
          countES,
          countSB,
          newSnake,
          isPetrified,
          collectedItems
        );
        setScore((prev) => prev + (isDoubleScore ? 2 : 1));
        return newSnake;
      }

      if (energyShields.some((b) => b.x === head.x && b.y === head.y)) {
        const { countFoods, countBombs, countES, countSB } = getSpawnCounts(
          isMoreProduceMoretribute,
          isSafeHeaven
        );
        const collectedItems = {
          foods: foods.filter((f) => !(f.x === head.x && f.y === head.y)),
          energyShields: energyShields.filter(
            (es) => !(es.x === head.x && es.y === head.y)
          ),
          speedBursts: speedBursts.filter(
            (sb) => !(sb.x === head.x && sb.y === head.y)
          ),
        };
        spawner(
          countFoods,
          countBombs,
          countES,
          countSB,
          utilSnake,
          isPetrified,
          collectedItems
        );

        if (isArmadilloLike) {
          setEnergyShield((prev) => prev + 1);
        } else {
          setEnergyShield(1);
        }

        return utilSnake;
      }

      if (speedBursts.some((b) => b.x === head.x && b.y === head.y)) {
        const { countFoods, countBombs, countES, countSB } = getSpawnCounts(
          isMoreProduceMoretribute,
          isSafeHeaven
        );
        const collectedItems = {
          foods: foods.filter((f) => !(f.x === head.x && f.y === head.y)),
          energyShields: energyShields.filter(
            (es) => !(es.x === head.x && es.y === head.y)
          ),
          speedBursts: speedBursts.filter(
            (sb) => !(sb.x === head.x && sb.y === head.y)
          ),
        };
        spawner(
          countFoods,
          countBombs,
          countES,
          countSB,
          snake,
          isPetrified,
          collectedItems
        );

        if (speedBurstTimerRef.current) {
          clearTimeout(speedBurstTimerRef.current);
        }

        setIsSpeedBurst(true);

        const burstDuration = isExtendedBurst
          ? (isNoLimitSpeed ? 6000 : 3000) * 2
          : isNoLimitSpeed
          ? 6000
          : 3000;

        speedBurstTimerRef.current = setTimeout(() => {
          setIsSpeedBurst(false);
          speedBurstTimerRef.current = null;
        }, burstDuration);
        return utilSnake;
      }

      if (
        bombs.some((b) => b.x === head.x && b.y === head.y && energyShield > 0)
      ) {
        const { countFoods, countBombs, countES, countSB } = getSpawnCounts(
          isMoreProduceMoretribute,
          isSafeHeaven
        );
        const collectedItems = {
          foods: foods.filter((f) => !(f.x === head.x && f.y === head.y)),
          energyShields: energyShields.filter(
            (es) => !(es.x === head.x && es.y === head.y)
          ),
          speedBursts: speedBursts.filter(
            (sb) => !(sb.x === head.x && sb.y === head.y)
          ),
        };
        spawner(
          countFoods,
          countBombs,
          countES,
          countSB,
          utilSnake,
          isPetrified,
          collectedItems
        );
        setEnergyShield((prev) => prev - 1);
        setScore((prev) => prev + (isChargingBehavior ? 3 : 0));
        return utilSnake;
      }

      return [head, ...prevSnake.slice(0, -1)];
    });
  }, [
    foods,
    energyShields,
    bombs,
    energyShield,
    snake,
    spawner,
    speedBursts,
    getSpawnCounts,
    isMoreProduceMoretribute,
    gridSize,
  ]);

  const speedy = (() => {
    if (isSpeedBurst && !isSlowSpeed) return SPEED / 2; // เร็วขึ้น
    if (!isSpeedBurst && isSlowSpeed) return SPEED * 2; // ช้าลง
    return SPEED; // ปกติ
  })();

  const handleBombAnimationComplete = useCallback(() => {
    setShowBombAnimation(false);
    setIsGameOver(true);
  }, []);

  useEffect(() => {
    if (isPaused || isGameOver || countdown !== null) return;

    setTriggerReset(false);
    const interval = setInterval(moveSnake, speedy);
    return () => clearInterval(interval);
  }, [moveSnake, isPaused, isGameOver, isSpeedBurst, countdown, speedy]);

  const resetGame = useCallback(() => {
    triggerCountdown();
    resetStatus();
    setSnake(INITIAL_SNAKE);
    resetInput();
    setScore(0);
    resetPlayTime();
    setIsGameOver(false);
    setEnergyShield(0);
    setIsSpeedBurst(false);
    setTriggerReset(true);
    resetSubmission();
    resetProgression();
    const { countFoods, countBombs, countES, countSB } = getSpawnCounts(
      isMoreProduceMoretribute,
      isSafeHeaven
    );
    const collectedItems = { foods, energyShields, speedBursts };
    spawner(
      countFoods,
      countBombs,
      countES,
      countSB,
      INITIAL_SNAKE,
      isPetrified,
      collectedItems
    );
  }, [
    triggerCountdown,
    resetStatus,
    resetInput,
    resetPlayTime,
    resetSubmission,
    resetProgression,
    isMoreProduceMoretribute,
    isSafeHeaven,
    spawner,
  ]);

  const onPauseToggle = () => {
    if (isGameOver) return;
    setIsPaused((prev) => {
      if (prev) {
        triggerCountdown();
      }
      return !prev;
    });
  };

  const onLangToggle = (lang: "th" | "en") => {
    if (isGameOver) return setLanguage(lang);
    setLanguage(lang);
    setIsPaused(true);
  };

  useEffect(() => {
    if (isGameOver) {
      setTimeout(() => {
        setShowLeaderboard(true);
      }, 1000);
    }
  }, [isGameOver]);

  return {
    snake,
    foods,
    score,
    isPaused,
    isGameOver,
    resetGame,
    setIsPaused,
    energyShields,
    energyShield,
    speedBursts,
    isSpeedBurst,
    bombs,
    position: snake[0],
    direction,
    inputBuffer, // ถ้าใช้ ref
    triggerReset,
    resetPlayTime,
    playTime,
    username,
    setUsername,
    hasStarted,
    setHasStarted,
    triggerCountdown,
    onPauseToggle,
    language,
    onLangToggle,
    startGame,
    countdown,
    setShowLeaderboard,
    showLeaderboard,
    level,
    upgradeQueue,
    setUpgradeQueue,
    resetProgression,
    applyStatus,
    isDoubleScore,
    isExtendedBurst,
    isSlowSpeed,
    isMoreProduceMoretribute,
    isSafeHeaven,
    selectedStatuses,
    setSelectedStatuses,
    hasSubmitted,
    randomOptions,
    setCountdown,
    isLoading,
    setIsLoading,
    gameStart,
    thresholds,
    showLevelUpNotification,
    handleNotificationComplete,
    settriggerBarExp,
    triggerBarExp,
    triggerBuffPanel,
    setTriggerBuffPanel,
    gridSize,
    showRotateHint,
    currentThreshold,
    nextThreshold,
    progress,
    isMaxLevel,
    isPetrified,
    isChargingBehavior,
    isArmadilloLike,
    isNoLimitSpeed,
    isActive,
    currentStep,
    currentStepData,
    totalSteps,
    hasCompleted,
    startTutorial,
    nextStep,
    prevStep,
    skipTutorial,
    endTutorial,
    showBombAnimation,
    handleBombAnimationComplete,
    showWallAnimation,
    collisionDirection,
    handleWallAnimationComplete,
  };
};
