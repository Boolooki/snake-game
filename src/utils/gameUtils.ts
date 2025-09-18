import { Position } from '../types';
import { GRID_SIZE } from '../constants/gameConstants';

export function getSafeRandomPos(exclude: Position[]): Position {
  const maxAttempts = 1000;

  for (let i = 0; i < maxAttempts; i++) {
    const pos = {
      x: Math.floor(Math.random() * GRID_SIZE) + 1,
      y: Math.floor(Math.random() * GRID_SIZE) + 1,
    };

    const isConflict = exclude.some((p) => p.x === pos.x && p.y === pos.y);
    if (!isConflict) return pos;
  }

  throw new Error("Unable to find safe position after many attempts");
}

export function isCollision(snake: Position[], head: Position): boolean {
  if (!head) return false;
  return snake.some((segment) => segment.x === head.x && segment.y === head.y);
}

export function isOutOfBounds(head?: Position): boolean {
  if (!head) return false; // หรือ true ถ้าจะถือว่า undefined = out of bounds
  return head.x < 1 || head.x > GRID_SIZE || head.y < 1 || head.y > GRID_SIZE;
}

export function formatTime(sec: number) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}m`;
  };

