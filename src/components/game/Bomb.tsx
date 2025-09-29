import React from 'react';
import { Position } from '../../types';

export default function Bomb({ position }: { position: Position }) {
  return (
    <div
      className="bg-red-500 rounded-full animate-[fadeIn_0.5s_ease-out_backwards]"
      style={{
        gridColumnStart: position.x,
        gridRowStart: position.y,
      }}
    />
  );
}