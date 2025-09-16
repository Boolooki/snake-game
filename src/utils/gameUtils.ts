import { Position } from '../types';
import { GRID_SIZE } from '../constants/gameConstants';

export function randomPos(): Position {
  return {
    x: Math.floor(Math.random() * GRID_SIZE) + 1,
    y: Math.floor(Math.random() * GRID_SIZE) + 1,
  };
}

export function isCollision(snake: Position[], head: Position): boolean {
  if (!head) return false;
  return snake.some((segment) => segment.x === head.x && segment.y === head.y);
}

export function isOutOfBounds(head?: Position): boolean {
  if (!head) return false; // หรือ true ถ้าจะถือว่า undefined = out of bounds
  return head.x < 1 || head.x > GRID_SIZE || head.y < 1 || head.y > GRID_SIZE;
}