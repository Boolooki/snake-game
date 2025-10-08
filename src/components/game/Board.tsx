import React from "react";
import Snake from "./Snake";
import Food from "./Food";
import Bomb from "./Bomb";
import EnergyShield from "./Energyshield";
import SpeedBurst from "./Speedburst";
import { PropsBoard } from "../../types";
import BoardOverlay from "../ui/BoardOverlay";

export default function Board({ gridSize, ...game }: PropsBoard) {
  return (
    console.log("Board rendered", gridSize.columns, gridSize.rows),
    (
      <div
        className={`
        relative
          rounded-[40px]
          w-[90vw] h-[90vh]
          overflow-hidden
          border-4
          border-teal-200
      ${
        game.isSpeedBurst
          ? "bg-yellow-50 border-yellow-400 shadow-[0_0_20px_0px_#fff200]"
          : "bg-white border-black"
      }`}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${
            gridSize.columns
          }, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${gridSize.rows}, minmax(0, 1fr))`,
        }}
      >
        <Snake
          segments={game.snake}
          isEnergyShield={game.isEnergyShield}
          isSpeedBurst={game.isSpeedBurst}
        />
        {game.foods.map((b) => (
          <Food key={`${b.x}-${b.y}`} position={b} />
        ))}
        {game.energyShields.map((b) => (
          <EnergyShield key={`${b.x}-${b.y}`} position={b} />
        ))}
        {game.speedBursts.map((b) => (
          <SpeedBurst key={`${b.x}-${b.y}`} position={b} />
        ))}
        {game.bombs.map((b) => (
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
    )
  );
}
