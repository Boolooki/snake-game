import { Position } from "../types";
import { GRID_SIZECOLUMS,GRID_SIZEROWS } from "../constants/gameConstants";

export function getSafeRandomPos(exclude: Position[]): Position {
  const maxAttempts = 1000;
  for (let i = 0; i < maxAttempts; i++) {
    const pos = {
      x: Math.floor(Math.random() * GRID_SIZECOLUMS) + 1,
      y: Math.floor(Math.random() * GRID_SIZEROWS) + 1,
    };

    const isConflict = exclude.some((p) => p.x === pos.x && p.y === pos.y);
    if (!isConflict) return pos;
  }
  throw new Error("Unable to find safe position after many attempts");
}

export function getSafePositionsArray(
  exclude: Position[],
  count: number
): Position[] {
  const positions: Position[] = [];
  const maxAttempts = 1000;
  let attempts = 0;

  while (positions.length < count && attempts < maxAttempts) {
    const pos = {
      x: Math.floor(Math.random() * GRID_SIZECOLUMS) + 1,
      y: Math.floor(Math.random() * GRID_SIZEROWS) + 1,
    };

    const isConflict =
      exclude.some((p) => p.x === pos.x && p.y === pos.y) ||
      positions.some((p) => p.x === pos.x && p.y === pos.y);

    if (!isConflict) {
      positions.push(pos);
    }

    attempts++;
  }

  if (positions.length < count) {
    throw new Error(
      `Unable to find ${count} safe bomb positions after ${maxAttempts} attempts`
    );
  }

  return positions;
}

export function isCollision(snake: Position[], head: Position): boolean {
  if (!head) return false;
  return snake.some((segment) => segment.x === head.x && segment.y === head.y);
}

export function isOutOfBounds(head?: Position): boolean {
  if (!head) return false; // หรือ true ถ้าจะถือว่า undefined = out of bounds
  return head.x < 1 || head.x > GRID_SIZECOLUMS || head.y < 1 || head.y > GRID_SIZEROWS;
}

export function formatTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}m`;
}

export function getSpawnCounts(
  isMoreProduceMoretribute: boolean,
  issafeHeaven: boolean
) {
  const countFoods = isMoreProduceMoretribute ? 2 : 1;
  const base = isMoreProduceMoretribute ? 8 : 5;
  const bonus = isMoreProduceMoretribute ? 3 : 1;
  const countBombs =
    Math.floor(Math.random() * base) + bonus - (issafeHeaven ? 2 : 0);

  const countES = 1;
  const countSB = 1;

  return { countFoods, countBombs, countES, countSB };
}
