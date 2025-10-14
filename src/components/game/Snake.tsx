import React from "react";
import { Position, Direction } from "../../types";

type SnakeProps = {
  segments: Position[];
  isEnergyShield: number;
  isSpeedBurst: boolean;
  snakefacedirction: Direction;
};

export default function Snake({
  segments,
  isEnergyShield,
  isSpeedBurst,
  snakefacedirction,
}: SnakeProps) {
  return (
    <>
      {segments.map((segment, index) => {
        const isHead = index === 0;

        const baseClass =
          "rounded-full bg-gradient-to-br from-green-400 to-teal-200 shadow-teal-300 shadow-lg";

        const energyShieldClass =
          isEnergyShield > 0 ? " border-4 border-blue-300" : "";

        const speedBurstClass = isSpeedBurst ? " animate-pulse" : "";

        const headClass = isHead
          ? " scale-[1.2] border-green-400 border-2 shadow-green-200"
          : "";

        // คำนวณองศาการหมุน
        const rotationAngle = {
          UP: "180deg",
          RIGHT: "-90deg",
          DOWN: "0deg",
          LEFT: "90deg",
        }[snakefacedirction];

        return (
          <div
          data-tutorial="snake"
            key={index}
            className={`${baseClass}${energyShieldClass}${speedBurstClass}${headClass} no-pointer-events`}
            style={{
              gridColumnStart: segment.x,
              gridRowStart: segment.y,
              transition: "all 100ms ease-in-out",
            }}
          >
            {isHead && (
              <div
                className="relative w-full h-full"
                style={{ transform: `rotate(${rotationAngle})`, transition: "all 50ms ease-in-out"}}
              >
                {/* ดวงตา */}
                <div className="absolute bg-white rounded-full z-10
                top-[2.5vw] left-[2.5vw] w-[0.5vw] h-[0.5vh]
                landscape:top-[1.2vw] landscape:left-[1vw] landscape:w-[0.5vw] landscape:h-[0.5vh] " />
                <div className="absolute bg-black rounded-full z-9
                top-[2vw] left-[2vw] w-[1vw] h-[1vh]
                landscape:top-[1vw] landscape:left-[1vw] landscape:w-[1vw] landscape:h-[1vh] " />
                {/* ลิ้น */}
                <div className="absolute  left-1/2 transform -translate-x-1/2 bg-red-500 rounded-full z-8
                bottom-[-2vw] w-[1vw] h-[1vh]
                landscape:bottom-[-2vh] landscape:w-[0.5vw] landscape:h-[2vh] " />
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
