import React from "react";
import Snake from "./Snake";
import Food from "./Food";
import Bomb from "./Bomb";
import EnergyShield from "./Energyshield";
import SpeedBurst from "./Speedburst";
import { GRID_SIZE } from "../../constants/gameConstants";
import { PropsBoard } from "../../types";
import BoardOverlay from "../ui/BoardOverlay";

export default function Board(game: PropsBoard) {
  return (
    <div
      className={`grid grid-cols-${GRID_SIZE} grid-rows-${GRID_SIZE}  border-2 border-black w-[300px] h-[300px] bg-white relative rounded-[20]`}
    >
      <Snake
        segments={game.snake}
        isEnergyShield={game.isEnergyShield}
        isSpeedBurst={game.isSpeedBurst}
      />
      <Food position={game.food} />
      <EnergyShield position={game.energyShield} />
      <SpeedBurst position={game.speedBurst} />
      {game.bomb.map((b, index) => (
        <Bomb key={index} position={b} />
      ))}

      <BoardOverlay isGameOver={game.isGameOver} isPaused={game.isPaused} language={game.language} countdown={game.countdown} />
    </div>
  );
}
