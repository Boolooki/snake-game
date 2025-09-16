import React from 'react';
import { Position } from '../types';


export default function Snake({ segments, isEnergyShield, isSpeedBurst }: { segments: Position[], isEnergyShield: boolean, isSpeedBurst: boolean }) {
  return (
    <>
      {segments.map((segment, index) => (
        <div
          key={index}
          className={'bg-green-500' + (isEnergyShield ? ' border-4 border-blue-300' : '') + (isSpeedBurst ? ' animate-pulse' : '') + ' rounded-full'}
          style={{
            gridColumnStart: segment.x,
            gridRowStart: segment.y,
          }}
        />
      ))}
    </>
  );
}
