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
                <div className="absolute top-[12px] left-[6px] w-[4px] h-[4px] bg-black rounded-full" />
                <div className="absolute top-[12px] right-[6px] w-[4px] h-[4px] bg-black rounded-full" />
                {/* ลิ้น */}
                <div className="absolute bottom-[-2px] left-1/2 transform -translate-x-1/2 w-[2px] h-[6px] bg-red-500 rounded-full" />
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
