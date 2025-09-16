import React from 'react';
import { Position } from '../types';

export default function Bomb({ position }: { position: Position }) {
  return (
    <div
      className="bg-red-500 rounded-full"
      style={{
        gridColumnStart: position.x,
        gridRowStart: position.y,
      }}
    />
  );
}