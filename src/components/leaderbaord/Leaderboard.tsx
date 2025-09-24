import { useState } from 'react';
import LeaderboardModal from './LeaderboardModal';
import type { Language } from '@/types'; // ถ้าคุณแยก type ไว้

const messages = {
  th: {
    leaderboard: "กระดานคะแนน",
  },
  en: {
    leaderboard: "Leaderboard",
  },
};

export default function LeaderboardScore({ language }: { language: Language }) {
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  return (
    <div>
      <button
        onClick={() => setShowLeaderboard(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        <div>{messages[language].leaderboard}</div>
      </button>

      {showLeaderboard && (
        <LeaderboardModal onClose={() => setShowLeaderboard(false)} />
      )}
    </div>
  );
}
