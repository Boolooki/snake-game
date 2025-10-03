import React from 'react';
import { Position } from '../../types';

export default function Bomb({ position }: { position: Position }) {
  return (
    <div
      className="bg-red-500 rounded-full animate-[fadeIn_0.5s_ease-out_backwards]
      bg-gradient-to-br from-red-500 to-red-300 shadow-red-300 shadow-lg"
      style={{
        gridColumnStart: position.x,
        gridRowStart: position.y,
      }}
    />
  );
}