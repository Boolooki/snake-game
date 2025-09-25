import { useLeaderboard } from "../../app/services/useLeaderboard";
import { formatTime } from "@/utils/gameUtils";
import { useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

export default function LeaderboardModal({ onClose }: { onClose: () => void }) {
  const [ refreshKey, setRefreshKey ] = useState(0);
  const { data, loading, error } = useLeaderboard(refreshKey);

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-green-200 p-6 rounded shadow-lg w-80">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Leaderboard</h2>
          <button
            onClick={() => setRefreshKey((prev) => prev + 1)}
            className="px-2 py-1 rounded text-xs"
          >
            <ArrowPathIcon className="w-5 h-5"/>
          </button>
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
              className="flex justify-between bg-white px-2 py-1 rounded shadow-sm transform scale-95 opacity-0 animate-[fadeIn_1s_ease-out_forwards]"
            >
              <span className="truncate">
                {i + 1}. {entry.username}
              </span>
              <span className="text-right">
                {entry.score}point {formatTime(entry.duration)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
