import React from 'react';
import { Position } from '../../types';


export default function Snake({ segments, isEnergyShield, isSpeedBurst }: { segments: Position[], isEnergyShield: boolean, isSpeedBurst: boolean }) {
  return (
    <>
      {segments.map((segment, index) => (
        <div
          key={index}
          className={'rounded-full bg-gradient-to-br from-green-400 to-teal-200 shadow-teal-300 shadow-lg' + (isEnergyShield ? ' border-4 border-blue-300' : '') + (isSpeedBurst ? ' animate-pulse' : '')}
          style={{
            gridColumnStart: segment.x,
            gridRowStart: segment.y,
          }}
        />
      ))}
    </>
  );
}
