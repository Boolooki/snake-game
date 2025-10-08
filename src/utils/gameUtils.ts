import { Position } from "../types";

export function getSafeRandomPos(
  exclude: Position[], // ตำแหน่งที่ต้องหลีกเลี่ยง (งูและไอเทมทั้งหมด)
  gridSize: { columns: number; rows: number }
): Position {
  const maxAttempts = 1000;
  for (let i = 0; i < maxAttempts; i++) {
    const pos = {
      x: Math.floor(Math.random() * gridSize.columns) + 1, // เริ่มที่ 1
      y: Math.floor(Math.random() * gridSize.rows) + 1,
    };

    const isConflict = exclude.some((p) => p.x === pos.x && p.y === pos.y);
    if (!isConflict) return pos; // คืนตำแหน่งที่ไม่ทับ
  }
  throw new Error("Unable to find safe position after many attempts");
}

export function isCollision(snake: Position[], head: Position): boolean {
  if (!head) return false;
  return snake.some((segment) => segment.x === head.x && segment.y === head.y);
}

export function isOutOfBounds(head?: Position, gridSize?: { columns: number; rows: number }): boolean {
  if (!head || !gridSize) return true; // ถ้าไม่มี head หรือ gridSize ถือว่า out of bounds
  const { x, y } = head;
  const { columns, rows } = gridSize;
  return x < 1 || x > columns || y < 1 || y > rows;
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
