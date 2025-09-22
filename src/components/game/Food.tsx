import React from 'react';
import { Position } from '../../types';

export default function Food({ position }: { position: Position }) {
  return (
    <div
      className="bg-green-400 rounded-full"
      style={{
        gridColumnStart: position.x,
        gridRowStart: position.y,
      }}
    />
  );
}