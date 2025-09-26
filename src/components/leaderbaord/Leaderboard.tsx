import LeaderboardModal from "./LeaderboardModal";
import type { Language } from "@/types"; // ถ้าคุณแยก type ไว้


type LeaderboardScoreProps = {
  language: Language;
  showboard: boolean;
  onOpen: (show: boolean) => void;
  onClose: (show: boolean) => void;
};

export default function LeaderboardScore({ language, showboard, onOpen, onClose }: LeaderboardScoreProps) {
  const messages = {
    th: { leaderboard: "กระดานคะแนน" },
    en: { leaderboard: "Leaderboard" },
  };

  return (
    <>
      <button
        onClick={() => onOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {messages[language].leaderboard}
      </button>

      {showboard && (
        <LeaderboardModal onClose={() => onClose(false)} />
      )}
    </>
  );
}

