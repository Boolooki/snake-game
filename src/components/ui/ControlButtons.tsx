import { PropsControlButton } from "@/types";

import {ArrowPathIcon,PlayIcon,PauseIcon} from "@heroicons/react/24/outline";

export default function ControlButtons({ isPaused, isGameOver, resetGame, onPauseToggle }: PropsControlButton) {
  return (
    <div className={`flex ${isGameOver ? "" : "space-x-4"}`}>
      <button className="px-4 py-2 rounded" onClick={resetGame}>
        <ArrowPathIcon className="h-5 w-5" />
      </button>
      {!isGameOver && (
        <button className="px-4 py-2 rounded" onClick={onPauseToggle}>
          {isPaused ? <PlayIcon className="w-5 h-5" /> : <PauseIcon className="w-5 h-5" />}
        </button>
      )}
      
    </div>
  );
}