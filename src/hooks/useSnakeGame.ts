import { useState, useEffect, useCallback } from "react";
import { Position, Language } from "../types";
import { INITIAL_SNAKE, SPEED } from "../constants/gameConstants";
import { isCollision, isOutOfBounds, getSpawnCounts } from "../utils/gameUtils";
import { useSpecialStatus } from "./useSpecialStatus";
import { useSpawning } from "./useSpawning";
import { useInputSystem } from "./useInputSystem";
import { usePlayTimeTracker } from "./usePlayTimeTracker";
import { useLevelProgression } from "./useLevelProgression";
import { useScoreSubmission } from "./useScoreSubmission";
import { useCountdownTimer } from "./useCountdownTimer";
import Head from "next/head";

export const useSnakeGame = () => {
  const [gridSize, setGridSize] = useState({ columns: 40, rows: 20 }); // ค่าเริ่มต้น
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
    applyStatus,
    resetStatus,
    setSelectedStatuses,
    selectedStatuses,
    randomOptions,
    generateRandomOptions,
  } = useSpecialStatus();

  const [username, setUsername] = useState("");
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [triggerReset, setTriggerReset] = useState<boolean>(false);
  const [language, setLanguage] = useState<Language>("th");
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
  const [isEnergyShield, setIsEnergyShield] = useState<boolean>(false);
  const [isSpeedBurst, setIsSpeedBurst] = useState<boolean>(false);
  const [triggerBarExp, settriggerBarExp] = useState<boolean>(false);
  const [triggerBuffPanel, setTriggerBuffPanel] = useState<boolean>(false);

  useEffect(() => {
    const { countFoods, countBombs, countES, countSB } = getSpawnCounts(
      isMoreProduceMoretribute,
      isSafeHeaven
    );
    spawner(countFoods, countBombs, countES, countSB, snake);
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

  useEffect(() => {
    if (isEnergyShield || isSpeedBurst) {
      setTriggerBuffPanel(true);

      setTimeout(() => {
        setTriggerBuffPanel(false);
      }, 3000);
    }
  }, [isEnergyShield, isSpeedBurst]);

  const gameStart = useCallback(() => {
    console.log("gameStart is called");
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
          setIsGameOver(true);
          return prevSnake;
        }
        if (
          bombs.some((b) => b.x === head.x && b.y === head.y && !isEnergyShield)
        ) {
          setIsGameOver(true);
          return prevSnake;
        }
      });

      if (foods.some((b) => b.x === head.x && b.y === head.y)) {
        const { countFoods, countBombs, countES, countSB } = getSpawnCounts(
          isMoreProduceMoretribute,
          isSafeHeaven
        );
        spawner(countFoods, countBombs, countES, countSB, snake);
        setScore((prev) => prev + (isDoubleScore ? 2 : 1));
        return newSnake;
      }

      if (energyShields.some((b) => b.x === head.x && b.y === head.y)) {
        const { countFoods, countBombs, countES, countSB } = getSpawnCounts(
          isMoreProduceMoretribute,
          isSafeHeaven
        );
        spawner(countFoods, countBombs, countES, countSB, snake);
        setIsEnergyShield(true);
        return utilSnake;
      }

      if (speedBursts.some((b) => b.x === head.x && b.y === head.y)) {
        const { countFoods, countBombs, countES, countSB } = getSpawnCounts(
          isMoreProduceMoretribute,
          isSafeHeaven
        );
        spawner(countFoods, countBombs, countES, countSB, snake);
        const burstDuration = isExtendedBurst ? 6000 : 3000;
        setIsSpeedBurst(true);
        setTimeout(() => setIsSpeedBurst(false), burstDuration);
        return utilSnake;
      }

      if (
        bombs.some((b) => b.x === head.x && b.y === head.y && isEnergyShield)
      ) {
        const { countFoods, countBombs, countES, countSB } = getSpawnCounts(
          isMoreProduceMoretribute,
          isSafeHeaven
        );
        spawner(countFoods, countBombs, countES, countSB, snake);
        setIsEnergyShield(false);
        return utilSnake;
      }

      return [head, ...prevSnake.slice(0, -1)];
    });
  }, [
    foods,
    energyShields,
    bombs,
    isEnergyShield,
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
    setIsEnergyShield(false);
    setIsSpeedBurst(false);
    setTriggerReset(true);
    resetSubmission();
    resetProgression();
    const { countFoods, countBombs, countES, countSB } = getSpawnCounts(
      isMoreProduceMoretribute,
      isSafeHeaven
    );
    spawner(countFoods, countBombs, countES, countSB, INITIAL_SNAKE);
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
    isEnergyShield,
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
  };
};
