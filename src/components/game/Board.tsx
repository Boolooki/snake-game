import React from 'react';
import Snake from './Snake';
import Food from './Food';
import Bomb from './Bomb';
import EnergyShield from './Energyshield';
import { Position } from '../../types';
import { GRID_SIZE } from '../../constants/gameConstants';
import SpeedBurst from './Speedburst';

export default function Board({
  snake,
  food,
  energyShield,
  isEnergyShield,
  bomb,
  isGameOver,
  isPaused,
  speedBurst,
  isSpeedBurst,
}: {
  snake: Position[];
  food: Position;
  energyShield: Position;
  bomb: Position[];
  speedBurst: Position;
  isEnergyShield: boolean;
  isGameOver: boolean;
  isPaused: boolean;
  isSpeedBurst: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-${GRID_SIZE} grid-rows-${GRID_SIZE} border-2 border-black w-[400px] h-[400px] bg-white relative`}
    >
      <Snake segments={snake} isEnergyShield={isEnergyShield} isSpeedBurst={isSpeedBurst} />
      <Food position={food} />
      <EnergyShield position={energyShield} />
      <SpeedBurst position={speedBurst} />
      {bomb.map((b, index) => (
        <Bomb key={index} position={b} />
      ))}
      {isGameOver && (
        <div className="absolute text-red-500 text-xl mb-4 font-bold justify-center items-center flex w-[400px] h-[400px] bg-opacity-75">
          Game Over!
        </div>
      )}
      {isPaused && (
        <div className="absolute text-orange-500 text-xl mb-4 font-bold justify-center items-center flex w-[400px] h-[400px] bg-opacity-75">
          Paused
        </div>
      )}
    </div>
    
  );
}