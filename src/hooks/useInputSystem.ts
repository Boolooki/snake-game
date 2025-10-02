import { useRef, useState, useEffect } from "react";
import type { Direction } from "@/types";

export const useInputSystem = ({
  setIsPaused,
}: {
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const inputBuffer = useRef<Direction>("RIGHT");

  const resetInput = () => {
    setDirection("RIGHT");
    inputBuffer.current = "RIGHT";
  };

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
  }, [direction, setIsPaused]);
  return { direction, setDirection, inputBuffer, resetInput };
};
