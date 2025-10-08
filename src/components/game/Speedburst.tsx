import React from 'react';
import { Position } from '../../types';

export default function SpeedBurst({ position }: { position: Position }) {
  return (
    <div
      className="bg-yellow-300 rounded-full
      bg-gradient-to-br from-yellow-500 to-yellow-300 shadow-yellow-300 shadow-lg
      no-pointer-events"
      style={{
        gridColumnStart: position.x,
        gridRowStart: position.y,
      }}
    />
  );
}