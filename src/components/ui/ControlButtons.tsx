import { PropsControlButton } from "@/types";

import {
  ArrowPathIcon,
  PlayIcon,
  PauseIcon,
} from "@heroicons/react/24/outline";

export default function ControlButtons({
  isPaused,
  isGameOver,
  resetGame,
  onPauseToggle,
  countdown,
}: PropsControlButton) {
  const isCountingDown = countdown !== null && countdown > 0;
  return (
    <div
      className={`absolute z-30 top-[5vh] right-[15vw] flex space-x-4 ${
        isPaused || isGameOver ? "opacity-100" : "opacity-25"
      }`}
    >
      <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-white/40 overflow-hidden">
        <button className="px-4 py-2 rounded" onClick={resetGame}>
          <ArrowPathIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-white/40 overflow-hidden">
        <button
          className="px-4 py-2 rounded"
          onClick={onPauseToggle}
          disabled={isGameOver || isCountingDown}
        >
          {isPaused || isGameOver ? (
            <PlayIcon className="w-5 h-5" />
          ) : (
            <PauseIcon className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
}
