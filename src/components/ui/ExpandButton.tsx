import { useState } from "react";
import LanguageSelector from "@/components/ui/LanguageSelector";
import GameTutorial from "@/components/ui/GameTutorial";
import LeaderboardScore from "@/components/leaderbaord/Leaderboard";
import { ExpandableButtonsProps } from "@/types"

export default function ExpandableButtons({
  language,
  onLangToggle,
  onPauseToggle,
  isPaused,
  showLeaderboard,
  setShowLeaderboard,
}: ExpandableButtonsProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed transform flex items-center left-[5vw]">
      {/* ปุ่มลูกศร */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-white text-white p-4 hover:bg-blue-600 transition"
      >
        {open ? "←" : "→"}
      </button>

      {/* ปุ่มที่ซ่อนอยู่ */}
      <div
        className={`flex overflow-hidden transition-all duration-300 ${
          open ? "w-36 ml-2" : "w-0 ml-0"
        }`}
      >
        <div className="flex gap-4 mb-6">
          <LanguageSelector
            language={language}
            onLangToggle={onLangToggle}
          />
          <GameTutorial
            language={language}
            onPauseToggle={onPauseToggle}
            isPaused={isPaused}
          />
          <LeaderboardScore
            language={language}
            showboard={showLeaderboard}
            onOpen={() => setShowLeaderboard(true)}
            onClose={() => setShowLeaderboard(false)}
          />
        </div>
      </div>
    </div>
  );
}
