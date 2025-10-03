import React from 'react';
import { Position } from '../../types';

export default function EnergyShield({ position }: { position: Position }) {
  return (
    <div
      className="bg-blue-300 rounded-half animate-[fadeIn_0.5s_ease-out_backwards]
      bg-gradient-to-br from-blue-400 to-cyan-400 shadow-blue-300 shadow-lg"
      style={{
        gridColumnStart: position.x,
        gridRowStart: position.y,
      }}
    />
  );
}