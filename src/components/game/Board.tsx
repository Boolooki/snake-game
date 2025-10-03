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
      className={`grid grid-cols-${GRID_SIZE} grid-rows-${GRID_SIZE} w-[80vw] h-[80vw] lg:w-[25vw] lg:h-[25vw] relative transition duration-300 
      bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-black/20 p-6
      ${
        game.isSpeedBurst
          ? "bg-yellow-50 border-yellow-400 shadow-[0_0_20px_0px_#fff200]"
          : "bg-white border-black"
      }`}
    >
      <Snake
        segments={game.snake}
        isEnergyShield={game.isEnergyShield}
        isSpeedBurst={game.isSpeedBurst}
      />
      {game.foods.map((pos, index) => (
        <Food key={`food-${index}`} position={pos} />
      ))}
      {game.energyShields.map((b, index) => (
        <EnergyShield key={`${b.x}-${b.y}`} position={b} />
      ))}
      {game.speedBursts.map((b, index) => (
        <SpeedBurst key={`${b.x}-${b.y}`} position={b} />
      ))}
      {game.bombs.map((b, index) => (
        <Bomb key={`${b.x}-${b.y}`} position={b} />
      ))}

      <BoardOverlay
        isGameOver={game.isGameOver}
        isPaused={game.isPaused}
        language={game.language}
        countdown={game.countdown}
      />
    </div>
  );
}
