import { useState, useEffect, useCallback, useRef } from "react";
import { Position, Direction } from "../types";
import {
  INITIAL_SNAKE,
  SPEED,
  INITIAL_FOOD,
  INITIAL_ENERGYSHIELD,
  INITIAL_SPEEDBURST,
} from "../constants/gameConstants";
import { randomPos, isCollision, isOutOfBounds } from "../utils/gameUtils";

export const useSnakeGame = () => {
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>(INITIAL_FOOD);
  const [energyShield, setEnergyShield] =
    useState<Position>(INITIAL_ENERGYSHIELD);
  const [speedBurst, setSpeedBurst] = useState<Position>(INITIAL_SPEEDBURST);
  const [bomb, setBomb] = useState<Position[]>([]);
  const [score, setScore] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isEnergyShield, setIsEnergyShield] = useState<boolean>(false);
  const [isSpeedBurst, setIsSpeedBurst] = useState<boolean>(false);
  const [triggerReset, setTriggerReset] = useState<boolean>(false);
  

  const inputBuffer = useRef<Direction>("RIGHT");

  const spawnBombs = useCallback(() => {
    const count = Math.floor(Math.random() * 3) + 1; // 1–3 ลูก
    const newBomb = Array.from({ length: count }, () => randomPos());
    setBomb(newBomb);
  }, []);

  useEffect(() => {
    spawnBombs(); // ตอนเริ่มเกม
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
        } else if (
          bomb.some((b) => b.x === head.x && b.y === head.y && !isEnergyShield)
        ) {
          setIsGameOver(true);
        }
      });

      if (head.x === food.x && head.y === food.y) {
        setFood(randomPos());
        setScore((prev) => prev + 1);
        spawnBombs(); // สุ่มระเบิดใหม่
        return newSnake;
      }

      if (head.x === energyShield.x && head.y === energyShield.y) {
        setEnergyShield(randomPos());
        setIsEnergyShield(true);
        return utilSnake;
      }

      if (head.x === speedBurst.x && head.y === speedBurst.y) {
        setSpeedBurst(randomPos());
        setIsSpeedBurst(true);
        setTimeout(() => {
          setIsSpeedBurst(false);
        }, 3000); // เร่ง 3 วินาที
        return utilSnake;
      }

      if (
        bomb.some((b) => b.x === head.x && b.y === head.y && isEnergyShield)
      ) {
        spawnBombs();
        setIsEnergyShield(false);
        return utilSnake;
      }

      return [head, ...prevSnake.slice(0, -1)];
    });
  }, [food, energyShield, bomb, isEnergyShield, isSpeedBurst]);

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

  const getCurrentSpeed = () => (isSpeedBurst ? SPEED / 2 : SPEED);

  useEffect(() => {
    if (isPaused || isGameOver) return;
    setTriggerReset(false);
    const interval = setInterval(moveSnake, getCurrentSpeed());
    return () => clearInterval(interval);
  }, [moveSnake, isPaused, isGameOver]);

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setEnergyShield(INITIAL_ENERGYSHIELD);
    setDirection("RIGHT");
    inputBuffer.current = "RIGHT";
    setFood(randomPos());
    spawnBombs();
    setScore(0);
    setIsGameOver(false);
    setIsPaused(false);
    setIsEnergyShield(false);
    setIsSpeedBurst(false);
    setTriggerReset(true);
  }, []);

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
  };
};
