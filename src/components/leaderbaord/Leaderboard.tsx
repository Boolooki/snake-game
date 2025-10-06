import type { Language } from "@/types";


type LeaderboardScoreProps = {
  language: Language;
  showboard: boolean;
  onOpen: (show: boolean) => void;
};

export default function LeaderboardScore({ language, showboard, onOpen, }: LeaderboardScoreProps) {
  const messages = {
    th: { leaderboard: "อันดับ" },
    en: { leaderboard: "Ranking" },
  };

  return (
    <>
      <button
        onClick={() => onOpen(true)}
        className="z-31 bg-white hover:bg-green-400 text-green-600 hover:text-green-100 px-4 py-2 rounded-xl transition duration-300 text-sm shadow-lg "
      >
        {messages[language].leaderboard}
      </button>
    </>
  );
}

