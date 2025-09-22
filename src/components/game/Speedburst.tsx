import React from 'react';
import { Position } from '../../types';

export default function SpeedBurst({ position }: { position: Position }) {
  return (
    <div
      className="bg-yellow-300 rounded-full"
      style={{
        gridColumnStart: position.x,
        gridRowStart: position.y,
      }}
    />
  );
}