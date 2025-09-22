import { useLeaderboard } from "../../app/services/useLeaderboard";
import { formatTime } from "@/utils/gameUtils";

export default function LeaderboardModal({ onClose }: { onClose: () => void }) {
  const { data, loading, error } = useLeaderboard();

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-green-200 p-6 rounded shadow-lg w-80">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Leaderboard</h2>
          <button
            onClick={onClose}
            className=" bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
          >
            X
          </button>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p>Error occurred</p>}

        <ul className="space-y-2 font-mono text-sm">
          {data?.map((entry, i) => (
            <li
              key={i}
              className="flex justify-between bg-white px-2 py-1 rounded shadow-sm"
            >
              <span className="truncate">
                {i + 1}. {entry.username}
              </span>
              <span className="text-right">{entry.score}point {formatTime(entry.duration)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
