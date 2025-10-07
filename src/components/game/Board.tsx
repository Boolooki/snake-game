import React from "react";
import Snake from "./Snake";
import Food from "./Food";
import Bomb from "./Bomb";
import EnergyShield from "./Energyshield";
import SpeedBurst from "./Speedburst";
import { GRID_SIZECOLUMS,GRID_SIZEROWS } from "../../constants/gameConstants";
import { PropsBoard } from "../../types";
import BoardOverlay from "../ui/BoardOverlay";

export default function Board(game: PropsBoard) {
  return (
    <div
      className={`game relative w-[80vw] h-[90dvh] lg:w-[25vw] bg-white/80 rounded-3xl shadow-2xl
      ${
        game.isSpeedBurst
          ? "bg-yellow-50 border-yellow-400 shadow-[0_0_20px_0px_#fff200]"
          : "bg-white border-black"
      }`}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${GRID_SIZECOLUMS}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${GRID_SIZEROWS}, minmax(0, 1fr))`,
      }}
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
        isLevelingUp={game.showLevelUpNotification || game.upgradeQueue}
      />
    </div>
  );
}
