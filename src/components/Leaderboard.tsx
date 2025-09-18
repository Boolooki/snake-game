import { useState } from 'react';
import LeaderboardModal from './LeaderboardModal';


export default function LeaderboardScore() {
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  return (
    <div>
      <button
        onClick={() => setShowLeaderboard(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Leaderboard
      </button>

      {showLeaderboard && (
        <LeaderboardModal onClose={() => setShowLeaderboard(false)} />
      )}
    </div>
  );
}