import React from 'react';
import { Position } from '../../types';

export default function Food({ position }: { position: Position }) {
  return (
    <div
      className="bg-green-400 rounded-full animate-[fadeIn_0.5s_ease-out_backwards]
      bg-gradient-to-br from-green-400 to-cyan-200 shadow-teal-300 shadow-lg
      no-pointer-events"
      style={{
        gridColumnStart: position.x,
        gridRowStart: position.y,
      }}
    />
    
  );
}