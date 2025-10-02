import { useState, useEffect, useCallback, useRef } from "react";
import { Position, Direction } from "../types";
import { INITIAL_SNAKE, SPEED } from "../constants/gameConstants";
import {
  getSafeRandomPos,
  isCollision,
  isOutOfBounds,
  getSafePositionsArray,
} from "../utils/gameUtils";
import { useSpecialStatus } from "../hooks/useSpecialStatus";
import { useSpawning } from "../hooks/useSpawning";

export const useSnakeGame = () => {
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [countdown, setCountdown] = useState<number | null>(600);

  const { bombs, foods, energyShields, speedBursts, spawner } = useSpawning();

  function getSpawnCounts(isBuffed: boolean) {
    const countFoods = isBuffed ? 2 : 1;
    const base = isBuffed ? 8 : 5;
    const bonus = isBuffed ? 3 : 1;
    const countBombs = Math.floor(Math.random() * base) + bonus;
    const countES = 1;
    const countSB = 1;

    return { countFoods, countBombs, countES, countSB };
  }

  const [score, setScore] = useState<number>(0);
  const [playTime, setPlayTime] = useState(0);
  const [username, setUsername] = useState("");
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const [level, setLevel] = useState(0);
  const [upgradeQueue, setUpgradeQueue] = useState(false);

  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isEnergyShield, setIsEnergyShield] = useState<boolean>(false);
  const [isSpeedBurst, setIsSpeedBurst] = useState<boolean>(false);
  const [triggerReset, setTriggerReset] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [language, setLanguage] = useState<"th" | "en">("th");

  const inputBuffer = useRef<Direction>("RIGHT");
  const {
    isDoubleScore,
    isExtendedBurst,
    isSlowSpeed,
    applyStatus,
    resetStatus,
    isMoreProduceMoretribute,
    setSelectedStatuses,
    selectedStatuses,
  } = useSpecialStatus();

  useEffect(() => {
    const thresholds = [5, 20, 50, 100];
    if (thresholds.includes(score)) {
      setLevel((prev) => prev + 1);
      setUpgradeQueue(true); // เปิด UI ให้เลือกสถานะ
      setIsPaused(true);
    }
  }, [score]);

  useEffect(() => {
    const { countFoods, countBombs, countES, countSB } = getSpawnCounts(
      isMoreProduceMoretribute
    );
    spawner(countFoods, countBombs, countES, countSB, snake);
  }, [isMoreProduceMoretribute]);

  useEffect(() => {
    if (countdown === 0) {
      startGame();
    }
  }, [countdown]);

  const startGame = useCallback(() => {
    setIsPaused(false);
    setIsGameOver(false);
    setTriggerReset(true);
  }, []);

  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touch = e.changedTouches[0];
      const dx = touch.clientX - touchStartX;
      const dy = touch.clientY - touchStartY;

      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);

      let newDir: Direction | null = null;

      if (absDx > absDy) {
        newDir = dx > 0 ? "RIGHT" : "LEFT";
      } else {
        newDir = dy > 0 ? "DOWN" : "UP";
      }

      const opposite = {
        UP: "DOWN",
        DOWN: "UP",
        LEFT: "RIGHT",
        RIGHT: "LEFT",
      };

      if (newDir && direction !== opposite[newDir]) {
        inputBuffer.current = newDir;
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [direction]);

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
        if (isCollision(prevSnake, head) || isOutOfBounds(head)) {
          setIsGameOver(true);
          setIsEnergyShield(false);
        }
        if (
          bombs.some((b) => b.x === head.x && b.y === head.y && !isEnergyShield)
        ) {
          setIsGameOver(true);
        }
      });

      if (foods.some((b) => b.x === head.x && b.y === head.y)) {
        const { countFoods, countBombs, countES, countSB } = getSpawnCounts(
          isMoreProduceMoretribute
        );
        spawner(countFoods, countBombs, countES, countSB, snake);
        setScore((prev) => prev + (isDoubleScore ? 2 : 1));
        return newSnake;
      }

      if (energyShields.some((b) => b.x === head.x && b.y === head.y)) {
        const { countFoods, countBombs, countES, countSB } = getSpawnCounts(
          isMoreProduceMoretribute
        );
        spawner(countFoods, countBombs, countES, countSB, snake);
        setIsEnergyShield(true);
        return utilSnake;
      }

      if (speedBursts.some((b) => b.x === head.x && b.y === head.y)) {
        const { countFoods, countBombs, countES, countSB } = getSpawnCounts(
          isMoreProduceMoretribute
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
          isMoreProduceMoretribute
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
    isMoreProduceMoretribute,
  ]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const opposite = {
        UP: "DOWN",
        DOWN: "UP",
        LEFT: "RIGHT",
        RIGHT: "LEFT",
      };

      const newDir: Direction | null = (() => {
        switch (e.key) {
          case "ArrowUp":
          case "w":
            return "UP";
          case "ArrowDown":
          case "s":
            return "DOWN";
          case "ArrowLeft":
          case "a":
            return "LEFT";
          case "ArrowRight":
          case "d":
            return "RIGHT";
          default:
            return null;
        }
      })();

      if (newDir && direction !== opposite[newDir]) {
        inputBuffer.current = newDir;
      }

      if (e.key === " ") {
        setIsPaused((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction]);

  useEffect(() => {
    if (countdown === null || countdown <= 0) return setIsPaused(false);

    const timer = setTimeout(() => {
      setCountdown((prev) => {
        if (prev === 1) return null; // ✅ จบแล้วเซตเป็น null
        return prev !== null ? prev - 1 : null;
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

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

  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (!isGameOver || isPaused || score === 0 || playTime < 3 || hasSubmitted)
      return;

    setHasSubmitted(true);

    fetch("/api/submitScore", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username || "Anonymous",
        score,
        duration: playTime,
        powerupsUsed: "test",
      }),
    });
  }, [isGameOver, isPaused, score, playTime, hasSubmitted, username]);

  const resetGame = useCallback(() => {
    const exclude: Position[] = [
      ...snake,
      ...foods,
      ...energyShields,
      ...speedBursts,
      ...bombs,
    ];
    resetStatus();
    setSnake(INITIAL_SNAKE);
    setDirection("RIGHT");
    inputBuffer.current = "RIGHT";
    setScore(0);
    setIsGameOver(false);
    setIsEnergyShield(false);
    setIsSpeedBurst(false);
    setTriggerReset(true);
    setHasSubmitted(false);
    onStart();
    const { countFoods, countBombs, countES, countSB } = getSpawnCounts(
      isMoreProduceMoretribute
    );
    spawner(countFoods, countBombs, countES, countSB, snake);
  }, [bombs, energyShields, foods, snake, speedBursts]);

  const onStart = () => {
    if (username.trim()) {
      setHasStarted(true); // ✅ ปิด StartModal
      setCountdown(5); // ✅ เริ่มนับถอยหลัง // ✅ ยังไม่เริ่มเกมจริง
    }
  };

  const onPauseToggle = () => {
    setIsPaused((prev) => !prev);
  };

  const onLangToggle = (lang: "th" | "en") => {
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
    setPlayTime,
    username,
    setUsername,
    hasStarted,
    setHasStarted,
    onStart,
    onPauseToggle,
    language,
    onLangToggle,
    startGame,
    countdown,
    setShowLeaderboard,
    showLeaderboard,
    level,
    setLevel,
    upgradeQueue,
    setUpgradeQueue,
    applyStatus,
    isDoubleScore,
    isExtendedBurst,
    isSlowSpeed,
    isMoreProduceMoretribute,
    selectedStatuses,
    setSelectedStatuses,
  };
};
