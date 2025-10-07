import { useCallback, useState } from "react";
import type { Position } from "@/types";
import { getSafeRandomPos } from "../utils/gameUtils";
import {
  INITIAL_FOOD,
  INITIAL_ENERGYSHIELD,
  INITIAL_SPEEDBURST,
  INITIAL_BOMBS,
} from "../constants/gameConstants";

export const useSpawning = ( gridSize: { columns: number; rows: number } ) => {
  const [bombs, setBombs] = useState<Position[]>(INITIAL_BOMBS);
  const [foods, setFoods] = useState<Position[]>(INITIAL_FOOD);
  const [energyShields, setEnergyShields] = useState<Position[]>(INITIAL_ENERGYSHIELD);
  const [speedBursts, setSpeedBursts] = useState<Position[]>(INITIAL_SPEEDBURST);

  const spawner = useCallback(
    (
      countFoods: number,
      countBombs: number,
      countES: number,
      countSB: number,
      snake: Position[]
    ) => {
      const exclude: Position[] = [...snake, ...bombs, ...energyShields, ...speedBursts];
      const newFoods: Position[] = [];
      const newBombs: Position[] = [];
      const newES: Position[] = [];
      const newSB: Position[] = [];

      for (let i = 0; i < countFoods; i++) {
        newFoods.push(getSafeRandomPos([...exclude, ...newFoods], gridSize));
      }
      for (let i = 0; i < countBombs; i++) {
        newBombs.push(getSafeRandomPos([...exclude, ...newFoods, ...newBombs], gridSize));
      }
      for (let i = 0; i < countES; i++) {
        newES.push(getSafeRandomPos([...exclude, ...newFoods, ...newBombs], gridSize));
      }
      for (let i = 0; i < countSB; i++) {
        newSB.push(getSafeRandomPos([...exclude, ...newFoods, ...newBombs], gridSize));
      }

      setFoods(newFoods);
      setBombs(newBombs);
      setEnergyShields(newES);
      setSpeedBursts(newSB);
    },
    [bombs, energyShields, speedBursts, gridSize] // เพิ่ม dependency
  );

  return {
    bombs,
    foods,
    energyShields,
    speedBursts,
    spawner,
  };
};