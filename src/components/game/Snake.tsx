import React from 'react';
import { Position } from '../../types';

type SnakeProps = {
  segments: Position[];
  isEnergyShield: boolean;
  isSpeedBurst: boolean;
};

export default function Snake({
  segments,
  isEnergyShield,
  isSpeedBurst,
}: SnakeProps) {
  return (
    <>
      {segments.map((segment, index) => {
        const isHead = index === 0;

        const baseClass =
          'rounded-full bg-gradient-to-br from-green-400 to-teal-200 shadow-teal-300 shadow-lg';

        const energyShieldClass = isEnergyShield
          ? ' border-4 border-blue-300'
          : '';

        const speedBurstClass = isSpeedBurst ? ' animate-pulse' : '';

        const headClass = isHead
          ? ' scale-[1.2] border-green-400 border-2 shadow-green-200'
          : '';

        return (
          <div
            key={index}
            className={`${baseClass}${energyShieldClass}${speedBurstClass}${headClass}`}
            style={{
              gridColumnStart: segment.x,
              gridRowStart: segment.y,
            }}
          />
        );
      })}
    </>
  );
}
