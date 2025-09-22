import { useState, useEffect, useCallback, useRef } from "react";
import { Position, Direction } from "../types";
import {
  INITIAL_SNAKE,
  SPEED,
  INITIAL_FOOD,
  INITIAL_ENERGYSHIELD,
  INITIAL_SPEEDBURST,
  INITIAL_BOMBS,
} from "../constants/gameConstants";
import {
  getSafeRandomPos,
  isCollision,
  isOutOfBounds,
  getSafePositionsArray,
} from "../utils/gameUtils";

export const useSnakeGame = () => {
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);

  const [food, setFood] = useState<Position>(INITIAL_FOOD);
  const [energyShield, setEnergyShield] =
    useState<Position>(INITIAL_ENERGYSHIELD);
  const [speedBurst, setSpeedBurst] = useState<Position>(INITIAL_SPEEDBURST);
  const [bomb, setBomb] = useState<Position[]>(INITIAL_BOMBS);
  const [score, setScore] = useState<number>(0);
  const [playTime, setPlayTime] = useState(0);
  const [username, setUsername] = useState("");

  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isEnergyShield, setIsEnergyShield] = useState<boolean>(false);
  const [isSpeedBurst, setIsSpeedBurst] = useState<boolean>(false);
  const [triggerReset, setTriggerReset] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState(false);

  const inputBuffer = useRef<Direction>("RIGHT");

  const spawnBombs = useCallback((exclude: Position[]) => {
    const count = Math.floor(Math.random() * 5) + 1; // 1–5 ลูก
    const newBombs = getSafePositionsArray(exclude, count);
    setBomb(newBombs);
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
          bomb.some((b) => b.x === head.x && b.y === head.y && !isEnergyShield)
        ) {
          setIsGameOver(true);
        }
      });

      if (head.x === food.x && head.y === food.y) {
        const newFood = getSafeRandomPos([
          ...newSnake,
          ...snake,
          energyShield,
          speedBurst,
          ...bomb,
        ]);
        setFood(newFood);
        const newExclude = [
          ...newSnake,
          ...snake,
          newFood,
          energyShield,
          speedBurst,
        ];
        spawnBombs(newExclude);
        setScore((prev) => prev + 1);
        return newSnake;
      }

      if (head.x === energyShield.x && head.y === energyShield.y) {
        const newFood = getSafeRandomPos([
          ...newSnake,
          ...snake,
          energyShield,
          speedBurst,
          ...bomb,
        ]);
        const newExclude = [
          ...newSnake,
          ...snake,
          newFood,
          energyShield,
          speedBurst,
        ];
        setEnergyShield(getSafeRandomPos(newExclude));
        setIsEnergyShield(true);
        return utilSnake;
      }

      if (head.x === speedBurst.x && head.y === speedBurst.y) {
        const newFood = getSafeRandomPos([
          ...newSnake,
          ...snake,
          energyShield,
          speedBurst,
          ...bomb,
        ]);
        const newExclude = [
          ...newSnake,
          ...snake,
          newFood,
          energyShield,
          speedBurst,
        ];
        setSpeedBurst(getSafeRandomPos(newExclude));
        setIsSpeedBurst(true);
        setTimeout(() => {
          setIsSpeedBurst(false);
        }, 3000); // เร่ง 3 วินาที
        return utilSnake;
      }

      if (
        bomb.some((b) => b.x === head.x && b.y === head.y && isEnergyShield)
      ) {
        const newFood = getSafeRandomPos([
          ...newSnake,
          ...snake,
          energyShield,
          speedBurst,
          ...bomb,
        ]);
        const newExclude = [
          ...newSnake,
          ...snake,
          newFood,
          energyShield,
          speedBurst,
        ];
        spawnBombs(newExclude);
        setIsEnergyShield(false);
        return utilSnake;
      }

      return [head, ...prevSnake.slice(0, -1)];
    });
  }, [food, energyShield, bomb, isEnergyShield, snake, spawnBombs, speedBurst]);

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
    if (isPaused || isGameOver) return;

    setTriggerReset(false);
    const speed = isSpeedBurst ? SPEED / 2 : SPEED;
    const interval = setInterval(moveSnake, speed);
    return () => clearInterval(interval);
  }, [moveSnake, isPaused, isGameOver, isSpeedBurst]);

  const hasSubmitted = useRef(false);

  useEffect(() => {
    if (
      !isGameOver ||
      isPaused ||
      score === 0 ||
      playTime < 3 ||
      hasSubmitted.current
    )
      return;

    hasSubmitted.current = true;

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
  }, [isGameOver, isPaused, score, playTime, hasSubmitted ,username]);

  const resetGame = useCallback(() => {
    const exclude: Position[] = [
      ...snake,
      food,
      energyShield,
      speedBurst,
      ...bomb,
    ];
    setSnake(INITIAL_SNAKE);
    setEnergyShield(getSafeRandomPos(exclude));
    setDirection("RIGHT");
    inputBuffer.current = "RIGHT";
    setFood(getSafeRandomPos(exclude));
    setSpeedBurst(getSafeRandomPos(exclude));
    setScore(0);
    setIsGameOver(false);
    setIsPaused(false);
    setIsEnergyShield(false);
    setIsSpeedBurst(false);
    setTriggerReset(true);
  }, [bomb, energyShield, food, snake, speedBurst]);

  const onStart = () => {
    if (username.trim()) {
      setHasStarted(true);
      setIsPaused(false);
    }
  };

  const onPauseToggle = () => {
    setIsPaused((prev) => !prev);
  };

  return {
    snake,
    food,
    score,
    isPaused,
    isGameOver,
    resetGame,
    setIsPaused,
    energyShield,
    isEnergyShield,
    speedBurst,
    isSpeedBurst,
    bomb,
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
  };
};
